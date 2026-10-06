const WA_NUMBER = '573227196880';
const products = [
 {id:'clasica',name:'Clásica DK',category:'Hamburguesas',price:15000,desc:'Carne artesanal, queso mozzarella, lechuga, tomate, cebolla caramelizada y salsa de la casa.',tag:'La favorita'},
 {id:'bbq',name:'BBQ Bacon',category:'Hamburguesas',price:19000,desc:'Carne artesanal, tocineta, queso mozzarella, cebolla caramelizada y salsa BBQ.',tag:'Sabor ahumado'},
 {id:'hawaiana',name:'Hawaiana',category:'Hamburguesas',price:18000,desc:'Carne artesanal, jamón, piña en cuadritos, queso mozzarella, vegetales y salsa de la casa.',tag:'Dulce y salada'},
 {id:'mixta',name:'Mixta',category:'Hamburguesas',price:22000,desc:'Pollo apanado y carne artesanal, queso mozzarella, vegetales, cebolla caramelizada y salsa de la casa.',tag:'Dos sabores'},
 {id:'doble',name:'Doble DK',category:'Hamburguesas',price:22000,desc:'Doble carne, doble queso, tocineta, lechuga, tomate, cebolla caramelizada y salsa de la casa.',tag:'Para más antojo'},
 {id:'crispy',name:'Crispy Chicken',category:'Hamburguesas',price:17000,desc:'Pollo apanado, queso mozzarella, lechuga, tomate, cebolla caramelizada y salsa de la casa.',tag:'Crujiente'},
 {id:'mexicana',name:'Mexicana',category:'Hamburguesas',price:20000,desc:'Carne artesanal, guacamole picante, queso mozzarella, nachos triturados, lechuga, tomate y cebolla caramelizada.',tag:'Toque picante'},
 {id:'salchi-clasica',name:'Salchipapa clásica',category:'Salchipapas',price:15000,desc:'Papa a la francesa, salchicha, dos tajadas de jamón, queso mozzarella y salsa de la casa.',tag:'Clásica de siempre'},
 {id:'salchi-especial',name:'Salchipapa especial',category:'Salchipapas',price:18000,desc:'Papas a la francesa con salchicha, jamón, queso mozzarella y salsas para disfrutar cada bocado.',tag:'Especial DK'},
 {id:'salchi-bbq',name:'Salchipapa pollo BBQ',category:'Salchipapas',price:20000,desc:'Papa a la francesa, pollo BBQ, jamón, queso mozzarella, salsa de la casa y gaseosa personal.',tag:'Incluye gaseosa'},
 {id:'combo-clasica',name:'Combo Clásica DK',category:'Combos',price:20000,desc:'Hamburguesa Clásica DK, papas y gaseosa personal.',tag:'Combo 1'},
 {id:'combo-bbq',name:'Combo BBQ Bacon',category:'Combos',price:24000,desc:'Hamburguesa BBQ Bacon, papas y gaseosa personal.',tag:'Combo 2'},
 {id:'combo-hawaiana',name:'Combo Hawaiana',category:'Combos',price:23000,desc:'Hamburguesa Hawaiana, papas y gaseosa personal.',tag:'Combo 3'},
 {id:'combo-crispy',name:'Combo Crispy Chicken',category:'Combos',price:22000,desc:'Hamburguesa Crispy Chicken, papas y gaseosa personal.',tag:'Combo 4'},
 {id:'combo-mixta',name:'Combo Mixta',category:'Combos',price:27000,desc:'Hamburguesa Mixta, papas y gaseosa personal.',tag:'Combo 5'},
 {id:'combo-doble',name:'Combo Doble DK',category:'Combos',price:25000,desc:'Hamburguesa Doble DK, papas y gaseosa personal.',tag:'Combo 7'}
];
const money = n => '$' + n.toLocaleString('es-CO');
let activeCategory = 'Todos';
let cart = [];
const grid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
function renderProducts(){
 const term = document.getElementById('searchInput').value.trim().toLowerCase();
 const visible = products.filter(p => (activeCategory==='Todos'||p.category===activeCategory) && `${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(term));
 grid.innerHTML = visible.map(p=>`<article class="product-card clay ${p.category==='Combos'?'combo-card':''}"><div class="product-top"><div><span class="product-tag">${p.tag}</span><h3>${p.name}</h3></div><span class="product-price">${money(p.price)}</span></div><p class="product-desc">${p.desc}</p><div class="product-actions"><button class="add-button" data-add="${p.id}">＋ Agregar</button>${p.category==='Hamburguesas'?`<button class="combo-button" data-combo="${p.id}">+ Combo $5.000</button>`:''}</div></article>`).join('');
 document.getElementById('emptyState').hidden = visible.length!==0;
}
function addToCart(id, combo=false){
 const p=products.find(x=>x.id===id); if(!p)return;
 const key=id+(combo?'-combo':'');
 const found=cart.find(x=>x.key===key);
 if(found)found.qty++;else cart.push({key,id,qty:1,combo,price:p.price+(combo?5000:0),name:p.name+(combo?' + combo':'')});
 renderCart();
}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+x.qty*x.price,0);
 document.getElementById('cartCount').textContent=`${count} ${count===1?'producto':'productos'}`;
 document.getElementById('floatingCount').textContent=count;
 document.getElementById('cartSubtotal').textContent=money(total);
 cartItems.innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><div><h4>${x.name}</h4><small>${money(x.price)} c/u</small><div class="line-controls"><button class="qty-btn" data-dec="${x.key}" aria-label="Restar uno">−</button><b>${x.qty}</b><button class="qty-btn" data-inc="${x.key}" aria-label="Agregar uno">+</button><button class="remove-btn" data-remove="${x.key}">Quitar</button></div></div><span class="line-price">${money(x.price*x.qty)}</span></div>`).join(''):'<div class="cart-empty">Tu carrito está esperando algo rico. 🍔<br><a href="#carta">Explorar la carta</a></div>';
}
grid.addEventListener('click',e=>{const a=e.target.closest('[data-add]'),c=e.target.closest('[data-combo]');if(a)addToCart(a.dataset.add);if(c)addToCart(c.dataset.combo,true)});
cartItems.addEventListener('click',e=>{const inc=e.target.closest('[data-inc]'),dec=e.target.closest('[data-dec]'),rem=e.target.closest('[data-remove]');if(inc){const x=cart.find(i=>i.key===inc.dataset.inc);if(x)x.qty++}if(dec){const x=cart.find(i=>i.key===dec.dataset.dec);if(x)x.qty--;cart=cart.filter(i=>i.qty>0)}if(rem)cart=cart.filter(i=>i.key!==rem.dataset.remove);renderCart()});
document.getElementById('categoryTabs').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===b));renderProducts()});
document.getElementById('searchInput').addEventListener('input',renderProducts);
const fulfillment=document.getElementById('fulfillment');
fulfillment.addEventListener('change',()=>{const isDelivery=fulfillment.value==='Domicilio';document.getElementById('addressFields').hidden=!isDelivery;document.getElementById('address').required=isDelivery;document.getElementById('neighborhood').required=isDelivery});
document.getElementById('orderForm').addEventListener('submit',e=>{
 e.preventDefault();const err=document.getElementById('formError');err.textContent='';if(!cart.length){err.textContent='Agrega al menos un producto antes de continuar.';return}
 const form=e.currentTarget;const d=new FormData(form);const isDelivery=d.get('fulfillment')==='Domicilio';
 if(isDelivery&&(!String(d.get('address')).trim()||!String(d.get('neighborhood')).trim())){err.textContent='Para el domicilio, completa la dirección y el barrio.';return}
 const total=cart.reduce((s,x)=>s+x.qty*x.price,0);
 let message=`Hola DK Bites! Quiero hacer este pedido:\n\n${cart.map(x=>`- ${x.qty} x ${x.name} — ${money(x.price*x.qty)}`).join('\n')}\n\nTotal productos: ${money(total)}\n\nNombre: ${d.get('name')}\nTipo: ${d.get('fulfillment')}`;
 if(isDelivery)message+=`\nDirección: ${d.get('address')}\nBarrio/zona: ${d.get('neighborhood')}`;
 if(isDelivery&&String(d.get('notes')).trim())message+=`\nIndicaciones: ${d.get('notes')}`;
 message+=`\nPago: ${d.get('payment')}\nGaseosa: ${d.get('soda')}`;
 if(String(d.get('orderNote')).trim())message+=`\nNota: ${d.get('orderNote')}`;
 if(isDelivery)message+='\n\nEntiendo que el costo del domicilio se confirma según la zona.';
 message+='\n\n¿Me confirman disponibilidad y tiempo aproximado, por favor?';
 window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener');
});
const menuToggle=document.getElementById('menuToggle'),nav=document.getElementById('navLinks');menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));
document.getElementById('year').textContent=new Date().getFullYear();renderProducts();renderCart();
