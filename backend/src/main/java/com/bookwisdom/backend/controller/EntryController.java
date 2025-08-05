package com.bookwisdom.backend.controller;

import com.bookwisdom.backend.model.Category;
import com.bookwisdom.backend.model.Entry;
import com.bookwisdom.backend.model.User;
import com.bookwisdom.backend.repository.EntryRepository;
import com.bookwisdom.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entries")
public class EntryController {

    private final EntryRepository entryRepository;
    private final UserRepository userRepository;

    public EntryController(EntryRepository entryRepository, UserRepository userRepository) {
        this.entryRepository = entryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Entry> getEntryById(@PathVariable Long id) {
        return entryRepository.findById(id);
    }

    @PostMapping
    public Entry createEntry(@RequestBody Entry entry) {
        System.out.println("Received entry: " + entry);
        System.out.println("Received user: " + (entry.getUser() != null ? entry.getUser().getUsername() : "null"));

        if (entry.getUser() != null && entry.getUser().getUsername() != null) {
            User user = userRepository.findByUsername(entry.getUser().getUsername());
            if (user != null) {
                entry.setUser((User) user); // attach the real DB user
            } else {
                throw new RuntimeException("User not found");
            }
        }
        return entryRepository.save(entry);
    }


    @PutMapping("/{id}")
    public Entry updateEntry(@PathVariable Long id, @RequestBody Entry updatedEntry) {
        Entry entry = entryRepository.findById(id).orElseThrow();
        entry.setTitle(updatedEntry.getTitle());
        entry.setContent(updatedEntry.getContent());
        entry.setCategory(updatedEntry.getCategory());
        entry.setFavorite(updatedEntry.isFavorite());
        entry.setDate(updatedEntry.getDate());
        entry.setSource(updatedEntry.getSource());
        return entryRepository.save(entry);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        entryRepository.deleteById(id);
    }

    @GetMapping("/categories")
    public Category[] getCategories() {
        return Category.values();
    }

    @GetMapping("/user/{username}")
    public List<Entry> getEntriesByUsername(@PathVariable String username) {
        return entryRepository.findByUserUsername(username);
    }
}
