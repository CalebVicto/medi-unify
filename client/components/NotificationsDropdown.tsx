import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Calendar,
  AlertTriangle,
  Clock,
  UserCheck,
  Pill,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "appointment" | "alert" | "prescription" | "system" | "patient";
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: "low" | "medium" | "high" | "urgent";
}

export default function NotificationsDropdown() {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Emma Thompson - Check-up in 15 minutes",
      time: "2 min ago",
      read: false,
      priority: "high",
    },
    {
      id: "2",
      type: "alert",
      title: "Critical Patient Alert",
      message: "Robert Smith - Blood pressure readings elevated",
      time: "5 min ago",
      read: false,
      priority: "urgent",
    },
    {
      id: "3",
      type: "prescription",
      title: "Prescription Reminder",
      message: "Michael Davis - Prescription ready for pickup",
      time: "10 min ago",
      read: false,
      priority: "medium",
    },
    {
      id: "4",
      type: "patient",
      title: "New Patient Registration",
      message: "Lisa Chen has completed registration forms",
      time: "25 min ago",
      read: true,
      priority: "low",
    },
    {
      id: "5",
      type: "appointment",
      title: "Appointment Cancelled",
      message: "James Brown cancelled tomorrow's appointment",
      time: "1 hour ago",
      read: true,
      priority: "medium",
    },
    {
      id: "6",
      type: "system",
      title: "System Update",
      message: "Medical records system will be updated tonight",
      time: "2 hours ago",
      read: true,
      priority: "low",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return Calendar;
      case "alert":
        return AlertTriangle;
      case "prescription":
        return Pill;
      case "patient":
        return UserCheck;
      case "system":
        return Settings;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority: string, read: boolean) => {
    if (read) return "text-gray-500 bg-gray-100";

    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-100";
      case "high":
        return "text-orange-600 bg-orange-100";
      case "medium":
        return "text-medical-blue bg-blue-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would update the notifications state
    console.log("Mark all as read");
  };

  const clearAll = () => {
    // In a real app, this would clear all notifications
    console.log("Clear all notifications");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-lg font-semibold text-medical-slate">
                Notifications
              </h3>
              <p className="text-sm text-gray-600">
                {unreadCount > 0
                  ? `${unreadCount} unread messages`
                  : "All caught up!"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-medical-blue hover:text-medical-navy"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start space-x-3 p-3 rounded-lg transition-colors cursor-pointer",
                        notification.read
                          ? "hover:bg-gray-50"
                          : "bg-blue-50 hover:bg-blue-100 border border-blue-200",
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                          getPriorityColor(
                            notification.priority,
                            notification.read,
                          ),
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p
                              className={cn(
                                "text-sm font-medium",
                                notification.read
                                  ? "text-gray-700"
                                  : "text-medical-slate",
                              )}
                            >
                              {notification.title}
                            </p>
                            <p
                              className={cn(
                                "text-sm mt-1",
                                notification.read
                                  ? "text-gray-500"
                                  : "text-gray-600",
                              )}
                            >
                              {notification.message}
                            </p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-medical-blue rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="border-t border-gray-200 p-3">
            <Button
              variant="ghost"
              className="w-full text-medical-blue hover:text-medical-navy hover:bg-medical-blue/10"
            >
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
