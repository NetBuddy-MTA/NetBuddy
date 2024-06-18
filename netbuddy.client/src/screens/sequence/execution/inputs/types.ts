export type InputProps<T = any> = {
  title: string;
  setValue: (value: T) => void;
  required: boolean;
  defaultValue?: T;
  options: string[];
  disabled: boolean;
  isArr: boolean;
}