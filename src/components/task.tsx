"use client";

import React from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import type { SelectTask } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { debounce } from "lodash";

const Task = ({ task }: { task: SelectTask }) => {
  const [completed, setCompleted] = React.useState(task.isCompleted);
  const [prevCompleted, setPrevCompleted] = React.useState(task.isCompleted);
  const [lastSuccess, setLastSucces] = React.useState(task.isCompleted);
  const { mutate: updateTask } = api.task.update.useMutation({
    onMutate: () => {
      setPrevCompleted(completed);
    },
    onSuccess: () => {
      setLastSucces(completed);
    },
    onError: () => {
      setCompleted(lastSuccess);
      setPrevCompleted(lastSuccess);
    },
  });

  const debouncedUpdateTask = React.useMemo(
    () =>
      debounce((id: string, isCompleted: boolean) => {
        updateTask({ id, isCompleted });
      }, 500),
    [updateTask],
  );

  const handleCheckedChange = (checked: boolean) => {
    setCompleted(checked);
    if (prevCompleted === checked) {
      debouncedUpdateTask.cancel();
    } else {
      debouncedUpdateTask(task.id, checked);
    }
  };

  React.useEffect(() => {
    return () => {
      debouncedUpdateTask.cancel();
    };
  }, [debouncedUpdateTask]);

  return (
    <li key={task.id}>
      <Label
        className={`${completed && "line-through"} flex items-center gap-x-1`}
      >
        <Checkbox onCheckedChange={handleCheckedChange} checked={completed} />
        {task.content}
      </Label>
    </li>
  );
};

export default Task;
