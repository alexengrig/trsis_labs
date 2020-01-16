package dev.alexengrig.suai.trsis.lab4.repository;

import dev.alexengrig.suai.trsis.lab4.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
}
