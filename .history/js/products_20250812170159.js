// Lista de produtos por categoria
const produtos = [
  // Peças de PC (20+)
  { id: 1, nome: "Placa-mãe ASUS B450M", preco: 450, imagem: "imagens/placamae.jpg", categoria: "peca", marca: "ASUS" },
  { id: 2, nome: "Processador Ryzen 5 5600G", preco: 850, imagem: "imagens/amdryzen.jpg", categoria: "peca", marca: "AMD" },
  { id: 3, nome: "Memória RAM 16GB DDR4", preco: 320, imagem: "imagens/SSD.jpg", categoria: "peca", marca: "Corsair" },
  { id: 4, nome: "SSD NVMe 1TB", preco: 500, imagem: "imagens/SSD 2.jpg", categoria: "peca", marca: "Kingston" },
  { id: 5, nome: "Fonte 600W 80 Plus", preco: 280, imagem: "imagens/fonte.jpg", categoria: "peca", marca: "EVGA" },
  { id: 6, nome: "Placa de Vídeo RX 6600", preco: 1200, imagem: "imagens/pecas/gpu1.jpg", categoria: "peca", marca: "PowerColor" },
  { id: 7, nome: "Cooler CPU RGB", preco: 150, imagem: "imagens/cooler.jpg", categoria: "peca", marca: "DeepCool" },
  { id: 8, nome: "Gabinete Gamer com vidro", preco: 350, imagem: "imagens/pecas/gabinete1.jpg", categoria: "peca", marca: "MTek" },
  { id: 9, nome: "HD 1TB 7200RPM", preco: 280, imagem: "imagens/pecas/hd1.jpg", categoria: "peca", marca: "Seagate" },
  { id: 10, nome: "Adaptador Wi-Fi USB", preco: 70, imagem: "imagens/pecas/wifi1.jpg", categoria: "peca", marca: "TP-Link" },
  { id: 11, nome: "Water Cooler 240mm", preco: 520, imagem: "imagens/pecas/watercooler1.jpg", categoria: "peca", marca: "CoolerMaster" },
  { id: 12, nome: "Fan RGB 120mm", preco: 50, imagem: "imagens/pecas/fan1.jpg", categoria: "peca", marca: "Redragon" },
  { id: 13, nome: "Placa-mãe Gigabyte H610M", preco: 490, imagem: "imagens/pecas/placa2.jpg", categoria: "peca", marca: "Gigabyte" },
  { id: 14, nome: "Processador Intel i5 12400F", preco: 980, imagem: "imagens/pecas/processador2.jpg", categoria: "peca", marca: "Intel" },
  { id: 15, nome: "Memória RAM 8GB DDR4", preco: 180, imagem: "imagens/pecas/ram2.jpg", categoria: "peca", marca: "Kingston" },
  { id: 16, nome: "SSD SATA 480GB", preco: 250, imagem: "imagens/pecas/ssd2.jpg", categoria: "peca", marca: "Crucial" },
  { id: 17, nome: "Fonte 750W modular", preco: 390, imagem: "imagens/pecas/fonte2.jpg", categoria: "peca", marca: "Corsair" },
  { id: 18, nome: "Placa de Vídeo RTX 4090", preco: 19000, imagem: "imagens/rtz4090.jpg", categoria: "peca", marca: "Zotac" },
  { id: 19, nome: "Gabinete simples preto", preco: 180, imagem: "imagens/pecas/gabinete2.jpg", categoria: "peca", marca: "Fortrek" },
  { id: 20, nome: "Cooler torre com heatpipe", preco: 110, imagem: "imagens/pc-gamer.webp", categoria: "peca", marca: "Pichau" },

  // Celulares (5 marcas)
  { id: 21, nome: "iPhone 14", preco: 5800, imagem: "imagens/celulares/iphone14.jpg", categoria: "celular", marca: "Apple" },
  { id: 22, nome: "Samsung Galaxy S23", preco: 5200, imagem: "imagens/celulares/s23.jpg", categoria: "celular", marca: "Samsung" },
  { id: 23, nome: "Motorola Edge 40", preco: 2800, imagem: "imagens/celulares/edge40.jpg", categoria: "celular", marca: "Motorola" },
  { id: 24, nome: "Xiaomi Redmi Note 12", preco: 1500, imagem: "imagens/celulares/redmi12.jpg", categoria: "celular", marca: "Xiaomi" },
  { id: 25, nome: "Realme GT Neo 5", preco: 2700, imagem: "imagens/celulares/realmegt.jpg", categoria: "celular", marca: "Realme" },

  // Laptops
  { id: 26, nome: "Notebook Lenovo IdeaPad 3", preco: 2500, imagem: "imagens/laptops/ideapad.jpg", categoria: "laptop", marca: "Lenovo" },
  { id: 27, nome: "Dell Inspiron 15", preco: 3300, imagem: "imagens/laptops/dell15.jpg", categoria: "laptop", marca: "Dell" },
  { id: 28, nome: "Acer Aspire 5", preco: 2900, imagem: "imagens/laptops/aspire.jpg", categoria: "laptop", marca: "Acer" },

  // Periféricos
  { id: 29, nome: "Mouse Gamer RGB", preco: 110, imagem: "imagens/perifericos/mouse1.jpg", categoria: "periferico", marca: "Redragon" },
  { id: 30, nome: "Teclado Mecânico RGB", preco: 250, imagem: "imagens/perifericos/teclado1.jpg", categoria: "periferico", marca: "Redragon" },
  { id: 31, nome: "Fone com microfone", preco: 200, imagem: "imagens/perifericos/fone1.jpg", categoria: "periferico", marca: "Logitech" },
  { id: 32, nome: "Mousepad grande", preco: 90, imagem: "imagens/perifericos/mousepad1.jpg", categoria: "periferico", marca: "Havit" },

  // Kits Gamer
  { id: 33, nome: "Kit Gamer RGB (Mouse + Teclado)", preco: 320, imagem: "imagens/kit.jpg", categoria: "kit", marca: "Pichau" },
  { id: 34, nome: "Kit Gamer Completo (Mouse + Teclado + Fone + Mousepad)", preco: 450, imagem: "imagens/kits/kit2.jpg", categoria: "kit", marca: "Redragon" }
]

// Função para renderizar os produtos
function renderizarProdutos() {
  produtos.forEach(produto => {
    const container = document.getElementById(`produtos-${produto.categoria}`)
    if (container) {
      const div = document.createElement('div')
      div.classList.add('projeto', 'fade-in')
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})">Comprar</button>
      `
      container.appendChild(div)
    }
  })
}

// Chamada automática
document.addEventListener("DOMContentLoaded", renderizarProdutos)
