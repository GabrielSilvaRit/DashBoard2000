import { type NextRequest, NextResponse } from "next/server"
import { processExcelData, transformExcelToDashboard } from "@/lib/excel-reader"
import type { ExcelResponse } from "@/types/dashboard"

// Dados padrão para demonstração
const dadosPadrao = {
  atendentes: [
    {
      id: 1,
      nome: "João Rodrigues Pereira",
      atendimentos: 45,
      tempoMedio: "8m 30s",
      satisfacao: 5,
      status: "online",
      eficiencia: 92,
    },
    {
      id: 2,
      nome: "Maria Silva Santos",
      atendimentos: 38,
      tempoMedio: "7m 15s",
      satisfacao: 5,
      status: "online",
      eficiencia: 95,
    },
    {
      id: 3,
      nome: "Carlos Eduardo Lima",
      atendimentos: 42,
      tempoMedio: "9m 45s",
      satisfacao: 5,
      status: "ocupado",
      eficiencia: 88,
    },
    {
      id: 4,
      nome: "Ana Paula Costa",
      atendimentos: 35,
      tempoMedio: "6m 30s",
      satisfacao: 5,
      status: "online",
      eficiencia: 91,
    },
    {
      id: 5,
      nome: "Pedro Henrique Silva",
      atendimentos: 29,
      tempoMedio: "10m 15s",
      satisfacao: 4,
      status: "pausa",
      eficiencia: 85,
    },
    {
      id: 6,
      nome: "Fernanda Oliveira",
      atendimentos: 33,
      tempoMedio: "7m 45s",
      satisfacao: 5,
      status: "online",
      eficiencia: 89,
    },
  ],
  estatisticas: {
    totalAtendimentos: 322,
    chamadosFinalizados: 298,
    chamadosEmAtendimento: 18,
    taxaResolucao: 92.5,
    filaEspera: 6,
    tempoMedioEspera: "2m 15s",
    chamadosPendentes: 6,
    totalChamados: 322,
  },
  dadosGraficoHora: [
    { hora: "08:00", atendimentos: 15 },
    { hora: "09:00", atendimentos: 28 },
    { hora: "10:00", atendimentos: 35 },
    { hora: "11:00", atendimentos: 42 },
    { hora: "12:00", atendimentos: 38 },
    { hora: "13:00", atendimentos: 25 },
    { hora: "14:00", atendimentos: 45 },
    { hora: "15:00", atendimentos: 52 },
    { hora: "16:00", atendimentos: 48 },
    { hora: "17:00", atendimentos: 41 },
    { hora: "18:00", atendimentos: 33 },
    { hora: "19:00", atendimentos: 28 },
    { hora: "20:00", atendimentos: 22 },
    { hora: "21:00", atendimentos: 18 },
  ],
  dadosClientes: [
    { cliente: "Spal Transportes", atendimentos: 95, porcentagem: 75 },
    { cliente: "Heineken Brasil", atendimentos: 78, porcentagem: 62 },
    { cliente: "Coca-Cola Company", atendimentos: 65, porcentagem: 51 },
    { cliente: "Pepsi Corporation", atendimentos: 52, porcentagem: 41 },
    { cliente: "Guaraná Antarctica", atendimentos: 38, porcentagem: 30 },
    { cliente: "Ambev Logística", atendimentos: 29, porcentagem: 23 },
  ],
  alertas: [
    { tipo: "success", mensagem: "Sistema funcionando normalmente" },
    { tipo: "warning", mensagem: "Fila de espera acima da média" },
    { tipo: "success", mensagem: "Meta diária atingida" },
  ],
}

export async function GET(request: NextRequest) {
  try {
    // Simular variação nos dados para demonstrar atualização em tempo real
    const variacao = Math.random() * 0.1 - 0.05 // -5% a +5%
    const dadosVariados = {
      ...dadosPadrao,
      estatisticas: {
        ...dadosPadrao.estatisticas,
        totalAtendimentos: Math.max(1, Math.floor(dadosPadrao.estatisticas.totalAtendimentos * (1 + variacao))),
        filaEspera: Math.max(0, Math.floor(dadosPadrao.estatisticas.filaEspera + (Math.random() * 10 - 5))),
      },
      atendentes: dadosPadrao.atendentes.map((atendente) => ({
        ...atendente,
        atendimentos: Math.max(0, Math.floor(atendente.atendimentos * (1 + variacao * 0.5))),
      })),
    }

    const response: ExcelResponse = {
      success: true,
      data: dadosVariados,
      lastUpdate: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Erro ao processar dados:", error)

    const response: ExcelResponse = {
      success: false,
      error: "Erro ao carregar dados da planilha Excel",
      data: dadosPadrao, // Fallback para dados padrão
    }

    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("excel") as File

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "Nenhum arquivo Excel foi enviado",
        },
        { status: 400 },
      )
    }

    const buffer = await file.arrayBuffer()
    const excelData = processExcelData(buffer)
    const dashboardData = transformExcelToDashboard(excelData)

    const response: ExcelResponse = {
      success: true,
      data: dashboardData,
      lastUpdate: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Erro ao processar arquivo Excel:", error)

    const response: ExcelResponse = {
      success: false,
      error: "Erro ao processar arquivo Excel",
      data: dadosPadrao,
    }

    return NextResponse.json(response, { status: 500 })
  }
}
