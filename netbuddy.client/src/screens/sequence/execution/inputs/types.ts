export const INPUTS_TYPES = ["string", "number", "url", "boolean" , "unknown"] as const;
export type InputType = typeof INPUTS_TYPES[number];

export type InputProps<T = any> = {
  title: string;
  onChange: (field: string, value: T) => void;
  // onChange: (action: string, inputString: string, value: T) => void;
  required: boolean;
  defaultValue?: T;
  field: string;
  options: string[];
  disabled: boolean;
  isArr: boolean;

  // action: string;
  // inputString: string
}

