'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RentUtilityCalc() {
  const [electricityUsage, setElectricityUsage] = useState('')
  const [fixedCharge, setFixedCharge] = useState('')
  const [interest, setInterest] = useState('')
  const [publicLighting, setPublicLighting] = useState('')
  const [lawContribution, setLawContribution] = useState('')
  const [lateFee, setLateFee] = useState('')
  const [prevRounding, setPrevRounding] = useState('')
  const [currentRounding, setCurrentRounding] = useState('')
  const [results, setResults] = useState({ electricity: 0, fixed: 0, interest: 0, lighting: 0, law: 0, late: 0, prevRound: 0, currentRound: 0, total: 0 })

  const calculateCosts = () => {
    const electricityCost = parseFloat(electricityUsage || "0") * 0.12
    const fixedChargeCost = parseFloat(fixedCharge || "0")
    const interestCost = parseFloat(interest || "0")
    const lightingCost = parseFloat(publicLighting || "0")
    const lawCost = parseFloat(lawContribution || "0")
    const lateFeeCost = parseFloat(lateFee || "0")
    const prevRoundCost = parseFloat(prevRounding || "0")
    const currentRoundCost = parseFloat(currentRounding || "0")
    const total = electricityCost + fixedChargeCost + interestCost + lightingCost + lawCost + lateFeeCost + prevRoundCost + currentRoundCost

    setResults({
      electricity: electricityCost,
      fixed: fixedChargeCost,
      interest: interestCost,
      lighting: lightingCost,
      law: lawCost,
      late: lateFeeCost,
      prevRound: prevRoundCost,
      currentRound: currentRoundCost,
      total: total
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
            <Label htmlFor="electricity">Reposición y mantenimiento de luz (soles)</Label>
            <Input
              id="electricity"
              placeholder="Ingrese kWh"
              value={electricityUsage}
              onChange={(e) => setElectricityUsage(e.target.value)}
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
