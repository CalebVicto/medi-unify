import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Pill } from "lucide-react";

export default function Prescriptions() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-slate">
              Prescriptions
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track patient prescriptions
            </p>
          </div>
          <Button className="bg-medical-blue hover:bg-medical-navy mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            New Prescription
          </Button>
        </div>

        {/* Placeholder Content */}
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-medical-beige rounded-full flex items-center justify-center">
                <Pill className="w-12 h-12 text-medical-brown" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-medical-slate mb-2">
                  Prescriptions Management
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  This page will contain comprehensive prescription management
                  features including medication tracking, dosage management,
                  prescription history, and more.
                </p>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button className="bg-medical-blue hover:bg-medical-navy">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Prescription
                </Button>
                <Button
                  variant="outline"
                  className="border-medical-brown text-medical-brown hover:bg-medical-brown hover:text-white"
                >
                  View All Prescriptions
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Continue prompting to have this page content generated with full
                functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
