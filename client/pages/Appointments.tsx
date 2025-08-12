import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Clock,
  User,
  Phone,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Appointments() {
  const appointments = [
    {
      id: 1,
      time: "09:00 AM",
      date: "2024-01-16",
      patient: "Emma Thompson",
      type: "Check-up",
      duration: "30 min",
      status: "confirmed",
      phone: "(555) 123-4567",
      notes: "Annual physical examination",
    },
    {
      id: 2,
      time: "10:30 AM",
      date: "2024-01-16",
      patient: "Michael Davis",
      type: "Follow-up",
      duration: "45 min",
      status: "confirmed",
      phone: "(555) 234-5678",
      notes: "Diabetes management review",
    },
    {
      id: 3,
      time: "11:30 AM",
      date: "2024-01-16",
      patient: "Sarah Wilson",
      type: "Consultation",
      duration: "60 min",
      status: "pending",
      phone: "(555) 345-6789",
      notes: "Initial consultation for chronic headaches",
    },
    {
      id: 4,
      time: "02:00 PM",
      date: "2024-01-16",
      patient: "James Brown",
      type: "Check-up",
      duration: "30 min",
      status: "confirmed",
      phone: "(555) 456-7890",
      notes: "Heart disease monitoring",
    },
    {
      id: 5,
      time: "03:30 PM",
      date: "2024-01-16",
      patient: "Alice Johnson",
      type: "Treatment",
      duration: "45 min",
      status: "in-progress",
      phone: "(555) 567-8901",
      notes: "Migraine treatment session",
    },
    {
      id: 6,
      time: "04:30 PM",
      date: "2024-01-16",
      patient: "Robert Smith",
      type: "Emergency",
      duration: "30 min",
      status: "urgent",
      phone: "(555) 678-9012",
      notes: "Chest pain evaluation",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "urgent":
        return "bg-red-200 text-red-900 border-red-300";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "text-red-600";
      case "Check-up":
        return "text-medical-blue";
      case "Follow-up":
        return "text-medical-brown";
      case "Consultation":
        return "text-medical-slate";
      case "Treatment":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-slate">
              Citas Médicas
            </h1>
            <p className="text-gray-600 mt-1">
              Gestionar y programar citas de pacientes
            </p>
          </div>
          <Button className="bg-medical-blue hover:bg-medical-navy mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Programar Cita
          </Button>
        </div>

        {/* Date Navigation and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-medical-slate">
                    Hoy
                  </h2>
                  <p className="text-sm text-gray-600">16 de Enero, 2024</p>
                </div>
                <Button variant="outline" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar citas..."
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-medical-slate">24</div>
              <p className="text-sm text-gray-600">Total Hoy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-sm text-gray-600">Confirmadas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <p className="text-sm text-gray-600">Pendientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <p className="text-sm text-gray-600">En Progreso</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">1</div>
              <p className="text-sm text-gray-600">Urgentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-slate flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Agenda de Hoy
            </CardTitle>
            <CardDescription>
              Todas las citas programadas para hoy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-medical-blue rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm font-medium text-medical-blue mt-2">
                          {appointment.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-medical-slate">
                            {appointment.patient}
                          </h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span className={getTypeColor(appointment.type)}>
                              {appointment.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{appointment.phone}</span>
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">
                            "{appointment.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {appointment.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Confirmar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                      {appointment.status === "confirmed" && (
                        <Button
                          size="sm"
                          className="bg-medical-blue hover:bg-medical-navy"
                        >
                          Iniciar Sesión
                        </Button>
                      )}
                      {appointment.status === "in-progress" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Completar
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-medical-brown text-medical-brown hover:bg-medical-brown hover:text-white"
                      >
                        Reprogramar
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
