import React, { useState, useEffect } from 'react';
import AuthorForm from './AuthorForm';
import { getAuthors, deleteAuthor } from '../Service/authorService';
import './AuthorList.css';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(3); // Số lượng tác giả trên mỗi trang

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to fetch authors', error);
    }
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      loadAuthors();
    } catch (error) {
      console.error('Failed to delete author', error);
    }
  };

  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    loadAuthors();
  };

  // Logic phân trang
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="author-container">
      <h1>Author Management</h1>
      <button className="author-button-add" onClick={handleAddAuthor}>
        Add Author
      </button>
      {showForm && <AuthorForm author={editingAuthor} onSave={handleFormClose} />}
      <table className="author-table">
        <thead>
          <tr>
            <th>Author Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Year of Birth</th>
            <th>Gender</th>
            <th>Published Books</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAuthors.map((author) => (
            <tr key={author.author_id}>
              <td>{author.author_name}</td>
              <td>{author.description}</td>
              <td>{author.address}</td>
              <td>{author.year_of_birth}</td>
              <td>{author.gender}</td>
              <td>{author.published_book}</td>
              <td><img src={author.url_img} alt="Author" className="author-image" /></td>
              <td>
                <button className="author-button-edit" onClick={() => handleEdit(author)}>
                  Edit
                </button>
                <button className="author-button-delete" onClick={() => handleDelete(author.author_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Phân trang */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(authors.length / authorsPerPage) }, (_, index) => (
          <li key={index} className="page-item">
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
