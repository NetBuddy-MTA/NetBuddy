import agent from "../agent.ts";

export type SequenceDisplay = {
  id: string;
  name: string;
  description: string;
};

export type SequenceVariable = {
  id: string;
  originalName: string;
  name: string;
  description: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
};

export type ExecutableAction = {
  id: string;
  actionString: string;
  inputs: SequenceVariable[];
  outputs: SequenceVariable[];
};

export type Sequence = SequenceDisplay & { actions: ExecutableAction[] };

export async function GetSequencesDisplay() {
  return await agent
  .get("execution/sequences")
  .catch((error) => console.log(error.error))
  .then((response) => response?.data as SequenceDisplay[]);
}

export async function GetExecutableSequence(id: string) {
  return await agent
  .get(`execution/sequences/${id}`)
  .catch((error) => console.log(error.error))
  .then((response) => response?.data as Sequence);
}

export async function SaveExecutableSequence(sequence: Sequence) {
  return await agent
  .put("/execution/sequences", JSON.stringify({
    ...sequence,
    id: sequence.id === "" ? "00000000-0000-0000-0000-000000000000" : sequence.id
  }))
  .catch((error) => console.log(error.error))
  .then((response) => response?.data as { id: string; errors: string[] });
}
