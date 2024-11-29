"use client";

import { useImportsCalculator } from "@/app/store/ImportsCalculator";
import { useKWhCalculatorMonth } from "@/app/store/KWhCalculatorMonth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CostosPorInquilino() {
  const { calcularCostoPorInquilino, costoTotalLuz, costoTotalAgua } =
    useKWhCalculatorMonth();

    const { resultsOtherImports , resultsBeforeIGV} = useImportsCalculator()

  const costosPorInquilino = calcularCostoPorInquilino(resultsBeforeIGV.total, resultsOtherImports.total);
  const totalCostoLuz = parseFloat(costoTotalLuz);
  const totalCostoAgua = parseFloat(costoTotalAgua);

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Costos por Inquilino (Luz y Agua)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table aria-label="Tabla de costos por inquilino">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Costo Luz</TableHead>
              <TableHead className="text-right">Costo Agua</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {[...costosPorInquilino.map((costo, index) => (
            <TableRow key={index}>
              <TableCell>{costo.nombre}</TableCell>
              <TableCell className="text-right">
                ${costo.costoLuz.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${costo.costoAgua.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${(costo.costoLuz + costo.costoAgua).toFixed(2)}
              </TableCell>
            </TableRow>
          )),
          <TableRow key="total">
          <TableCell  className="font-bold">
            Total
          </TableCell>
          <TableCell className="text-right font-bold">
            ${totalCostoLuz.toFixed(2)}
          </TableCell>
          <TableCell className="text-right font-bold">
            ${totalCostoAgua.toFixed(2)}
          </TableCell>
          <TableCell className="text-right font-bold">
            ${(totalCostoLuz + totalCostoAgua).toFixed(2)}
          </TableCell>
        </TableRow>
          ]}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
