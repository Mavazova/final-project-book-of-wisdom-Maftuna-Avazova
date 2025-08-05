package com.bookwisdom.backend.repository;

import com.bookwisdom.backend.model.Reflection;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReflectionRepository extends JpaRepository<Reflection, Long> {
    List<Reflection> findByUserUsername(String username);

}
