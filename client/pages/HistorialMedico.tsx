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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Printer,
  Edit,
  Calendar,
  Clock,
  User,
  Heart,
  AlertTriangle,
  Activity,
  Pill,
  Stethoscope,
  Thermometer,
  Weight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HistorialMedico() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRecord, setNewRecord] = useState({
    tipo: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toTimeString().slice(0, 5),
    motivo: "",
    sintomas: "",
    examenFisico: "",
    diagnostico: "",
    tratamiento: "",
    medicamentos: "",
    signos: {
      presionSistolica: "",
      presionDiastolica: "",
      frecuenciaCardiaca: "",
      temperatura: "",
      peso: "",
      altura: "",
      saturacionOxigeno: "",
      glucosa: "",
    },
    observaciones: "",
    proximaCita: "",
  });

  // Pacientes ejemplo
  const pacientes = [
    {
      id: "1",
      nombre: "Emma Thompson",
      edad: 32,
      genero: "Femenino",
      telefono: "(555) 123-4567",
      ultimaVisita: "2024-01-15",
    },
    {
      id: "2",
      nombre: "Michael Davis",
      edad: 45,
      genero: "Masculino",
      telefono: "(555) 234-5678",
      ultimaVisita: "2024-01-10",
    },
    {
      id: "3",
      nombre: "Sarah Wilson",
      edad: 28,
      genero: "Femenino",
      telefono: "(555) 345-6789",
      ultimaVisita: "2024-01-12",
    },
  ];

  // Historial médico ejemplo
  const historialMedico = {
    "1": [
      {
        id: "1",
        fecha: "2024-01-15",
        hora: "10:00",
        tipo: "Consulta General",
        motivo: "Control de presión arterial",
        sintomas: "Dolor de cabeza ocasional, mareos",
        examenFisico:
          "Paciente consciente, orientada. Cardiopulmonar sin alteraciones.",
        diagnostico: "Hipertensión arterial controlada",
        tratamiento: "Continuar con medicación actual",
        medicamentos: "Losartán 50mg 1 vez al día",
        signos: {
          presionSistolica: "140",
          presionDiastolica: "90",
          frecuenciaCardiaca: "78",
          temperatura: "36.5",
          peso: "68",
          altura: "165",
          saturacionOxigeno: "98",
          glucosa: "95",
        },
        observaciones:
          "Paciente refiere buena adherencia al tratamiento. Se recomienda continuar con dieta baja en sodio.",
        proximaCita: "2024-02-15",
      },
      {
        id: "2",
        fecha: "2023-12-15",
        hora: "09:30",
        tipo: "Chequeo Anual",
        motivo: "Examen médico anual",
        sintomas: "Ninguno en particular",
        examenFisico: "Exploración general normal",
        diagnostico: "Estado general bueno, hipertensión arterial",
        tratamiento: "Inicio de antihipertensivo",
        medicamentos: "Losartán 50mg",
        signos: {
          presionSistolica: "150",
          presionDiastolica: "95",
          frecuenciaCardiaca: "82",
          temperatura: "36.7",
          peso: "70",
          altura: "165",
          saturacionOxigeno: "99",
          glucosa: "88",
        },
        observaciones:
          "Primera detección de hipertensión arterial. Se inicia tratamiento y seguimiento.",
        proximaCita: "2024-01-15",
      },
    ],
    "2": [
      {
        id: "3",
        fecha: "2024-01-10",
        hora: "14:00",
        tipo: "Seguimiento",
        motivo: "Control de diabetes",
        sintomas: "Fatiga, sed ocasional",
        examenFisico:
          "Estado general conservado. Extremidades sin alteraciones.",
        diagnostico: "Diabetes tipo 2 en control",
        tratamiento: "Ajuste de medicación",
        medicamentos: "Metformina 850mg 2 veces al día",
        signos: {
          presionSistolica: "130",
          presionDiastolica: "85",
          frecuenciaCardiaca: "75",
          temperatura: "36.8",
          peso: "82",
          altura: "175",
          saturacionOxigeno: "97",
          glucosa: "140",
        },
        observaciones:
          "HbA1c: 7.2%. Mejoría en control glucémico. Continuar con plan nutricional.",
        proximaCita: "2024-03-10",
      },
    ],
    "3": [
      {
        id: "4",
        fecha: "2024-01-12",
        hora: "11:00",
        tipo: "Consulta General",
        motivo: "Dolor de cabeza recurrente",
        sintomas: "Cefalea frontal, molestia en cuello",
        examenFisico: "Tensión muscular en región cervical. Reflejos normales.",
        diagnostico: "Cefalea tensional",
        tratamiento: "Relajación muscular, analgésicos",
        medicamentos: "Ibuprofeno 400mg según necesidad",
        signos: {
          presionSistolica: "115",
          presionDiastolica: "75",
          frecuenciaCardiaca: "68",
          temperatura: "36.4",
          peso: "58",
          altura: "160",
          saturacionOxigeno: "99",
          glucosa: "85",
        },
        observaciones:
          "Se recomienda manejo del estrés y ejercicios de relajación. Revisión en 2 semanas.",
        proximaCita: "2024-01-26",
      },
    ],
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith("signos.")) {
      const signoField = field.split(".")[1];
      setNewRecord((prev) => ({
        ...prev,
        signos: {
          ...prev.signos,
          [signoField]: value,
        },
      }));
    } else {
      setNewRecord((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nuevo registro médico:", newRecord);
    setIsAddRecordOpen(false);
    // Reset form
    setNewRecord({
      tipo: "",
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toTimeString().slice(0, 5),
      motivo: "",
      sintomas: "",
      examenFisico: "",
      diagnostico: "",
      tratamiento: "",
      medicamentos: "",
      signos: {
        presionSistolica: "",
        presionDiastolica: "",
        frecuenciaCardiaca: "",
        temperatura: "",
        peso: "",
        altura: "",
        saturacionOxigeno: "",
        glucosa: "",
      },
      observaciones: "",
      proximaCita: "",
    });
  };

  const filteredPatients = pacientes.filter((patient) =>
    patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getRecordTypeColor = (tipo: string) => {
    switch (tipo) {
      case "Consulta General":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Chequeo Anual":
        return "bg-green-100 text-green-800 border-green-200";
      case "Seguimiento":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Emergencia":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!selectedPatient) {
    return (
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-medical-slate">
                Historial Médico
              </h1>
              <p className="text-gray-600 mt-1">
                Seleccione un paciente para ver su historial médico completo
              </p>
            </div>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar paciente por nombre..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Patients List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-medical-slate">Pacientes</CardTitle>
              <CardDescription>
                Seleccione un paciente para ver su historial médico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                  <Card
                    key={patient.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-medical-blue"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-medical-beige rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-medical-slate">
                            {patient.nombre
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-medical-slate">
                            {patient.nombre}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {patient.edad} años • {patient.genero}
                          </p>
                          <p className="text-sm text-gray-600">
                            {patient.telefono}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            Última visita:{" "}
                            {new Date(patient.ultimaVisita).toLocaleDateString(
                              "es-ES",
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const patientHistory = historialMedico[selectedPatient.id] || [];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPatient(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Pacientes
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-medical-slate">
                Historial Médico - {selectedPatient.nombre}
              </h1>
              <p className="text-gray-600 mt-1">
                {selectedPatient.edad} años • {selectedPatient.genero} •{" "}
                {selectedPatient.telefono}
              </p>
            </div>
          </div>
          <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
            <DialogTrigger asChild>
              <Button className="bg-medical-blue hover:bg-medical-navy">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center text-medical-slate">
                  <FileText className="w-5 h-5 mr-2" />
                  Nuevo Registro Médico
                </DialogTitle>
                <DialogDescription>
                  Agregar nueva entrada al historial médico de{" "}
                  {selectedPatient.nombre}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">
                      Información General
                    </TabsTrigger>
                    <TabsTrigger value="signos">Signos Vitales</TabsTrigger>
                    <TabsTrigger value="observaciones">
                      Observaciones
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tipo">Tipo de Consulta</Label>
                        <Select
                          value={newRecord.tipo}
                          onValueChange={(value) =>
                            handleInputChange("tipo", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Consulta General">
                              Consulta General
                            </SelectItem>
                            <SelectItem value="Chequeo Anual">
                              Chequeo Anual
                            </SelectItem>
                            <SelectItem value="Seguimiento">
                              Seguimiento
                            </SelectItem>
                            <SelectItem value="Emergencia">
                              Emergencia
                            </SelectItem>
                            <SelectItem value="Especialista">
                              Consulta Especialista
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fecha">Fecha</Label>
                        <Input
                          id="fecha"
                          type="date"
                          value={newRecord.fecha}
                          onChange={(e) =>
                            handleInputChange("fecha", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="hora">Hora</Label>
                        <Input
                          id="hora"
                          type="time"
                          value={newRecord.hora}
                          onChange={(e) =>
                            handleInputChange("hora", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="motivo">Motivo de la Consulta</Label>
                      <Input
                        id="motivo"
                        value={newRecord.motivo}
                        onChange={(e) =>
                          handleInputChange("motivo", e.target.value)
                        }
                        placeholder="Razón de la visita"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="sintomas">Síntomas</Label>
                      <Textarea
                        id="sintomas"
                        value={newRecord.sintomas}
                        onChange={(e) =>
                          handleInputChange("sintomas", e.target.value)
                        }
                        placeholder="Síntomas reportados por el paciente"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="examenFisico">Examen Físico</Label>
                      <Textarea
                        id="examenFisico"
                        value={newRecord.examenFisico}
                        onChange={(e) =>
                          handleInputChange("examenFisico", e.target.value)
                        }
                        placeholder="Hallazgos del examen físico"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="diagnostico">Diagnóstico</Label>
                      <Input
                        id="diagnostico"
                        value={newRecord.diagnostico}
                        onChange={(e) =>
                          handleInputChange("diagnostico", e.target.value)
                        }
                        placeholder="Diagnóstico principal"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="tratamiento">Tratamiento</Label>
                      <Textarea
                        id="tratamiento"
                        value={newRecord.tratamiento}
                        onChange={(e) =>
                          handleInputChange("tratamiento", e.target.value)
                        }
                        placeholder="Plan de tratamiento recomendado"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="medicamentos">
                        Medicamentos Prescritos
                      </Label>
                      <Textarea
                        id="medicamentos"
                        value={newRecord.medicamentos}
                        onChange={(e) =>
                          handleInputChange("medicamentos", e.target.value)
                        }
                        placeholder="Medicamentos y dosis prescritos"
                        rows={2}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="signos" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="presionSistolica">
                          Presión Sistólica (mmHg)
                        </Label>
                        <Input
                          id="presionSistolica"
                          type="number"
                          value={newRecord.signos.presionSistolica}
                          onChange={(e) =>
                            handleInputChange(
                              "signos.presionSistolica",
                              e.target.value,
                            )
                          }
                          placeholder="120"
                        />
                      </div>
                      <div>
                        <Label htmlFor="presionDiastolica">
                          Presión Diastólica (mmHg)
                        </Label>
                        <Input
                          id="presionDiastolica"
                          type="number"
                          value={newRecord.signos.presionDiastolica}
                          onChange={(e) =>
                            handleInputChange(
                              "signos.presionDiastolica",
                              e.target.value,
                            )
                          }
                          placeholder="80"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="frecuenciaCardiaca">
                          Frecuencia Cardíaca (lpm)
                        </Label>
                        <Input
                          id="frecuenciaCardiaca"
                          type="number"
                          value={newRecord.signos.frecuenciaCardiaca}
                          onChange={(e) =>
                            handleInputChange(
                              "signos.frecuenciaCardiaca",
                              e.target.value,
                            )
                          }
                          placeholder="70"
                        />
                      </div>
                      <div>
                        <Label htmlFor="temperatura">Temperatura (°C)</Label>
                        <Input
                          id="temperatura"
                          type="number"
                          step="0.1"
                          value={newRecord.signos.temperatura}
                          onChange={(e) =>
                            handleInputChange(
                              "signos.temperatura",
                              e.target.value,
                            )
                          }
                          placeholder="36.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="peso">Peso (kg)</Label>
                        <Input
                          id="peso"
                          type="number"
                          step="0.1"
                          value={newRecord.signos.peso}
                          onChange={(e) =>
                            handleInputChange("signos.peso", e.target.value)
                          }
                          placeholder="70"
                        />
                      </div>
                      <div>
                        <Label htmlFor="altura">Altura (cm)</Label>
                        <Input
                          id="altura"
                          type="number"
                          value={newRecord.signos.altura}
                          onChange={(e) =>
                            handleInputChange("signos.altura", e.target.value)
                          }
                          placeholder="170"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="saturacionOxigeno">
                          Saturación de Oxígeno (%)
                        </Label>
                        <Input
                          id="saturacionOxigeno"
                          type="number"
                          value={newRecord.signos.saturacionOxigeno}
                          onChange={(e) =>
                            handleInputChange(
                              "signos.saturacionOxigeno",
                              e.target.value,
                            )
                          }
                          placeholder="98"
                        />
                      </div>
                      <div>
                        <Label htmlFor="glucosa">Glucosa (mg/dL)</Label>
                        <Input
                          id="glucosa"
                          type="number"
                          value={newRecord.signos.glucosa}
                          onChange={(e) =>
                            handleInputChange("signos.glucosa", e.target.value)
                          }
                          placeholder="90"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="observaciones" className="space-y-4">
                    <div>
                      <Label htmlFor="observaciones">
                        Observaciones y Notas
                      </Label>
                      <Textarea
                        id="observaciones"
                        value={newRecord.observaciones}
                        onChange={(e) =>
                          handleInputChange("observaciones", e.target.value)
                        }
                        placeholder="Observaciones adicionales, instrucciones para el paciente, etc."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="proximaCita">
                        Próxima Cita (opcional)
                      </Label>
                      <Input
                        id="proximaCita"
                        type="date"
                        value={newRecord.proximaCita}
                        onChange={(e) =>
                          handleInputChange("proximaCita", e.target.value)
                        }
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddRecordOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-medical-blue hover:bg-medical-navy"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Guardar Registro
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Patient Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-medical-slate">
                {patientHistory.length}
              </div>
              <p className="text-sm text-gray-600">Total Consultas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {new Date(selectedPatient.ultimaVisita).toLocaleDateString(
                  "es-ES",
                )}
              </div>
              <p className="text-sm text-gray-600">Última Visita</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {patientHistory.filter((r) => r.tipo === "Seguimiento").length}
              </div>
              <p className="text-sm text-gray-600">Seguimientos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-medical-brown">
                {
                  patientHistory.filter((r) => r.tipo === "Chequeo Anual")
                    .length
                }
              </div>
              <p className="text-sm text-gray-600">Chequeos Anuales</p>
            </CardContent>
          </Card>
        </div>

        {/* Medical History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-slate">
              Historial de Consultas
            </CardTitle>
            <CardDescription>
              Registro completo de todas las consultas médicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {patientHistory.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay registros médicos
                </h3>
                <p className="text-gray-600">
                  Este paciente no tiene registros médicos aún.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {patientHistory.map((record) => (
                  <div
                    key={record.id}
                    className="p-6 border border-gray-200 rounded-lg bg-white"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-medical-slate">
                            {record.motivo}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(record.fecha).toLocaleDateString(
                                "es-ES",
                              )}
                            </span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{record.hora}</span>
                          </div>
                        </div>
                        <Badge className={getRecordTypeColor(record.tipo)}>
                          {record.tipo}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Printer className="w-4 h-4 mr-2" />
                          Imprimir
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Síntomas:
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            {record.sintomas}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Examen Físico:
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            {record.examenFisico}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Diagnóstico:
                          </Label>
                          <p className="text-sm text-gray-600 mt-1 font-medium">
                            {record.diagnostico}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Tratamiento:
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            {record.tratamiento}
                          </p>
                        </div>
                        {record.medicamentos && (
                          <div>
                            <Label className="text-sm font-medium text-gray-700">
                              Medicamentos:
                            </Label>
                            <div className="flex items-center space-x-2 mt-1">
                              <Pill className="w-4 h-4 text-medical-brown" />
                              <p className="text-sm text-gray-600">
                                {record.medicamentos}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Signos Vitales:
                          </Label>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                            {record.signos.presionSistolica && (
                              <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-red-500" />
                                <span>
                                  PA: {record.signos.presionSistolica}/
                                  {record.signos.presionDiastolica} mmHg
                                </span>
                              </div>
                            )}
                            {record.signos.frecuenciaCardiaca && (
                              <div className="flex items-center space-x-2">
                                <Activity className="w-4 h-4 text-blue-500" />
                                <span>
                                  FC: {record.signos.frecuenciaCardiaca} lpm
                                </span>
                              </div>
                            )}
                            {record.signos.temperatura && (
                              <div className="flex items-center space-x-2">
                                <Thermometer className="w-4 h-4 text-orange-500" />
                                <span>T°: {record.signos.temperatura}°C</span>
                              </div>
                            )}
                            {record.signos.peso && (
                              <div className="flex items-center space-x-2">
                                <Weight className="w-4 h-4 text-green-500" />
                                <span>Peso: {record.signos.peso} kg</span>
                              </div>
                            )}
                            {record.signos.saturacionOxigeno && (
                              <div className="flex items-center space-x-2">
                                <Activity className="w-4 h-4 text-purple-500" />
                                <span>
                                  SpO2: {record.signos.saturacionOxigeno}%
                                </span>
                              </div>
                            )}
                            {record.signos.glucosa && (
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                <span>
                                  Glucosa: {record.signos.glucosa} mg/dL
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {record.observaciones && (
                          <div>
                            <Label className="text-sm font-medium text-gray-700">
                              Observaciones:
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              {record.observaciones}
                            </p>
                          </div>
                        )}

                        {record.proximaCita && (
                          <div>
                            <Label className="text-sm font-medium text-gray-700">
                              Próxima Cita:
                            </Label>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="w-4 h-4 text-medical-blue" />
                              <span className="text-sm text-gray-600">
                                {new Date(
                                  record.proximaCita,
                                ).toLocaleDateString("es-ES")}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
