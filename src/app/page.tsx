import Task from "~/components/task";
import type { task } from "~/lib/types";
import { Button } from "~/components/ui/button";

const Home = () => {
  const tasks: task[] = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
  ];

  return (
    <>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <Button>Add Task</Button>
    </>
  );
};

export default Home;
