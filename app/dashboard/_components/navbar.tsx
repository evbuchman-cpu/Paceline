"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserProfile from "@/components/user-profile";
import {
  Brush,
  HomeIcon,
  LucideGitBranchPlus,
  MonitorSmartphone,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-14 lg:h-[52px] items-center gap-4 px-3 backdrop-blur-md bg-white/80">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <Link prefetch={true} href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link prefetch={true} href="/" className="flex items-center">
                <span className="font-sans font-bold text-xl text-[#2C5F4D]">PACELINE</span>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link prefetch={true} href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link prefetch={true} href="/dashboard/questionnaire">
                  <Button variant="outline" className="w-full">
                    <Brush className="mr-2 h-4 w-4" />
                    New Guide
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link prefetch={true} href="/dashboard/notifications">
                  <Button variant="outline" className="w-full">
                    <MonitorSmartphone className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                </Link>
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link prefetch={true} href="/dashboard/analytics">
                  <Button variant="outline" className="w-full">
                    <LucideGitBranchPlus className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <UserProfile mini={true} />
        </div>
      </header>
      {children}
    </div>
  );
}
