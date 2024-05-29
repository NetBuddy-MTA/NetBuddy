import Stack from "@mui/material/Stack";
import {Selector} from "../../../api/selectors/selectors.ts";
import AttributeItem from "./AttributeItem.tsx";

export type AttributeListProps = {
  stageIndex?: number;
  selector?: Selector
  setSelector: (selector?: Selector) => void;
};

const AttributeList = (props: AttributeListProps) => {
  const {selector, setSelector, stageIndex} = props;

  const generateSetValue = (key: string) => (value: string) => {
    selector && setSelector({
      ...selector,
      stages: selector.stages.map((stage, index) => index === stageIndex ? {
        ...stage,
        attributes: {...stage.attributes, [key]: value}
      } : stage)
    });
  }

  const generateSetInUse = (key: string) => (inUse: boolean) => {
    selector && setSelector({
      ...selector,
      stages: selector.stages.map((stage, index) => index === stageIndex ? {
        ...stage,
        useAttributes: {...stage.useAttributes, [key]: inUse}
      } : stage)
    });
  };

  return (
    <Stack direction="column" padding={1} spacing={1}>
      {
        selector !== undefined && stageIndex !== undefined && selector.stages[stageIndex] !== undefined ?
          Object.keys(selector.stages[stageIndex].attributes).map(key => {
            const stage = selector.stages[stageIndex];
            return (
              <AttributeItem
                name={key}
                value={stage.attributes[key]}
                inUse={stage.useAttributes[key]}
                setValue={generateSetValue(key)}
                setInUse={generateSetInUse(key)}
              />
            );
          }) :
          null
      }
    </Stack>
  );
};

export default AttributeList;