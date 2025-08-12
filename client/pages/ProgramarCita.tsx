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
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Save,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProgramarCita() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [viewMode, setViewMode] = useState<"calendar" | "form">("calendar");
  const [formData, setFormData] = useState({
    pacienteId: "",
    fechaCita: "",
    horaCita: "",
    tipoCita: "",
    duracion: "",
    motivo: "",
    notas: "",
    pacienteNombre: "",
    pacienteTelefono: "",
    pacienteEmail: "",
    recordatorio: true,
  });

  // Horarios disponibles (ejemplo)
  const availableSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  // Citas existentes (ejemplo)
  const existingAppointments = [
    { date: "2024-01-16", time: "09:00", patient: "Emma Thompson" },
    { date: "2024-01-16", time: "10:30", patient: "Michael Davis" },
    { date: "2024-01-16", time: "14:00", patient: "Sarah Wilson" },
  ];

  // Pacientes sugeridos (ejemplo)
  const suggestedPatients = [
    { id: "1", name: "Emma Thompson", phone: "(555) 123-4567", email: "emma@email.com" },
    { id: "2", name: "Michael Davis", phone: "(555) 234-5678", email: "michael@email.com" },
    { id: "3", name: "Sarah Wilson", phone: "(555) 345-6789", email: "sarah@email.com" },
    { id: "4", name: "James Brown", phone: "(555) 456-7890", email: "james@email.com" },
    { id: "5", name: "Alice Johnson", phone: "(555) 567-8901", email: "alice@email.com" },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePatientSelect = (patient: any) => {
    setFormData(prev => ({
      ...prev,
      pacienteId: patient.id,
      pacienteNombre: patient.name,
      pacienteTelefono: patient.phone,
      pacienteEmail: patient.email,
    }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData(prev => ({
      ...prev,
      horaCita: time,
      fechaCita: selectedDate.toISOString().split('T')[0]
    }));
    setViewMode("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva cita programada:", formData);
    // Aquí se enviarían los datos al servidor
  };

  const isTimeSlotTaken = (time: string) => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return existingAppointments.some(apt => apt.date === dateStr && apt.time === time);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];
    const today = new Date();
    
    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const isToday = dayDate.toDateString() === today.toDateString();
      const isSelected = dayDate.toDateString() === selectedDate.toDateString();
      const isPast = dayDate < today;
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dayDate)}
          disabled={isPast}
          className={`h-12 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
            ${isPast 
              ? "text-gray-300 cursor-not-allowed" 
              : isSelected 
                ? "bg-medical-blue text-white" 
                : isToday 
                  ? "bg-medical-beige text-medical-slate border-2 border-medical-blue"
                  : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const changeMonth = (direction: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1));
  };

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  if (viewMode === "form") {
    return (
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode("calendar")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Calendario
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-medical-slate">
                  Programar Nueva Cita
                </h1>
                <p className="text-gray-600 mt-1">
                  Complete los detalles de la cita para {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} a las {selectedTime}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información de la Cita */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-medical-slate">
                  <Calendar className="w-5 h-5 mr-2" />
                  Detalles de la Cita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fechaCita">Fecha</Label>
                    <Input
                      id="fechaCita"
                      type="date"
                      value={formData.fechaCita}
                      onChange={(e) => handleInputChange("fechaCita", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="horaCita">Hora</Label>
                    <Input
                      id="horaCita"
                      type="time"
                      value={formData.horaCita}
                      onChange={(e) => handleInputChange("horaCita", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duracion">Duración</Label>
                    <Select value={formData.duracion} onValueChange={(value) => handleInputChange("duracion", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar duración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="90">1.5 horas</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="tipoCita">Tipo de Cita</Label>
                  <Select value={formData.tipoCita} onValueChange={(value) => handleInputChange("tipoCita", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de cita" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulta">Consulta General</SelectItem>
                      <SelectItem value="revision">Revisión</SelectItem>
                      <SelectItem value="seguimiento">Seguimiento</SelectItem>
                      <SelectItem value="tratamiento">Tratamiento</SelectItem>
                      <SelectItem value="emergencia">Emergencia</SelectItem>
                      <SelectItem value="chequeo">Chequeo Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="motivo">Motivo de la Consulta</Label>
                  <Textarea
                    id="motivo"
                    value={formData.motivo}
                    onChange={(e) => handleInputChange("motivo", e.target.value)}
                    placeholder="Describir el motivo de la consulta o síntomas"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="notas">Notas Adicionales</Label>
                  <Textarea
                    id="notas"
                    value={formData.notas}
                    onChange={(e) => handleInputChange("notas", e.target.value)}
                    placeholder="Instrucciones especiales, preparación previa, etc."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Información del Paciente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-medical-slate">
                  <User className="w-5 h-5 mr-2" />
                  Información del Paciente
                </CardTitle>
                <CardDescription>
                  Seleccione un paciente existente o agregue información de contacto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pacienteBuscar">Buscar Paciente Existente</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="pacienteBuscar"
                      placeholder="Buscar por nombre, teléfono o email..."
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {/* Lista de pacientes sugeridos */}
                <div className="space-y-2">
                  <Label>Pacientes Recientes</Label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {suggestedPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => handlePatientSelect(patient)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors
                          ${formData.pacienteId === patient.id 
                            ? "border-medical-blue bg-medical-blue/5" 
                            : "border-gray-200 hover:border-medical-blue hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-medical-slate">{patient.name}</p>
                            <p className="text-sm text-gray-600">{patient.phone} • {patient.email}</p>
                          </div>
                          {formData.pacienteId === patient.id && (
                            <Badge className="bg-medical-blue text-white">Seleccionado</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Label className="text-base font-medium">O complete la información manualmente</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="pacienteNombre">Nombre Completo</Label>
                      <Input
                        id="pacienteNombre"
                        value={formData.pacienteNombre}
                        onChange={(e) => handleInputChange("pacienteNombre", e.target.value)}
                        placeholder="Nombre del paciente"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pacienteTelefono">Teléfono</Label>
                      <Input
                        id="pacienteTelefono"
                        value={formData.pacienteTelefono}
                        onChange={(e) => handleInputChange("pacienteTelefono", e.target.value)}
                        placeholder="(000) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="pacienteEmail">Correo Electrónico</Label>
                    <Input
                      id="pacienteEmail"
                      type="email"
                      value={formData.pacienteEmail}
                      onChange={(e) => handleInputChange("pacienteEmail", e.target.value)}
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setViewMode("calendar")}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-medical-blue hover:bg-medical-navy">
                <Save className="w-4 h-4 mr-2" />
                Programar Cita
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/appointments">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Citas
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-medical-slate">
                Programar Cita
              </h1>
              <p className="text-gray-600 mt-1">
                Seleccione una fecha y hora disponible
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-medical-slate">
                  <Calendar className="w-5 h-5 mr-2" />
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => changeMonth(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => changeMonth(1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <Clock className="w-5 h-5 mr-2" />
                Horarios Disponibles
              </CardTitle>
              <CardDescription>
                {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableSlots.map((time) => {
                  const isTaken = isTimeSlotTaken(time);
                  return (
                    <Button
                      key={time}
                      variant={isTaken ? "secondary" : "outline"}
                      className={`w-full justify-start ${
                        isTaken 
                          ? "cursor-not-allowed opacity-50" 
                          : "hover:bg-medical-blue hover:text-white"
                      }`}
                      disabled={isTaken}
                      onClick={() => handleTimeSelect(time)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {time}
                      {isTaken && (
                        <span className="ml-auto text-xs text-red-600">Ocupado</span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Existing Appointments for Selected Date */}
        {existingAppointments.filter(apt => apt.date === selectedDate.toISOString().split('T')[0]).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-medical-slate">
                Citas Existentes - {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {existingAppointments
                  .filter(apt => apt.date === selectedDate.toISOString().split('T')[0])
                  .map((apt, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-medical-slate">{apt.patient}</p>
                          <p className="text-sm text-gray-600">{apt.time}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Confirmada</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
