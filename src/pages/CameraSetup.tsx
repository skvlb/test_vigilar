import React, { useState } from 'react';
import { 
  Camera, 
  Search, 
  Plus, 
  Trash2, 
  Settings, 
  MoreVertical, 
  CheckCircle, 
  Loader2, 
  XCircle,
  Info,
  RefreshCw,
  Edit,
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

// Mock data pour les caméras
const MOCK_CAMERAS = [
  { id: 1, name: "Caméra Entrée", type: "IP", ip: "192.168.1.100", resolution: "1080p", status: "online", protocol: "RTSP" },
  { id: 2, name: "Caméra Jardin", type: "USB", port: "USB0", resolution: "720p", status: "online", protocol: "USB" },
  { id: 3, name: "Caméra Garage", type: "IP", ip: "192.168.1.101", resolution: "4K", status: "offline", protocol: "ONVIF" },
  { id: 4, name: "Caméra Arrière-cour", type: "IP", ip: "192.168.1.102", resolution: "1080p", status: "error", protocol: "RTSP" },
];

// Composant pour la card de caméra
const CameraCard = ({ camera, onEdit, onDelete }) => {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    error: "bg-red-500"
  };
  
  const statusLabels = {
    online: "En ligne",
    offline: "Hors ligne",
    error: "Erreur"
  };

  return (
    <Card className="border hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {camera.name}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(camera)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(camera)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>
          {camera.type === "IP" ? camera.ip : "Port " + camera.port}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-32 bg-black rounded-md flex items-center justify-center">
            {camera.status === "online" ? (
              <img 
                src="/placeholder.svg"
                alt={camera.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="text-center">
                <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Aperçu non disponible</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium">{camera.type}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Protocole</p>
              <p className="font-medium">{camera.protocol}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Résolution</p>
              <p className="font-medium">{camera.resolution}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Statut</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColors[camera.status]}`}></div>
                <p className="font-medium">{statusLabels[camera.status]}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <Button variant="ghost" size="sm">Test</Button>
        <Button size="sm">Configurer</Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour le scanner de caméras
const CameraScanner = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [foundCameras, setFoundCameras] = useState([]);
  
  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setFoundCameras([]);
    
    // Simuler une progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // On ajoute les caméras fictives à la fin du scan
          const newCameras = MOCK_CAMERAS.slice(0, 3);
          setFoundCameras(newCameras);
          onScanComplete(newCameras);
          return 100;
        }
        return prev + 10;
      });
      
      // Simuler la découverte graduelle de caméras
      if (progress === 20) {
        setFoundCameras([MOCK_CAMERAS[0]]);
      } else if (progress === 50) {
        setFoundCameras([MOCK_CAMERAS[0], MOCK_CAMERAS[1]]);
      } else if (progress === 80) {
        setFoundCameras([MOCK_CAMERAS[0], MOCK_CAMERAS[1], MOCK_CAMERAS[2]]);
      }
    }, 500);
  };
  
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Scanner les caméras
        </CardTitle>
        <CardDescription>
          Rechercher automatiquement des caméras sur le réseau
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isScanning ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scan en cours...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {foundCameras.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Caméras trouvées: {foundCameras.length}</p>
                <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                  {foundCameras.map((camera) => (
                    <div key={camera.id} className="flex items-center gap-2 text-sm p-2 border-b last:border-0">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="font-medium">{camera.name}</span>
                      <span className="text-muted-foreground ml-auto">{camera.ip || camera.port}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="mb-4">Lancez un scan pour détecter les caméras sur votre réseau</p>
            {foundCameras.length > 0 && (
              <p className="text-sm text-muted-foreground mb-4">
                Dernier scan: {foundCameras.length} caméras trouvées
              </p>
            )}
            <Button onClick={startScan} className="w-full">
              Lancer le scan
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t flex justify-between text-sm">
        <p className="text-muted-foreground">
          Protocoles supportés: RTSP, ONVIF, USB
        </p>
      </CardFooter>
    </Card>
  );
};

// Formulaire pour ajouter/modifier une caméra manuellement
const CameraForm = ({ camera = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: camera?.name || "",
    type: camera?.type || "IP",
    ip: camera?.ip || "",
    port: camera?.port || "",
    protocol: camera?.protocol || "RTSP",
    resolution: camera?.resolution || "1080p"
  });
  
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = () => {
    onSave({
      ...formData,
      id: camera?.id || Date.now()
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom de la caméra</Label>
        <Input 
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ex: Caméra Entrée"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Type de caméra</Label>
        <Select 
          value={formData.type}
          onValueChange={(value) => handleChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IP">Caméra IP</SelectItem>
            <SelectItem value="USB">Caméra USB</SelectItem>
            <SelectItem value="RTSP">Caméra RTSP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {formData.type === "IP" ? (
        <div className="space-y-2">
          <Label htmlFor="ip">Adresse IP</Label>
          <Input 
            id="ip"
            value={formData.ip}
            onChange={(e) => handleChange("ip", e.target.value)}
            placeholder="Ex: 192.168.1.100"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="port">Port USB</Label>
          <Input 
            id="port"
            value={formData.port}
            onChange={(e) => handleChange("port", e.target.value)}
            placeholder="Ex: USB0"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="protocol">Protocole</Label>
        <Select 
          value={formData.protocol}
          onValueChange={(value) => handleChange("protocol", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le protocole" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTSP">RTSP</SelectItem>
            <SelectItem value="ONVIF">ONVIF</SelectItem>
            <SelectItem value="HTTP">HTTP</SelectItem>
            <SelectItem value="USB">USB</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="resolution">Résolution</Label>
        <Select 
          value={formData.resolution}
          onValueChange={(value) => handleChange("resolution", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner la résolution" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="480p">480p</SelectItem>
            <SelectItem value="720p">720p</SelectItem>
            <SelectItem value="1080p">1080p</SelectItem>
            <SelectItem value="4K">4K</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>Annuler</Button>
        <Button onClick={handleSubmit}>
          {camera ? "Mettre à jour" : "Ajouter"}
        </Button>
      </div>
    </div>
  );
};

// Composant principal
const CameraSetup = () => {
  const [cameras, setCameras] = useState(MOCK_CAMERAS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCamera, setEditingCamera] = useState(null);
  const [activeTab, setActiveTab] = useState("gallery");
  
  const handleScanComplete = (foundCameras) => {
    // Fusionner les caméras trouvées avec celles existantes
    const existingIds = cameras.map(cam => cam.id);
    const newCameras = foundCameras.filter(cam => !existingIds.includes(cam.id));
    
    if (newCameras.length > 0) {
      setCameras([...cameras, ...newCameras]);
    }
  };
  
  const handleAddCamera = (camera) => {
    setCameras([...cameras, { ...camera, status: "online" }]);
    setIsAddDialogOpen(false);
  };
  
  const handleEditCamera = (camera) => {
    setEditingCamera(camera);
  };
  
  const handleUpdateCamera = (updatedCamera) => {
    setCameras(cameras.map(cam => 
      cam.id === updatedCamera.id ? updatedCamera : cam
    ));
    setEditingCamera(null);
  };
  
  const handleDeleteCamera = (camera) => {
    setCameras(cameras.filter(cam => cam.id !== camera.id));
  };
  
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Configuration des caméras</h1>
            <p className="text-muted-foreground mt-1">Gérer et configurer vos dispositifs de surveillance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une caméra
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une caméra</DialogTitle>
                  <DialogDescription>
                    Configurez manuellement une nouvelle caméra.
                  </DialogDescription>
                </DialogHeader>
                <CameraForm 
                  onSave={handleAddCamera}
                  onCancel={() => setIsAddDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Galerie</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>Liste détaillée</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cameras.map((camera) => (
                <CameraCard 
                  key={camera.id}
                  camera={camera}
                  onEdit={handleEditCamera}
                  onDelete={handleDeleteCamera}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <Card className="border">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {cameras.map(camera => (
                    <div key={camera.id} className="p-3 border rounded-md flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${camera.status === 'online' ? 'bg-green-500' : camera.status === 'offline' ? 'bg-gray-400' : 'bg-red-500'}`}></div>
                        <div>
                          <p className="font-medium">{camera.name}</p>
                          <p className="text-sm text-muted-foreground">{camera.type === "IP" ? camera.ip : camera.port} - {camera.protocol}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditCamera(camera)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCamera(camera)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            <CameraScanner onScanComplete={handleScanComplete} />
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Guide de configuration
                </CardTitle>
                <CardDescription>
                  Comment ajouter et configurer vos caméras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Détection automatique</h3>
                      <p className="text-sm text-muted-foreground">
                        Utilisez le scanner pour détecter les caméras sur le réseau. Cette méthode fonctionne pour les caméras IP ONVIF et RTSP.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Configuration manuelle</h3>
                      <p className="text-sm text-muted-foreground">
                        Si votre caméra n'est pas détectée automatiquement, vous pouvez l'ajouter manuellement. Vous aurez besoin de son adresse IP et du protocole utilisé.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Tests et validation</h3>
                      <p className="text-sm text-muted-foreground">
                        Une fois configurée, testez votre caméra pour vous assurer qu'elle fonctionne correctement avec le système VigilAir.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog pour éditer une caméra */}
      {editingCamera && (
        <Dialog 
          open={!!editingCamera} 
          onOpenChange={(open) => !open && setEditingCamera(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la caméra</DialogTitle>
              <DialogDescription>
                Modifier les paramètres de "{editingCamera.name}".
              </DialogDescription>
            </DialogHeader>
            <CameraForm 
              camera={editingCamera}
              onSave={handleUpdateCamera}
              onCancel={() => setEditingCamera(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

export default CameraSetup;