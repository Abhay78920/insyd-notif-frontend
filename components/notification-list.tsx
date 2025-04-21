"use client";

import { Notification } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Bell } from "lucide-react";

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">No notifications to display</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {notifications.map((notification) => (
        <li 
          key={notification._id}
          className={`p-4 rounded-lg border transition-all ${
            notification.read ? 'bg-card' : 'bg-muted/30 border-primary/20'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className={`mb-1 ${!notification.read ? 'font-medium' : ''}`}>
                {notification.message}
              </p>
              <div className="flex items-center gap-2">
                <Link 
                  href={notification.link} 
                  className="text-sm text-primary hover:underline"
                >
                  View details
                </Link>
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(notification.createdAt)}
                </span>
              </div>
            </div>
            {!notification.read && (
              <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

// Helper function to format time
function formatTimeAgo(dateString: string): string {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'some time ago';
  }
}