import jsPDF from "jspdf";

type DadosPessoais = {
  nome?: string;
  numero?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  telefone?: string;
  cpf?: string;
  email?: string;
};

type DadosServico = {
  tipoTelhado: string;
  tamanhoMadeira: string;
  tipoMadeira: string;
  corMadeira: string;
  quantidadeMetros: number;
  dataEntrega?: string;
};

type DadosDescricao = {
  descricao: string;
  foto: File | string | null;
};

// Função para converter File em base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject("Erro ao converter arquivo para base64");
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function gerarPdf(
  dadosPessoais: DadosPessoais,
  dadosServico: DadosServico,
  dadosDescricao: DadosDescricao
) {
  const doc = new jsPDF();

  let y = 10;

  doc.setFontSize(18);
  doc.text("Orçamento de Serviço", 10, y);
  y += 10;

  doc.setFontSize(14);
  doc.text("Dados Pessoais:", 10, y);
  y += 8;

  Object.entries(dadosPessoais).forEach(([key, value]) => {
    if (value) {
      doc.setFontSize(12);
      doc.text(`${key}: ${value}`, 12, y);
      y += 7;
    }
  });

  y += 5;
  doc.setFontSize(14);
  doc.text("Dados do Serviço:", 10, y);
  y += 8;

  doc.setFontSize(12);
  doc.text(`Tipo de Telhado: ${dadosServico.tipoTelhado}`, 12, y);
  y += 7;
  doc.text(`Tamanho da Madeira: ${dadosServico.tamanhoMadeira}`, 12, y);
  y += 7;
  doc.text(`Tipo da Madeira: ${dadosServico.tipoMadeira}`, 12, y);
  y += 7;
  doc.text(`Cor da Madeira: ${dadosServico.corMadeira}`, 12, y);
  y += 7;
  doc.text(`Quantidade em Metros: ${dadosServico.quantidadeMetros}`, 12, y);
  y += 7;
  if (dadosServico.dataEntrega) {
    doc.text(`Data de Entrega: ${dadosServico.dataEntrega}`, 12, y);
    y += 7;
  }

  y += 5;
  doc.setFontSize(14);
  doc.text("Descrição do Serviço:", 10, y);
  y += 8;

  doc.setFontSize(12);
  const descricaoText = dadosDescricao.descricao || "";
  const splitDescricao = doc.splitTextToSize(descricaoText, 180);
  doc.text(splitDescricao, 12, y);
  y += splitDescricao.length * 7;

  // Se sobrar espaço para imagem, senão adiciona página nova
  if (y > 230) {
    doc.addPage();
    y = 10;
  } else {
    y += 10;
  }

  // Adicionar foto se existir
  if (dadosDescricao.foto) {
    let imgData: string | null = null;

    try {
      if (typeof dadosDescricao.foto === "string") {
        // Se já for base64 ou URL, usa direto
        imgData = dadosDescricao.foto;
      } else if (dadosDescricao.foto instanceof File) {
        imgData = await fileToBase64(dadosDescricao.foto);
      }

      if (imgData) {
        // Ajusta tamanho max 100x100 mantendo proporção
        const imgProps = doc.getImageProperties(imgData);
        const maxWidth = 100;
        const maxHeight = 100;
        let width = imgProps.width;
        let height = imgProps.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (maxHeight / height) * width;
          height = maxHeight;
        }

        doc.addImage(imgData, "JPEG", 12, y, width, height);
      }
    } catch (err) {
      console.error("Erro ao processar imagem para PDF:", err);
    }
  }

  // Nome do arquivo com nome + telefone sanitizados
  const nomeSanitizado = (dadosPessoais.nome || "cliente")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

  const telefoneSanitizado = (dadosPessoais.telefone || "sem_telefone")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

  const nomeArquivo = `${nomeSanitizado}_${telefoneSanitizado}.pdf`;

  doc.save(nomeArquivo);
}
