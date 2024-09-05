import agent from "../agent.ts";
import {Action} from "../actions/actions.ts";

export type SequenceResult = {
  id: string;
  sequenceId: string;
  startAt: Date;
  endAt: Date;
  results: ActionResult[];
}

export type ActionResult = {
  action: Action;
  startAt: Date;
  endAt: Date;
  actionContext: Record<string, string>;
  actionLogs: { key: string, value: string }[];
  actionOutputs: Record<string, string>;
};

export async function GetResultRange(from: number, to: number) {
  return await agent
  .get<SequenceResult[]>(`/history/range?from=${from}&to=${to}`)
  .then(response => response?.data);
}

export async function GetResultCount() {
  return await agent
  .get<{ count: number }>("history/count")
  .then(response => response?.data.count);
}