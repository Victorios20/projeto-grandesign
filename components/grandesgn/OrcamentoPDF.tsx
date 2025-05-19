'use client'

import React from 'react'
import { useOrcamento } from '@/context/orcamento-context'

export const OrcamentoPDF = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { dadosPessoais, dadosServico, dadosDescricao } = useOrcamento()

  const renderFoto = () => {
    if (!dadosDescricao.foto) return null

    const isFile = typeof dadosDescricao.foto !== 'string'
    const url = isFile ? URL.createObjectURL(dadosDescricao.foto as File) : dadosDescricao.foto

    return <img src={url} alt="Foto do serviço" style={{ maxWidth: '100%', height: 'auto', marginTop: '1rem' }} />
  }

  return (
    <div ref={ref} style={{ padding: '20px', backgroundColor: '#fff', color: '#000', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>ORÇAMENTO DE SERVIÇO</h1>

      <h2>Dados Pessoais</h2>
      <p><strong>Nome:</strong> {dadosPessoais.nome}</p>
      <p><strong>Número:</strong> {dadosPessoais.numero}</p>
      <p><strong>Endereço:</strong> {dadosPessoais.endereco}</p>
      <p><strong>Bairro:</strong> {dadosPessoais.bairro}</p>
      <p><strong>Cidade:</strong> {dadosPessoais.cidade}</p>
      <p><strong>Telefone:</strong> {dadosPessoais.telefone}</p>
      <p><strong>CPF:</strong> {dadosPessoais.cpf}</p>
      <p><strong>Email:</strong> {dadosPessoais.email}</p>

      <h2>Informações do Serviço</h2>
      <p><strong>Tipo de Telhado:</strong> {dadosServico.tipoTelhado}</p>
      <p><strong>Tamanho da Madeira:</strong> {dadosServico.tamanhoMadeira}</p>
      <p><strong>Tipo de Madeira:</strong> {dadosServico.tipoMadeira}</p>
      <p><strong>Cor da Madeira:</strong> {dadosServico.corMadeira}</p>
      <p><strong>Quantidade de Metros:</strong> {dadosServico.quantidadeMetros}</p>
      <p><strong>Data de Entrega:</strong> {dadosServico.dataEntrega}</p>

      <h2>Descrição Adicional</h2>
      <p>{dadosDescricao.descricao}</p>

      {renderFoto()}
    </div>
  )
})

OrcamentoPDF.displayName = 'OrcamentoPDF'
