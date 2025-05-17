'use client'

import { PageLayout } from "@/components/grandesgn/page-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useOrcamento } from "@/context/orcamento-context"

export default function DescricaoServicoPage() {
  const router = useRouter()
  const { dadosDescricao, setDadosDescricao } = useOrcamento()

  const [formValues, setFormValues] = useState({
    descricao: dadosDescricao?.descricao || "",
    foto: dadosDescricao?.foto || null, // base64 ou File
  })

  const [preview, setPreview] = useState<string | null>(
    typeof formValues.foto === "string" ? formValues.foto : null
  )

  const progresso = 66 + (formValues.descricao.trim() !== "" && formValues.foto ? 34 : 0)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValues(prev => ({
      ...prev,
      descricao: e.target.value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormValues(prev => ({ ...prev, foto: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDadosDescricao(formValues)
    router.push("/resumo")
  }

  const handleClear = () => {
    setFormValues({ descricao: "", foto: null })
    setDadosDescricao({ descricao: "", foto: null })
    setPreview(null)
  }

  const links = [
    { label: "Home", href: "/home" },
    { label: "Dados Pessoais", href: "/home/gerar-orcamento/dados-pessoais" },
    { label: "Dados Serviço", href: "/home/gerar-orcamento/dados-servico" },
    { label: "Finalizar", href: "/home/gerar-orcamento/descricao-servico" },
  ]

  return (
    <PageLayout links={links}>
      <div className="w-full mx-auto flex flex-col gap-6 p-6 text-foreground relative">
        <Progress value={progresso} className="w-full" />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Etapa 3: Descrição do Serviço</h1>
          <Button
            type="button"
            variant="ghost"
            onClick={handleClear}
            className="text-red-500 hover:text-red-700"
          >
            <Trash className="w-5 h-5 mr-2" />
            Limpar
          </Button>
        </div>
        <p className="text-muted-foreground">
          Adicione uma imagem opcional e uma descrição detalhada do serviço.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <div>
            <Label htmlFor="foto">Foto do Serviço (opcional)</Label>
            <Input
              id="foto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Pré-visualização"
                className="mt-4 rounded-md max-h-64 object-cover"
              />
            )}
          </div>

          <div>
            <Label htmlFor="descricao">Descrição do Serviço</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva em detalhes o serviço solicitado..."
              rows={6}
              value={formValues.descricao}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/home/gerar-orcamento/dados-servico")}
            >
              Voltar
            </Button>
            <Button type="submit">
              Gerar orçamento
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
