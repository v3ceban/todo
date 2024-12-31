"use client";

import type { task } from "~/lib/types";
import { Checkbox } from "~/components/ui/checkbox";
import React from "react";

const Task = ({ task }: { task: task }) => {
  const [completed, setCompleted] = React.useState(task.completed);

  return (
    <li key={task.id}>
      <label className={`${completed && "line-through"}`}>
        {task.title}
        <Checkbox
          onCheckedChange={(checked: boolean) => setCompleted(checked)}
          checked={completed}
        />
      </label>
    </li>
  );
};

export default Task;
