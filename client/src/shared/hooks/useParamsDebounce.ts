import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useParamsDebounce = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 
  const [value, setValue] = useState<string>(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate로 쿼리 매개변수를 설정하며 replace 옵션 사용
      const params = new URLSearchParams(searchParams);
      params.set("q", value);
      navigate(`?${params.toString()}`, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [value, searchParams, navigate]);

  const onChangeRecipeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  return { value, onChangeRecipeSearch };
};
