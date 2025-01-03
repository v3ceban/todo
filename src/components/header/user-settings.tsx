"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
import { AuthButton } from "~/components/auth-button";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type Session } from "next-auth";
import { updateUser } from "~/server/actions";
import ErrorMessage from "~/components/ui/error-message";
import { defaultToastError } from "../ui/toast";
import { useToast } from "~/hooks/use-toast";
import { Spinner } from "~/components/spinner";
import { handleKeyDown, nameRegex } from "~/lib/utils";

export const UserSettings = ({
  username,
  session,
}: {
  username: string[];
  session: Session;
}) => {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    firstName: string | null;
    lastName: string | null;
  }>({ firstName: null, lastName: null });
  const [loading, setLoading] = React.useState(false);
  const fNameRef = React.useRef<HTMLInputElement>(null);
  const lNameRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleClick = async () => {
    if (loading) return;

    const firstName = fNameRef.current?.value?.trim();
    const lastName = lNameRef.current?.value?.trim();

    const newErrors = {
      firstName: null,
      lastName: null,
    } as typeof errors;

    if (
      !firstName ||
      firstName.length > 100 ||
      firstName.length < 0 ||
      !nameRegex.test(firstName)
    ) {
      newErrors.firstName = "Invalid first name";
    }

    if (
      !lastName ||
      lastName.length > 100 ||
      lastName.length < 0 ||
      !nameRegex.test(lastName)
    ) {
      newErrors.lastName = "Invalid last name";
    }

    if (newErrors.firstName || newErrors.lastName) {
      setErrors(newErrors);
      return;
    }

    if (
      `${username[0]} ${username[username.length - 1]}` ===
      `${firstName} ${lastName}`
    ) {
      setOpen(false);
      return;
    }

    try {
      setLoading(true);
      setErrors({
        firstName: null,
        lastName: null,
      });
      await updateUser({
        firstName: firstName!,
        lastName: lastName!,
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          ...defaultToastError,
          description: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => {
        setOpen(open);
        if (open) {
          setErrors({
            firstName: null,
            lastName: null,
          });
        }
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">My Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hi, {username[0]}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="justify-start p-0 w-full hover:no-underline"
              >
                Settings
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AuthButton
              session={session}
              variant="link"
              className="justify-start p-0 w-full hover:no-underline"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            You can make changes to your profile here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label className="flex gap-4 items-center">
            <span className="min-w-fit">First Name</span>
            <Input
              ref={fNameRef}
              defaultValue={username[0] ?? ""}
              placeholder="Enter your name"
              onKeyDown={(e) => handleKeyDown(e, handleClick)}
            />
          </Label>
          <ErrorMessage
            message={errors.firstName}
            condition={Boolean(errors.firstName)}
          />
          <Label className="flex gap-4 items-center">
            <span className="min-w-fit">Last Name</span>
            <Input
              ref={lNameRef}
              defaultValue={username[username.length - 1] ?? ""}
              placeholder="Enter your last name"
              onKeyDown={(e) => handleKeyDown(e, handleClick)}
            />
          </Label>
          <ErrorMessage
            message={errors.lastName}
            condition={Boolean(errors.lastName)}
          />
        </div>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleClick}>
            {loading ? <Spinner>Saving...</Spinner> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
