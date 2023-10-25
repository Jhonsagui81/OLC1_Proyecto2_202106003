import { create } from "zustand";

interface windows {
  id: number;
  nameFile: string;
  grammar: string;
  open: boolean;
}

interface errorTable {
  type: string;
  description: string;
  line: number;
  column: number;
}

interface ResultStore {
  result: string;
  grammar:string;
  windows: windows[];
  reports: {
    table_errors: string;
    ast_graph: string;
    symbol_table: string;
  }
  errorTable: errorTable[];
  updateCurrentCode: (code: string) => void;
  updateResult: (code: string) => void;
  updateReport: (report: any) => void;
  updateWindows: (windows: windows[]) => void;
  deleteWindows: (windows: windows[]) => void;
  updateErrorTable: (errorTable: errorTable[]) => void;
}

export const analyzeStore = create<ResultStore>((set) => ({
  result: "",
  grammar:"",
  windows: [{
    id: 0,
    nameFile: "main.tw",
    grammar: "",
    open: true,
  }],
  reports: {
    table_errors: "",
    ast_graph: "",
    symbol_table: "",
  },
  errorTable: [],
  updateCurrentCode: (code) => set({ grammar: code }),
  updateResult: (code:string) => set({ result: code }),
  updateReport: (report) => set({ reports: report }),
  // update the list 
  updateWindows: (windows) => set({ windows: windows }),
  // delete the list
  deleteWindows: (windows) => set({ windows: windows }),
  updateErrorTable: (errorTable) => set({ errorTable: errorTable }),
}))