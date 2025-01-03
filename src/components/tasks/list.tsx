"use client";

import React from "react";
import Task from "~/components/tasks/task";
import Modal from "~/components/tasks/modal";
import { type SelectTask } from "~/server/db/schema";
import { usePagination } from "~/hooks/use-pagination";
import Pagination from "~/components/pagination";
import EmptyTaskList from "~/components/tasks/empty";

const TaskList = ({
  initTasks,
  page = 1,
  itemsPerPage = 9,
}: {
  initTasks: SelectTask[];
  page?: number;
  itemsPerPage?: number;
}) => {
  const [tasks, setTasks] = React.useState(initTasks);
  const { currentPage, setCurrentPage, maxPages, itemsToShow } =
    usePagination<SelectTask>({
      current: page,
      itemsPerPage,
      items: tasks,
    });

  const handleCreate = (task: SelectTask) => {
    setTasks((tasks) => [task, ...tasks]);
    setCurrentPage(1);
  };

  const handleDelete = (task: SelectTask) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  const handleUpdate = React.useCallback((task: SelectTask) => {
    setTasks((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
    );
  }, []);

  return (
    <>
      {tasks.length > 0 ? (
        <>
          <ul className="grid gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
            {itemsToShow.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </ul>
        </>
      ) : (
        <EmptyTaskList imgSrc="/empty-folder.webp">
          You do not have any tasks yet. Try creating one!
        </EmptyTaskList>
      )}
      <Modal
        className="block m-auto mt-8 w-full max-w-sm sm:mr-0 sm:w-fit"
        onCreate={handleCreate}
      >
        Add a new task
      </Modal>
      {tasks.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPages}
        />
      )}
    </>
  );
};

export default TaskList;
