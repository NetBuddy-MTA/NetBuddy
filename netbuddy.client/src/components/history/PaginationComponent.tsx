import {useEffect, useRef} from 'react';
import {SequenceResult} from "../../api/history/history.ts";

interface PaginationComponentProps {
  getResults: (from: number, to: number) => Promise<SequenceResult[]>;
  pageSize?: number;
  firstPage?: number;
  onLoadMore: (results: SequenceResult[]) => void;
  setIsLoading: (loading: boolean) => void;
  setTotalCount: (count: number) => void;
  getCount: () => Promise<number>;
  onLoadMoreRef: (loadMore: (pageNumber: number) => Promise<void>) => void;
}

const PaginationComponent = ({
                               getResults,
                               getCount,
                               pageSize = 10,
                               firstPage = 0,
                               onLoadMore,
                               setIsLoading,
                               setTotalCount,
                               onLoadMoreRef,
                             }: PaginationComponentProps) => {
  const isDataFetched = useRef(false);

  const loadResults = async (pageNumber: number) => {
    try {
      setIsLoading(true);

      const from = pageNumber * pageSize;
      const to = from + pageSize;
      const results = await getResults(from, to);
      onLoadMore(results);
      setTotalCount(await getCount());

    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isDataFetched.current) loadResults(firstPage);
    isDataFetched.current = true;

    onLoadMoreRef(loadResults);
  }, []);

  return null;
};

export default PaginationComponent;
