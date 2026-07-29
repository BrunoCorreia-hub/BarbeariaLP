// ==========================================
// CONFIGURAÇÕES GERAIS
// ==========================================

// ========== NÚMERO DO WHATSAPP (EDITÁVEL) ==========
// Formato: código do país + DDD + número (apenas números)
const WHATSAPP_NUMBER = '5561998032785';

// ========== MENSAGEM PADRÃO WHATSAPP (EDITÁVEL) ==========
const WHATSAPP_MESSAGE = 'Olá! Gostaria de agendar um serviço na barbearia';

// ==========================================
// MENU MOBILE - TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abrir/fechar menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// SCROLL SUAVE PARA ÂNCORAS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignora links vazios ou apenas "#"
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const targetElement = document.querySelector(href);

        if (targetElement) {
            e.preventDefault();

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// HEADER - MUDANÇA DE ESTILO NO SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');

    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
});

// ==========================================
// FAQ - ACORDEÃO (EXPANDIR/RECOLHER)
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function() {
        // Fecha todos os outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle no item clicado
        item.classList.toggle('active');
    });
});

// ==========================================
// ANIMAÇÕES DE SCROLL (FADE IN)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Elementos para animar
const animatedElements = document.querySelectorAll(`
    .servico-card,
    .destaque-card,
    .beneficio-item,
    .depoimento-card,
    .faq-item,
    .info-item
`);

animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});


// ==========================================
// ACTIVE LINK NO MENU (DESTAQUE SEÇÃO ATUAL)
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinksForActive = document.querySelectorAll('.nav-link');

function activateMenuLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksForActive.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateMenuLink);

// ==========================================
// PREVENÇÃO DE LINKS VAZIOS
// ==========================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Se o link não tiver uma função específica, previne o comportamento padrão
        if (!this.getAttribute('onclick')) {
            e.preventDefault();
        }
    });
});

// ==========================================
// ANIMAÇÃO DOS CARDS DE SERVIÇOS (HOVER)
// ==========================================
const servicoCards = document.querySelectorAll('.servico-card');

servicoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
// CONTADOR DE ESTATÍSTICAS (ANIMAÇÃO NUMÉRICA)
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observa os badges do hero para animar quando visíveis
const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            // Aqui você pode adicionar animações específicas para os badges
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.badge').forEach(badge => {
    badgeObserver.observe(badge);
});

// ==========================================
// LAZY LOADING PARA IMAGENS (SE ADICIONAR)
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// CONSOLE LOG - INFORMAÇÕES DO SITE
// ==========================================
console.log('%c🐾 Patinhas Pet Shop & Vet ', 'background: #4A90E2; color: white; font-size: 20px; padding: 10px;');
console.log('%cSite desenvolvido com amor para pets e tutores!', 'color: #FF8C42; font-size: 14px;');
console.log('%c💙 Cuidando do seu melhor amigo 💙', 'color: #66BB6A; font-size: 12px;');

// ==========================================
// PERFORMANCE - MARCA QUANDO A PÁGINA TERMINA DE CARREGAR
// ==========================================
window.addEventListener('load', function() {
    console.log('%c✓ Página totalmente carregada!', 'color: #66BB6A; font-weight: bold;');

    // Remove qualquer classe de loading se houver
    document.body.classList.remove('loading');
});

// ==========================================
// ACESSIBILIDADE - ESC PARA FECHAR MENU MOBILE
// ==========================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==========================================
// SCROLL TO TOP - FUNÇÃO AUXILIAR
// ==========================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Você pode adicionar um botão "Voltar ao topo" se desejar
// Exemplo: <button onclick="scrollToTop()" class="scroll-top-btn">↑</button>

// ==========================================
// LOJA / CARRINHO - CONFIGURAÇÃO
// ==========================================
// OBS: usando o mesmo WHATSAPP_NUMBER definido no topo do arquivo.
// (o número duplicado que existia aqui foi removido — ter duas
// declarações "const WHATSAPP_NUMBER" no mesmo arquivo é erro de sintaxe)

// Catálogo de produtos — edite aqui.
// Quando um produto acabar no estoque, mude "available" para false.
// Quando voltar a ter, mude de volta para true.
const products = [
    {
      id: 1,
      name: "Minoxidil 5%",
      category: "Crescimento capilar",
      price: 79.90,
      img: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?w=400&q=80",
      available: true
    },
    {
      id: 2,
      name: "Pasta Modeladora Matte",
      category: "Finalização",
      price: 45.00,
      img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&q=80",
      available: true
    },
    {
      id: 3,
      name: "Creme Pós-Barba",
      category: "Cuidados",
      price: 38.50,
      img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
      available: false
    },
    {
      id: 4,
      name: "Óleo para Barba",
      category: "Cuidados",
      price: 42.00,
      img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80",
      available: true
    },
    {
      id: 5,
      name: "Shampoo Anticaspa",
      category: "Higiene",
      price: 36.90,
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
      available: true
    },
    {
      id: 6,
      name: "Pomada Efeito Molhado",
      category: "Finalização",
      price: 39.90,
      img: "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=400&q=80",
      available: true
    }
];
// ======== FIM DA CONFIGURAÇÃO ========

let cart = {}; // { productId: quantity }

const grid = document.getElementById('productGrid');
const cartPanel = document.getElementById('cartPanel');
const overlay = document.getElementById('overlay');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');

function formatBRL(v){
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function generateOrderNumber(){
    const now = new Date();
    const y = now.getFullYear().toString().slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 900) + 100);
    return `${y}${m}${d}-${rand}`;
}

function renderProducts(){
    grid.innerHTML = products.map(p => `
      <div class="product ${p.available ? '' : 'unavailable'}">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <h3>${p.name}</h3>
        <div class="cat">${p.category}</div>
        ${p.available ? '' : '<div class="badge-unavailable">Indisponível</div>'}
        <div class="price">${formatBRL(p.price)}</div>
        <button class="add-btn" onclick="addToCart(${p.id})" ${p.available ? '' : 'disabled'}>
          ${p.available ? 'Adicionar' : 'Sem estoque'}
        </button>
      </div>
    `).join('');
}

function addToCart(id){
    const p = products.find(pr => pr.id === id);
    if(!p || !p.available) return;
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
    openCartPanel();
}

function changeQty(id, delta){
    if(!cart[id]) return;
    cart[id] += delta;
    if(cart[id] <= 0) delete cart[id];
    renderCart();
}

function removeItem(id){
    delete cart[id];
    renderCart();
}

function renderCart(){
    const ids = Object.keys(cart);
    let total = 0;
    let count = 0;

    if(ids.length === 0){
      cartItemsEl.innerHTML = `<div class="empty-msg">Seu carrinho está vazio.</div>`;
      checkoutBtn.disabled = true;
    } else {
      cartItemsEl.innerHTML = ids.map(id => {
        const p = products.find(pr => pr.id == id);
        const qty = cart[id];
        const subtotal = p.price * qty;
        total += subtotal;
        count += qty;
        return `
          <div class="cart-item">
            <div>
              <div class="name">${p.name}</div>
              <div class="unit">${formatBRL(p.price)} un.</div>
              <div class="qty-controls">
                <button onclick="changeQty(${p.id}, -1)">−</button>
                <span>${qty}</span>
                <button onclick="changeQty(${p.id}, 1)">+</button>
              </div>
              <button class="remove-btn" onclick="removeItem(${p.id})">remover</button>
            </div>
            <div style="color: var(--gold-soft);">${formatBRL(subtotal)}</div>
          </div>
        `;
      }).join('');
      checkoutBtn.disabled = false;
    }

    cartTotalEl.textContent = formatBRL(total);

    if(count > 0){
      cartCountEl.style.display = 'flex';
      cartCountEl.textContent = count;
    } else {
      cartCountEl.style.display = 'none';
    }
}

function openCartPanel(){
    cartPanel.classList.add('open');
    overlay.classList.add('open');
}
function closeCartPanel(){
    cartPanel.classList.remove('open');
    overlay.classList.remove('open');
}

document.getElementById('openCart').addEventListener('click', openCartPanel);
document.getElementById('closeCart').addEventListener('click', closeCartPanel);
overlay.addEventListener('click', closeCartPanel);

checkoutBtn.addEventListener('click', () => {
    const ids = Object.keys(cart);
    if(ids.length === 0) return;

    const orderNumber = generateOrderNumber();
    let message = `Olá! Gostaria de fazer o pedido #${orderNumber}:\n\n`;
    let total = 0;

    ids.forEach(id => {
      const p = products.find(pr => pr.id == id);
      const qty = cart[id];
      const subtotal = p.price * qty;
      total += subtotal;
      message += `• ${qty}x ${p.name} — ${formatBRL(subtotal)}\n`;
    });

    message += `\nTotal: ${formatBRL(total)}. Quero prosseguir para o pagamento`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
});

renderProducts();
renderCart();