import axios from "axios";
const BASE_URL = "https://kaaryar-ecom.liara.run/v1/products";
export const getTopRated = async () => {
    const TopRated = await axios
      .get(`${BASE_URL}/top-rated`);
      return TopRated?.data
  };
 export const getCategorys = async () => {
    const Categorys = await axios
      .get(`https://kaaryar-ecom.liara.run/v1/categories`);
      return Categorys?.data
  };
 export const fetchProducts = async ({ category , query , signal }) => {
    const response = await axios.get(BASE_URL, {
      signal,
      params: {
        page: 1,
        limit: 100,
        category: category || undefined,
        search: query || undefined,
      },
    });
    return response?.data;
  };
export const searchProducts = async ({ debounceSearcher }) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await axios.get(BASE_URL,{ signal , params :{
      page: 1,
      limit: 100,
      search : debounceSearcher || ""
    } }
    );
    controller.abort();
    return response?.data?.products
  };
  