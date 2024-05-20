import { useCallback, useEffect } from "react";
import { Action, Variable } from "../../../api/actions/actions.ts";
import { ExecutableAction, SequenceVariable } from "../../../api/sequences/sequences.ts";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DndContext,
  closestCenter,
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
import { CSS } from "@dnd-kit/utilities";

const SequenceOrder = (props: {
  actionStringToAction: { [key: string]: Action },
  actionsToAdd: Action[], setActionsToAdd: (actions: Action[]) => void,
  executableActions: ExecutableAction[], setExecutableActions: (actions: ExecutableAction[] | ((prev:ExecutableAction[])=>ExecutableAction[])) => void
}) => {
  const {
    actionStringToAction,
    actionsToAdd, setActionsToAdd,
    executableActions, setExecutableActions
  } = props;

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
      id: `${Math.random()}`,
      actionString: action.actionString,
      inputs: action.inputs.map(actionVariableToSequenceVariable),
      outputs: action.outputs.map(actionVariableToSequenceVariable)
    };
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = executableActions.findIndex(action => action.id === active.id);
      const newIndex = executableActions.findIndex(action => action.id === over.id);
      setExecutableActions(arrayMove(executableActions, oldIndex, newIndex));
    }
  };

  const handleDelete = useCallback(  (action:ExecutableAction )=> {
    return ()=>setExecutableActions((prev:ExecutableAction[])=> [...prev].splice(prev.findIndex((item)=>item.id===action.id),1))
  },[]);

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
            <Grid container spacing={2} direction="column">
              {executableActions.map((action, index) => (
                <SortableItem key={`${action.id}-${index}`} id={action.id} >
                  <Grid item>
                    <Box m={0.5} p={0.5}>
                      <Paper elevation={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Typography variant="h5" component="span">
                            {actionStringToAction[action.actionString].displayName}
                          </Typography>
                          <IconButton onClick={handleDelete(action)}><DeleteIcon/></IconButton>
                        </Grid>
                      </Paper>
                    </Box>
                  </Grid>
                </SortableItem>
              ))}
            </Grid>
          </SortableContext>
        </DndContext>
      </Paper>
    </Box>
  );
}

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SequenceOrder;
