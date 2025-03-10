import React from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  HardDrive, 
  Camera, 
  Wifi,
  Lock,
  Check,
  Moon,
  Sun,
  LogOut
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground mt-1">Configuration du système et préférences</p>
          </div>
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Sauvegarder les modifications
          </Button>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              <span>Général</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Sécurité</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <HardDrive className="h-4 w-4" />
              <span>Système</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de l'interface VigilAir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Thème</Label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTheme('light')}
                      className="gap-2"
                    >
                      <Sun className="h-4 w-4" />
                      Clair
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTheme('dark')}
                      className="gap-2"
                    >
                      <Moon className="h-4 w-4" />
                      Sombre
                    </Button>
                    <Button 
                      variant={theme === 'system' ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setTheme('system')}
                    >
                      Système
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations d'interface</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer/désactiver les animations de l'interface
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Langue</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profil utilisateur</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" defaultValue="Administrateur" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@exemple.com" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des alertes par email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Modifier le mot de passe
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de sécurité</CardTitle>
                <CardDescription>
                  Configurez les paramètres de sécurité de votre système
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Ajoutez une couche de sécurité supplémentaire
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Verrouillage automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Verrouiller l'application après une période d'inactivité
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Durée d'inactivité avant verrouillage</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 heure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Gérer les sessions</Label>
                  <div className="border rounded-md p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Appareil actuel</p>
                        <p className="text-sm text-muted-foreground">Navigateur web - Windows 10</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Terminer
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Application mobile</p>
                        <p className="text-sm text-muted-foreground">iPhone 14 - iOS 16</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Terminer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-destructive" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnecter tous les appareils
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Gestion des accès</CardTitle>
                <CardDescription>
                  Configurez les permissions d'accès au système
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Niveau d'accès requis</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger>
                      <SelectValue placeholder="Niveau d'accès" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="user">Utilisateur standard</SelectItem>
                      <SelectItem value="guest">Invité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Accès à distance</Label>
                    <p className="text-sm text-muted-foreground">
                      Autoriser l'accès au système depuis l'extérieur
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notification</CardTitle>
                <CardDescription>
                  Configurez comment et quand vous souhaitez recevoir des alertes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications push</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertes en temps réel sur votre appareil
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des alertes importantes par email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications sonores</Label>
                    <p className="text-sm text-muted-foreground">
                      Jouer un son lors des alertes importantes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Niveau de priorité minimal pour les notifications</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les alertes</SelectItem>
                      <SelectItem value="low">Alertes de niveau bas et supérieur</SelectItem>
                      <SelectItem value="medium">Alertes de niveau moyen et supérieur</SelectItem>
                      <SelectItem value="high">Alertes de niveau élevé uniquement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Heures silencieuses</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Début</p>
                      <Select defaultValue="22">
                        <SelectTrigger>
                          <SelectValue placeholder="Heure de début" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, '0')}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fin</p>
                      <Select defaultValue="7">
                        <SelectTrigger>
                          <SelectValue placeholder="Heure de fin" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, '0')}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres système</CardTitle>
                <CardDescription>
                  Configurez les paramètres techniques du système
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Démarrage automatique</Label>
                    <p className="text-sm text-muted-foreground">
                      Démarrer VigilAir au démarrage du système
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Qualité de stockage vidéo</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Qualité vidéo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Basse (économie d'espace)</SelectItem>
                      <SelectItem value="medium">Moyenne (recommandé)</SelectItem>
                      <SelectItem value="high">Haute (plus d'espace requis)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Durée de conservation des enregistrements</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Durée de conservation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 jours</SelectItem>
                      <SelectItem value="15">15 jours</SelectItem>
                      <SelectItem value="30">30 jours</SelectItem>
                      <SelectItem value="60">60 jours</SelectItem>
                      <SelectItem value="90">90 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Espace de stockage utilisé</Label>
                    <span className="text-sm font-medium">65% (195 Go / 300 Go)</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Espace estimé restant: environ 15 jours d'enregistrement
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full">
                  Vérifier les mises à jour
                </Button>
                <Button variant="outline" className="w-full">
                  Sauvegarder la configuration
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connexion réseau</CardTitle>
                <CardDescription>
                  Paramètres de connexion réseau
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <Label>Statut de la connexion</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Le système est actuellement connecté
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Tester la connexion
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ip">Adresse IP</Label>
                  <Input id="ip" defaultValue="192.168.1.100" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subnet">Masque de sous-réseau</Label>
                  <Input id="subnet" defaultValue="255.255.255.0" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gateway">Passerelle</Label>
                  <Input id="gateway" defaultValue="192.168.1.1" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;