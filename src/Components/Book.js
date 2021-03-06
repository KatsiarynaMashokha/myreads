import React, { Component } from "react";
import "../App.css";
import PropTypes from "prop-types";

class Book extends Component {
  render() {
    const { currentBook } = this.props
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  currentBook.imageLinks &&
                  currentBook.imageLinks.thumbnail
                    ? `${currentBook.imageLinks.thumbnail}`
                    : `https://placeholdit.co//i/128x193?`
                })`
              }}
            >
              <div className="book-shelf-changer">
                <select
                  value={
                    currentBook.shelf
                      ? currentBook.shelf
                      : "noneSelected"
                  }
                  onChange={e =>
                    this.props.onChangeShelf(
                      currentBook,
                      e.target.value
                    )
                  }
                >
                  <option value="none" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="noneSelected">None</option>
                </select>
              </div>
            </div>
          </div>
          <div className="book-title">{currentBook.title}</div>
          <div className="book-authors">{Array.isArray(currentBook.authors) ? currentBook.authors.join(', ') : ''}</div>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  currentBook: PropTypes.object
};

export default Book;
