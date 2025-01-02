"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button, type ButtonProps } from "~/components/ui/button";
import { type SelectTask } from "~/server/db/schema";
import { Spinner } from "~/components/ui/spinner";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";
import { defaultToastError } from "~/components/ui/toast";

const Modal = ({
  children,
  task,
  onUpdate,
  onCreate,
  deleting,
  onDelete,
  ...props
}: {
  children: Readonly<React.ReactNode>;
  task?: SelectTask;
  onUpdate?: (content: string) => void;
  onCreate?: (tasks: SelectTask) => void;
  deleting?: boolean;
  onDelete?: () => void;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const mutationSettings = {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data: SelectTask | void) => {
      const content = inputRef.current?.value.trim();
      if (task && content && onUpdate) {
        onUpdate(content);
      }
      if (data && onCreate) {
        onCreate(data);
      }
      setOpen(false);
    },
    onError: () => {
      toast(defaultToastError);
    },
    onSettled: () => {
      setLoading(false);
    },
  };
  const { mutate: updateTask, error: updateError } =
    api.task.update.useMutation(mutationSettings);
  const { mutate: createTask, error: createError } =
    api.task.create.useMutation(mutationSettings);

  const handleSave = async () => {
    const content = inputRef.current?.value.trim();

    if (!content) {
      setError("Please enter a task name");
      return;
    }

    if (task) {
      updateTask({ id: task.id, content });
    } else {
      createTask({ content });
    }
  };

  React.useEffect(() => {
    const zodContentErrors: string[] | undefined =
      updateError?.data?.zodError?.fieldErrors?.content ??
      createError?.data?.zodError?.fieldErrors?.content;
    const contentError: string | undefined = zodContentErrors?.[0];
    if (contentError) {
      setError(contentError.replace("String", "Task name"));
    }
  }, [updateError, createError, setError]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => {
        setOpen(open);
        if (open) {
          setError(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button {...props}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle asChild>
            <h3>{task ? "Edit todo task" : "Add a new todo task"}</h3>
          </DialogTitle>
          <DialogDescription>
            Enter or edit the name for your todo task below.
          </DialogDescription>
        </DialogHeader>
        <Label className="flex gap-4 items-center">
          Name
          <Input
            ref={inputRef}
            className="text-sm font-normal"
            defaultValue={task ? task.content : ""}
            placeholder="Enter task name"
          />
        </Label>
        <p
          className={`text-sm text-red-500 ${error ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
        >
          {error}
        </p>
        <DialogFooter className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-x-0 sm:space-x-0">
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="col-span-2 row-start-2 row-end-3 sm:order-2 sm:mr-2 sm:ml-auto"
            >
              Cancel
            </Button>
          </DialogClose>
          {task && onDelete && (
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={onDelete}
              className="sm:order-1 sm:px-0 sm:bg-transparent sm:shadow-none sm:text-destructive sm:underline-offset-4 sm:hover:bg-transparent sm:hover:underline"
            >
              {deleting ? (
                <Spinner className="fill-red-500">Deleting...</Spinner>
              ) : (
                "Delete"
              )}
            </Button>
          )}
          <Button
            className="sm:order-3"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <Spinner>Saving...</Spinner>
            ) : task ? (
              "Save"
            ) : (
              "Add task"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
