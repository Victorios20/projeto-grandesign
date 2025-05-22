'use client'

import { PageLayout } from "@/components/grandesgn/page-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { useOrcamento } from "@/context/orcamento-context"
import { useState } from "react"
import { Trash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DadosPessoaisPage() {
  const router = useRouter()
  const { dadosPessoais, setDadosPessoais } = useOrcamento()

  const [formValues, setFormValues] = useState({
    nome: dadosPessoais.nome || "",
    numero: dadosPessoais.numero || "",
    endereco: dadosPessoais.endereco || "",
    bairro: dadosPessoais.bairro || "",
    cidade: dadosPessoais.cidade || "",
    telefone: dadosPessoais.telefone || "",
    cpf: dadosPessoais.cpf || "",
    email: dadosPessoais.email || "",
  })

  const totalCampos = Object.keys(formValues).length
  const camposPreenchidos = Object.values(formValues).filter(valor => valor.trim() !== "").length
  const progresso = Math.round((camposPreenchidos / totalCampos) * 33)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDadosPessoais(formValues)
    router.push("/home/gerar-orcamento/dados-servico")
  }

  const handleClearForm = () => {
    const dadosLimpos = {
      nome: "",
      numero: "",
      endereco: "",
      bairro: "",
      cidade: "",
      telefone: "",
      cpf: "",
      email: "",
    }

    setDadosPessoais(dadosLimpos)
    setFormValues(dadosLimpos)
  }

  const links = [
    { label: "Home", href: "/home" },
    { label: "Dados Pessoais", href: "/dados-pessoais" },
  ]

  return (
    <PageLayout links={links}>
      {/* Card de progresso */}
      <Card className="w-full shadow-md border rounded-2xl">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Etapa 1</Badge>
              <CardTitle className="text-lg md:text-2xl font-semibold">
                Dados Pessoais
              </CardTitle>
            </div>
          </div>
          <Progress value={progresso} className="w-full animate-pulse" />
          <p className="text-sm text-muted-foreground">{progresso}% preenchido</p>
        </CardHeader>
      </Card>

      {/* Card do formulário */}
      <Card className="w-full mt-6 shadow-md border rounded-2xl">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-semibold">Preencha os dados do cliente</CardTitle>
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                Essas informações são usadas para gerar o orçamento.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={handleClearForm}
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="w-5 h-5 mr-2" />
              Limpar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {[
              { id: "nome", label: "Nome completo", placeholder: "Ex: João da Silva" },
              { id: "numero", label: "Número da residência", placeholder: "Ex: 123" },
              { id: "endereco", label: "Endereço", placeholder: "Ex: Rua das Flores" },
              { id: "bairro", label: "Bairro", placeholder: "Ex: Centro" },
              { id: "cidade", label: "Cidade", placeholder: "Ex: Fortaleza" },
              { id: "telefone", label: "Telefone", placeholder: "(xx) xxxxx-xxxx" },
              { id: "cpf", label: "CPF", placeholder: "000.000.000-00" },
              { id: "email", label: "Email", placeholder: "exemplo@email.com" },
            ].map(({ id, label, placeholder }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <Label htmlFor={id}>{label}</Label>
                <Input
                  type={id === "email" ? "email" : "text"}
                  name={id}
                  id={id}
                  placeholder={placeholder}
                  required={id === "nome" || id === "telefone"}
                  value={formValues[id as keyof typeof formValues]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="md:col-span-2 flex justify-end mt-6">
              <Button type="submit" className="rounded-xl px-6 py-2 text-white bg-black hover:bg-gray-800">
                Próxima Etapa
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
