"use client"

import { useState, useEffect } from "react"

export type DadosPessoais = {
  nome?: string
  numero?: string
  endereco?: string
  bairro?: string
  cidade?: string
  telefone?: string
  cpf?: string
  email?: string
}

type DadosServico = {
  tipoTelhado: string
  tamanhoMadeira: string
  tipoMadeira: string
  corMadeira: string
  quantidadeMetros: number
  dataEntrega?: string  // Propriedade adicionada
}

export function useOrcamento() {
  // Função para carregar dados do localStorage, ou retornar valores iniciais
  const carregarDadosPessoais = (): DadosPessoais => {
    if (typeof window === "undefined") return {
      nome: "",
      numero: "",
      endereco: "",
      email: "",
      cpf: "",
    }

    const dados = localStorage.getItem("dadosPessoais")
    return dados ? JSON.parse(dados) : {
      nome: "",
      numero: "",
      endereco: "",
      email: "",
      cpf: "",
    }
  }

  const carregarDadosServico = (): DadosServico => {
    if (typeof window === "undefined") return {
      tipoTelhado: "",
      tamanhoMadeira: "",
      tipoMadeira: "",
      corMadeira: "",
      quantidadeMetros: 0,
      dataEntrega: "",  // Inicializa também
    }

    const dados = localStorage.getItem("dadosServico")
    return dados ? JSON.parse(dados) : {
      tipoTelhado: "",
      tamanhoMadeira: "",
      tipoMadeira: "",
      corMadeira: "",
      quantidadeMetros: 0,
      dataEntrega: "",  // Inicializa também
    }
  }

  const [dadosPessoais, setDadosPessoais] = useState<DadosPessoais>(carregarDadosPessoais)
  const [dadosServico, setDadosServico] = useState<DadosServico>(carregarDadosServico)
  const [foto, setFoto] = useState<File | null>(null) // Foto não vai para localStorage

  // Salvar dadosPessoais no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("dadosPessoais", JSON.stringify(dadosPessoais))
  }, [dadosPessoais])

  // Salvar dadosServico no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("dadosServico", JSON.stringify(dadosServico))
  }, [dadosServico])

  const resetar = () => {
    const dadosPessoaisIniciais = {
      nome: "",
      numero: "",
      endereco: "",
      email: "",
      cpf: "",
    }
    const dadosServicoIniciais = {
      tipoTelhado: "",
      tamanhoMadeira: "",
      tipoMadeira: "",
      corMadeira: "",
      quantidadeMetros: 0,
      dataEntrega: "",  // Reset também aqui
    }
    setDadosPessoais(dadosPessoaisIniciais)
    setDadosServico(dadosServicoIniciais)
    setFoto(null)

    localStorage.removeItem("dadosPessoais")
    localStorage.removeItem("dadosServico")
  }

  return {
    dadosPessoais,
    setDadosPessoais,
    dadosServico,
    setDadosServico,
    foto,
    setFoto,
    resetar,
  }
}
