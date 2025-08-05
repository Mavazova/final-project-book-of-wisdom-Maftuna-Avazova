package com.bookwisdom.backend.controller;

import com.bookwisdom.backend.model.Reflection;
import com.bookwisdom.backend.repository.EntryRepository;
import com.bookwisdom.backend.repository.ReflectionRepository;
import com.bookwisdom.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reflections")
public class ReflectionController {

    @Autowired
    private ReflectionRepository reflectionRepository;

    @Autowired
    private EntryRepository entryRepository;

    @Autowired
    private UserRepository userRepository; // ✅ Added this

    // ✅ 1. Get all reflections
    @GetMapping
    public List<Reflection> getAllReflections() {
        return reflectionRepository.findAll();
    }

    // ✅ 2. Get reflections for a specific user
    @GetMapping("/user/{username}")
    public List<Reflection> getReflectionsByUsername(@PathVariable String username) {
        return reflectionRepository.findByUserUsername(username);
    }

    // ✅ 3. Add a reflection
    @PostMapping
    public ResponseEntity<?> createReflection(@RequestBody Reflection reflection) {
        if (reflection.getUser() != null && reflection.getUser().getUsername() != null) {
            var user = userRepository.findByUsername(reflection.getUser().getUsername());
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            reflection.setUser(user);
            reflection.setDate(LocalDateTime.now());
            Reflection saved = reflectionRepository.save(reflection);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.badRequest().body("Username is required");
    }

    // ✅ 4. Update reflection
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReflection(
            @PathVariable Long id,
            @RequestBody Reflection updatedReflection
    ) {
        return reflectionRepository.findById(id)
                .map(existing -> {
                    existing.setMessage(updatedReflection.getMessage());
                    existing.setMood(updatedReflection.getMood());
                    existing.setNote(updatedReflection.getNote());
                    existing.setDate(updatedReflection.getDate() != null
                            ? updatedReflection.getDate()
                            : LocalDateTime.now());
                    Reflection saved = reflectionRepository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ 5. Delete reflection
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReflection(@PathVariable Long id) {
        return reflectionRepository.findById(id)
                .map(reflection -> {
                    reflectionRepository.delete(reflection);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
