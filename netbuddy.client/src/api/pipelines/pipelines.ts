import {Sequence} from "../sequences/sequences.ts";
import agent from "../agent.ts";
import {Selector, selectorToString} from "../selectors/selectors.ts";

export type Pipeline = {
  id: string;
  sequence: Sequence;
  context: Record<string, any>;
  isRunning: boolean;
  isFinished: boolean;
};

export async function PutPipeline(pipeline: Pipeline) {
  const context: { [key: string]: string } = {};
  Object.keys(pipeline.context).forEach(key => {
    const value = pipeline.context[key];
    if ((<Selector>value).stages) context[key] = JSON.stringify(selectorToString(value));
    else context[key] = JSON.stringify(pipeline.context[key])
  });
  return await agent
  .put<string>("/execution/queue", JSON.stringify({
    ...pipeline,
    context,
    id: pipeline.id === "" ? "00000000-0000-0000-0000-000000000000" : pipeline.id
  }))
  .catch(error => console.log(error))
  .then(response => response?.data)
}