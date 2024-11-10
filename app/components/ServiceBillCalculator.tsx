'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useServiceBillCalculator } from "../store/ServiceBillCalculator"

export default function ServiceBillCalculator() {
  const { 
    repMantLuz,
    fixedCharge,
    interest,
    publicLighting,
    lawContribution,
    lateFee,
    prevRounding,
    currentRounding,
    results,
    calculateCosts,
    setFixedCharge,
    setInterest,
    setPublicLighting,
    setLawContribution,
    setLateFee,
    setPrevRounding,
    setCurrentRounding,
    setRepMantLuz 
  } = useServiceBillCalculator()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Importes de servicios</CardTitle>
        <CardDescription>Calcula los importes de la factura de servicios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="Rep.Mant.luz">Reposición y mantenimiento de luz (soles)</Label>
            <Input
              id="Rep.Mant.luz"
              placeholder="Ingrese soles"
              value={repMantLuz}
              onChange={(e) => setRepMantLuz(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fixedCharge">Cargo fijo (soles)</Label>
            <Input
              id="fixedCharge"
              placeholder="Ingrese soles"
              value={fixedCharge}
              onChange={(e) => setFixedCharge(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="interest">Interés compensatorio (soles)</Label>
            <Input
              id="interest"
              placeholder="Ingrese soles"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="publicLighting">Alumbrado público (soles)</Label>
            <Input
              id="publicLighting"
              placeholder="Ingrese soles"
              value={publicLighting}
              onChange={(e) => setPublicLighting(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lawContribution">Aporte Ley N° 28749 (soles)</Label>
            <Input
              id="lawContribution"
              placeholder="Ingrese soles"
              value={lawContribution}
              onChange={(e) => setLawContribution(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lateFee">Recargo por mora (soles)</Label>
            <Input
              id="lateFee"
              placeholder="Ingrese soles"
              value={lateFee}
              onChange={(e) => setLateFee(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="prevRounding">Redondeo Mes Anterior (soles)</Label>
            <Input
              id="prevRounding"
              placeholder="Ingrese soles"
              value={prevRounding}
              onChange={(e) => setPrevRounding(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="currentRounding">Redondeo Mes Actual (soles)</Label>
            <Input
              id="currentRounding"
              placeholder="Ingrese soles"
              value={currentRounding}
              onChange={(e) => setCurrentRounding(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <Button onClick={calculateCosts}>Calcular Costos</Button>
        {results.total > 0 && (
          <div className="w-full text-left">
            <p className="font-semibold">Resultados:</p>
            <p>Costo de electricidad: S/. {results.electricity.toFixed(2)}</p>
            <p>Cargo fijo: S/. {results.fixed.toFixed(2)}</p>
            <p>Interés compensatorio: S/. {results.interest.toFixed(2)}</p>
            <p>Alumbrado público: S/. {results.lighting.toFixed(2)}</p>
            <p>Aporte Ley N° 28749: S/. {results.law.toFixed(2)}</p>
            <p>Recargo por mora: S/. {results.late.toFixed(2)}</p>
            <p>Redondeo Mes Anterior: S/. {results.prevRound.toFixed(2)}</p>
            <p>Redondeo Mes Actual: S/. {results.currentRound.toFixed(2)}</p>
            <p className="font-bold">Total: S/. {results.total.toFixed(2)}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
