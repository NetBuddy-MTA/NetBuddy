import {useCallback, useEffect, useRef, useState} from 'react';
import {SequenceResult} from "../../api/history/history.ts";
import {GetExecutableSequence, Sequence} from "../../api/sequences/sequences.ts";

export function usePagination(
  getResults: (from: number, to: number) => Promise<SequenceResult[]>,
  getCount: () => Promise<number>,
  pageSize: number = 10,
  firstPage: number = 0,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<Sequence & SequenceResult>>([]);
  const [count, setCount] = useState<number>(pageSize)

  const isDataFetched = useRef(false);

  const loadResults = useCallback(
    async (pageNumber: number) => {
      try {
        setIsLoading(true);

        const from = pageNumber * pageSize;
        const to = from + pageSize;
        setCount(await getCount());
        const data = (await getResults(from, to));
        
        const r = await Promise.all(data.map(async (sequence)  =>
          ({...sequence, ...await GetExecutableSequence(sequence.sequenceId)})
        )); 
        setResults(r);
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