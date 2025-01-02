"use client";

import React from "react";
import Task from "~/components/tasks/task";
import Modal from "~/components/tasks/modal";
import { type SelectTask } from "~/server/db/schema";

const TaskList = ({ initTasks }: { initTasks: SelectTask[] }) => {
  const [tasks, setTasks] = React.useState(initTasks);

  const handleCreate = (task: SelectTask) => {
    setTasks((tasks) => [task, ...tasks]);
  };

  const handleDelete = (task: SelectTask) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  return (
    <>
      {tasks.length > 0 ? (
        <ul className="grid gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </ul>
      ) : (
        <p>You don&apos;t have any tasks yet. Add one to get started!</p>
      )}
      <Modal className="block mt-4 ml-auto" onCreate={handleCreate}>
        Add a new task
      </Modal>
    </>
  );
};

export default TaskList;
