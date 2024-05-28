import agent from "../agent.ts";

export type Selector = {
  id: string;
  url: string;
  name: string;
  stages: SelectorStage[];
};

export type SelectorStage = {
  tag: string;
  attributes: { [key: string]: string };
  useAttributes: { [key: string]: boolean };
  inUse: boolean;
};

export function selectorToString(selector: Selector): string {
  let selectorString = "";
  let prevInUse = false;
  for (const stage of selector.stages) {
    // if the stage is not in use, skip it and set the prevInUse flag to false
    if (!stage.inUse) {
      prevInUse = false;
      continue;
    }
    // initialize the stage string according to the context
    let stageString = prevInUse ? " > " : (selectorString === "" ? "" : " ");
    // set the prevInUse flag to true
    prevInUse = true;
    // add the tag to the stage string
    stageString += stage.tag;
    // add the attributes in use to the stage string
    for (const key in stage.attributes) {
      if (!stage.useAttributes[key]) continue;
      stageString += `[${key}="${stage.attributes[key]}"]`;
    }

    // add the stage string to the selector string
    selectorString += stageString;
  }
  return selectorString;
}

export async function GetUrls() {
  return await agent
  .get<string[]>("/selectors/urls")
  .then(resp => resp.data);
}

export async function GetSelectorsForUrl(url: string) {
  return await agent
  .post<Selector[]>("/selectors", url)
  .then(resp => resp.data);
}

export async function GetAllSelectors() {
  return await agent
  .get<Selector[]>("/selectors/all")
  .then(resp => resp.data);
}

export async function DeleteSelector(id: string) {
  return await agent
  .delete<string>("/selectors", {data: id})
  .then(resp => resp.data);
}

export async function SaveSelector(selector: Selector) {
  return await agent
  .put<string>("/selectors", selector)
  .then(resp => resp.data);
}