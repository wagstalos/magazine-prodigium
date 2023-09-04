import { adicionarAoCarrinho } from "./menuCarrinho.js";
import { catalogo } from "./utilidades.js";

export function renderizarCatalago() {
  for (const produtoCatalogo of catalogo) {
    const cartaoProduto = `<div class='shadow bg-white
                w-80 m-2 rounded-xl 
                flex flex-col p-2 justify-between group relative ${
                  produtoCatalogo.feminino ? "feminino" : "masculino"
                }' id="card-produto-${produtoCatalogo.id}">
        <i class="fa-regular fa-heart text-teal-300 absolute top-4 right-4 z-10 cursor-pointer"></i>  
     
        <img class="h-100 rounded-xl group-hover:scale-105 duration-200"
                  src="../assets/img/${produtoCatalogo.imagem}"
                  alt="${produtoCatalogo.nome}."
              />
              <p class="px-2 text-sm font-medium text-slate-400 mt-4"><i class="fa-solid fa-bolt"></i>${
                produtoCatalogo.marca
              }</p>

              <p class="px-2 text-lg font-semibold text-slate-900 mb-2">${
                produtoCatalogo.nome
              }</p>


              <div class="flex justify-between items-end mb-4">
                <div>
                  <del class="px-2 text-sm text-gray-400"> ${produtoCatalogo.precoAntigo.toLocaleString(
                    "pt-br",
                    { style: "currency", currency: "BRL" }
                  )}</del>

                  <p class="px-2 text-lg font-semibold text-teal-400 ">${produtoCatalogo.preco.toLocaleString(
                    "pt-br",
                    { style: "currency", currency: "BRL" }
                  )}</p>
                </div>

                <div class="flex px-2  text-amber-400">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <small class="text-slate-300">(5)</small>
                </div>

              </div>

              <button id='adicionar-${
                produtoCatalogo.id
              }' class="h-10 px-6 font-semibold rounded-md bg-black hover:bg-slate-800 text-white"><i class="fa-solid fa-cart-plus"></i></button>
          </div>`;

    document.getElementById("container-produto").innerHTML += cartaoProduto;
  }

  for (const produtoCatalogo of catalogo) {
    document
      .getElementById(`adicionar-${produtoCatalogo.id}`)
      .addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
  }
}

export function wishList() {
  const heartIcons = document.querySelectorAll(".fa-heart");
  const msgFavorite = document.getElementById("add-wish");

  heartIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const isFavorited = this.classList.contains("is-favorited");

      if (isFavorited) {
        this.classList.remove("is-favorited");
        this.classList.remove("fa-solid");
        this.classList.add("fa-regular");
        // alert("removido");
      } else {
        this.classList.add("is-favorited");
        this.classList.remove("fa-regular");
        this.classList.add("fa-solid");
        // alert("adicionado");
        msgFavorite.classList.remove("hidden");
        setTimeout(function () {
          msgFavorite.classList.add("hidden");
        }, 3000);
      }
    });
  });
}
