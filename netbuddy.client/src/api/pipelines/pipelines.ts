import {Sequence} from "../sequences/sequences.ts";
import agent from "../agent.ts";

export type Pipeline = {
  id: string;
  sequence: Sequence;
  context: Record<string, any>;
  isRunning: boolean;
  isFinished: boolean;
};

export async function PutPipeline(pipeline: Pipeline) {
  return await agent
  .put<string>("/execution/queue", JSON.stringify({
    ...pipeline,
    id: pipeline.id === "" ? "00000000-0000-0000-0000-000000000000" : pipeline.id
  }))
  .catch(error => console.log(error))
  .then(response => response?.data)
}