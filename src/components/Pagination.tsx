import React from "react";

import "./Pagination.css";

interface PaginationProps {
  mediaPerPage: number;
  totalMedia: number;
  currentPage: number;
  paginate: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  mediaPerPage,
  totalMedia,
  currentPage,
  paginate,
}) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalMedia / mediaPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.length > 1 ? (
    <div className="pagination-container">
      <div className="pagination">
        <a
          href="!#"
          className={currentPage === 1 ? "disabled" : ""}
          onClick={() => paginate(currentPage - 1)}
        >
          &larr;
        </a>
        {pageNumbers.map((number) => (
          <a
            href="!#"
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => paginate(number)}
          >
            {number}
          </a>
        ))}
        <a
          href="!#"
          className={currentPage === pageNumbers.length ? "disabled" : ""}
          onClick={() => paginate(currentPage + 1)}
        >
          &rarr;
        </a>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Pagination;
