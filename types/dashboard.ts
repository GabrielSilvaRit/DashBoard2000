export interface Atendente {
  id: number
  nome: string
  atendimentos: number
  tempoMedio: string
  satisfacao: number
  status: "online" | "ocupado" | "pausa" | "offline"
  eficiencia: number
}

export interface Estatisticas {
  totalAtendimentos: number
  chamadosFinalizados: number
  chamadosEmAtendimento: number
  taxaResolucao: number
  filaEspera: number
  tempoMedioEspera: string
  chamadosPendentes: number
  totalChamados: number
}

export interface DadosGraficoHora {
  hora: string
  atendimentos: number
}

export interface DadosCliente {
  cliente: string
  atendimentos: number
  porcentagem: number
}

export interface Alerta {
  tipo: "warning" | "success" | "error"
  mensagem: string
}

export interface DashboardData {
  atendentes: Atendente[]
  estatisticas: Estatisticas
  dadosGraficoHora: DadosGraficoHora[]
  dadosClientes: DadosCliente[]
  alertas: Alerta[]
}

export interface ExcelResponse {
  success: boolean
  data?: DashboardData
  error?: string
  lastUpdate?: string
}
