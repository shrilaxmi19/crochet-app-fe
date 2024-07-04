import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  // Retrieve admin emails from environment variables and split into an array, providing a default empty string
  const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",");
  console.log(import.meta.env.VITE_ADMIN_EMAILS , "em");

  // Check if the user is an admin
  const isAdmin = user?.email && adminEmails.includes(user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-pink-400 gap-2">
        <CircleUserRound className="text-pink-400" />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin && (
          <DropdownMenuItem>
            <Link
              to="/manage-restaurant"
              className="font-bold hover:text-pink-400"
            >
              Manage Store
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-pink-400">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-pink-400"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
