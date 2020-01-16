import React, { useEffect, useState } from 'react';
import './App.css';

function Field({ title, value, onChange }) {
  const handleInputChange = event => onChange(event.target.value);
  return (
    <p>
      <b>{title}: </b>
      {onChange ?
        <input value={value} onChange={handleInputChange} /> :
        <span>{value}</span>}
    </p>
  )
}

function AddingBook({ onAdd }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const handleAdd = () => {
    const nameValue = name ? name : undefined;
    const authorValue = author ? author : undefined;
    const yearValue = !year || isNaN(+year) || year > 3000 || year < 0 ? undefined : year;
    if (nameValue || authorValue || yearValue) {
      onAdd({ name: nameValue, author: authorValue, year: yearValue });
      setName("");
      setAuthor("");
      setYear("");
    }
  };
  return (
    <>
      <h2>Adding book:</h2>
      <Field title="Name" value={name} onChange={setName} />
      <Field title="Author" value={author} onChange={setAuthor} />
      <Field title="Year" value={year} onChange={setYear} />
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

function Cell({ value, edit, onChange }) {
  const handleInputChange = event => onChange(event.target.value);
  return edit ?
    <input value={value} onChange={handleInputChange} /> :
    <span>{value}</span>
}

function BookTable({ value, onDelete, onEdit }) {
  const [index, setIndex] = useState();
  const [book, setBook] = useState({});
  const handleClickSaveButton = (id, key) => () => {
    onEdit(id, book, key);
    setIndex(undefined);
    setBook({});
  };
  const handleClickEditButton = index => () => {
    setIndex(index);
    setBook({ ...value[index] });
  };
  const handleChangeName = name => setBook({ ...book, name });
  const handleChangeAuthor = author => setBook({ ...book, author });
  const handleChangeYear = year => setBook({ ...book, year });
  return (
    <>
      <h2>Book list:</h2>
      <table>
        <thead>
        <tr>
          <td>Name</td>
          <td>Author</td>
          <td>Year</td>
          <td>Actions</td>
        </tr>
        </thead>
        <tbody>
        {value.map(({ id, name, author, year }, key) => (
          <tr key={key}>
            <td>
              <Cell
                value={index === key ? book.name : name}
                edit={index === key}
                onChange={handleChangeName}
              />
            </td>
            <td>
              <Cell
                value={index === key ? book.author : author}
                edit={index === key}
                onChange={handleChangeAuthor}
              />
            </td>
            <td>
              <Cell
                value={index === key ? book.year : year}
                edit={index === key}
                onChange={handleChangeYear}
              />
            </td>
            <td>
              {index === key &&
              <button onClick={handleClickSaveButton(id, key)}>Save</button>}
              {index === undefined &&
              <button onClick={handleClickEditButton(key)}>Edit</button>}
              <button onClick={onDelete(id)}>Remove</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

function App({ api = 'http://localhost:8080' }) {
  const [books, setBooks] = useState([]);
  const handleAddBook = book => {
    fetch(api + '/books', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(book => setBooks([...books, book]))
      .catch(e => console.error('Error of books fetching', e));
  };
  const handleDelete = bookId => () => {
    fetch(`${api}/books/${bookId}`, {
      method: 'DELETE'
    })
      .then(() => setBooks([...books.filter(({ id }) => id !== bookId)]))
      .catch(e => console.error("Error of book deleting", e));
  };
  const handleUpdate = (bookId, book, bookIndex) => {
    fetch(`${api}/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(book => {
        const target = [...books];
        target[bookIndex] = book;
        setBooks(target);
      })
      .catch(e => console.error('Error of book update', e));
  };
  useEffect(() => {
    fetch(`${api}/books`)
      .then(response => response.json())
      .then(books => setBooks([...books]))
      .catch(e => console.error('Error of books fetching', e));
  }, [api]);
  return (
    <div>
      <h1>Books</h1>
      <AddingBook onAdd={handleAddBook} />
      <hr />
      <BookTable value={books} onDelete={handleDelete} onEdit={handleUpdate} />
    </div>
  );
}

export default App;
