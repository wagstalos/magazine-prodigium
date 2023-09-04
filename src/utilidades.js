export const catalogo = [
  {
    id: "1",
    marca: "Integralmedica",
    nome: "Whey protein",
    preco: 79.9,
    precoAntigo: 84.9,
    imagem: "product-1.jpg",
    feminino: false,
  },
  {
    id: "2",
    marca: "Black Skull",
    nome: "Whey 3hd",
    preco: 84.9,
    precoAntigo: [],
    imagem: "product-2.jpg",
    feminino: false,
  },
  {
    id: "3",
    marca: "Integralmedica",
    nome: "Creatina",
    preco: 29.9,
    precoAntigo: 34.99,
    imagem: "product-3.jpg",
    feminino: true,
  },
  {
    id: "4",
    marca: "Black Skull",
    nome: "BCAA",
    preco: 34.9,
    precoAntigo: [],
    imagem: "product-4.jpg",
    feminino: true,
  },
  {
    id: "5",
    marca: "Atlhetica",
    nome: "BCAA ",
    preco: 29.9,
    precoAntigo: [],
    imagem: "product-5.jpg",
    feminino: true,
  },
  {
    id: "6",
    marca: "Proteína pura ",
    nome: "pasta de amendoim",
    preco: 19.9,
    precoAntigo: [],
    imagem: "product-6.jpg",
    feminino: true,
  },
  {
    id: "7",
    marca: "Black Skull",
    nome: "Whey 3hd",
    preco: 84.9,
    precoAntigo: [],
    imagem: "product-7.jpg",
    feminino: false,
  },
  {
    id: "8",
    marca: "Integralmedica",
    nome: "Whey protein",
    preco: 79.9,
    precoAntigo: [],
    imagem: "product-8.jpg",
    feminino: false,
  },
];

export function salvarLocalstorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalstorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
  localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const conatinerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-gray-200",
    "rounded-lg",
    "p-1",
    "relative",
    "mb-2",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `    

    <img src="./assets/img/${produto.imagem}" alt="${produto.nome}" class="h-24 rounded-lg">

    <div class="p-2 flex flex-col">
      <p class="ml-2 text-slate-900 font-semibold text-sm ">${produto.nome}</p>
      <p class="ml-2 text-slate-400 text-xs">${produto.marca}</p>

    </div>

    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
        <p id="quantidade-${produto.id}" class="ml-2"> <small>Quantidade:</small>   ${quantidadeProduto}</p>
    </div>
    `;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  conatinerProdutosCarrinho.appendChild(elementoArticle);
}
