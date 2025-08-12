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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  AlertTriangle,
  FileText,
  Save,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NuevoPaciente() {
  const [formData, setFormData] = useState({
    // Información Personal
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    genero: "",
    estadoCivil: "",
    ocupacion: "",
    // Información de Contacto
    telefono: "",
    celular: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    // Contacto de Emergencia
    nombreEmergencia: "",
    relacionEmergencia: "",
    telefonoEmergencia: "",
    // Información Médica
    tipoSangre: "",
    alergias: "",
    medicamentosActuales: "",
    enfermedadesCronicas: "",
    cirugiasPrevias: "",
    antecedentesHeredofamiliares: "",
    // Estilo de Vida
    fuma: "",
    bebeAlcohol: "",
    ejercicio: "",
    // Seguro Médico
    tieneSeguro: false,
    compañiaSeguro: "",
    numeroPoliza: "",
    // Observaciones
    observaciones: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del nuevo paciente:", formData);
    // Aquí se enviarían los datos al servidor
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/patients">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Pacientes
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-medical-slate">
                Nuevo Paciente
              </h1>
              <p className="text-gray-600 mt-1">
                Complete el formulario para registrar un nuevo paciente
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <User className="w-5 h-5 mr-2" />
                Información Personal
              </CardTitle>
              <CardDescription>
                Datos básicos del paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombres">Nombres *</Label>
                  <Input
                    id="nombres"
                    value={formData.nombres}
                    onChange={(e) => handleInputChange("nombres", e.target.value)}
                    placeholder="Ingrese los nombres"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="apellidos">Apellidos *</Label>
                  <Input
                    id="apellidos"
                    value={formData.apellidos}
                    onChange={(e) => handleInputChange("apellidos", e.target.value)}
                    placeholder="Ingrese los apellidos"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="genero">Género *</Label>
                  <Select value={formData.genero} onValueChange={(value) => handleInputChange("genero", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="estadoCivil">Estado Civil</Label>
                  <Select value={formData.estadoCivil} onValueChange={(value) => handleInputChange("estadoCivil", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viudo">Viudo(a)</SelectItem>
                      <SelectItem value="union_libre">Unión Libre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="ocupacion">Ocupación</Label>
                <Input
                  id="ocupacion"
                  value={formData.ocupacion}
                  onChange={(e) => handleInputChange("ocupacion", e.target.value)}
                  placeholder="Profesión u ocupación del paciente"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <Phone className="w-5 h-5 mr-2" />
                Información de Contacto
              </CardTitle>
              <CardDescription>
                Datos de contacto del paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono Fijo</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    placeholder="(000) 000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="celular">Celular *</Label>
                  <Input
                    id="celular"
                    value={formData.celular}
                    onChange={(e) => handleInputChange("celular", e.target.value)}
                    placeholder="(000) 000-0000"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                  placeholder="Calle, número, colonia"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) => handleInputChange("ciudad", e.target.value)}
                    placeholder="Ciudad"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="codigoPostal">Código Postal</Label>
                  <Input
                    id="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                    placeholder="00000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contacto de Emergencia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Contacto de Emergencia
              </CardTitle>
              <CardDescription>
                Persona a contactar en caso de emergencia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombreEmergencia">Nombre Completo *</Label>
                  <Input
                    id="nombreEmergencia"
                    value={formData.nombreEmergencia}
                    onChange={(e) => handleInputChange("nombreEmergencia", e.target.value)}
                    placeholder="Nombre del contacto de emergencia"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="relacionEmergencia">Relación *</Label>
                  <Select value={formData.relacionEmergencia} onValueChange={(value) => handleInputChange("relacionEmergencia", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar relación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conyuge">Cónyuge</SelectItem>
                      <SelectItem value="padre">Padre</SelectItem>
                      <SelectItem value="madre">Madre</SelectItem>
                      <SelectItem value="hijo">Hijo(a)</SelectItem>
                      <SelectItem value="hermano">Hermano(a)</SelectItem>
                      <SelectItem value="amigo">Amigo(a)</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="telefonoEmergencia">Teléfono *</Label>
                <Input
                  id="telefonoEmergencia"
                  value={formData.telefonoEmergencia}
                  onChange={(e) => handleInputChange("telefonoEmergencia", e.target.value)}
                  placeholder="(000) 000-0000"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Información Médica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <Heart className="w-5 h-5 mr-2" />
                Información Médica
              </CardTitle>
              <CardDescription>
                Historial y datos médicos relevantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tipoSangre">Tipo de Sangre</Label>
                <Select value={formData.tipoSangre} onValueChange={(value) => handleInputChange("tipoSangre", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de sangre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alergias">Alergias</Label>
                <Textarea
                  id="alergias"
                  value={formData.alergias}
                  onChange={(e) => handleInputChange("alergias", e.target.value)}
                  placeholder="Describir alergias conocidas (medicamentos, alimentos, etc.)"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="medicamentosActuales">Medicamentos Actuales</Label>
                <Textarea
                  id="medicamentosActuales"
                  value={formData.medicamentosActuales}
                  onChange={(e) => handleInputChange("medicamentosActuales", e.target.value)}
                  placeholder="Listar medicamentos que toma actualmente"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="enfermedadesCronicas">Enfermedades Crónicas</Label>
                <Textarea
                  id="enfermedadesCronicas"
                  value={formData.enfermedadesCronicas}
                  onChange={(e) => handleInputChange("enfermedadesCronicas", e.target.value)}
                  placeholder="Diabetes, hipertensión, asma, etc."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="cirugiasPrevias">Cirugías Previas</Label>
                <Textarea
                  id="cirugiasPrevias"
                  value={formData.cirugiasPrevias}
                  onChange={(e) => handleInputChange("cirugiasPrevias", e.target.value)}
                  placeholder="Describir cirugías anteriores y fechas aproximadas"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="antecedentesHeredofamiliares">Antecedentes Heredofamiliares</Label>
                <Textarea
                  id="antecedentesHeredofamiliares"
                  value={formData.antecedentesHeredofamiliares}
                  onChange={(e) => handleInputChange("antecedentesHeredofamiliares", e.target.value)}
                  placeholder="Enfermedades en familiares directos"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Estilo de Vida */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <Heart className="w-5 h-5 mr-2" />
                Estilo de Vida
              </CardTitle>
              <CardDescription>
                Hábitos y estilo de vida del paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">¿Fuma?</Label>
                <RadioGroup value={formData.fuma} onValueChange={(value) => handleInputChange("fuma", value)} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fuma-no" />
                    <Label htmlFor="fuma-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ocasional" id="fuma-ocasional" />
                    <Label htmlFor="fuma-ocasional">Ocasionalmente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="diario" id="fuma-diario" />
                    <Label htmlFor="fuma-diario">Diariamente</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label className="text-base font-medium">¿Consume alcohol?</Label>
                <RadioGroup value={formData.bebeAlcohol} onValueChange={(value) => handleInputChange("bebeAlcohol", value)} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="alcohol-no" />
                    <Label htmlFor="alcohol-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ocasional" id="alcohol-ocasional" />
                    <Label htmlFor="alcohol-ocasional">Ocasionalmente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderado" id="alcohol-moderado" />
                    <Label htmlFor="alcohol-moderado">Moderadamente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frecuente" id="alcohol-frecuente" />
                    <Label htmlFor="alcohol-frecuente">Frecuentemente</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label className="text-base font-medium">¿Realiza ejercicio?</Label>
                <RadioGroup value={formData.ejercicio} onValueChange={(value) => handleInputChange("ejercicio", value)} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="ejercicio-no" />
                    <Label htmlFor="ejercicio-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poco" id="ejercicio-poco" />
                    <Label htmlFor="ejercicio-poco">Poco (1-2 veces por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderado" id="ejercicio-moderado" />
                    <Label htmlFor="ejercicio-moderado">Moderado (3-4 veces por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frecuente" id="ejercicio-frecuente" />
                    <Label htmlFor="ejercicio-frecuente">Frecuente (5+ veces por semana)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Seguro Médico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <FileText className="w-5 h-5 mr-2" />
                Seguro Médico
              </CardTitle>
              <CardDescription>
                Información del seguro médico del paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tieneSeguro"
                  checked={formData.tieneSeguro}
                  onCheckedChange={(checked) => handleInputChange("tieneSeguro", checked)}
                />
                <Label htmlFor="tieneSeguro">El paciente tiene seguro médico</Label>
              </div>
              {formData.tieneSeguro && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="compañiaSeguro">Compañía de Seguros</Label>
                    <Input
                      id="compañiaSeguro"
                      value={formData.compañiaSeguro}
                      onChange={(e) => handleInputChange("compañiaSeguro", e.target.value)}
                      placeholder="Nombre de la aseguradora"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numeroPoliza">Número de Póliza</Label>
                    <Input
                      id="numeroPoliza"
                      value={formData.numeroPoliza}
                      onChange={(e) => handleInputChange("numeroPoliza", e.target.value)}
                      placeholder="Número de póliza o ID"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-medical-slate">
                <FileText className="w-5 h-5 mr-2" />
                Observaciones Adicionales
              </CardTitle>
              <CardDescription>
                Notas adicionales sobre el paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="observaciones"
                value={formData.observaciones}
                onChange={(e) => handleInputChange("observaciones", e.target.value)}
                placeholder="Cualquier información adicional relevante sobre el paciente..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end space-x-4">
            <Link to="/patients">
              <Button variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="bg-medical-blue hover:bg-medical-navy">
              <Save className="w-4 h-4 mr-2" />
              Registrar Paciente
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
