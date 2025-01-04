import TaskList from "~/components/tasks/list";
import EmptyTaskList from "~/components/tasks/empty";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { AuthButton } from "~/components/auth-button";

export const dynamic = "force-dynamic";

const Home = async ({ page }: { page: number }) => {
  const session = await auth();
  const username = session?.user?.name?.split(" ")[0];
  try {
    const tasks = await api.task.getAll();
    return (
      <>
        <h2 className="mb-4 text-3xl font-bold">
          {username ? `${username}'s Tasks` : "Todo App"}
        </h2>
        <TaskList initTasks={tasks} page={page} itemsPerPage={6} />
      </>
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return (
        <EmptyTaskList
          imgSrc="/to-do-list.webp"
          className="mx-8 mb-8 min-h-[calc(100dvh-(69px-16px)*4)] justify-center"
          textClassName="mt-4 text-center"
        >
          <h3>Welcome to your task list! Sign in to get started.</h3>
          <AuthButton
            className="block mx-auto mt-8 w-full max-w-xs"
            session={session}
          />
        </EmptyTaskList>
      );
    } else {
      console.error(error);
      return (
        <>
          <h2 className="mb-4 text-3xl font-bold">
            {username ? `${username}'s Tasks` : "Todo App"}
          </h2>
          <EmptyTaskList
            className="mx-8 mb-8 min-h-[calc(100dvh-(69px-16px)*4)] justify-center"
            imgSrc="/empty-folder.webp"
          >
            <h3>
              An error occurred while fetching tasks. Please try again later.
            </h3>
          </EmptyTaskList>
        </>
      );
    }
  }
};

export default Home;
