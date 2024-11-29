"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useImportsCalculator } from "@/app/store/ImportsCalculator"

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
    resultsBeforeIGV,
    resultsOtherImports,
    calculateOtherImports,
    calculateImportsBeforeIGV,
    setFixedCharge,
    setInterest,
    setPublicLighting,
    setLawContribution,
    setLateFee,
    setPrevRounding,
    setCurrentRounding,
    setRepMantLuz,
    setResultsBeforeIGV, // Asegúrate de que este setter esté disponible en el store
  } = useImportsCalculator()

  // Función para resetear los valores de los inputs y los resultados
  const resetValues = () => {
    setRepMantLuz('')
    setFixedCharge('')
    setInterest('')
    setPublicLighting('')
    setLawContribution('')
    setLateFee('')
    setPrevRounding('')
    setCurrentRounding('')
    setResultsBeforeIGV({ 
      electricity: 0,
      fixed: 0,
      interest: 0,
      lighting: 0,
      total: 0
    })
  }

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
              type="text"
              inputMode="numeric"
              value={repMantLuz}
              onChange={(e) => !isNaN(parseFloat(e.target.value)) && setRepMantLuz(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fixedCharge">Cargo fijo (soles)</Label>
            <Input
              id="fixedCharge"
              type="text"
              inputMode="numeric"
              placeholder="Ingrese soles"
              value={fixedCharge}
              onChange={(e) => !isNaN(parseFloat(e.target.value)) && setFixedCharge(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="interest">Interés compensatorio (soles)</Label>
            <Input
              id="interest"
              type="text"
              inputMode="numeric"
              placeholder="Ingrese soles"
              value={interest}
              onChange={(e) => !isNaN(parseFloat(e.target.value)) && setInterest(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="publicLighting">Alumbrado público (soles)</Label>
            <Input
              id="publicLighting"
              type="text"
              inputMode="numeric"
              placeholder="Ingrese soles"
              value={publicLighting}
              onChange={(e) => !isNaN(parseFloat(e.target.value)) && setPublicLighting(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lawContribution">Aporte Ley N° 28749 (soles)</Label>
            <Input
              id="lawContribution"
              type="text"
              inputMode="numeric"
              placeholder="Ingrese soles"
              value={lawContribution}
              onChange={(e) => !isNaN(parseFloat(e.target.value)) && setLawContribution(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lateFee">Recargo por mora (soles)</Label>
            <Input
              id="lateFee"
              placeholder="Ingrese soles"
              type="text"
              inputMode="numeric"
              value={lateFee}
              onChange={(e) => !isNaN(parseFloat(e.target.value)) && setLateFee(e.target.value)}
            />
          </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="prevRounding">Redondeo Mes Anterior (soles)</Label>
            <Input
              id="prevRounding"
              placeholder="Ingrese soles"
              type="text"
              inputMode="numeric"
              value={prevRounding}
              onChange={(e) => setPrevRounding(e.target.value)}
            />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="currentRounding">Redondeo Mes Actual (soles)</Label>
            <Input
              id="currentRounding"
              type="text"
              inputMode="numeric"
              placeholder="Ingrese soles"
              value={currentRounding}
              onChange={(e) => setCurrentRounding(e.target.value)}
            />
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <Button onClick={() => {
          calculateImportsBeforeIGV()
          calculateOtherImports() 
          }}>Calcular Imports</Button>
        {resultsBeforeIGV.total > 0 && (
          <div className="w-full text-left">
            <p className="font-semibold">Resultados:</p>
            <p>Costo de electricidad: S/. {resultsBeforeIGV.electricity.toFixed(2)}</p>
            <p>Cargo fijo: S/. {resultsBeforeIGV.fixed.toFixed(2)}</p>
            <p>Interés compensatorio: S/. {resultsBeforeIGV.interest.toFixed(2)}</p>
            <p>Alumbrado público: S/. {resultsBeforeIGV.lighting.toFixed(2)}</p>
            {/* <p>Aporte Ley N° 28749: S/. {results.law.toFixed(2)}</p>
            <p>Recargo por mora: S/. {results.late.toFixed(2)}</p>
            <p>Redondeo Mes Anterior: S/. {results.prevRound.toFixed(2)}</p>
            <p>Redondeo Mes Actual: S/. {results.currentRound.toFixed(2)}</p> */}
            <p className="font-bold">Total before IGV: S/. {resultsBeforeIGV.total.toFixed(2)}</p>
          </div>
        )}
        {
          // Añade aquí los resultados de los otros importes
          resultsOtherImports.total > 0 && (
            <div className="w-full text-left">
              <p className="font-semibold">Otros Importes:</p>
              <p>Aporte Ley N° 28749: S/. {resultsOtherImports.law.toFixed(2)}</p>
              <p>Recargo por mora: S/. {resultsOtherImports.lateFee.toFixed(2)}</p>
              <p>Redondeo Mes Anterior: S/. {resultsOtherImports.prevRounding.toFixed(2)}</p>
              <p>Redondeo Mes Actual: S/. {resultsOtherImports.currentRounding.toFixed(2)}</p>
              <p className="font-bold">Total: S/. {resultsOtherImports.total.toFixed(2)}</p>
            </div>
          )
        }
        {/* Botón de reset */}
        <Button variant="outline" onClick={resetValues}>Resetear</Button>
      </CardFooter>
    </Card>
  )
}
