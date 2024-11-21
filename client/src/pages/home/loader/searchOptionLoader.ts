import { LoaderFunctionArgs } from "react-router-dom";

export const searchOptionLoader =
  () =>
  ({ request }: LoaderFunctionArgs<any>) => {
    const url = new URL(request.url);

    return {
      sort: url.searchParams.get("sort"),
      categories: url.searchParams.getAll("categories"),
    };
  };
