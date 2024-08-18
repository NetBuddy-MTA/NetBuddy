import { useCallback, useEffect, useRef, useState } from 'react';

type Pagination<T> = {
  totalCount: number;
  results: T[];
}

export function usePagination<T>(
  fetchRequest: (from: number, to: number) => Promise<Pagination<T>>,
  pageSize: number = 10,
  firstPage: number = 0,
  parseResult?: (value: any) => Promise<T> | T,
  filterResult?: (result: T) => boolean,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [results, setResults] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0)
  
  const isDataFetched = useRef(false);

  const loadResults = useCallback(
    async (pageNumber: number) => {
      try {
        setIsLoading(true);
        
        const from = pageNumber * pageSize;
        const to = from + pageSize;
        const res = await fetchRequest(from , to);

        const promiseParsedResults = parseResult
          ? res.results?.map(parseResult)
          : res.results;
        const parsedResults = await Promise.all(promiseParsedResults);
        const filteredResults = filterResult
          ? parsedResults?.filter(filterResult)
          : parsedResults;
        
        setTotalCount(res.totalCount ?? filteredResults?.length);
        
        setResults(filteredResults);
        setError(undefined);
      } catch (e) {
        console.error(e);
        setError('error has happened');
      }
      finally {
        setIsLoading(false);
      }
    },
    [fetchRequest, parseResult],
  );

  useEffect(() => {
    if (!isDataFetched.current) loadResults(firstPage);
    isDataFetched.current = true;
  }, []);

  return { isLoading, error, results, loadMore: (pageNumber: number) => loadResults(pageNumber), totalCount };
}