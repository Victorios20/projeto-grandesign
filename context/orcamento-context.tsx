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

export type DadosServico = {
  tipoTelhado: string
  tamanhoMadeira: string
  tipoMadeira: string
  corMadeira: string
  quantidadeMetros: number
  dataEntrega?: string
}

export type DadosDescricao = {
  descricao: string
  foto: File | string | null
}

export function useOrcamento() {
  const carregarDadosPessoais = (): DadosPessoais => {
    if (typeof window === "undefined") return {
      nome: "", numero: "", endereco: "", bairro: "",
      cidade: "", telefone: "", cpf: "", email: "",
    }

    const dados = localStorage.getItem("dadosPessoais")
    return dados ? JSON.parse(dados) : {
      nome: "", numero: "", endereco: "", bairro: "",
      cidade: "", telefone: "", cpf: "", email: "",
    }
  }

  const carregarDadosServico = (): DadosServico => {
    if (typeof window === "undefined") return {
      tipoTelhado: "", tamanhoMadeira: "", tipoMadeira: "",
      corMadeira: "", quantidadeMetros: 0, dataEntrega: "",
    }

    const dados = localStorage.getItem("dadosServico")
    return dados ? JSON.parse(dados) : {
      tipoTelhado: "", tamanhoMadeira: "", tipoMadeira: "",
      corMadeira: "", quantidadeMetros: 0, dataEntrega: "",
    }
  }

  const carregarDadosDescricao = (): DadosDescricao => {
    if (typeof window === "undefined") return { descricao: "", foto: null }

    const dados = localStorage.getItem("dadosDescricao")
    return dados ? JSON.parse(dados) : { descricao: "", foto: null }
  }

  const [dadosPessoais, setDadosPessoais] = useState<DadosPessoais>(carregarDadosPessoais)
  const [dadosServico, setDadosServico] = useState<DadosServico>(carregarDadosServico)
  const [dadosDescricao, setDadosDescricao] = useState<DadosDescricao>(carregarDadosDescricao)
  const [foto, setFoto] = useState<File | null>(null)

  useEffect(() => {
    localStorage.setItem("dadosPessoais", JSON.stringify(dadosPessoais))
  }, [dadosPessoais])

  useEffect(() => {
    localStorage.setItem("dadosServico", JSON.stringify(dadosServico))
  }, [dadosServico])

  useEffect(() => {
    localStorage.setItem("dadosDescricao", JSON.stringify(dadosDescricao))
  }, [dadosDescricao])

  const resetar = () => {
    const dadosPessoaisIniciais: DadosPessoais = {
      nome: "", numero: "", endereco: "", bairro: "",
      cidade: "", telefone: "", cpf: "", email: "",
    }

    const dadosServicoIniciais: DadosServico = {
      tipoTelhado: "", tamanhoMadeira: "", tipoMadeira: "",
      corMadeira: "", quantidadeMetros: 0, dataEntrega: "",
    }

    const dadosDescricaoIniciais: DadosDescricao = {
      descricao: "", foto: null,
    }

    setDadosPessoais(dadosPessoaisIniciais)
    setDadosServico(dadosServicoIniciais)
    setDadosDescricao(dadosDescricaoIniciais)
    setFoto(null)

    localStorage.removeItem("dadosPessoais")
    localStorage.removeItem("dadosServico")
    localStorage.removeItem("dadosDescricao")
  }

  return {
    dadosPessoais,
    setDadosPessoais,
    dadosServico,
    setDadosServico,
    dadosDescricao,
    setDadosDescricao,
    foto,
    setFoto,
    resetar,
  }
}
