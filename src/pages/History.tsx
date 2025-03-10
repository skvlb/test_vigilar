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
  Calendar as CalendarIcon,
  Download,
  Filter,
  Search,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Composant pour un événement historique
const HistoryEvent = ({ event }) => {
  const typeIcons = {
    'Mouvement': Eye,
    'Personne': Eye, 
    'Son': Eye
  };
  const Icon = typeIcons[event.type] || Eye;

  return (
    <Card className="border mb-4 hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{event.type} détecté</h3>
              <Badge variant={event.severity === 'high' ? 'destructive' : 'secondary'}>
                {event.severity === 'high' ? 'Important' : 'Normal'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Détecté sur {event.camera}
            </p>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <Clock className="h-3 w-3 mr-1" />
              <span>{event.date}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Composant de calendrier simplifié
const CalendarNavigation = () => {
  return (
    <Card className="border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Calendrier
        </CardTitle>
        <CardDescription>Sélectionnez une date</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">Février 2024</h3>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
            <div key={day} className="text-sm text-muted-foreground">
              {day}
            </div>
          ))}
          {Array.from({ length: 29 }).map((_, i) => (
            <Button 
              key={i} 
              variant="ghost" 
              size="sm" 
              className={`h-8 w-8 p-0 ${i === 19 ? 'bg-primary text-primary-foreground' : ''}`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between pt-3">
        <Button variant="outline" size="sm">Aujourd'hui</Button>
        <Button variant="outline" size="sm">Cette semaine</Button>
      </CardFooter>
    </Card>
  );
};

const History = () => {
  const [activeTab, setActiveTab] = useState("all");

  const events = [
    {
      id: 1,
      type: 'Mouvement',
      severity: 'medium',
      camera: 'Caméra Entrée',
      date: '20/02/2024 15:30'
    },
    {
      id: 2,
      type: 'Personne',
      severity: 'high',
      camera: 'Caméra Jardin',
      date: '20/02/2024 14:15'
    },
    {
      id: 3,
      type: 'Son',
      severity: 'medium',
      camera: 'Caméra Garage',
      date: '20/02/2024 12:45'
    },
    {
      id: 4,
      type: 'Mouvement',
      severity: 'low',
      camera: 'Caméra Salon',
      date: '20/02/2024 10:30'
    },
    {
      id: 5,
      type: 'Personne',
      severity: 'high',
      camera: 'Caméra Entrée',
      date: '20/02/2024 09:15'
    }
  ];

  const filteredEvents = activeTab === "all" 
    ? events 
    : events.filter(event => event.type.toLowerCase() === activeTab);

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Historique</h1>
            <p className="text-muted-foreground mt-1">Événements et détections enregistrés</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendrier</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Rechercher dans l'historique" className="pl-9" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type d'événement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="mouvement">Mouvement</SelectItem>
                      <SelectItem value="personne">Personne</SelectItem>
                      <SelectItem value="son">Son</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Caméra" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les caméras</SelectItem>
                      <SelectItem value="entrée">Entrée</SelectItem>
                      <SelectItem value="jardin">Jardin</SelectItem>
                      <SelectItem value="garage">Garage</SelectItem>
                      <SelectItem value="salon">Salon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="mouvement">Mouvements</TabsTrigger>
                <TabsTrigger value="personne">Personnes</TabsTrigger>
                <TabsTrigger value="son">Sons</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="space-y-4">
                {filteredEvents.map(event => (
                  <HistoryEvent key={event.id} event={event} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <CalendarNavigation />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default History;