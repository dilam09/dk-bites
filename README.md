# DK Bites — Carta digital

Sitio estático listo para publicar en GitHub Pages. No requiere servidor ni base de datos para la primera versión.

## Publicar en GitHub Pages
1. Crea un repositorio público llamado `dk-bites` en https://github.com/new.
2. Descomprime el ZIP y sube **el contenido de la carpeta `dkbites-site`** (index.html, styles.css, app.js, README.md y carpeta assets) a la raíz del repositorio.
3. En el repositorio, entra en **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**; selecciona `main` y `/ (root)`, y guarda.
5. Espera a que GitHub publique el sitio. El enlace será similar a `https://TU-USUARIO.github.io/dk-bites/`.
6. Para un QR, pega la URL pública definitiva en un generador de QR y descarga el código. El QR abre directamente la carta; no necesita estar en la misma red ni abrir archivos locales.

## Funciones incluidas
- Diseño responsive para móvil y escritorio con estética oscura y claymorphism.
- Catálogo por categorías, búsqueda, precios y descripciones sin usar la imagen completa de la carta.
- Carrito, cantidades y opción de combo +$5.000 en hamburguesas.
- Formulario para domicilio o recoger, dirección, barrio, forma de pago y notas.
- Pedido preparado automáticamente y enviado a WhatsApp `+57 322 719 6880` para revisión y envío manual del cliente.
- Acceso a TikTok @dkbites_18.

## Antes de publicarlo
- Revisa especialmente los precios y descripciones de los combos contra la carta vigente.
- Los combos de hamburguesa que aparecen como productos individuales conservan los precios que se leyeron de la carta enviada; se pueden editar en `app.js`.
- La página no confirma automáticamente disponibilidad ni calcula el valor del domicilio: esos detalles se acuerdan en WhatsApp.
- Si quieres cambiar gaseosas disponibles, edita las opciones del selector en `index.html`.
