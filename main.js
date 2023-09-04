import { renderizarCatalago } from "./src/cartaoProduto.js";
import { wishList } from "./src/cartaoProduto.js";
import { inicializarFiltros } from "./src/filtrosCatalogo.js";
import {
  atualizarPrecoCarrinho,
  inicializarCarrinho,
  renderizarProdutosCarrinho,
} from "./src/menuCarrinho.js";

function init() {
  renderizarCatalago();
  wishList();
  inicializarCarrinho();
  renderizarProdutosCarrinho();
  atualizarPrecoCarrinho();
  inicializarFiltros();
}

init();
