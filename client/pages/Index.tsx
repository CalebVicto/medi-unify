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
import {
  Calendar,
  Users,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const todaysAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Emma Thompson",
      type: "Check-up",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Michael Davis",
      type: "Follow-up",
      status: "confirmed",
    },
    {
      id: 3,
      time: "02:00 PM",
      patient: "Sarah Wilson",
      type: "Consultation",
      status: "pending",
    },
    {
      id: 4,
      time: "03:30 PM",
      patient: "James Brown",
      type: "Check-up",
      status: "confirmed",
    },
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Alice Johnson",
      lastVisit: "2 days ago",
      condition: "Hypertension",
      priority: "medium",
    },
    {
      id: 2,
      name: "Robert Smith",
      lastVisit: "1 week ago",
      condition: "Diabetes",
      priority: "high",
    },
    {
      id: 3,
      name: "Maria Garcia",
      lastVisit: "3 days ago",
      condition: "Annual Check-up",
      priority: "low",
    },
  ];

  const stats = [
    {
      title: "Total de pacientes",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-medical-blue",
    },
    {
      title: "Citas médicas de hoy",
      value: "24",
      change: "+5%",
      trend: "up",
      icon: Calendar,
      color: "text-medical-brown",
    },
    {
      title: "Recetas pendientes",
      value: "8",
      change: "-2%",
      trend: "down",
      icon: FileText,
      color: "text-medical-slate",
    },
    {
      title: "Tiempo de espera promedio",
      value: "12min",
      change: "-8%",
      trend: "down",
      icon: Clock,
      color: "text-green-600",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-slate">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Bienvenido de nuevo, Dr. Morales. Esto es lo que sucede hoy.
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button className="bg-medical-blue hover:bg-medical-navy">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Paciente
            </Button>
            <Button
              variant="outline"
              className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Programar
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-medical-slate">
                    {stat.value}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-600">
                    <TrendingUp
                      className={`w-3 h-3 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    />
                    <span
                      className={
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {stat.change}
                    </span>
                    <span>del mes pasado</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-medical-slate">
                  Citas de hoy
                </CardTitle>
                <CardDescription>
                  Tienes {todaysAppointments.length} citas programadas
                </CardDescription>
              </div>
              <Link to="/appointments">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-medical-blue hover:text-medical-navy"
                >
                  Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-medical-blue">
                        {appointment.time}
                      </div>
                      <div>
                        <p className="font-medium text-medical-slate">
                          {appointment.patient}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.type}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-medical-slate">
                  Pacientes recientes
                </CardTitle>
                <CardDescription>Últimas actividades de pacientes</CardDescription>
              </div>
              <Link to="/patients">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-medical-blue hover:text-medical-navy"
                >
                  Ver todas <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-medical-beige rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-medical-slate">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-medical-slate">
                          {patient.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {patient.lastVisit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(patient.priority)}>
                        {patient.priority}
                      </Badge>
                      <p className="text-xs text-gray-600 mt-1">
                        {patient.condition}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-slate flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-medical-brown" />
              Acciones rápidas y alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
              >
                <Users className="w-6 h-6" />
                <span>Agregar nuevo paciente</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 border-medical-brown text-medical-brown hover:bg-medical-brown hover:text-white"
              >
                <Calendar className="w-6 h-6" />
                <span>Programar cita</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center space-y-2 border-medical-slate text-medical-slate hover:bg-medical-slate hover:text-white"
              >
                <FileText className="w-6 h-6" />
                <span>Escribir receta</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
