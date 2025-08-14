import * as XLSX from "xlsx"

export interface ExcelData {
  atendentes: any[]
  estatisticas: any[]
  graficoHora: any[]
  clientes: any[]
  alertas: any[]
}

export function processExcelData(buffer: ArrayBuffer): ExcelData {
  const workbook = XLSX.read(buffer, { type: "array" })

  const result: ExcelData = {
    atendentes: [],
    estatisticas: [],
    graficoHora: [],
    clientes: [],
    alertas: [],
  }

  // Processar aba "Atendentes"
  if (workbook.SheetNames.includes("Atendentes")) {
    const worksheet = workbook.Sheets["Atendentes"]
    result.atendentes = XLSX.utils.sheet_to_json(worksheet)
  }

  // Processar aba "Estatisticas"
  if (workbook.SheetNames.includes("Estatisticas")) {
    const worksheet = workbook.Sheets["Estatisticas"]
    result.estatisticas = XLSX.utils.sheet_to_json(worksheet)
  }

  // Processar aba "GraficoHora"
  if (workbook.SheetNames.includes("GraficoHora")) {
    const worksheet = workbook.Sheets["GraficoHora"]
    result.graficoHora = XLSX.utils.sheet_to_json(worksheet)
  }

  // Processar aba "Clientes"
  if (workbook.SheetNames.includes("Clientes")) {
    const worksheet = workbook.Sheets["Clientes"]
    result.clientes = XLSX.utils.sheet_to_json(worksheet)
  }

  // Processar aba "Alertas"
  if (workbook.SheetNames.includes("Alertas")) {
    const worksheet = workbook.Sheets["Alertas"]
    result.alertas = XLSX.utils.sheet_to_json(worksheet)
  }

  return result
}

export function transformExcelToDashboard(excelData: ExcelData): any {
  // Transformar dados dos atendentes
  const atendentes = excelData.atendentes.map((row: any, index: number) => ({
    id: index + 1,
    nome: row.Nome || row.nome || `Atendente ${index + 1}`,
    atendimentos: Number(row.Atendimentos || row.atendimentos || 0),
    tempoMedio: row.TempoMedio || row.tempo_medio || row.tempoMedio || "0m 0s",
    satisfacao: Number(row.Satisfacao || row.satisfacao || 5),
    status: (row.Status || row.status || "online").toLowerCase(),
    eficiencia: Number(row.Eficiencia || row.eficiencia || 90),
  }))

  // Transformar estatísticas
  const estatisticasRow = excelData.estatisticas[0] || {}
  const estatisticas = {
    totalAtendimentos: Number(estatisticasRow.TotalAtendimentos || estatisticasRow.total_atendimentos || 0),
    chamadosFinalizados: Number(estatisticasRow.ChamadosFinalizados || estatisticasRow.chamados_finalizados || 0),
    chamadosEmAtendimento: Number(
      estatisticasRow.ChamadosEmAtendimento || estatisticasRow.chamados_em_atendimento || 0,
    ),
    taxaResolucao: Number(estatisticasRow.TaxaResolucao || estatisticasRow.taxa_resolucao || 0),
    filaEspera: Number(estatisticasRow.FilaEspera || estatisticasRow.fila_espera || 0),
    tempoMedioEspera: estatisticasRow.TempoMedioEspera || estatisticasRow.tempo_medio_espera || "0m 0s",
    chamadosPendentes: Number(estatisticasRow.ChamadosPendentes || estatisticasRow.chamados_pendentes || 0),
    totalChamados: Number(estatisticasRow.TotalChamados || estatisticasRow.total_chamados || 0),
  }

  // Transformar dados do gráfico por hora
  const dadosGraficoHora = excelData.graficoHora.map((row: any) => ({
    hora: row.Hora || row.hora || "00:00",
    atendimentos: Number(row.Atendimentos || row.atendimentos || 0),
  }))

  // Transformar dados dos clientes
  const dadosClientes = excelData.clientes.map((row: any) => ({
    cliente: row.Cliente || row.cliente || "Cliente",
    atendimentos: Number(row.Atendimentos || row.atendimentos || 0),
    porcentagem: Number(row.Porcentagem || row.porcentagem || 0),
  }))

  // Transformar alertas
  const alertas = excelData.alertas.map((row: any) => ({
    tipo: (row.Tipo || row.tipo || "warning").toLowerCase(),
    mensagem: row.Mensagem || row.mensagem || "Alerta do sistema",
  }))

  return {
    atendentes,
    estatisticas,
    dadosGraficoHora,
    dadosClientes,
    alertas,
  }
}
