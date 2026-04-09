//construtor do objeto
function CriarLivro(title, author, pages, read) {
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
  }; */
}

//Array usado para guardar os livros
const meusLivros = [];

//aqui temos a função de adicionar livros a nosso array
function adicionarMeusLivros(titulo, autor, paginas, lido) {
  meusLivros.push(new CriarLivro(titulo, autor, paginas, lido));
}

//criando livros exemplo
function criandoArrayLivros() {
  //criando os livros no array
  adicionarMeusLivros("Dom Casmurro", "Machado de Assis", 256, true);
  adicionarMeusLivros("O Senhor dos Anéis", "J.R.R. Tolkien", 1178, false);
  adicionarMeusLivros("1984", "George Orwell", 328, true);
  adicionarMeusLivros(
    "O Pequeno Príncipe",
    "Antoine de Saint-Exupéry",
    96,
    false,
  );
  adicionarMeusLivros("Duna", "Frank Herbert", 688, false);
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
  botaoLido.textContent = livro.read ? "Já lido" : "Não lido";
  botaoLido.style.backgroundColor = livro.read ? "#00ff7395" : "#ff1e43c8";

  //função prototype para usar só quando o objeto precisar e nao precisar dele nele sempre
  CriarLivro.prototype.toggleRead = function () {
    this.read = !this.read; // ← altera a propriedade // inverte o booleano
  }

  botaoLido.addEventListener("click", function () {
    livro.toggleRead();
    botaoLido.textContent = livro.read ? "Já lido" : "Não lido";
    botaoLido.style.backgroundColor = livro.read ? "#00ff7395" : "#ff1e43c8";
  });

  card.appendChild(botaoLido);

  //por fim coloca o card no container
  const container = document.querySelector(".card-board");
  container.appendChild(card);
}

//criando cards exemplo
meusLivros.forEach(function (livros) {
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
  adicionarMeusLivros(xtitulo, xautor, xpaginas, xlido);
  //cria o card com o livro da ultima posição do vetor
  criarCard(meusLivros[meusLivros.length - 1]);
  //fecha o modal
  modal.close();
});
