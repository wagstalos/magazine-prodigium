import {
  desenharProdutoCarrinhoSimples,
  lerLocalstorage,
  apagarDoLocalStorage,
  salvarLocalstorage,
} from "/src/utilidades.js";

function desenharProdutosCheckout() {
  const idsProdutosCarrinhoComQuantidade = lerLocalstorage("carrinho") ?? {};
  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutosCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutosCarrinhoComQuantidade = lerLocalstorage("carrinho") ?? {};
  if (Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }

  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutosCarrinhoComQuantidade,
  };

  const historicoDePedidos = lerLocalstorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  salvarLocalstorage("historico", historicoDePedidosAtualizado);

  apagarDoLocalStorage("carrinho");

  window.location.href = window.location.href + "pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
