import React, { useState } from 'react';
import { 
  Bell, 
  Camera, 
  Power, 
  Shield, 
  Eye, 
  Clock, 
  AlertTriangle,
  Zap,
  Settings,
  BarChart3,
  History as HistoryIcon,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// Composant pour les alertes
const AlertItem = ({ level, title, time, location }) => {
  const levelColors = {
    low: "bg-green-500 text-white",
    medium: "bg-yellow-500 text-white",
    high: "bg-red-500 text-white"
  };

  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors border-l-4 border-yellow-500 mb-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${levelColors[level]}`}>
        {level === 'high' ? (
          <AlertTriangle className="h-5 w-5" />
        ) : level === 'medium' ? (
          <Eye className="h-5 w-5" />
        ) : (
          <Bell className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{title}</p>
        <div className="flex text-xs text-muted-foreground mt-1">
          <Clock className="mr-1 h-3 w-3" />
          <span className="mr-3">{time}</span>
          {location && (
            <>
              <Camera className="mr-1 h-3 w-3" />
              <span>{location}</span>
            </>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground">
        <span className="sr-only">Voir le détail</span>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Composant pour la vidéo preview
const VideoPreview = ({ cameraName = "Entrée" }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="border overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => navigate('/live')}
    >
      <div className="aspect-video bg-black relative">
        <img 
          src="/placeholder.svg" 
          alt={`Caméra ${cameraName}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="default" className="bg-background/70 backdrop-blur-sm text-xs">
            En direct
          </Badge>
        </div>
      </div>
      <CardFooter className="p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm">Caméra {cameraName}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

// Composant principal du dashboard
const Dashboard = () => {
  const [isActivated, setIsActivated] = useState(true);
  const navigate = useNavigate();

  const toggleSystem = () => {
    setIsActivated(!isActivated);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header avec bienvenue et statut */}
        <div className="border-b pb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Bienvenue sur VigilAir</h1>
              <p className="text-muted-foreground mt-1">Aperçu de votre système de surveillance intelligent</p>
            </div>
            <Button
              onClick={toggleSystem}
              variant={isActivated ? "destructive" : "default"}
              className="transition-all duration-300"
            >
              <Power className="w-4 h-4 mr-2" />
              {isActivated ? "Désactiver" : "Activer"}
            </Button>
          </div>
        </div>

        {/* Carte de statut global */}
        <Card className="border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">État du système</h2>
                  <p className="text-sm text-muted-foreground">Protection active</p>
                </div>
              </div>
              <Badge 
                variant={isActivated ? "default" : "secondary"}
                className="px-3 py-1 text-sm"
              >
                {isActivated ? "Actif" : "Inactif"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Caméras</span>
                  <span className="text-sm font-medium">3/4 actives</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Charges CPU</span>
                  <span className="text-sm font-medium">43%</span>
                </div>
                <Progress value={43} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Stockage</span>
                  <span className="text-sm font-medium">54%</span>
                </div>
                <Progress value={54} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dernières détections et flux vidéo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary" />
              Dernières détections
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isActivated && (
                [1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border overflow-hidden cursor-pointer hover:shadow-md" onClick={() => navigate('/history')}>
                    <div className="aspect-video bg-black relative">
                      <img 
                        src="/placeholder.svg"
                        alt={`Détection ${i}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-red-500/80">Personne</Badge>
                        </div>
                        <div className="border-2 border-red-500 rounded-md w-1/2 h-1/2 absolute" 
                             style={{ top: '25%', left: '25%' }} />
                      </div>
                    </div>
                    <CardFooter className="p-2 text-xs text-muted-foreground flex justify-between">
                      <span>Il y a {i * 5} min</span>
                      <span>Caméra {i % 2 === 0 ? 'Entrée' : 'Jardin'}</span>
                    </CardFooter>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;