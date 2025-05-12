import "./PagedListStyle.scss";
import { useState } from "react";
import SearchIcon from "../../assets/images/search-icon.svg";
import ArrowLeft from "../../assets/images/arrowleft.svg";
import ArrowRight from "../../assets/images/arrowright.svg";
import PagedListProps from "../../interfaces/HistoryPageInterface";
import { useLanguage } from "../../services/LanguageService";

function PagedList<T>({ items, columns, filterOn }: PagedListProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { content } = useLanguage();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  if (!items) {
    return <p>Det finns inget att visa ännu, kom tillbaka senare</p>;
  }

  const filteredItems = items.filter((item) =>
    filterOn == null
      ? true
      : filterOn.some((x) => x(item).includes(searchTerm)),
  );

  const itemsOnPage = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const lastPage = Math.ceil(filteredItems.length / itemsPerPage); //calculate how many pages

  function getPaginationItems(
    currentPage: number,
    lastPage: number,
    maxLength: number,
  ): Array<number | string> {
    const res: Array<number | string> = [];
    const firstPage = 1;

    // If total pages less than maxLength, show all
    if (lastPage <= maxLength) {
      for (let i = firstPage; i <= lastPage; i++) {
        res.push(i);
      }
      return res;
    }

    const previousPage = Math.max(firstPage, currentPage - 1);
    const nextPage = Math.min(lastPage, currentPage + 1);

    if (previousPage > firstPage) res.push(previousPage);
    res.push(currentPage);
    if (nextPage < lastPage) res.push(nextPage);

    return res;
  }

  return (
    <section className="history__wrap">
      {/* Search + Filter form */}
      <form className="search__filter">
        <div className="search">
          <img
            src={SearchIcon}
            className="search__icon"
            alt={content.history_searchIcon}
          />
          <input
            className="search__input"
            type="search"
            aria-label={content.history_searchInput}
            name="eventSearch"
            placeholder={content.history_search}
            value={searchTerm}
            data-testid="search-input"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </div>
      </form>
      <section className="history">
        <div className="history__columns">
          {columns.map((column, index) => (
            <p key={index}>{column.title}</p>
          ))}
        </div>
        <div className="history__rows">
          {itemsOnPage.map((item, index) => (
            <article key={index} className="event__row">
              {columns.map((column) => (
                <p key={column.title} className={column.className}>
                  {column.selector(item)}
                </p>
              ))}
            </article>
          ))}
        </div>

        <nav className="pagination" aria-label={content.history_pagination}>
          {/* Previous button */}
          <button
            className="page-link previous"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <img src={ArrowLeft} alt={content.history_arrowLeft} />
            <span>{content.history_previous}</span>
          </button>
          <section className="pages">
            {getPaginationItems(currentPage, lastPage, 5).map((item, idx) =>
              typeof item === "number" ? (
                <button
                  key={idx}
                  className={`page-link ${item === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              ) : (
                <span key={idx} className="ellipsis">
                  ...
                </span>
              ),
            )}
          </section>
          <button
            className="page-link next"
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <span>{content.history_next}</span>
            <img src={ArrowRight} alt={content.history_arrowRight} />
          </button>
        </nav>
      </section>
    </section>
  );
}

export default PagedList;
