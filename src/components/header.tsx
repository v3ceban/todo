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
import { FaSquareCheck } from "react-icons/fa6";
import { Toggle } from "~/components/theme/toggle";

const Header = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between py-4">
      <Button variant="outline" asChild>
        <Link href="/" prefetch={true}>
          <h1 className="text-lg font-semibold flex items-center gap-x-2">
            <FaSquareCheck className="inline-block h-8 w-8" />
            Todo App
          </h1>
        </Link>
      </Button>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
