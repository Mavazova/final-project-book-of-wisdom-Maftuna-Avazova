package com.bookwisdom.backend.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.Setter;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reflection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String mood;
    private LocalDateTime date;


    private String note;




    @ManyToOne // ✅ New: Link reflection to a user
    @JoinColumn(name = "user_id")
    private User user;


    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public String getMood() {
        return mood;
    }
    public void setMood(String mood) {
        this.mood = mood;
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }




    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
