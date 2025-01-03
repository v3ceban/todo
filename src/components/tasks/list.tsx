"use client";

import React from "react";
import Task from "~/components/tasks/task";
import Modal from "~/components/tasks/modal";
import { type SelectTask } from "~/server/db/schema";
import { usePagination } from "~/hooks/use-pagination";
import EmptyTaskList from "~/components/tasks/empty";
import { useSearch } from "~/hooks/use-search";

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
  const [searchQuery, setSearchQuery] = React.useState("");
  const { searchResults, SearchBar } = useSearch<SelectTask>({
    data: tasks,
    query: searchQuery,
    field: "content",
  });
  const { currentPage, setCurrentPage, maxPages, itemsToShow, Pagination } =
    usePagination<SelectTask>({
      current: page,
      itemsPerPage,
      items: searchResults,
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
      {tasks.length > 0 && (
        <SearchBar
          className="relative sm:ml-auto sm:-mb-6 sm:-translate-y-[52px]"
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      )}
      {searchResults.length > 0 ? (
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
      ) : (
        <EmptyTaskList imgSrc="/empty-folder.webp">
          {searchQuery
            ? "We couldn't find any tasks matching your search, please try again."
            : "You do not have any tasks yet. Try creating one!"}
        </EmptyTaskList>
      )}
      <Modal
        className="block m-auto mt-8 w-full max-w-sm sm:mr-0 sm:w-fit"
        onCreate={handleCreate}
      >
        Add a new task
      </Modal>
      {searchResults.length > itemsPerPage && (
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
