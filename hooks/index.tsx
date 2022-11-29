import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useGetLayoffData = () => {
  const { data, error } = useSWR("/api/layoffs", fetcher);

  return {
    ...data,
    isLoading: !error && !data,
    isError: error,
  };
};
