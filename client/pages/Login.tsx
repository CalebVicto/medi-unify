import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { Activity, Loader2, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login, isLoading } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // If user is already logged in, redirect them
  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor complete todos los campos");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-beige to-medical-slate/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Brand */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-medical-blue rounded-xl flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-medical-slate">MediUnify</h1>
          <p className="text-gray-600 mt-2">Sistema de gestión de pacientes</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-medical-slate">
              Bienvenido de nuevo
            </CardTitle>
            <CardDescription className="text-center">
              Introduzca sus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-medical-slate">
                  Dirección de correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@medicare.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-medical-blue focus:ring-medical-blue"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-medical-slate">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Introduzca su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-medical-blue focus:ring-medical-blue"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-medical-blue hover:bg-medical-navy"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Credenciales de Prueba:
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Correo:</strong> doctor@medicare.com
                </p>
                <p>
                  <strong>Contraseña:</strong> password123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 MediCare. Professional Patient Management System.</p>
        </div>
      </div>
    </div>
  );
}
