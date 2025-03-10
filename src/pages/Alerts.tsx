import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Bell, 
  AlertTriangle, 
  Eye, 
  Clock, 
  Calendar, 
  Filter, 
  Camera,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AlertItem = ({ level, title, description, time, location, isRead }) => {
  const levelIcons = {
    high: <AlertTriangle className="h-5 w-5" />,
    medium: <Eye className="h-5 w-5" />,
    low: <Bell className="h-5 w-5" />
  };

  const levelColors = {
    high: "bg-red-500 text-white",
    medium: "bg-amber-500 text-white",
    low: "bg-green-500 text-white"
  };

  return (
    <Card className={`mb-3 border-l-4 ${level === 'high' ? 'border-l-red-500' : level === 'medium' ? 'border-l-amber-500' : 'border-l-green-500'} ${isRead ? 'opacity-70' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-2 ${levelColors[level]}`}>
            {levelIcons[level]}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{title}</h3>
              <Badge variant={level === 'high' ? 'destructive' : level === 'medium' ? 'default' : 'secondary'}>
                {level === 'high' ? 'Urgent' : level === 'medium' ? 'Attention' : 'Info'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3 mr-1" />
              <span className="mr-3">{time}</span>
              <Camera className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <CheckCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const alerts = [
    {
      id: 1,
      level: 'high',
      title: 'Mouvement détecté',
      description: 'Mouvement suspect détecté près de l\'entrée principale',
      time: 'Il y a 5 minutes',
      location: 'Caméra Entrée',
      isRead: false
    },
    {
      id: 2,
      level: 'medium',
      title: 'Son suspect',
      description: 'Bruit de verre cassé détecté',
      time: 'Il y a 15 minutes',
      location: 'Caméra Jardin',
      isRead: false
    },
    {
      id: 3,
      level: 'low',
      title: 'Caméra reconnectée',
      description: 'La caméra du garage est maintenant en ligne',
      time: 'Il y a 1 heure',
      location: 'Caméra Garage',
      isRead: true
    },
    {
      id: 4,
      level: 'medium',
      title: 'Personne détectée',
      description: 'Une personne a été détectée dans la zone arrière-cour',
      time: 'Il y a 2 heures',
      location: 'Caméra Arrière-cour',
      isRead: true
    },
    {
      id: 5,
      level: 'high',
      title: 'Multiple personnes détectées',
      description: 'Groupe de personnes détecté près du garage',
      time: 'Il y a 3 heures',
      location: 'Caméra Garage',
      isRead: true
    }
  ];

  const filteredAlerts = activeTab === "all" 
    ? alerts 
    : activeTab === "unread" 
      ? alerts.filter(alert => !alert.isRead)
      : alerts.filter(alert => alert.level === activeTab);

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Alertes</h1>
            <p className="text-muted-foreground mt-1">Gestion des notifications et événements</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Historique</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">Toutes ({alerts.length})</TabsTrigger>
            <TabsTrigger value="unread">Non lues ({alerts.filter(a => !a.isRead).length})</TabsTrigger>
            <TabsTrigger value="high">Urgentes ({alerts.filter(a => a.level === 'high').length})</TabsTrigger>
            <TabsTrigger value="medium">Moyennes ({alerts.filter(a => a.level === 'medium').length})</TabsTrigger>
            <TabsTrigger value="low">Infos ({alerts.filter(a => a.level === 'low').length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => (
                <AlertItem key={alert.id} {...alert} />
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucune alerte</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Aucune alerte n'a été trouvée pour ce filtre.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Alerts;