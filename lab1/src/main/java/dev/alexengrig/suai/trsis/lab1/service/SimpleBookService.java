package dev.alexengrig.suai.trsis.lab1.service;

import dev.alexengrig.suai.trsis.lab1.domain.Book;
import dev.alexengrig.suai.trsis.lab1.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SimpleBookService implements BookService {
    private final BookRepository bookRepository;

    @Override
    public Book add(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Optional<Book> getById(Integer bookId) {
        return bookRepository.findById(bookId);
    }

    @Override
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book updateById(Integer bookId, Book book) {
        book.setId(bookId);
        return bookRepository.save(book);
    }

    @Override
    public void removeById(Integer bookId) {
        bookRepository.deleteById(bookId);
    }
}
