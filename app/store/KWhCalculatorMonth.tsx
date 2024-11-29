import { create } from "zustand";

type Inquilino = {
  nombre: string;
  medicionAnteriorLuz: number;
  medicionActualLuz: number;
  consumoKWh?: number;
};

type State = {
  nombre: string;
  medicionAnteriorLuz: string;
  medicionActualLuz: string;
  consumoTotalFacturaLuz: string;
  costoTotalLuz: string;
  costoTotalAgua: string;
  inquilinos: Inquilino[];
  costoPorKWh: number;
  setNombre: (nombre: string) => void;
  setMedicionAnteriorLuz: (medicionAnteriorLuz: string) => void;
  setMedicionActualLuz: (medicionActualLuz: string) => void;
  setConsumoTotalFacturaLuz: (consumoTotalFacturaLuz: string) => void;
  setCostoTotalLuz: (costoTotalLuz: string) => void;
  setCostoTotalAgua: (costoTotalAgua: string) => void;
  setCostoPorKWh: (costoPorKWh: number) => void;
  setInquilinos: (inquilinos: Inquilino[]) => void;
  agregarInquilino: () => void;
  removerInquilino: (index: number) => void;
  calcularConsumoLuz: (anterior: number, actual: number) => number;
  calcularTotalKWh: () => number;
  calcularConsumoPropio: () => number;
  calcularCostoPorInquilino: (
    importsBeforeIGV: number,
    othersImports: number
  ) => { nombre: string; costoLuz: number; costoAgua: number }[];
};

export const useKWhCalculatorMonth = create<State>((set, get) => ({
  nombre: "",
  medicionAnteriorLuz: "",
  medicionActualLuz: "",
  consumoTotalFacturaLuz: "",
  costoTotalLuz: "",
  costoTotalAgua: "",
  inquilinos: [],
  costoPorKWh: 0,

  setNombre: (nombre) => set({ nombre }),
  setMedicionAnteriorLuz: (medicionAnteriorLuz) => set({ medicionAnteriorLuz }),
  setMedicionActualLuz: (medicionActualLuz) => set({ medicionActualLuz }),
  setConsumoTotalFacturaLuz: (consumoTotalFacturaLuz) =>
    set({ consumoTotalFacturaLuz }),
  setCostoTotalLuz: () => set((state) => {
    const result = state.inquilinos.reduce((total, inquilino) => total + (inquilino.consumoKWh || 0), 0);
    return { costoTotalLuz: result.toString() };
  }),
  setCostoTotalAgua: (costoTotalAgua) => set({ costoTotalAgua }),
  setCostoPorKWh: (costoPorKWh) => set({ costoPorKWh }),
  setInquilinos: (inquilinos) => set({ inquilinos }),

  agregarInquilino: () => {
    set((state) => {
      if (state.nombre && state.medicionAnteriorLuz && state.medicionActualLuz) {
        const nuevoInquilino: Inquilino = {
          nombre: state.nombre,
          medicionAnteriorLuz: parseFloat(state.medicionAnteriorLuz),
          medicionActualLuz: parseFloat(state.medicionActualLuz),
          consumoKWh: get().calcularConsumoLuz(
            parseFloat(state.medicionAnteriorLuz),
            parseFloat(state.medicionActualLuz)
          ),
        };
        return {
          inquilinos: [...state.inquilinos, nuevoInquilino],
          nombre: "",
          medicionAnteriorLuz: "",
          medicionActualLuz: "",
        };
      }
      return state;
    });
  },

  removerInquilino: (index) => {
    set((state) => ({
      inquilinos: state.inquilinos.filter((_, i) => i !== index),
    }));
  },

  calcularConsumoLuz: (anterior, actual) => Math.max(actual - anterior, 0),

  calcularTotalKWh: () =>
    get().inquilinos.reduce(
      (total, inquilino) => total + (inquilino.consumoKWh || 0),
      0
    ),

  calcularConsumoPropio: () => {
    const totalFacturaLuz = parseFloat(get().consumoTotalFacturaLuz) || 0;
    const totalInquilinosLuz = get().calcularTotalKWh();
    return Math.max(totalFacturaLuz - totalInquilinosLuz, 0);
  },

  calcularCostoPorInquilino: (importsBeforeIGV, othersImports) => {
    const { inquilinos, costoTotalAgua, calcularConsumoPropio, costoPorKWh } =
      get();

    const consumoPropio = calcularConsumoPropio();
    const numeroPersonas = inquilinos.length + 1 || 1;

    const costoAguaPorPersona = parseFloat(costoTotalAgua) / numeroPersonas;
    const importesBeforeIGVporPersona = importsBeforeIGV / numeroPersonas;
    const otherImportsPerPerson = othersImports / numeroPersonas;

    const costosPorInquilino = inquilinos.map((inquilino) => ({
      nombre: inquilino.nombre,
      costoLuz:
        (((inquilino.consumoKWh || 0) * costoPorKWh +
          importesBeforeIGVporPersona) *
          1.18 +
          otherImportsPerPerson),
      costoAgua: costoAguaPorPersona,
    }));

    costosPorInquilino.push({
      nombre: "Propietario Delia",
      costoLuz:
        ((consumoPropio * costoPorKWh + importesBeforeIGVporPersona) * 1.18 +
          otherImportsPerPerson),
      costoAgua: costoAguaPorPersona,
    });

    // const totalCostoLuz = costosPorInquilino.reduce(
    //   (total, inquilino) => total + inquilino.costoLuz,
    //   0
    // );


    return costosPorInquilino;
  },
}));
