import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Plus,
  Pill,
  Search,
  Filter,
  Download,
  Printer,
  Edit,
  Trash2,
  User,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

export default function Prescriptions() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newPrescription, setNewPrescription] = useState({
    pacienteId: "",
    pacienteNombre: "",
    fecha: new Date().toISOString().split('T')[0],
    diagnostico: "",
    medicamentos: [
      {
        nombre: "",
        dosis: "",
        frecuencia: "",
        duracion: "",
        viaAdministracion: "",
        instrucciones: "",
      }
    ],
    indicacionesGenerales: "",
    proximaCita: "",
    observaciones: "",
  });

  const prescriptions = [
    {
      id: "RX001",
      fecha: "2024-01-16",
      paciente: "Emma Thompson",
      edad: 32,
      diagnostico: "Hipertensión Arterial",
      medicamentos: [
        {
          nombre: "Losartán",
          dosis: "50mg",
          frecuencia: "1 vez al día",
          duracion: "30 días",
          viaAdministracion: "Oral",
          instrucciones: "Tomar por las mañanas con el desayuno"
        },
        {
          nombre: "Amlodipino",
          dosis: "5mg",
          frecuencia: "1 vez al día",
          duracion: "30 días",
          viaAdministracion: "Oral",
          instrucciones: "Tomar por las noches"
        }
      ],
      indicacionesGenerales: "Dieta baja en sodio, ejercicio regular, control de peso",
      proximaCita: "2024-02-16",
      status: "active",
      dispensado: false,
    },
    {
      id: "RX002",
      fecha: "2024-01-15",
      paciente: "Michael Davis",
      edad: 45,
      diagnostico: "Diabetes Tipo 2",
      medicamentos: [
        {
          nombre: "Metformina",
          dosis: "850mg",
          frecuencia: "2 veces al día",
          duracion: "90 días",
          viaAdministracion: "Oral",
          instrucciones: "Tomar con las comidas principales"
        }
      ],
      indicacionesGenerales: "Dieta para diabéticos, monitoreo de glucosa diario",
      proximaCita: "2024-03-15",
      status: "active",
      dispensado: true,
    },
    {
      id: "RX003",
      fecha: "2024-01-14",
      paciente: "Sarah Wilson",
      edad: 28,
      diagnostico: "Infección Respiratoria",
      medicamentos: [
        {
          nombre: "Amoxicilina",
          dosis: "500mg",
          frecuencia: "3 veces al día",
          duracion: "7 días",
          viaAdministracion: "Oral",
          instrucciones: "Tomar cada 8 horas con abundante agua"
        },
        {
          nombre: "Ibuprofeno",
          dosis: "400mg",
          frecuencia: "Cada 8 horas",
          duracion: "5 días",
          viaAdministracion: "Oral",
          instrucciones: "Solo en caso de dolor o fiebre"
        }
      ],
      indicacionesGenerales: "Reposo, abundantes líquidos, evitar cambios bruscos de temperatura",
      proximaCita: "2024-01-21",
      status: "completed",
      dispensado: true,
    }
  ];

  const medicamentosComunes = [
    "Paracetamol", "Ibuprofeno", "Amoxicilina", "Omeprazol", "Losartán",
    "Metformina", "Amlodipino", "Atorvastatina", "Levotiroxina", "Aspirina",
    "Captopril", "Furosemida", "Clonazepam", "Diclofenaco", "Ranitidina"
  ];

  const pacientesSugeridos = [
    { id: "1", nombre: "Emma Thompson", edad: 32 },
    { id: "2", nombre: "Michael Davis", edad: 45 },
    { id: "3", nombre: "Sarah Wilson", edad: 28 },
    { id: "4", nombre: "James Brown", edad: 55 },
    { id: "5", nombre: "Alice Johnson", edad: 38 },
  ];

  const handleInputChange = (field: string, value: any) => {
    setNewPrescription(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicamentoChange = (index: number, field: string, value: string) => {
    setNewPrescription(prev => ({
      ...prev,
      medicamentos: prev.medicamentos.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const addMedicamento = () => {
    setNewPrescription(prev => ({
      ...prev,
      medicamentos: [...prev.medicamentos, {
        nombre: "",
        dosis: "",
        frecuencia: "",
        duracion: "",
        viaAdministracion: "",
        instrucciones: "",
      }]
    }));
  };

  const removeMedicamento = (index: number) => {
    setNewPrescription(prev => ({
      ...prev,
      medicamentos: prev.medicamentos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva receta:", newPrescription);
    setIsCreateModalOpen(false);
    // Reset form
    setNewPrescription({
      pacienteId: "",
      pacienteNombre: "",
      fecha: new Date().toISOString().split('T')[0],
      diagnostico: "",
      medicamentos: [{
        nombre: "",
        dosis: "",
        frecuencia: "",
        duracion: "",
        viaAdministracion: "",
        instrucciones: "",
      }],
      indicacionesGenerales: "",
      proximaCita: "",
      observaciones: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnostico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || prescription.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-slate">
              Recetas Médicas
            </h1>
            <p className="text-gray-600 mt-1">
              Gestionar y crear recetas para pacientes
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-medical-blue hover:bg-medical-navy mt-4 sm:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Receta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center text-medical-slate">
                  <FileText className="w-5 h-5 mr-2" />
                  Crear Nueva Receta
                </DialogTitle>
                <DialogDescription>
                  Complete la información para generar una nueva receta médica
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información del Paciente */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Información del Paciente</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pacienteNombre">Paciente</Label>
                      <Select value={newPrescription.pacienteId} onValueChange={(value) => {
                        const paciente = pacientesSugeridos.find(p => p.id === value);
                        handleInputChange("pacienteId", value);
                        handleInputChange("pacienteNombre", paciente?.nombre || "");
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar paciente" />
                        </SelectTrigger>
                        <SelectContent>
                          {pacientesSugeridos.map(paciente => (
                            <SelectItem key={paciente.id} value={paciente.id}>
                              {paciente.nombre} ({paciente.edad} años)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="fecha">Fecha</Label>
                      <Input
                        id="fecha"
                        type="date"
                        value={newPrescription.fecha}
                        onChange={(e) => handleInputChange("fecha", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="diagnostico">Diagnóstico</Label>
                    <Input
                      id="diagnostico"
                      value={newPrescription.diagnostico}
                      onChange={(e) => handleInputChange("diagnostico", e.target.value)}
                      placeholder="Diagnóstico principal"
                      required
                    />
                  </div>
                </div>

                {/* Medicamentos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-medium">Medicamentos</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addMedicamento}>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Medicamento
                    </Button>
                  </div>
                  
                  {newPrescription.medicamentos.map((medicamento, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="font-medium">Medicamento {index + 1}</Label>
                          {newPrescription.medicamentos.length > 1 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeMedicamento(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Nombre del Medicamento</Label>
                            <Select 
                              value={medicamento.nombre} 
                              onValueChange={(value) => handleMedicamentoChange(index, "nombre", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar medicamento" />
                              </SelectTrigger>
                              <SelectContent>
                                {medicamentosComunes.map(med => (
                                  <SelectItem key={med} value={med}>{med}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Dosis</Label>
                            <Input
                              value={medicamento.dosis}
                              onChange={(e) => handleMedicamentoChange(index, "dosis", e.target.value)}
                              placeholder="ej: 500mg, 1 tableta"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Frecuencia</Label>
                            <Select 
                              value={medicamento.frecuencia} 
                              onValueChange={(value) => handleMedicamentoChange(index, "frecuencia", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Frecuencia" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1 vez al día">1 vez al día</SelectItem>
                                <SelectItem value="2 veces al día">2 veces al día</SelectItem>
                                <SelectItem value="3 veces al día">3 veces al día</SelectItem>
                                <SelectItem value="4 veces al día">4 veces al día</SelectItem>
                                <SelectItem value="Cada 4 horas">Cada 4 horas</SelectItem>
                                <SelectItem value="Cada 6 horas">Cada 6 horas</SelectItem>
                                <SelectItem value="Cada 8 horas">Cada 8 horas</SelectItem>
                                <SelectItem value="Cada 12 horas">Cada 12 horas</SelectItem>
                                <SelectItem value="Según necesidad">Según necesidad</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Duración</Label>
                            <Input
                              value={medicamento.duracion}
                              onChange={(e) => handleMedicamentoChange(index, "duracion", e.target.value)}
                              placeholder="ej: 7 días, 1 mes"
                            />
                          </div>
                          <div>
                            <Label>Vía de Administración</Label>
                            <Select 
                              value={medicamento.viaAdministracion} 
                              onValueChange={(value) => handleMedicamentoChange(index, "viaAdministracion", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Vía" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Oral">Oral</SelectItem>
                                <SelectItem value="Sublingual">Sublingual</SelectItem>
                                <SelectItem value="Tópica">Tópica</SelectItem>
                                <SelectItem value="Inhalada">Inhalada</SelectItem>
                                <SelectItem value="Oftálmica">Oftálmica</SelectItem>
                                <SelectItem value="Ótica">Ótica</SelectItem>
                                <SelectItem value="Rectal">Rectal</SelectItem>
                                <SelectItem value="Intramuscular">Intramuscular</SelectItem>
                                <SelectItem value="Intravenosa">Intravenosa</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Instrucciones Especiales</Label>
                          <Textarea
                            value={medicamento.instrucciones}
                            onChange={(e) => handleMedicamentoChange(index, "instrucciones", e.target.value)}
                            placeholder="Instrucciones específicas para este medicamento"
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Indicaciones Generales */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Indicaciones Generales</Label>
                  <Textarea
                    value={newPrescription.indicacionesGenerales}
                    onChange={(e) => handleInputChange("indicacionesGenerales", e.target.value)}
                    placeholder="Recomendaciones generales, cuidados, dieta, etc."
                    rows={3}
                  />
                </div>

                {/* Próxima Cita */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="proximaCita">Próxima Cita (opcional)</Label>
                    <Input
                      id="proximaCita"
                      type="date"
                      value={newPrescription.proximaCita}
                      onChange={(e) => handleInputChange("proximaCita", e.target.value)}
                    />
                  </div>
                </div>

                {/* Observaciones */}
                <div>
                  <Label htmlFor="observaciones">Observaciones Adicionales</Label>
                  <Textarea
                    id="observaciones"
                    value={newPrescription.observaciones}
                    onChange={(e) => handleInputChange("observaciones", e.target.value)}
                    placeholder="Notas adicionales para el paciente o farmaceuta"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-medical-blue hover:bg-medical-navy">
                    <FileText className="w-4 h-4 mr-2" />
                    Crear Receta
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar recetas por paciente, diagnóstico o número..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="expired">Expiradas</SelectItem>
                </SelectContent>
              </Select>
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

        {/* Prescription Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-medical-slate">124</div>
              <p className="text-sm text-gray-600">Total Recetas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">89</div>
              <p className="text-sm text-gray-600">Activas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <p className="text-sm text-gray-600">Pendientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-sm text-gray-600">Este Mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Prescriptions List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-slate">
              Recetas Médicas
            </CardTitle>
            <CardDescription>
              Lista de todas las recetas generadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-medical-slate">
                            Receta #{prescription.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(prescription.fecha).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status === 'active' ? 'Activa' : 
                           prescription.status === 'completed' ? 'Completada' : 'Expirada'}
                        </Badge>
                        {prescription.dispensado && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            Dispensada
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="w-4 h-4 text-gray-500" />
                          <span>{prescription.paciente} ({prescription.edad} años)</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-gray-500" />
                          <span>{prescription.diagnostico}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label className="text-sm font-medium text-gray-700">Medicamentos:</Label>
                        {prescription.medicamentos.map((med, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="flex items-start space-x-2 mb-2">
                              <Pill className="w-4 h-4 text-medical-brown mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <span className="font-medium text-sm block">{med.nombre}</span>
                                <div className="text-xs text-gray-600 mt-1 space-y-1">
                                  <div>Dosis: {med.dosis}</div>
                                  <div>Frecuencia: {med.frecuencia}</div>
                                  <div>Duración: {med.duracion}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {prescription.indicacionesGenerales && (
                        <div className="mb-4">
                          <Label className="text-sm font-medium text-gray-700">Indicaciones:</Label>
                          <p className="text-sm text-gray-600 mt-1">{prescription.indicacionesGenerales}</p>
                        </div>
                      )}

                      {prescription.proximaCita && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Próxima cita: {new Date(prescription.proximaCita).toLocaleDateString('es-ES')}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                      <Button variant="outline" size="sm" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white flex-1 sm:flex-none">
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir
                      </Button>
                      <Button variant="outline" size="sm" className="border-medical-brown text-medical-brown hover:bg-medical-brown hover:text-white flex-1 sm:flex-none">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white flex-1 sm:flex-none">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
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
