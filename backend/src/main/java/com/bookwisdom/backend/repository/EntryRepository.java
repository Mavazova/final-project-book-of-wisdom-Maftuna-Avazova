package com.bookwisdom.backend.repository;

import com.bookwisdom.backend.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByUserUsername(String username);
    Entry findTopByUserUsernameOrderByDateDesc(String username);

}
