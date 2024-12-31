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
import { Button } from "./ui/button";
import { FaRegSquareCheck } from "react-icons/fa6";

const Header = async () => {
  const session = await auth();
  console.log(session);
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-xl font-semibold">
        <Link href="/">
          <FaRegSquareCheck className="inline-block mr-2 mb-1 w-6 h-6" />
          Todo App
        </Link>
      </h1>
      <nav>
        <ul>
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
                      className="justify-start p-0 w-full hover:no-underline"
                    >
                      <Link href="/settings">Settings</Link>
                    </Button>
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
            ) : (
              <AuthButton session={session} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
