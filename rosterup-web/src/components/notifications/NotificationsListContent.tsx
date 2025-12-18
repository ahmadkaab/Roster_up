"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  created_at: string;
  type: string;
};

export function NotificationsListContent() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (data) {
        setNotifications(data);
      }
      setLoading(false);
    };

    fetchNotifications();

    const channel = supabase
      .channel("notifications-page")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, supabase]);

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    await supabase.from("notifications").update({ read: true }).eq("id", id);
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await supabase.from("notifications").update({ read: true }).eq("user_id", user?.id);
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Loading notifications...</div>;
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Bell className="mb-4 h-12 w-12 opacity-20" />
        <p>You have no notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={markAllAsRead} className="gap-2">
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </Button>
      </div>
      <div className="grid gap-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "flex flex-col gap-2 rounded-lg border p-4 transition-colors",
              notification.read ? "bg-background" : "bg-muted/30 border-primary/20"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className={cn("font-medium", !notification.read && "text-primary")}>
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.created_at).toLocaleDateString()} at{" "}
                    {new Date(notification.created_at).toLocaleTimeString()}
                  </span>
                  {notification.link && (
                    <Link
                      href={notification.link}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  )}
                </div>
              </div>
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                  className="h-8 px-2 text-xs"
                >
                  Mark read
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
