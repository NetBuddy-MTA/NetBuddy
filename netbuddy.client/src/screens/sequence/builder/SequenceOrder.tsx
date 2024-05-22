import {useState, useCallback, useEffect } from "react";
import { Action, Variable } from "../../../api/actions/actions.ts";
import { ExecutableAction, SequenceVariable } from "../../../api/sequences/sequences.ts";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { PointerSensor } from '@dnd-kit/core';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {jsx} from "@emotion/react";
import JSX = jsx.JSX;

export class SmartPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown",
      handler: ({nativeEvent: event}: PointerEvent) => {
        return !(!event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target as Element));
      },
    },
  ];
}

function isInteractiveElement(element: Element | null) {
  const interactiveElements = [
    "path",
    "svg",
    "button",
    "input",
    "textarea",
    "select",
    "option",
  ];
  return !!(element?.tagName &&
    interactiveElements.includes(element.tagName.toLowerCase()));
}

// the compiler doesn't like the use of the SmartPointerSensor class, but the compiled code works fine *shrug*
const sensors = useSensors(
  useSensor(SmartPointerSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
);

const SequenceOrder = (props: {
  actionStringToAction: { [key: string]: Action },
  actionsToAdd: Action[],
  setActionsToAdd: (actions: Action[]) => void,
  executableActions: ExecutableAction[],
  setExecutableActions: (actions: ExecutableAction[] | ((prev: ExecutableAction[]) => ExecutableAction[])) => void
}) => {
  const {
    actionStringToAction,
    actionsToAdd, setActionsToAdd,
    executableActions, setExecutableActions
  } = props;

  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);

  useEffect(() => {
    const action = actionsToAdd.shift();
    if (!action) return;
    setExecutableActions([...executableActions, actionToExecutable(action)]);
    setActionsToAdd([...actionsToAdd]);
  }, [actionsToAdd]);

  function actionToExecutable(action: Action): ExecutableAction {
    const actionVariableToSequenceVariable = (actVar: Variable): SequenceVariable => ({
      id: "",
      name: "",
      originalName: actVar.name,
      description: actVar.description,
      type: actVar.type,
      optional: actVar.optional
    });

    return {
      id: Math.random().toString(),
      actionString: action.actionString,
      inputs: action.inputs.map(actionVariableToSequenceVariable),
      outputs: action.outputs.map(actionVariableToSequenceVariable)
    };
  }

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.activatorEvent.target !== event.activatorEvent.currentTarget) return;
    const {active, over} = event;
    if (active.id !== over?.id) {
      const oldIndex = executableActions.findIndex(action => action.id === active.id);
      const newIndex = executableActions.findIndex(action => action.id === over?.id);
      setExecutableActions(arrayMove(executableActions, oldIndex, newIndex));
    }
  };

  const handleDelete = (action: ExecutableAction) => {
    return (event: React.MouseEvent) => {
      event.stopPropagation();
      setExecutableActions((actions: ExecutableAction[]) => actions.filter(item => item.id !== action.id));
    }
  };
  const handleSelectionChange = (event) => {
    const selectedId = event.target.value;
    setSelectedActionId(selectedId);
    const selectedAction = executableActions.find(action => action.id === selectedId);
  };
  
  return (
    <Box m={1} p={1}>
      <Paper elevation={4}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={executableActions.map(action => action.id)}
            strategy={verticalListSortingStrategy}
          >
            <RadioGroup
              value={selectedActionId}
              onChange={ handleSelectionChange }
            >
              <Grid container spacing={2} direction="column">
                {executableActions.map((action, index) => (
                  <SortableItem key={`${action.id}-${index}`} id={action.id}>
                    <Grid item>
                      <Box m={0.5} p={0.5}>
                        <Paper elevation={12}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <FormControlLabel
                              value={action.id}
                              control={<Radio />}
                              label={
                                <Typography variant="h5" component="span">
                                  {actionStringToAction[action.actionString].displayName}
                                </Typography>
                              }
                            />
                            <IconButton onClick={handleDelete(action)}><DeleteIcon /></IconButton>
                          </Grid>
                        </Paper>
                      </Box>
                    </Grid>
                  </SortableItem>
                ))}
              </Grid>
            </RadioGroup>
          </SortableContext>
        </DndContext>
      </Paper>
    </Box>
  );
}

const SortableItem = ({id, children}: { id: string, children: JSX.Element }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  );
};

export default SequenceOrder;
