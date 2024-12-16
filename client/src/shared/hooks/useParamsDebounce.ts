import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useParamsDebounce = (queryString: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(
    searchParams.get(queryString) || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      searchParams.set(queryString, value);
      setSearchParams(searchParams, {replace: true});
    }, 500);

    return () => clearTimeout(timer);
  }, [value, queryString, searchParams, setSearchParams]);

  const onChangeRecipeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  return {
    query: searchParams.get(queryString) || "",
    value,
    onChangeRecipeSearch,
  };
};
