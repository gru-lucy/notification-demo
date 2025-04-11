"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

type NotificationType = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  read: boolean;
};

export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [nextId, setNextId] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = () => {
    setNotifications((prev) => [
      {
        id: nextId,
        title: `📩 Message #${nextId}`,
        description: "You’ve got a new message waiting!",
        createdAt: new Date(),
        read: false,
      },
      ...prev,
    ]);
    setNextId((id) => id + 1);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative hover:bg-muted/70 transition"
          >
            <Bell className="h-5 w-5 text-gray-700 hover:text-black transition duration-150" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs shadow-sm">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-96 p-3 shadow-xl border rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Notifications</h2>
            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto flex flex-col gap-2 pr-1">
            <AnimatePresence>
              {notifications.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-muted-foreground text-center py-6"
                >
                  You’re all caught up 🎉
                </motion.p>
              ) : (
                notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => markAsRead(n.id)}
                    className={`rounded-xl p-3 cursor-pointer transition-all border ${
                      n.read
                        ? "bg-white hover:bg-gray-50 border-gray-200"
                        : "bg-blue-50 hover:bg-blue-100 border-blue-200"
                    }`}
                  >
                    <div className="font-medium">{n.title}</div>
                    <div className="text-sm text-gray-600">{n.description}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        onClick={addNotification}
        className="absolute top-12 right-0 text-xs mt-2 shadow-sm"
        variant="outline"
      >
        + Add Notification
      </Button>
    </div>
  );
}
