import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/auth";
import { CaretDown } from "@phosphor-icons/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Sidebar() {
  const navigate = useNavigate();
  const clearCredentials = useAuthStore((state) => state.clearCredentials);
  const user = useAuthStore((state) => state.user);

  const [signOutAlertDialogVisible, setSignOutAlertDialogVisible] =
    useState(false);

  function handleNavigateToProfile() {
    navigate("/profile");
  }

  function handleSignOut() {
    clearCredentials();
  }

  return (
    <>
      <AlertDialog
        open={signOutAlertDialogVisible}
        onOpenChange={setSignOutAlertDialogVisible}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out</AlertDialogTitle>
            <AlertDialogDescription>
              Really want to leave?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>
              Yes, Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="w-64 border-r flex flex-col">
        <div className="flex-1 flex flex-col gap-1 p-3">
          <Button type="button" variant="ghost" className="flex justify-start">
            <Link to="/tasks">Tasks</Link>
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="border-t h-14 flex px-3 items-center gap-2">
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold text-left">
                  {user?.username}
                </span>
                <span className="text-xs text-left">{user?.email}</span>
              </div>

              <CaretDown className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-60">
            <DropdownMenuItem onClick={handleNavigateToProfile}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSignOutAlertDialogVisible(true)}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
