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
import { Button } from "~/components/ui/button";
import { FaGithub, FaSquareCheck } from "react-icons/fa6";
import { Toggle } from "~/components/theme/toggle";

const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky left-0 top-0 z-10 bg-background mb-4 border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" prefetch={true}>
          <h1 className="flex items-center gap-x-2 text-lg font-semibold">
            <FaSquareCheck className="inline-block h-6 w-6" />
            Todo App
          </h1>
        </Link>
        <nav>
          <ul className="flex gap-x-2">
            <li>
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">My Account</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      Hi, {session.user.name?.split(" ")[0]}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                        variant="link"
                        className="w-full justify-start p-0 hover:no-underline"
                      >
                        <Link href="/">Settings</Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AuthButton
                        session={session}
                        variant="link"
                        className="w-full justify-start p-0 hover:no-underline"
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <AuthButton session={session} />
              )}
            </li>
            <li>
              <Toggle />
            </li>
            <li className="hidden sm:block">
              <Button variant="outline" size="icon">
                <Link href="https://github.com/v3ceban/todo" target="_blank" rel="noreferrer">
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
