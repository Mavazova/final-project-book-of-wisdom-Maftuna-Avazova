package com.bookwisdom.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class GeminiService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper(); // For parsing JSON

    @Value("${gemini.api.key}")
    private String apiKey;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    public Mono<String> getQuoteOfTheDay() {
        String endpoint = "/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

        String requestBody = """
            {
              "contents": [
                {
                  "parts": [
                    {
                      "text": "Give me a short motivational quote of the day"
                    }
                  ]
                }
              ]
            }
            """;

        return webClient.post()
                .uri(endpoint)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .map(this::extractQuote) // ✅ Extract only the quote
                .onErrorReturn("Could not get quote from Gemini.");
    }

    private String extractQuote(String jsonResponse) {
        try {
            JsonNode root = objectMapper.readTree(jsonResponse);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText("No quote found.");
        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing Gemini response.";
        }
    }
}
