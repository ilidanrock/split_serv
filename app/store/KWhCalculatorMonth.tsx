import { create } from "zustand"

type State = {
    nombre: string
    medicionAnterior: string
    medicionActual: string
    inquilinos: {
        nombre: string
        medicionAnterior: number
        medicionActual: number
    }[]
    setNombre: (nombre: string) => void
    setMedicionAnterior: (medicionAnterior: string) => void
    setMedicionActual: (medicionActual: string) => void
    setInquilinos: (inquilinos: State['inquilinos']) => void
    agregarInquilino: () => void
    calcularConsumo: (anterior: number, actual: number) => number
    calcularTotalKWh: () => number
}

export const useKWhCalculatorMonth = create<State>((set) => ({
    nombre: '',
    medicionAnterior: '',
    medicionActual: '',
    inquilinos: [],
    setNombre: (nombre: string) => set({ nombre }),
    setMedicionAnterior: (medicionAnterior: string) => set({ medicionAnterior }),
    setMedicionActual: (medicionActual: string) => set({ medicionActual }),
    setInquilinos: (inquilinos: State['inquilinos']) => set({ inquilinos }),
    agregarInquilino: () => {
        set((state) => {
            if (state.nombre && state.medicionAnterior && state.medicionActual) {
                return {
                    inquilinos: [...state.inquilinos, {
                        nombre: state.nombre,
                        medicionAnterior: parseFloat(state.medicionAnterior),
                        medicionActual: parseFloat(state.medicionActual)
                    }],
                    nombre: '',
                    medicionAnterior: '',
                    medicionActual: ''
                }
            }
            return state;
        })
    },
    calcularConsumo: (anterior, actual) => {
        return Math.max(actual - anterior, 0)
    },
    calcularTotalKWh: (): number => {
        return useKWhCalculatorMonth.getState().inquilinos.reduce((total, inquilino) =>
            total + useKWhCalculatorMonth.getState().calcularConsumo(inquilino.medicionAnterior, inquilino.medicionActual), 0
        )
    }
}))