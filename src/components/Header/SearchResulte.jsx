import { useState } from 'react';
import styles from './Header.module.css';
import ResulteCarts from './ResulteCarts';
const SearchResulte = ({ test }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const productsPerPage = 4;

  const nextPage = pageNumber * productsPerPage;
  const lastPage = nextPage - productsPerPage;
  const currentProducts = test ? test?.slice(lastPage, nextPage) : '';
  console.log(test);
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
          className={pageNumber === 1 ? styles.disabledButton : styles.button}
        >
          Prev
        </button>
        <button
          onClick={() => paginate(pageNumber + 1)}
          disabled={nextPage >= test?.length}
          className={nextPage >= test?.length ? styles.disabledButton : styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResulte;
