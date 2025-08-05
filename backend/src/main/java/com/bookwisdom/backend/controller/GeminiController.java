package com.bookwisdom.backend.controller;


import com.bookwisdom.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {
    @Autowired
    private GeminiService geminiService;

    // Endpoint to get a motivational quote of the day
    @GetMapping("/quote")
    public Mono<String> getQuoteOfTheDay() {
        return geminiService.getQuoteOfTheDay();
    }
}
