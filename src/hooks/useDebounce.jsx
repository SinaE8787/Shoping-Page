import { useEffect, useState } from "react";

export const useDebounce = (value) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);
  return debounceValue;
};
