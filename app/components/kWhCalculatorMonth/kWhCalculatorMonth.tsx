"use client";

import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";

import { useKWhCalculatorMonth } from '@/app/store/KWhCalculatorMonth';

export default function KWhCalculatorMonth() {
  const {
    inquilinos,
    agregarInquilino,
    removerInquilino,
    nombre,
    setNombre,
    medicionAnteriorLuz,
    setMedicionAnteriorLuz,
    medicionActualLuz,
    setMedicionActualLuz,
    consumoTotalFacturaLuz,
    setConsumoTotalFacturaLuz,
    costoTotalAgua,
    setCostoTotalAgua,
    calcularTotalKWh,
    calcularConsumoPropio,
    costoPorKWh,
    setCostoPorKWh
  } = useKWhCalculatorMonth();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(medicionAnteriorLuz) >= parseFloat(medicionActualLuz)) {
      setError("La medición anterior de luz debe ser menor que la medición actual.");
      return;
    }
    agregarInquilino();
    setError(null);
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Calculadora de Consumo Mensual por Inquilino</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Inquilino</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                  required
                  aria-label="Nombre del Inquilino"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicionAnteriorLuz">Medición Anterior Luz (kWh)</Label>
                <Input
                  id="medicionAnteriorLuz"
                  type="number"
                  value={medicionAnteriorLuz}
                  onChange={(e) => setMedicionAnteriorLuz(e.target.value)}
                  placeholder="0"
                  required
                  min="0"
                  step="0.01"
                  aria-label="Medición Anterior de Luz en kWh"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicionActualLuz">Medición Actual Luz (kWh)</Label>
                <Input
                  id="medicionActualLuz"
                  type="number"
                  value={medicionActualLuz}
                  onChange={(e) => setMedicionActualLuz(e.target.value)}
                  placeholder="0"
                  required
                  min="0"
                  step="0.01"
                  aria-label="Medición Actual de Luz en kWh"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2" role="alert">{error}</p>}
            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" /> Agregar Inquilino
            </Button>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Consumo por Inquilino</h3>
            {inquilinos.length === 0 ? (
              <p>No hay inquilinos agregados aún.</p>
            ) : (
              inquilinos.map((inquilino, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{inquilino.nombre}</span>
                  <div className="flex items-center space-x-4">
                    <span>{inquilino.consumoKWh?.toFixed(2)} kWh</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removerInquilino(index)}
                      aria-label={`Remover ${inquilino.nombre}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ))
            )}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center font-bold">
                <span>Total Inquilinos</span>
                <div>
                  <span>{calcularTotalKWh().toFixed(2)} kWh</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="consumoTotalFacturaLuz">Consumo Total Luz en Factura (kWh)</Label>
                <Input
                  id="consumoTotalFacturaLuz"
                  type="number"
                  value={consumoTotalFacturaLuz}
                  onChange={(e) => setConsumoTotalFacturaLuz(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  aria-label="Consumo Total de Luz en Factura en kWh"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costoTotalAgua">Costo Total Agua ($)</Label>
                <Input
                  id="costoTotalAgua"
                  type="number"
                  value={costoTotalAgua}
                  onChange={(e) => setCostoTotalAgua(e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  aria-label="Costo Total de Agua en dólares"
                />
              </div>
              <div className="space-y-2">
              <Label htmlFor="costoPorKWh">Costo por kWh ($)</Label>
        <Input
          id="costoPorKWh"
          type="number"
          value={costoPorKWh}
          onChange={(e) => setCostoPorKWh(parseFloat(e.target.value))}
          placeholder="0"
          min="0"
          step="0.01"
          aria-label="Costo por kWh en dólares"
        />
            </div>
          </div>
          </div>

          {inquilinos.length > 0 && consumoTotalFacturaLuz && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h4 className="text-lg font-semibold mb-2">Resumen</h4>
              <p>Número de inquilinos: {inquilinos.length}</p>
              <p>Consumo total inquilinos (Luz): {calcularTotalKWh().toFixed(2)} kWh</p>
              <p>Consumo total en factura (Luz): {parseFloat(consumoTotalFacturaLuz).toFixed(2)} kWh</p>
              <p>Tu consumo (Luz): {calcularConsumoPropio().toFixed(2)} kWh</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

