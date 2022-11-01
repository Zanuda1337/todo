import { Button, Fade, Modal, Paper, TextField } from '@mui/material';
import classes from 'src/features/TodoList/TodoList.module.scss';
import React, { ChangeEvent } from 'react';

type TTodoCreatorProps = {
  isTaskCreatorOpen: boolean;
  task: string;
  onTaskChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCloseTodoCreator: () => void;
  onAddTodo: () => void;
};

const TodoCreator: React.FC<TTodoCreatorProps> = ({
  isTaskCreatorOpen,
  task,
  onTaskChange,
  onAddTodo,
  onCloseTodoCreator,
}) => {
  return (
    <Modal
      open={isTaskCreatorOpen}
      onClose={onCloseTodoCreator}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isTaskCreatorOpen}>
        <Paper className={classes['form-wrapper']} square={true}>
          <form
            className={classes.form}
            onSubmit={(event) => {
              event.preventDefault();
              onAddTodo();
            }}
          >
            <p>What do you want to do?</p>
            <TextField
              label="Task *"
              variant="standard"
              value={task}
              classes={{ root: classes['text-field'] }}
              onChange={onTaskChange}
              autoFocus={true}
            />
            <div className={classes.buttons}>
              <Button
                classes={{
                  root: classes['add-button'],
                }}
                onClick={onAddTodo}
                disabled={!task}
              >
                <span className={classes['add-button-text']}>Save</span>
              </Button>
              <Button
                classes={{
                  root: classes['add-button'],
                }}
                onClick={onCloseTodoCreator}
              >
                <span className={classes['add-button-text']}>Cancel</span>
              </Button>
            </div>
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default TodoCreator;
