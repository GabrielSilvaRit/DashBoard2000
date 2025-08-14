"use client"

import { useState, useEffect } from "react"
import Dashboard from "@/components/dashboard"
import ExcelUpload from "@/components/excel-upload"
import { Button } from "@/components/ui/button"
import { Upload, RefreshCw } from "lucide-react"
import type { DashboardData } from "@/types/dashboard"

// Dados padrão para demonstração
const dadosPadrao: DashboardData = {
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

export default function DashboardPage() {
  const [dados, setDados] = useState<DashboardData>(dadosPadrao)
  const [status, setStatus] = useState<"carregando" | "sucesso" | "erro" | "usando-padrao">("usando-padrao")
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>("")
  const [contadorAtualizacoes, setContadorAtualizacoes] = useState(0)
  const [inicioSistema] = useState(new Date())
  const [isUpdating, setIsUpdating] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  const metaDiariaAtingida = dados.estatisticas.totalAtendimentos >= 300
  const filaAcimaNormal = dados.estatisticas.filaEspera > 10

  const carregarDados = async () => {
    try {
      setIsUpdating(true)
      setStatus("carregando")

      const response = await fetch("/api/excel-data")
      const result = await response.json()

      if (result.success) {
        await new Promise((resolve) => setTimeout(resolve, 800))

        setDados(result.data)
        setStatus("sucesso")
        setUltimaAtualizacao(new Date(result.lastUpdate).toLocaleString("pt-BR"))
        setContadorAtualizacoes((prev) => prev + 1)
      } else {
        console.error("Erro ao carregar dados:", result.error)
        setStatus("erro")
      }
    } catch (error) {
      console.error("Erro na requisição:", error)
      setStatus("erro")
    } finally {
      setTimeout(() => setIsUpdating(false), 1500)
    }
  }

  const calcularTempoFuncionamento = () => {
    const agora = new Date()
    const diferenca = agora.getTime() - inicioSistema.getTime()
    const horas = Math.floor(diferenca / (1000 * 60 * 60))
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
    return `${horas}h ${minutos}m`
  }

  useEffect(() => {
    carregarDados()
    const interval = setInterval(carregarDados, 60000) // Atualiza a cada minuto
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Overlay de atualização */}
      {isUpdating && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-slate-800/90 rounded-lg p-6 flex items-center gap-4">
            <RefreshCw className="h-6 w-6 text-blue-400 animate-spin" />
            <span className="text-slate-200">Atualizando dados...</span>
          </div>
        </div>
      )}

      {/* Barra de status superior */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center justify-center gap-6 text-sm bg-slate-800/80 backdrop-blur-sm rounded-lg px-6 py-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${metaDiariaAtingida ? "bg-green-400" : "bg-yellow-400"}`} />
            <span className="text-slate-300 text-xs">
              {metaDiariaAtingida ? "Meta diária atingida" : "Meta diária pendente"}
            </span>
          </div>

          <div className="w-px h-4 bg-slate-600"></div>

          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${filaAcimaNormal ? "bg-yellow-400" : "bg-green-400"}`} />
            <span className="text-slate-300 text-xs">{filaAcimaNormal ? "Fila acima do normal" : "Fila normal"}</span>
          </div>

          <div className="w-px h-4 bg-slate-600"></div>

          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                status === "carregando"
                  ? "bg-yellow-400 animate-pulse"
                  : status === "sucesso"
                    ? "bg-green-400"
                    : status === "erro"
                      ? "bg-red-400"
                      : "bg-gray-400"
              }`}
            />
            <span className="text-slate-300 text-xs">
              {status === "carregando"
                ? "Atualizando..."
                : status === "sucesso"
                  ? "Sistema Online"
                  : status === "erro"
                    ? "Erro na conexão"
                    : "Modo demonstração"}
            </span>
          </div>

          <div className="w-px h-4 bg-slate-600"></div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs">Atualizações: {contadorAtualizacoes}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs">Online: {calcularTempoFuncionamento()}</span>
          </div>
        </div>

        {ultimaAtualizacao && (
          <div className="text-center mt-2 text-xs text-slate-500">Última atualização: {ultimaAtualizacao}</div>
        )}
      </div>

      {/* Botões de controle */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <Button
          onClick={() => setShowUpload(!showUpload)}
          size="sm"
          variant="outline"
          className="bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          Excel
        </Button>

        <Button
          onClick={carregarDados}
          size="sm"
          variant="outline"
          disabled={isUpdating}
          className="bg-slate-800/80 border-slate-600 text-slate-200 hover:bg-slate-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isUpdating ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      {/* Modal de upload */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <ExcelUpload
              onUploadSuccess={() => {
                setShowUpload(false)
                carregarDados()
              }}
            />
            <Button
              onClick={() => setShowUpload(false)}
              variant="outline"
              size="sm"
              className="mt-4 w-full bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Dashboard principal */}
      <div
        className={`transition-all duration-700 ${isUpdating ? "scale-[0.98] opacity-95" : "scale-100 opacity-100"}`}
      >
        <Dashboard dados={dados} />
      </div>
    </div>
  )
}
