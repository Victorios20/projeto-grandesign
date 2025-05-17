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

export default function DadosServicoPage() {
    const router = useRouter()
    const { dadosServico, setDadosServico } = useOrcamento()

    const [formValues, setFormValues] = useState({
        tipoTelhado: dadosServico.tipoTelhado || "",
        tamanhoMadeira: dadosServico.tamanhoMadeira || "",
        tipoMadeira: dadosServico.tipoMadeira || "",
        corMadeira: dadosServico.corMadeira || "",
        quantidadeMetros: dadosServico.quantidadeMetros || 0,
    })

    const totalCampos = Object.keys(formValues).length
    const camposPreenchidos = Object.values(formValues).filter(valor => {
        if (typeof valor === 'number') return valor > 0
        return valor.trim() !== ""
    }).length
    const progresso = Math.round((camposPreenchidos / totalCampos) * 33) + 33 // continua do 33 da etapa anterior

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormValues(prev => ({
            ...prev,
            [name]: name === "quantidadeMetros" ? Number(value) : value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDadosServico(formValues)
        router.push("/resumo") // ou próxima rota que desejar
    }

    const handleClearForm = () => {
        const dadosLimpos = {
            tipoTelhado: "",
            tamanhoMadeira: "",
            tipoMadeira: "",
            corMadeira: "",
            quantidadeMetros: 0,
        }
        setDadosServico(dadosLimpos)
        setFormValues(dadosLimpos)
    }

    const links = [
        { label: "Home", href: "/home" },
        { label: "Dados Pessoais", href: "/home/gerar-orcamento/dados-pessoais" },
        { label: "Dados Serviço", href: "/home/gerar-orcamento/dados-servico" },
    ];



    return (
        <PageLayout links={links}>
            <div className="w-full mx-auto flex flex-col gap-6 p-6 text-foreground">
                <Progress value={progresso} className="w-full" />
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Etapa 2: Dados do Serviço</h1>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClearForm}
                        className="text-red-500 hover:text-red-700"
                    >
                        <Trash className="w-5 h-5 mr-2" />
                        Limpar
                    </Button>
                </div>
                <p className="text-muted-foreground">
                    Preencha os dados do serviço para continuar com o orçamento.
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
                    {[
                        { id: "tipoTelhado", label: "Tipo de Telhado", placeholder: "Ex: Telha cerâmica" },
                        { id: "tamanhoMadeira", label: "Tamanho da Madeira", placeholder: "Ex: 2x4" },
                        { id: "tipoMadeira", label: "Tipo da Madeira", placeholder: "Ex: Eucalipto" },
                        { id: "corMadeira", label: "Cor da Madeira", placeholder: "Ex: Natural" },
                        { id: "quantidadeMetros", label: "Quantidade em Metros", placeholder: "Ex: 50" },
                    ].map(({ id, label, placeholder }) => (
                        <div key={id} className="flex flex-col">
                            <Label htmlFor={id} className="mb-2">{label}</Label>
                            <Input
                                type={id === "quantidadeMetros" ? "number" : "text"}
                                name={id}
                                id={id}
                                placeholder={placeholder}
                                required
                                min={id === "quantidadeMetros" ? 0 : undefined}
                                value={formValues[id as keyof typeof formValues]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <div></div>

                    <div className="flex justify-between col-span-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/home/gerar-orcamento/dados-pessoais")}
                        >
                            Voltar
                        </Button>
                        <Button type="submit">
                            Próxima Etapa
                        </Button>
                    </div>

                </form>
            </div>
        </PageLayout>
    )
}