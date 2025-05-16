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
        email: dadosPessoais.email || "",  // <-- campo email adicionado aqui
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
        router.push("/gerar-orcamento/dados-servico")
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
        { label: "Dados Pessoais", href: "/gerar-orcamento/dados-pessoais" },
    ]

    return (
        <PageLayout links={links}>
            <div className="w-full mx-auto flex flex-col gap-6 p-6 text-foreground">
                <Progress value={progresso} className="w-full" />
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Etapa 1: Dados Pessoais</h1>
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
                    Preencha os dados básicos do cliente para iniciar o orçamento.
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6">
                    {[
                        { id: "nome", label: "Nome completo", placeholder: "Ex: João da Silva" },
                        { id: "numero", label: "Número da residência", placeholder: "Ex: 123" },
                        { id: "endereco", label: "Endereço", placeholder: "Ex: Rua das Flores" },
                        { id: "bairro", label: "Bairro", placeholder: "Ex: Centro" },
                        { id: "cidade", label: "Cidade", placeholder: "Ex: Fortaleza" },
                        { id: "telefone", label: "Telefone", placeholder: "(xx) xxxxx-xxxx" },
                        { id: "cpf", label: "CPF", placeholder: "000.000.000-00" },
                        { id: "email", label: "Email", placeholder: "exemplo@email.com" }, // <-- input de email
                    ].map(({ id, label, placeholder }) => (
                        <div key={id} className="flex flex-col">
                            <Label htmlFor={id} className="mb-2">{label}</Label>
                            <Input
                                type={id === "email" ? "email" : "text"} // tipo email para o campo email
                                name={id}
                                id={id}
                                placeholder={placeholder}
                                required
                                value={formValues[id as keyof typeof formValues]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    <div></div>

                    <div className="flex justify-end col-span-2">
                        <Button type="submit" className="mt-4 w-fit">
                            Próxima Etapa
                        </Button>
                    </div>
                </form>
            </div>
        </PageLayout>
    )
}
