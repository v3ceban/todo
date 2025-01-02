import Link from "next/link";
import { auth } from "~/server/auth";
import { AuthButton } from "~/components/auth-button";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { FaGithub, FaSquareCheck } from "react-icons/fa6";
import { Toggle } from "~/components/theme/toggle";
import { updateUser } from "~/server/actions";

const Header = async () => {
  const session = await auth();
  const username = session?.user.name?.split(" ") ?? ["User", "Name"];

  return (
    <header className="sticky top-0 left-0 z-10 mb-4 border-b bg-background">
      <div className="container flex justify-between items-center p-4 mx-auto">
        <Link href="/" prefetch={true}>
          <h1 className="flex gap-x-2 items-center text-lg font-semibold">
            <FaSquareCheck className="inline-block w-6 h-6" />
            Todo App
          </h1>
        </Link>
        <nav>
          <ul className="flex gap-x-2">
            <li>
              {session ? (
                <Dialog>
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
                    <form action={updateUser}>
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
                            name="firstName"
                            className="text-sm font-normal"
                            defaultValue={username[0] ?? ""}
                            placeholder="Enter your name"
                            required
                            minLength={3}
                            maxLength={100}
                          />
                        </Label>
                        <Label className="flex gap-4 items-center">
                          <span className="min-w-fit">Last Name</span>
                          <Input
                            name="lastName"
                            className="text-sm font-normal"
                            defaultValue={username[username.length - 1] ?? ""}
                            placeholder="Enter your last name"
                            required
                            minLength={3}
                            maxLength={100}
                          />
                        </Label>
                      </div>
                      <DialogFooter className="gap-y-2">
                        <DialogClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit">Save</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : (
                <AuthButton session={session} />
              )}
            </li>
            <li>
              <Toggle />
            </li>
            <li className="hidden sm:block">
              <Button variant="outline" size="icon" asChild>
                <Link
                  href="https://github.com/v3ceban/todo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle theme</span>
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
