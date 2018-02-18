import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class BookSearch extends Component {
  state = {
    query: "",
    foundBooks: []
  };

  handleInput = query => {
    this.setState({ query });
    this.getSearchResults(query);
  };

  getSearchResults = query => {
    if (!query) {
      this.setState({ foundBooks: [] });
      return;
    }

    BooksAPI.search(query).then(results => {
      if (results && !results.error) {
        this.props.books.forEach(book => {
          results.map(foundBook => {
            if (book.id === foundBook.id) {
              foundBook.shelf = book.shelf;
            }
          });
        });
        this.setState({ foundBooks: results });
      } else {
        this.setState({ foundBooks: [] });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={event => this.handleInput(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.map(book => (
              <Book
                currentBook={book}
                key={book.id}
                onChangeShelf={this.props.onChangeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookSearch.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default BookSearch;
