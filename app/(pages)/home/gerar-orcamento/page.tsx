'use client'

import { PageLayout } from "@/components/ui/grandesgn/page-layout";

export default function GerarOrcamentoPage() {
  const gerarOrcamentoLinks = [
    {
    label: "Home",
    href: "/home",
    },
    {
      label: "Gerar Orçamento",
      href: "/home/gerar-orcamento",
    },
  ];

  return (
    <PageLayout links={gerarOrcamentoLinks}>
      <div className="w-full h-full flex flex-col gap-6 p-6 text-foreground">
        <h1 className="text-2xl font-semibold">Gerar Orçamento</h1>
        <p className="text-base text-gray-600">
          Preencha os campos abaixo para gerar um orçamento personalizado.
        </p>

        <form className="flex flex-col gap-4">
          <label htmlFor="nome" className="text-lg">
            Nome do Cliente:
          </label>
          <input
            id="nome"
            type="text"
            className="px-4 py-2 border rounded-md"
            placeholder="Digite o nome do cliente"
          />

          <label htmlFor="descricao" className="text-lg">
            Descrição do Serviço:
          </label>
          <textarea
            id="descricao"
            className="px-4 py-2 border rounded-md"
            placeholder="Descreva o serviço solicitado"
            rows={4}
          />

          <label htmlFor="valor" className="text-lg">
            Valor Estimado:
          </label>
          <input
            id="valor"
            type="number"
            className="px-4 py-2 border rounded-md"
            placeholder="Digite o valor estimado"
          />

          <button
            type="submit"
            className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Gerar Orçamento
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
