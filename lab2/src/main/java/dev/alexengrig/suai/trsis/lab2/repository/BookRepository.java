package dev.alexengrig.suai.trsis.lab2.repository;

import dev.alexengrig.suai.trsis.lab2.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
}
