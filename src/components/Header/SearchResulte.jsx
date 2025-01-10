import { useEffect, useState } from 'react';
import ResulteCarts from './ResulteCarts';
import styles from './Header.module.css';
const SearchResulte = ({ test }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setProductsPerPage(4);
      } else if (window.innerWidth < 769) {
        setProductsPerPage(3);
      } else {
        setProductsPerPage(4);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const nextPage = pageNumber * productsPerPage;
  const lastPage = nextPage - productsPerPage;
  const currentProducts = test ? test?.slice(lastPage, nextPage) : '';
  const paginate = (pageNumber) => setPageNumber(pageNumber);
  return (
    <div className={styles.SearchResulteContainer}>
      {currentProducts?.length > 1 ? (
        <ul className={styles.productsList}>
          {currentProducts?.map((product) => (
            <ResulteCarts key={product._id} {...product} />
          ))}
        </ul>
      ) : (
        <div className={styles.notFound}>The product you are looking for was not found !</div>
      )}
      <div className={styles.pagination}>
        <button
          onClick={() => paginate(pageNumber - 1)}
          disabled={pageNumber === 1}
          className={pageNumber === 1 ? styles.disabledButton : styles.paginationBtn}
          type="button"
        >
          Prev
        </button>
        <button
          onClick={() => paginate(pageNumber + 1)}
          disabled={nextPage >= test?.length}
          className={nextPage >= test?.length ? styles.disabledButton : styles.paginationBtn}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResulte;
