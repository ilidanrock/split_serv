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
  resultsBeforeIGV: {
    electricity: number
    fixed: number
    interest: number
    lighting: number
    total: number
},
  resultsOtherImports: {
    law: number
    lateFee: number
    prevRounding: number
    currentRounding: number
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
  setResultsBeforeIGV: (results: State['resultsBeforeIGV']) => void
  calculateImportsBeforeIGV: () => void
  calculateOtherImports: () => void
}

export const useImportsCalculator = create<State>((set) => ({
  repMantLuz: '',
  fixedCharge: '',
  interest: '',
  publicLighting: '',
  lawContribution: '',
  lateFee: '',
  prevRounding: '',
  currentRounding: '',
  resultsBeforeIGV: {
    electricity: 0,
    fixed: 0,
    interest: 0,
    lighting: 0,
    total: 0
  },
  resultsOtherImports: {
    law: 0,
    lateFee: 0,
    prevRounding: 0,
    currentRounding: 0,
    total: 0
  },
  calculateOtherImports: () => set((state) => {
    const law = parseFloat(state.lawContribution || "0")
    const lateFee = parseFloat(state.lateFee || "0")
    const prevRounding = parseFloat(state.prevRounding || "0")
    const currentRounding = parseFloat(state.currentRounding || "0")
    const total = law + lateFee + prevRounding + currentRounding

    return {
      resultsOtherImports: {
        law: law,
        lateFee: lateFee,
        prevRounding: prevRounding,
        currentRounding: currentRounding,
        total: total
      }
    }
  }
  ),
  setRepMantLuz: (repMantLuz: string) => set({ repMantLuz }),
  setFixedCharge: (fixedCharge: string) => set({ fixedCharge }),
  setInterest: (interest: string) => set({ interest }),
  setPublicLighting: (publicLighting: string) => set({ publicLighting }),
  setLawContribution: (lawContribution: string) => set({ lawContribution }),
  setLateFee: (lateFee: string) => set({ lateFee }),
  setPrevRounding: (prevRounding: string) => set({ prevRounding }),
  setCurrentRounding: (currentRounding: string) => set({ currentRounding }),
  setResultsBeforeIGV: (resultsBeforeIGV: State['resultsBeforeIGV']) => set({ resultsBeforeIGV }),
  calculateImportsBeforeIGV: () => set((state) => {
    const repMantLuz = parseFloat(state.repMantLuz || "0") 
    const fixedChargeCost = parseFloat(state.fixedCharge || "0")
    const interestCost = parseFloat(state.interest || "0")
    const lightingCost = parseFloat(state.publicLighting || "0")
    
    const total = repMantLuz + fixedChargeCost + interestCost + lightingCost

    return {
      resultsBeforeIGV: {
        electricity: repMantLuz,
        fixed: fixedChargeCost,
        interest: interestCost,
        lighting: lightingCost,
        total: total
      }
    }
  })
}))


