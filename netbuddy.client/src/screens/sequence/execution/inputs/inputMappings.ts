import { SequenceVariableType } from "../../../../api/sequences/sequences.ts";
import { ReactNode } from "react";
import { InputProps } from "./types.ts";
import { UrlInput } from "./UrlInput.tsx";
import { NumberInput } from "./NumberInput.tsx";
import { StringInput } from "./StringInput.tsx";
import { BooleanInput } from "./BooleanInput.tsx";
import { UnknownInput } from "./UnknownInput.tsx";
import {OptionsInput} from "./OptionsInput.tsx";

const mapSequenceVarToInput: Record<SequenceVariableType, (props: InputProps) => ReactNode> = {
  "String": StringInput,
  "Number": NumberInput,
  "URL": UrlInput,
  "Boolean": BooleanInput,
  "?": UnknownInput,
  "Element": UnknownInput,
  "Element[]": UnknownInput,
  "Selector": UnknownInput,
  "Variable": UnknownInput,
  "HttpResponse": UnknownInput,
  "Tab": OptionsInput,
  "Window": OptionsInput,
};

export default mapSequenceVarToInput;