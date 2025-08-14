"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react"

interface ExcelUploadProps {
  onUploadSuccess?: () => void
}

export default function ExcelUpload({ onUploadSuccess }: ExcelUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setUploadStatus("error")
      setMessage("Por favor, selecione um arquivo Excel (.xlsx ou .xls)")
      return
    }

    setUploading(true)
    setUploadStatus("idle")

    try {
      const formData = new FormData()
      formData.append("excel", file)

      const response = await fetch("/api/excel-data", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus("success")
        setMessage("Planilha carregada com sucesso!")
        onUploadSuccess?.()
      } else {
        setUploadStatus("error")
        setMessage(result.error || "Erro ao processar planilha")
      }
    } catch (error) {
      setUploadStatus("error")
      setMessage("Erro ao enviar arquivo")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="bg-slate-800/60 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-200 text-sm flex items-center gap-2">
          <FileSpreadsheet className="h-4 w-4 text-green-400" />
          Upload de Planilha Excel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-300 text-sm mb-2">Arraste e solte sua planilha Excel aqui</p>
          <p className="text-slate-500 text-xs mb-4">Formatos suportados: .xlsx, .xls</p>

          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="excel-upload"
            disabled={uploading}
          />

          <Button
            asChild
            variant="outline"
            size="sm"
            disabled={uploading}
            className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
          >
            <label htmlFor="excel-upload" className="cursor-pointer">
              {uploading ? "Carregando..." : "Selecionar Arquivo"}
            </label>
          </Button>
        </div>

        {uploadStatus !== "idle" && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              uploadStatus === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            {uploadStatus === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span className="text-sm">{message}</span>
          </div>
        )}

        <div className="text-xs text-slate-500">
          <p className="font-medium mb-1">Estrutura esperada da planilha:</p>
          <ul className="space-y-1">
            <li>• Aba "Atendentes": Nome, Atendimentos, TempoMedio, Status</li>
            <li>• Aba "Estatisticas": TotalAtendimentos, FilaEspera, etc.</li>
            <li>• Aba "GraficoHora": Hora, Atendimentos</li>
            <li>• Aba "Clientes": Cliente, Atendimentos, Porcentagem</li>
            <li>• Aba "Alertas": Tipo, Mensagem</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
