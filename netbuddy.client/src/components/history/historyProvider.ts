import agent from '../../api/agent.ts';
import {PastSequence} from "../../api/sequences/sequences.ts";

type HistoryData = {
  totalCount: number;
  results: PastSequence[];
}

export const getHistory = async (from: number, to: number): Promise<HistoryData> => {
  return (await agent.get(`history/range?from=${from}&to=${to}`)).data;
}