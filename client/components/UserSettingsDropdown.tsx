import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  UserCog,
  Bell,
  Shield,
  Moon,
  Sun,
  Monitor,
  Palette,
  Languages,
  Download,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function UserSettingsDropdown() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  const handleLogout = () => {
    logout();
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return Sun;
      case "dark":
        return Moon;
      case "system":
        return Monitor;
      default:
        return Sun;
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <div className="w-8 h-8 bg-medical-brown rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {/* User Info Section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-medical-brown rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-medical-slate truncate">
                  {user?.name || "Dr. Sarah Johnson"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "doctor@medicare.com"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {user?.role || "Doctor"}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs text-medical-blue border-medical-blue"
              >
                {user?.specialty || "General Practice"}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Account Management */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Account
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <UserCog className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notification Preferences</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Shield className="mr-2 h-4 w-4" />
            <span>Privacy & Security</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Appearance & System */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Preferences
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <ThemeIcon className="mr-2 h-4 w-4" />
            <span>Appearance</span>
            <Badge variant="outline" className="ml-auto text-xs">
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Languages className="mr-2 h-4 w-4" />
            <span>Language</span>
            <Badge variant="outline" className="ml-auto text-xs">
              EN
            </Badge>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Palette className="mr-2 h-4 w-4" />
            <span>Dashboard Layout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* System & Reports */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            System
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics & Reports</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            <span>Export Data</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>System Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Help & Support */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Documentation</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-medical-blue">
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Contact Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
