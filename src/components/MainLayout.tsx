import React, { useState } from 'react';
import { 
  Bell, 
  Camera, 
  History, 
  Home, 
  Moon, 
  Settings, 
  Sun,
  BarChart3,
  Shield,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';

const menuItems = [
  { title: "Tableau de bord", icon: Home, path: "/" },
  { title: "Flux en direct", icon: Camera, path: "/live" },
  { title: "Alertes", icon: Bell, path: "/alerts", badge: "7" },
  { title: "Historique", icon: History, path: "/history" },
  { title: "Analytique", icon: BarChart3, path: "/analytics" },
  { title: "Configuration", icon: Camera, path: "/camera-setup" },
  { title: "Paramètres", icon: Settings, path: "/settings" },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActivePage = (path: string) => location.pathname === path;

  const navigateTo = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header de l'application */}
      <header className="border-b bg-background shadow-sm">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('/')}>
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">VigilAir</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigateTo('/alerts')}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">7</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => navigateTo('/settings')}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={`
            fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r shadow-sm transition-transform duration-300 md:relative md:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="flex h-16 items-center justify-between px-4 md:hidden">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">VigilAir</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="px-4 py-2 md:pt-4">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-primary/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Système actif</span>
            </div>
          </div>
          
          <nav className="px-2 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <button
                    className={`
                      w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors
                      ${isActivePage(item.path) ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-foreground hover:text-primary'}
                    `}
                    onClick={() => navigateTo(item.path)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="destructive">{item.badge}</Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Besoin d'aide ?</h3>
                  <p className="text-xs text-muted-foreground mt-1">Consultez notre documentation</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay pour fermer le sidebar sur mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenu principal */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;