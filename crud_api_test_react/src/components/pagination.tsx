import { Todo } from "../service/models";

interface Props {
  todos: Todo[];
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination = ({
  todos,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: Props) => {
  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const maxPageNumbersToShow = 5; // Limit the number of pages to show in the pagination bar
  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevious}>
              Previous
            </button>
          </li>

          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const page = startPage + index;
            return (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
