"use client";

import React from "react";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { type SelectTask } from "~/server/db/schema";
import { debounce } from "lodash";
import { api } from "~/trpc/react";
import Modal from "~/components/tasks/modal";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { useToast } from "~/hooks/use-toast";
import { defaultToastError } from "~/components/ui/toast";

const Task = ({
  task,
  onDelete,
}: {
  task: SelectTask;
  onDelete: (task: SelectTask) => void;
}) => {
  const [state, setState] = React.useState(task);
  const [prevState, setPrevState] = React.useState(task);
  const [lastSuccessState, setLastSuccessState] = React.useState(task);
  const [deleting, setDeleting] = React.useState(false);
  const { toast } = useToast();

  const { mutate: updateTask } = api.task.update.useMutation({
    onMutate: () => {
      setPrevState({
        ...state,
        isCompleted: state.isCompleted,
        completedAt: state.isCompleted ? new Date() : null,
      });
    },
    onSuccess: () => {
      setLastSuccessState({
        ...state,
        isCompleted: state.isCompleted,
        completedAt: state.isCompleted ? new Date() : null,
      });
    },
    onError: () => {
      setState(lastSuccessState);
      setPrevState(lastSuccessState);
      toast(defaultToastError);
    },
  });

  const debouncedUpdateTask = React.useMemo(() => {
    return debounce((id: string, isCompleted: boolean) => {
      updateTask({ id, isCompleted });
    }, 500);
  }, [updateTask]);

  const handleCheckedChange = (checked: boolean) => {
    setState({
      ...state,
      isCompleted: checked,
      completedAt: checked ? new Date() : null,
    });
    if (prevState.isCompleted === checked) {
      debouncedUpdateTask.cancel();
    } else {
      debouncedUpdateTask(task.id, checked);
    }
  };

  React.useEffect(() => {
    return () => {
      debouncedUpdateTask.cancel();
    };
  }, [debouncedUpdateTask]);

  const { mutate: deleteTask } = api.task.delete.useMutation({
    onMutate: () => {
      setDeleting(true);
    },
    onSuccess: () => {
      onDelete(task);
    },
    onSettled: () => {
      setDeleting(false);
    },
    onError: () => {
      toast({
        ...defaultToastError,
        description:
          "There was a problem deleting the task. Please try again later.",
      });
    },
  });

  const handleDelete = () => {
    if (deleting) return;
    deleteTask({ id: task.id });
  };

  return (
    <li className="overflow-hidden max-w-full">
      <Card className="flex flex-col justify-between h-full">
        <CardHeader>
          <Label
            className={`${state.isCompleted && "line-through"} flex items-center gap-x-2 text-xl`}
          >
            <Checkbox
              onCheckedChange={handleCheckedChange}
              checked={state.isCompleted}
            />
            <h3 className="truncate" title={state.content}>
              {state.content}
            </h3>
          </Label>
          <CardDescription className="flex justify-between">
            <div>
              <span className="mr-1 font-semibold">Created:</span>
              <span>
                {task.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            {state.isCompleted && state.completedAt && (
              <div>
                <span className="mr-1 font-semibold">Done:</span>
                <span>
                  {state.completedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button
            variant="destructive-link"
            className="px-0"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <Spinner className="fill-red-500">Deleting...</Spinner>
            ) : (
              "Delete"
            )}
          </Button>
          <Modal
            task={state}
            onUpdate={(newContent: string) =>
              setState({ ...state, content: newContent })
            }
            deleting={deleting}
            onDelete={handleDelete}
            variant="outline"
          >
            Edit
          </Modal>
        </CardFooter>
      </Card>
    </li>
  );
};

export default Task;
