import React, { useEffect } from 'react';

const Pagination = ({ todosPerPage, totalTodos, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className=" fixed bottom-4 right-1/2">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item mx-0.5">
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              } hover:bg-blue-400 hover:text-white px-3 py-1 border rounded`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
