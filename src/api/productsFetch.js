import axios from 'axios';
const BASE_URL = 'https://kaaryar-ecom.liara.run';
const FETCH_PRODUCT_URL = `${BASE_URL}/v1/products`;
const FETCH_CATEGORY_URL = `${BASE_URL}/v1/categories`;
const TOP_RATEDS = `${FETCH_PRODUCT_URL}/top-rated`;
export const getTopRated = async () => {
  const TopRated = await axios.get(TOP_RATEDS);
  return TopRated?.data;
};
export const getCategorys = async () => {
  const Categorys = await axios.get(FETCH_CATEGORY_URL);
  return Categorys?.data;
};
export const fetchProducts = async ({ category, search, signal }) => {
  const response = await axios.get(FETCH_PRODUCT_URL, {
    signal,
    params: {
      page: 1,
      limit: 100,
      category,
      search,
    },
  });
  return response?.data?.products;
};
