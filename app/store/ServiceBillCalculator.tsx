import { create } from 'zustand'

type State = {
  repMantLuz: string
  fixedCharge: string
  interest: string
  publicLighting: string
  lawContribution: string
  lateFee: string
  prevRounding: string
  currentRounding: string
  results: {
    electricity: number
    fixed: number
    interest: number
    lighting: number
    law: number
    late: number
    prevRound: number
    currentRound: number
    total: number
},
  setRepMantLuz: (repMantLuz: string) => void
  setFixedCharge: (fixedCharge: string) => void
  setInterest: (interest: string) => void
  setPublicLighting: (publicLighting: string) => void
  setLawContribution: (lawContribution: string) => void
  setLateFee: (lateFee: string) => void
  setPrevRounding: (prevRounding: string) => void
  setCurrentRounding: (currentRounding: string) => void
  setResults: (results: State['results']) => void
  calculateCosts: () => void
}

export const useServiceBillCalculator = create<State>((set) => ({
  repMantLuz: '',
  fixedCharge: '',
  interest: '',
  publicLighting: '',
  lawContribution: '',
  lateFee: '',
  prevRounding: '',
  currentRounding: '',
  results: {
    electricity: 0,
    fixed: 0,
    interest: 0,
    lighting: 0,
    law: 0,
    late: 0,
    prevRound: 0,
    currentRound: 0,
    total: 0
  },
  setRepMantLuz: (repMantLuz: string) => set({ repMantLuz }),
  setFixedCharge: (fixedCharge: string) => set({ fixedCharge }),
  setInterest: (interest: string) => set({ interest }),
  setPublicLighting: (publicLighting: string) => set({ publicLighting }),
  setLawContribution: (lawContribution: string) => set({ lawContribution }),
  setLateFee: (lateFee: string) => set({ lateFee }),
  setPrevRounding: (prevRounding: string) => set({ prevRounding }),
  setCurrentRounding: (currentRounding: string) => set({ currentRounding }),
  setResults: (results: State['results']) => set({ results }),
  calculateCosts: () => set((state) => {
    const repMantLuz = parseFloat(state.repMantLuz || "0") 
    const fixedChargeCost = parseFloat(state.fixedCharge || "0")
    const interestCost = parseFloat(state.interest || "0")
    const lightingCost = parseFloat(state.publicLighting || "0")
    const lawCost = parseFloat(state.lawContribution || "0")
    const lateFeeCost = parseFloat(state.lateFee || "0")
    const prevRoundCost = parseFloat(state.prevRounding || "0")
    const currentRoundCost = parseFloat(state.currentRounding || "0")
    const total = repMantLuz + fixedChargeCost + interestCost + lightingCost + lawCost + lateFeeCost + prevRoundCost + currentRoundCost

    return {
      results: {
        electricity: repMantLuz,
        fixed: fixedChargeCost,
        interest: interestCost,
        lighting: lightingCost,
        law: lawCost,
        late: lateFeeCost,
        prevRound: prevRoundCost,
        currentRound: currentRoundCost,
        total: total
      }
    }
  })
}))


