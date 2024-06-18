import {ReactNode} from "react";
import {InputProps} from "./types.ts";
import {UrlInput} from "./UrlInput.tsx";
import {NumberInput} from "./NumberInput.tsx";
import {StringInput} from "./StringInput.tsx";
import {BooleanInput} from "./BooleanInput.tsx";
import {SelectorInput} from "./SelectorInput.tsx";

const mapSequenceVarToInput: Record<string, (props: InputProps) => ReactNode> = {
  "String": StringInput,
  "Number": NumberInput,
  "URL": UrlInput,
  "Boolean": BooleanInput,
  "Selector": SelectorInput,
};

export default mapSequenceVarToInput;