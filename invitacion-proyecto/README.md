# Invitación Digital de Boda · Modelo 7

Réplica del estilo clásico de Evento Bonito.

## Archivos

- `index.html` — Estructura HTML de la invitación
- `styles.css` — Todos los estilos y animaciones
- `main.js`    — Cuenta regresiva, acordeones y animaciones de scroll

## Personalización

### Nombres y fecha
Busca en `index.html` y reemplaza:
- `Lucía` y `Pedro` → nombres de los novios
- `14 de Junio de 2025` → fecha de la boda
- `Madrid · España` → ciudad

### Fecha del countdown
En `main.js`, línea 1:
```js
const wedding = new Date('2025-06-14T13:00:00');
```

### Fotos
Reemplaza los bloques `.photo-couple-1` y `.photo-couple-2` en `styles.css`:
```css
.photo-couple-1 {
  background-image: url('img/foto1.jpg');
  background-size: cover;
  background-position: center;
}
```

### Hashtag
Busca `#luciaypedro` en `index.html` y reemplaza por el vuestro.

### Datos bancarios y hotel
Busca en `index.html` los acordeones con clase `.acc-body` y edita el contenido.

## Colores principales
- Azul marino: `#1a2d4a`
- Fondo azul hielo: `#edf1f6`
- Dorado: `#c9a96e`
