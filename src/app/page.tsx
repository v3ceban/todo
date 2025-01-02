import TaskList from "~/components/tasks/list";
import { api } from "~/trpc/server";
import { type SelectTask } from "~/server/db/schema";
import { auth } from "~/server/auth";

export const dynamic = "force-dynamic";

const Home = async () => {
  let tasks: SelectTask[] = [];
  let message: string;
  try {
    tasks = await api.task.getAll();
    return (
      <HomeContent>
        <TaskList initTasks={tasks} />
      </HomeContent>
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      message = "Please log in to use app!";
    } else {
      message =
        "An error occurred while fetching tasks. Please try again later.";
      console.error(error);
    }
    return (
      <HomeContent>
        <p>{message}</p>
      </HomeContent>
    );
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
        {username ? `${username}'s Tasks` : "Your Tasks"}
      </h2>
      {children}
    </>
  );
};

export default Home;
