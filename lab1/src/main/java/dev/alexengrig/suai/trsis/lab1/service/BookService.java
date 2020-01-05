package dev.alexengrig.suai.trsis.lab1.service;

import dev.alexengrig.suai.trsis.lab1.domain.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    Book add(Book book);

    Optional<Book> getById(Integer bookId);

    List<Book> getAll();

    Book updateById(Integer bookId, Book book);

    void removeById(Integer bookId);
}
