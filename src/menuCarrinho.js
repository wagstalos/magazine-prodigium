import { catalogo, salvarLocalstorage, lerLocalstorage } from "./utilidades.js";

const idsProdutosCarrinhoComQuantidade = lerLocalstorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
  if (Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }

  window.location.href = window.location.origin + "/checkout.html";
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoIrParaCheckout = document.getElementById("finalizar-compra");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutosCarrinhoComQuantidade[idProduto];
  salvarLocalstorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutosCarrinhoComQuantidade[idProduto]++;
  salvarLocalstorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacoesQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutosCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutosCarrinhoComQuantidade[idProduto]--;
  salvarLocalstorage("carrinho", idsProdutosCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacoesQuantidade(idProduto);
}

function atualizarInformacoesQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutosCarrinhoComQuantidade[idProduto];
}

function desenharProdutonoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const conatinerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-100",
    "rounded-lg",
    "p-1",
    "relative",
    "mb-2",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `
    <button id="remover-item-${produto.id}" class="absolute top-2 right-2">
      <i class="fa-solid fa-trash text-red-600 hover:text-red-700"></i>
    </button>

    <img src="../assets/img/${produto.imagem}" alt="${
    produto.nome
  }" class="h-24 rounded-lg">

    <div class="p-2 flex flex-col justify-between">
      <p class="ml-2 text-slate-900 font-semibold text-sm ">${produto.nome}</p>
      <p class="ml-2 text-slate-400 text-xs">${produto.marca}</p>

      <p class="ml-2 font-semibold text-teal-400 text-lg">${produto.preco.toLocaleString(
        "pt-br",
        { style: "currency", currency: "BRL" }
      )}</p>
    </div>

    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
        <button id='decrementar-produto-${
          produto.id
        }' class="font-semibold "><i class="fa-solid fa-minus"></i></button>
        <p id="quantidade-${produto.id}" class="ml-2">${
    idsProdutosCarrinhoComQuantidade[produto.id]
  }</p>
        <button id='incrementar-produto-${
          produto.id
        }' class="ml-2 font-semibold "><i class="fa-solid fa-plus"></i></button>
    </div>
    `;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  conatinerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const conatinerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  conatinerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutonoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutosCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }

  const successElement = document.getElementById("success");
  successElement.classList.remove("hidden");

  function removerClasseHidden() {
    successElement.classList.remove("hidden");
    // Define um timeout para adicionar a classe "hidden" novamente após 3 segundos
    setTimeout(function () {
      successElement.classList.add("hidden");
    }, 3000); // 3000 milissegundos = 3 segundos
  }
  removerClasseHidden();

  idsProdutosCarrinhoComQuantidade[idProduto] = 1;
  salvarLocalstorage("carrinho", idsProdutosCarrinhoComQuantidade);
  desenharProdutonoCarrinho(idProduto);
  atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;

  for (const idProdutoNoCarrinho in idsProdutosCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutosCarrinhoComQuantidade[idProdutoNoCarrinho];
  }

  precoCarrinho.innerText = `${precoTotalCarrinho.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  })}`;
}
