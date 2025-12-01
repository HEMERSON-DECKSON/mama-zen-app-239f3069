import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, X, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Notification {
  id: string;
  title: string;
  description: string;
  type: "vaccine" | "appointment" | "medicine" | "custom";
  date: string;
  time: string;
  enabled: boolean;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    description: "",
    type: "custom" as Notification["type"],
    date: "",
    time: "",
  });

  useEffect(() => {
    // Load notifications from localStorage
    const saved = localStorage.getItem("mamae-zen-notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save notifications to localStorage
    localStorage.setItem("mamae-zen-notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = () => {
    if (!newNotification.title || !newNotification.date || !newNotification.time) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotification,
      enabled: true,
    };

    setNotifications([...notifications, notification]);
    setNewNotification({
      title: "",
      description: "",
      type: "custom",
      date: "",
      time: "",
    });
    setIsDialogOpen(false);
    toast.success("✅ Lembrete criado com sucesso!");
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Lembrete removido");
  };

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "vaccine":
        return "💉";
      case "appointment":
        return "🏥";
      case "medicine":
        return "💊";
      default:
        return "🔔";
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "vaccine":
        return "bg-blue-500";
      case "appointment":
        return "bg-green-500";
      case "medicine":
        return "bg-purple-500";
      default:
        return "bg-orange-500";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20 border-2 border-purple-300 dark:border-purple-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-lg text-purple-700 dark:text-purple-400">
              Central de Lembretes
            </CardTitle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-1" />
                Novo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Novo Lembrete</DialogTitle>
                <DialogDescription>
                  Configure um lembrete importante para não esquecer
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={newNotification.type}
                    onValueChange={(value) =>
                      setNewNotification({ ...newNotification, type: value as Notification["type"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vaccine">💉 Vacina</SelectItem>
                      <SelectItem value="appointment">🏥 Consulta</SelectItem>
                      <SelectItem value="medicine">💊 Medicamento</SelectItem>
                      <SelectItem value="custom">🔔 Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Vacina de 3 meses"
                    value={newNotification.title}
                    onChange={(e) =>
                      setNewNotification({ ...newNotification, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    placeholder="Detalhes adicionais (opcional)"
                    value={newNotification.description}
                    onChange={(e) =>
                      setNewNotification({ ...newNotification, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newNotification.date}
                      onChange={(e) =>
                        setNewNotification({ ...newNotification, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newNotification.time}
                      onChange={(e) =>
                        setNewNotification({ ...newNotification, time: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={addNotification} className="w-full">
                  Criar Lembrete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription className="text-xs leading-relaxed">
          Configure lembretes para vacinas, consultas e medicamentos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-3 pt-0">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum lembrete configurado</p>
            <p className="text-xs mt-1">Clique em "Novo" para criar</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getTypeColor(notification.type)}`} />
              <CardContent className="p-3 pl-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getTypeIcon(notification.type)}</span>
                      <h4 className="font-semibold text-sm leading-tight">{notification.title}</h4>
                    </div>
                    {notification.description && (
                      <p className="text-xs text-muted-foreground pl-7">{notification.description}</p>
                    )}
                    <div className="flex items-center gap-3 pl-7 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(notification.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(notification.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
