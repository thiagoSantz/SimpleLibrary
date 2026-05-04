//construtor do objeto
/*function CriarLivro(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID(); //gera numero de id aleatório porém único.

  /*   this.info = function () {
    return (
      this.title +
      " by " +
      this.author +
      " with " +
      this.pages +
      " pages " +
      " is " +
      (this.read ? "already read" : "not read yet")
    ); // lê as props do objeto
  }; 
}*/

class Livro {
  //campos de propriedades
  #id = crypto.randomUUID(); // ← declarado FORA do constructor, com # propriedade privada
  //
  static meusLivros = []; // ← era: const meusLivros = []
  //
  static adicionarMeusLivros(titulo, autor, paginas, lido) {
    // ← era: function adicionarMeusLivros
    Livro.meusLivros.push(new Livro(titulo, autor, paginas, lido));
  }
  //métodos de propriedade
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  //
  toggleRead() {
    // ← entra aqui, sem "function", sem ".prototype"
    this.read = !this.read;
  }
  //
  get id() {
    return this.#id;
  }
  //
  get statusLeitura() {
    return this.read ? "Já lido" : "Não lido";
  }
  //
  get corStatus() {
    return this.read ? "#00ff7395" : "#ff1e43c8";
  }
}

/*Array usado para guardar os livros antes
const meusLivros = [];

//aqui temos a função de adicionar livros a nosso array
function adicionarMeusLivros(titulo, autor, paginas, lido) {
  meusLivros.push(new Livro(titulo, autor, paginas, lido));
}*/

//criando livros exemplo
function criandoArrayLivros() {
  //criando os livros no array
  Livro.adicionarMeusLivros("Dom Casmurro", "Machado de Assis", 256, true);
  Livro.adicionarMeusLivros("O Senhor dos Anéis", "J.R.R. Tolkien", 1178, false);
  Livro.adicionarMeusLivros("1984", "George Orwell", 328, true);
  Livro.adicionarMeusLivros(
    "O Pequeno Príncipe",
    "Antoine de Saint-Exupéry",
    96,
    false,
  );
  Livro.adicionarMeusLivros("Duna", "Frank Herbert", 688, false);
}
criandoArrayLivros();

//criando card para exibição na pagina
function criarCard(livro) {
  //Criar cards dos livros
  const card = document.createElement("div");
  card.classList.add("card");

  //close x
  const closeX = document.createElement("button");
  closeX.classList.add("botao", "close-x");
  closeX.textContent = "x";
  card.appendChild(closeX);

  closeX.addEventListener("click", function () {
    card.remove(); // remove o card que contém esse botão
  });

  //cria titulo
  const titulo = document.createElement("span");
  titulo.classList.add("titulo-livro");
  titulo.textContent = livro.title;
  card.appendChild(titulo);

  //cria autor
  const autor = document.createElement("span");
  autor.classList.add("autor");
  autor.textContent = livro.author;
  card.appendChild(autor);

  //cria paginas
  const paginas = document.createElement("span");
  paginas.classList.add("paginas");
  paginas.textContent = livro.pages + " páginas";
  card.appendChild(paginas);

  //cria botao read-notification
  const botaoLido = document.createElement("button");
  botaoLido.classList.add("botao", "read-notification");
  // onde inicializa o botão
  botaoLido.textContent = livro.statusLeitura;
  botaoLido.style.backgroundColor = livro.corStatus;

  botaoLido.addEventListener("click", function () {
    livro.toggleRead();
    // dentro do addEventListener
    botaoLido.textContent = livro.statusLeitura;
    botaoLido.style.backgroundColor = livro.corStatus;
  });

  card.appendChild(botaoLido);

  //por fim coloca o card no container
  const container = document.querySelector(".card-board");
  container.appendChild(card);
}

//criando cards exemplo
Livro.meusLivros.forEach(function (livros) {
  criarCard(livros);
});

//por fim coloca o botao no conteiner respectivo e
// cria um modal para manipular no DOM
const header = document.querySelector(".header");
const modal = document.querySelector(".modal-formulario");

//criar botão de adicionar card pelo usuário
const botaoAdicionar = document.createElement("button");
botaoAdicionar.classList.add("botao-criar");
botaoAdicionar.textContent = "+ Novo Livro";

header.appendChild(botaoAdicionar);

//usa o botão ja criado em modal-formulario
const botaoCancelar = document.querySelector(".cancelar");
const botaoSalvar = document.querySelector(".salvar");

botaoAdicionar.addEventListener("click", function () {
  modal.showModal(); // abre
});

botaoCancelar.addEventListener("click", function () {
  modal.close(); //fecha
});

// Botão para salvar dados do formulário modal
botaoSalvar.addEventListener("click", function () {
  //cria variaveis para salvar os inputs do modal quando salvar
  const xtitulo = document.getElementById("input-titulo").value;
  const xautor = document.getElementById("input-autor").value;
  const xpaginas = document.getElementById("input-paginas").value;
  const xlido = document.getElementById("input-lido").checked;
  //adiciona no vetor os inputs
  Livro.adicionarMeusLivros(xtitulo, xautor, xpaginas, xlido);
  //cria o card com o livro da ultima posição do vetor
  criarCard(Livro.meusLivros[Livro.meusLivros.length - 1]);
  //fecha o modal
  modal.close();
});

//eXERCICIO DE ENCAPSULAMENTO
const petShop = (function () {
  let estoque = 50; // começa com 100 sacos
  let caixa = 0;
  let cachorros = [];

  return {
    adicionarCachorros(nome) {
      cachorros.push(nome);
      console.log(`${nome} entrou no canil.`);
    },
    venderRacao(quantidade) {
      if (quantidade > estoque) {
        console.log(`Estoque insuficiente : ${estoque} - ${quantidade}`);
        return;
      }
      estoque -= quantidade;
      caixa += 50 * quantidade;
      console.log(`Vendido: ${quantidade}. Estoque: ${estoque}`);
    },
    receberEstoque(quantidade) {
      estoque += quantidade;
      console.log(`Estoque: ${estoque}`);
    },
    verStatus() {
      console.log(
        `Estoque = ${estoque}. Caixa: ${caixa}. Cachorros no canil: ${cachorros}.`,
      );
    },
  };
})();
