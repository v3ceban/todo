import Task from "~/components/task";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import type { SelectTask } from "~/server/db/schema";

const Home = async () => {
  let tasks: SelectTask[] = [];
  let message = "You don't have any tasks yet. Add one to get started!";
  try {
    tasks = await api.task.getAll();
    return (
      <HomeContent>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </ul>
        ) : (
          <p>{message}</p>
        )}
        <Button>Add Task</Button>
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

const HomeContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <h2>Tasks</h2>
      {children}
    </>
  );
};

export default Home;
