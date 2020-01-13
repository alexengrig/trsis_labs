package dev.alexengrig.suai.trsis.lab1.controller;

import dev.alexengrig.suai.trsis.lab1.domain.Book;
import dev.alexengrig.suai.trsis.lab1.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    public String getBooks(Model model) {
        model.addAttribute("books", bookService.getAll());
        return "open-books";
    }

    @PostMapping("/add")
    public String addBook(Book book, Model model) {
        Book addedBook = bookService.add(book);
        model.addAttribute("book", addedBook);
        return "add-book";
    }

    @GetMapping("/open/{id:\\d+}")
    public String getBook(@PathVariable("id") Integer id, Model model) {
        Optional<Book> book = bookService.getById(id);
        //noinspection OptionalIsPresent
        if (book.isPresent()) {
            model.addAttribute("book", book.get());
        }
        return "open-book";
    }

    @GetMapping("/edit/{id}")
    public String editBook(@PathVariable("id") Integer id, Model model) {
        getBook(id, model);
        return "edit-book";
    }

    @PostMapping("/update/{id}")
    public String updateBook(@PathVariable("id") Integer id, Book book, Model model) {
        Book updatedBook = bookService.updateById(id, book);
        model.addAttribute("book", updatedBook);
        model.addAttribute("message", "Book is updated!");
        return "edit-book";
    }

    @GetMapping("/remove/{id}")
    public String removeBook(@PathVariable("id") Integer id, Model model) {
        Optional<Book> book = bookService.getById(id);
        if (book.isPresent()) {
            model.addAttribute("book", book.get());
            bookService.removeById(id);
        }
        return "remove-book";
    }
}
