import React, { useState } from 'react';
import { 
  Camera, 
  Grid, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Settings, 
  Download, 
  Play, 
  Pause,
  RefreshCw,
  Monitor,
  Film,
  Plus
} from 'lucide-react';
import MainLayout from '../components/MainLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// Composant pour un flux vidéo individuel
const VideoStream = ({ camera, isFullscreen = false, isPaused = false, onFullscreen, onPause }) => {
  const [isMuted, setIsMuted] = useState(false);
  
  return (
    <Card className={`border overflow-hidden transition-all ${isFullscreen ? 'col-span-2 row-span-2' : ''}`}>
      <div className="relative aspect-video bg-black">
        <img 
          src="/placeholder.svg" 
          alt={camera.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay d'informations */}
        <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-start">
          <Badge variant="outline" className="bg-background/70 backdrop-blur-sm">
            {camera.name}
          </Badge>
          <Badge variant="outline" className="bg-background/70 backdrop-blur-sm">
            {camera.resolution}
          </Badge>
        </div>
        
        {/* Contrôles en overlay */}
        <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between items-center bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPause}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onFullscreen}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {isPaused && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Play className="h-16 w-16 text-white opacity-80" />
          </div>
        )}
      </div>
      
      <CardFooter className="p-2 flex justify-between items-center bg-card">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm">En direct</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour la grille vidéo
const VideoGrid = ({ layout = "2x2" }) => {
  const [cameras] = useState([
    { id: 1, name: "Caméra Entrée", resolution: "1080p", status: "online" },
    { id: 2, name: "Caméra Jardin", resolution: "720p", status: "online" },
    { id: 3, name: "Caméra Garage", resolution: "4K", status: "offline" },
    { id: 4, name: "Caméra Arrière-cour", resolution: "1080p", status: "online" }
  ]);
  
  const [fullscreenCamera, setFullscreenCamera] = useState(null);
  const [pausedCameras, setPausedCameras] = useState([]);
  
  const toggleFullscreen = (cameraId) => {
    if (fullscreenCamera === cameraId) {
      setFullscreenCamera(null);
    } else {
      setFullscreenCamera(cameraId);
    }
  };
  
  const togglePause = (cameraId) => {
    if (pausedCameras.includes(cameraId)) {
      setPausedCameras(pausedCameras.filter(id => id !== cameraId));
    } else {
      setPausedCameras([...pausedCameras, cameraId]);
    }
  };
  
  // Déterminer le nombre de colonnes en fonction de la mise en page
  const gridCols = layout === "1x1" ? "grid-cols-1" : 
                  layout === "2x1" ? "grid-cols-2" : 
                  layout === "3x1" ? "grid-cols-3" : "grid-cols-2";
  
  return (
    <div className={`grid ${gridCols} gap-4 md:grid-rows-2`}>
      {cameras.map((camera) => {
        // Afficher toutes les caméras si nous sommes en mode grille complète
        // Ou seulement la caméra en plein écran si nous sommes en mode plein écran
        const shouldShow = fullscreenCamera === null || fullscreenCamera === camera.id;
        
        if (!shouldShow) return null;
        
        return (
          <VideoStream 
            key={camera.id}
            camera={camera}
            isFullscreen={fullscreenCamera === camera.id}
            isPaused={pausedCameras.includes(camera.id)}
            onFullscreen={() => toggleFullscreen(camera.id)}
            onPause={() => togglePause(camera.id)}
          />
        );
      })}
    </div>
  );
};

// Composant de contrôle des caméras
const CameraControls = () => {
  return (
    <Card className="border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Contrôles des caméras
        </CardTitle>
        <CardDescription>Ajuster les paramètres de visualisation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Mise en page</Label>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
              <Monitor className="h-4 w-4" />
              <span>1×1</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
              <Grid className="h-4 w-4" />
              <span>2×1</span>
            </Button>
            <Button variant="default" size="sm" className="h-8 px-2 flex items-center gap-1">
              <Grid className="h-4 w-4" />
              <span>2×2</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-1">
              <Grid className="h-4 w-4" />
              <span>3×3</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Qualité des flux</Label>
          <Select defaultValue="auto">
            <SelectTrigger>
              <SelectValue placeholder="Qualité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto (Adaptatif)</SelectItem>
              <SelectItem value="high">Haute (1080p)</SelectItem>
              <SelectItem value="medium">Moyenne (720p)</SelectItem>
              <SelectItem value="low">Basse (480p)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Détection IA en temps réel</Label>
            <Switch defaultChecked />
          </div>
          <p className="text-xs text-muted-foreground">
            Affiche en temps réel les détections de l'IA sur les flux vidéo
          </p>
        </div>
        
        <div className="space-y-2">
          <Label>Volume</Label>
          <Slider defaultValue={[30]} max={100} step={1} />
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Rafraîchir tous les flux</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Composant principal de la page
const Live = () => {
  const [activeView, setActiveView] = useState("live");

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Flux en direct</h1>
            <p className="text-muted-foreground mt-1">Visualisation temps réel des caméras</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Ajouter caméra</span>
            </Button>
            <Tabs defaultValue="live" onValueChange={setActiveView}>
              <TabsList>
                <TabsTrigger value="live" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span>En direct</span>
                </TabsTrigger>
                <TabsTrigger value="recordings" className="flex items-center gap-2">
                  <Film className="h-4 w-4" />
                  <span>Enregistrements</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {activeView === "live" ? (
              <VideoGrid layout="2x2" />
            ) : (
              <Card className="border h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Enregistrements</h2>
                  <p className="text-muted-foreground mb-4">
                    Sélectionnez une date et une caméra pour voir les enregistrements disponibles.
                  </p>
                  <div className="flex justify-center">
                    <Button>Sélectionner une date</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
          <div className="lg:col-span-1">
            <CameraControls />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Live;