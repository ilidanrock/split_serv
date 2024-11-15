"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useKWhCalculatorMonth } from "@/app/store/KWhCalculatorMonth";

export default function KWhCalculatorMonth() {

  const {
    inquilinos,
    agregarInquilino,
    nombre,
    setNombre,
    medicionAnterior,
    setMedicionAnterior,
    medicionActual,
    setMedicionActual,
    calcularConsumo,
    calcularTotalKWh,
  } = useKWhCalculatorMonth();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Calculadora de kWh Mensual por Inquilino</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            agregarInquilino();
          }}
          className="space-y-4 mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Inquilino</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicionAnterior">Medición Anterior (kWh)</Label>
              <Input
                id="medicionAnterior"
                type="number"
                value={medicionAnterior}
                onChange={(e) => setMedicionAnterior(e.target.value)}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicionActual">Medición Actual (kWh)</Label>
              <Input
                id="medicionActual"
                type="number"
                value={medicionActual}
                onChange={(e) => setMedicionActual(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Agregar Inquilino
          </Button>
        </form>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Consumo por Inquilino</h3>
          {inquilinos.map((inquilino, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{inquilino.nombre}</span>
              <span>
                {calcularConsumo(
                  inquilino.medicionAnterior,
                  inquilino.medicionActual
                )}{" "}
                kWh
              </span>
            </div>
          ))}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>{calcularTotalKWh()} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
