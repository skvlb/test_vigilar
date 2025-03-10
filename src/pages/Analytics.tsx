import React from 'react';
import { 
  BarChart3,
  Calendar,
  Download,
  Users,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Bell
} from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Analytics = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytique</h1>
            <p className="text-muted-foreground mt-1">Visualisez et analysez les tendances de sécurité</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="7j">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Dernières 24h</SelectItem>
                <SelectItem value="7j">7 derniers jours</SelectItem>
                <SelectItem value="30j">30 derniers jours</SelectItem>
                <SelectItem value="custom">Personnalisé</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </Button>
          </div>
        </div>

        {/* Cartes récapitulatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Alertes totales</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">217</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 inline-flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  12%
                </span>{" "}
                par rapport à la semaine précédente
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Personnes détectées</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500 inline-flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  23%
                </span>{" "}
                par rapport à la semaine précédente
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Temps moyen d'alerte</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2s</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 inline-flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  5%
                </span>{" "}
                par rapport à la semaine précédente
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Alertes importantes</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-500 inline-flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  8%
                </span>{" "}
                par rapport à la semaine précédente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Activité détectée par caméra</CardTitle>
              <CardDescription>
                Vue des événements détectés sur les 7 derniers jours
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[300px] w-full flex items-center justify-center bg-muted/40 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted" />
                <span className="ml-2 text-muted-foreground">Graphique de détection d'activité</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Répartition par type d'alerte</CardTitle>
              <CardDescription>
                Distribution des différents types d'alertes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-muted/40 rounded-md">
                <span className="text-muted-foreground">Graphique circulaire des alertes</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Activité par heure</CardTitle>
              <CardDescription>
                Répartition horaire des détections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-muted/40 rounded-md">
                <span className="text-muted-foreground">Graphique de l'activité horaire</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rapport détaillé */}
        <Card>
          <CardHeader>
            <CardTitle>Rapport détaillé des caméras</CardTitle>
            <CardDescription>
              Performances et détections par caméra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Caméra</th>
                    <th className="text-center p-2">Alertes</th>
                    <th className="text-center p-2">Personnes</th>
                    <th className="text-center p-2">Temps actif</th>
                    <th className="text-center p-2">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Caméra Entrée", alerts: 87, persons: 21, uptime: "99.7%", performance: "Excellente" },
                    { name: "Caméra Jardin", alerts: 54, persons: 12, uptime: "98.2%", performance: "Bonne" },
                    { name: "Caméra Garage", alerts: 41, persons: 8, uptime: "94.5%", performance: "Moyenne" },
                    { name: "Caméra Arrière-cour", alerts: 35, persons: 7, uptime: "97.8%", performance: "Bonne" },
                  ].map((camera, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 font-medium">{camera.name}</td>
                      <td className="text-center p-2">{camera.alerts}</td>
                      <td className="text-center p-2">{camera.persons}</td>
                      <td className="text-center p-2">{camera.uptime}</td>
                      <td className="text-center p-2">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs 
                            ${camera.performance === "Excellente" ? "bg-green-500/20 text-green-600" : 
                              camera.performance === "Bonne" ? "bg-blue-500/20 text-blue-600" : 
                              "bg-yellow-500/20 text-yellow-600"}`}
                        >
                          {camera.performance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Analytics;