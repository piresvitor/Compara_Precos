const searchForm = document.querySelector('.search-form');
const productList = document.querySelector('.product-list')

//Pegando a informação digitada pelo usuario e consumindo a API do mercado livre e armazenando os 10 primeiros produtos
searchForm.addEventListener('submit', async e=>{
    e.preventDefault();
    const inputValue = e.target[0].value;

    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputValue}`);
    const products = (await data.json()).results.slice(0,12);

    displayItens(products);
})

//Adicionando os itens ao HTML 
function displayItens(products){
    productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="product-price">${product.price.toLocaleString('pt-br', {style: "currency", currency: "BRL"})}</p>
                <p class="product-store">Loja: ${product.seller.nickname}</p>
            </div>
        `).join('');
};