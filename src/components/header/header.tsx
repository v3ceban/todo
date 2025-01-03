import Link from "next/link";
import { auth } from "~/server/auth";
import { AuthButton } from "~/components/auth-button";
import { Button } from "~/components/ui/button";
import { FaGithub, FaSquareCheck } from "react-icons/fa6";
import { Toggle } from "~/components/theme/toggle";
import { UserSettings } from "~/components/header/user-settings";

const Header = async () => {
  const session = await auth();
  const username = session?.user.name?.split(" ");

  return (
    <header className="sticky left-0 top-0 z-10 mb-4 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" prefetch={true}>
          <h1 className="flex items-center gap-x-2 text-lg font-semibold">
            <FaSquareCheck className="inline-block h-7 w-7" />
            Todo App
          </h1>
        </Link>
        <nav>
          <ul className="flex gap-x-2">
            <li>
              {session ? (
                <UserSettings
                  username={username!}
                  session={session}
                />
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
