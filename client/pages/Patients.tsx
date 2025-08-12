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
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Patients() {
  const patients = [
    {
      id: 1,
      name: "Emma Thompson",
      age: 32,
      gender: "Femenino",
      phone: "(555) 123-4567",
      email: "emma.thompson@email.com",
      address: "123 Main St, Boston, MA",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      priority: "medium",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Davis",
      age: 45,
      gender: "Masculino",
      phone: "(555) 234-5678",
      email: "michael.davis@email.com",
      address: "456 Oak Ave, Boston, MA",
      lastVisit: "2024-01-10",
      condition: "Diabetes Type 2",
      priority: "high",
      status: "active",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      age: 28,
      gender: "Femenino",
      phone: "(555) 345-6789",
      email: "sarah.wilson@email.com",
      address: "789 Pine Rd, Boston, MA",
      lastVisit: "2024-01-12",
      condition: "Annual Check-up",
      priority: "low",
      status: "active",
    },
    {
      id: 4,
      name: "James Brown",
      age: 55,
      gender: "Masculino",
      phone: "(555) 456-7890",
      email: "james.brown@email.com",
      address: "321 Elm St, Boston, MA",
      lastVisit: "2024-01-08",
      condition: "Heart Disease",
      priority: "high",
      status: "active",
    },
    {
      id: 5,
      name: "Alice Johnson",
      age: 38,
      gender: "Femenino",
      phone: "(555) 567-8901",
      email: "alice.johnson@email.com",
      address: "654 Maple Dr, Boston, MA",
      lastVisit: "2024-01-14",
      condition: "Migraine",
      priority: "medium",
      status: "active",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-slate">Pacientes</h1>
            <p className="text-gray-600 mt-1">
              Gestionar y ver todos los registros de pacientes
            </p>
          </div>
          <Link to="/nuevo-paciente">
            <Button className="bg-medical-blue hover:bg-medical-navy mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Agregar nuevo paciente
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar pacientes por nombre, teléfono o condición..."
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patient Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-medical-slate">1,247</div>
              <p className="text-sm text-gray-600">Total Pacientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-medical-brown">892</div>
              <p className="text-sm text-gray-600">Pacientes activos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <p className="text-sm text-gray-600">Alta Prioridad</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">156</div>
              <p className="text-sm text-gray-600">Nuevos este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-slate">
              Registros de Pacientes
            </CardTitle>
            <CardDescription>
              Una lista de todos los pacientes, incluyendo su información de contacto y estado médico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                >
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-medical-beige rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-medium text-medical-slate">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                          <h3 className="text-lg font-semibold text-medical-slate truncate">
                            {patient.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getPriorityColor(patient.priority)}>
                              Prioridad {patient.priority === 'high' ? 'alta' : patient.priority === 'medium' ? 'media' : patient.priority === 'low' ? 'baja' : patient.priority}
                            </Badge>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status === 'active' ? 'Activo' : patient.status === 'inactive' ? 'Inactivo' : patient.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {patient.age} años • {patient.gender} • {patient.condition}
                        </p>
                        <div className="grid grid-cols-1 gap-2 mt-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{patient.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{patient.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{patient.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              Última visita: {new Date(patient.lastVisit).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                      <Link to="/historial-medico" className="flex-1 sm:flex-none">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white w-full"
                        >
                          Ver registro
                        </Button>
                      </Link>
                      <Link to="/programar-cita" className="flex-1 sm:flex-none">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-medical-brown text-medical-brown hover:bg-medical-brown hover:text-white w-full"
                        >
                          Programar
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="sm:ml-auto">
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
