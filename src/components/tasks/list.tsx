"use client";

import React from "react";
import Task from "~/components/tasks/task";
import Modal from "~/components/tasks/modal";
import { type SelectTask } from "~/server/db/schema";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TaskList = ({ initTasks }: { initTasks: SelectTask[] }) => {
  const [tasks, setTasks] = React.useState(initTasks);
  const [currentPage, setCurrentPage] = React.useState(1);
  const tasksPerPage = 3;
  const maxPage = Math.ceil(tasks.length / tasksPerPage);

  const handleCreate = (task: SelectTask) => {
    setTasks((tasks) => [task, ...tasks]);
  };

  const handleDelete = (task: SelectTask) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <>
      {tasks.length > 0 ? (
        <>
          <ul className="grid gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
            {currentTasks.map((task) => (
              <Task key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </ul>
          <Pagination className="mt-4">
            <PaginationContent className="grid grid-cols-3 place-items-center">
              <PaginationItem>
                <Button
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                  }}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="w-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              </PaginationItem>
              {currentPage}/{maxPage}
              <PaginationItem>
                <Button
                  onClick={() => {
                    setCurrentPage(Math.min(maxPage, currentPage + 1));
                  }}
                  disabled={currentPage === maxPage}
                  variant="outline"
                  className="w-full"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <p>You don&apos;t have any tasks yet. Add one to get started!</p>
      )}
      <Modal className="ml-auto mt-4 block" onCreate={handleCreate}>
        Add a new task
      </Modal>
    </>
  );
};

export default TaskList;
