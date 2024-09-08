import agent from "../agent.ts";

export type DisplayPreset = {
  id: string;
  name: string;
  description: string;
}

export type Preset = DisplayPreset & {
  sequenceId: string;
  context: Record<string, string>;
};

export async function GetPresets(sequenceId: string) {
  return agent.get<DisplayPreset[]>(`/execution/presets/${sequenceId}`)
  .catch(error => console.log(error))
  .then(response => response?.data);
}

export async function GetPreset(presetId: string) {
  return agent.get<Preset>(`/execution/presets/get/${presetId}`)
  .catch(error => console.log(error))
  .then(response => response?.data);
}

export async function PutPreset(preset: Preset) {
  return agent.put("/execution/presets/save", JSON.stringify({
    ...preset,
    id: preset.id === "" ? "00000000-0000-0000-0000-000000000000" : preset.id
  }));
}

export async function DeletePreset(presetId: string) {
  return agent.delete(`/execution/presets/delete/${presetId}`);
}