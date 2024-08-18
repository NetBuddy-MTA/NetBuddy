import {useCallback, useEffect, useRef, useState} from 'react';
import {SequenceResult} from "../../api/history/history.ts";

export function usePagination(
  getResults: (from: number, to: number) => Promise<SequenceResult[]>,
  getCount: () => Promise<number>,
  pageSize: number = 10,
  firstPage: number = 0
) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SequenceResult[]>([]);
  const [count, setCount] = useState<number>(0)

  const isDataFetched = useRef(false);

  const loadResults = useCallback(
    async (pageNumber: number) => {
      try {
        setIsLoading(true);

        const from = pageNumber * pageSize;
        const to = from + pageSize;
        const results = await getResults(from, to);
        const totalCount = await getCount();

        setCount(totalCount);
        setResults(results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [getResults, getCount],
  );

  useEffect(() => {
    if (!isDataFetched.current) loadResults(firstPage);
    isDataFetched.current = true;
  }, []);

  return {isLoading, results, loadMore: (pageNumber: number) => loadResults(pageNumber), totalCount: count};
}