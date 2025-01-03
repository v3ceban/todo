import TaskList from "~/components/tasks/list";
import EmptyTaskList from "~/components/tasks/empty";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export const dynamic = "force-dynamic";

const Home = async ({ page }: { page: number }) => {
  try {
    const tasks = await api.task.getAll();
    return (
      <HomeContent>
        <TaskList initTasks={tasks} page={page} itemsPerPage={6} />
      </HomeContent>
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return (
        <EmptyTaskList
          imgSrc="/to-do-list.webp"
          className="mx-8 min-h-[calc(100dvh-(69px-16px)*4)] justify-center"
          textClassName="mt-4 text-center"
        >
          Welcome to your task list! Please sign in to view your tasks.
        </EmptyTaskList>
      );
    } else {
      console.error(error);
      return (
        <HomeContent>
          <EmptyTaskList imgSrc="/empty-folder.webp">
            An error occurred while fetching tasks. Please try again later.
          </EmptyTaskList>
        </HomeContent>
      );
    }
  }
};

const HomeContent = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();
  const username = session?.user?.name?.split(" ")[0];

  return (
    <>
      <h2 className="mb-4 text-3xl font-bold">
        {username ? `${username}'s Tasks` : "Todo App"}
      </h2>
      {children}
    </>
  );
};

export default Home;
