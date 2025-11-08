# 🎁 Lista de Deseos Universal

Aplicación web para crear y compartir listas de deseos con tu familia, con captura universal de productos y colaboración para regalos grupales.

## ✨ Características

### Para el Creador (Cumpleañero)
- ✅ Añade productos de cualquier tienda online
- ⭐ Valora cada regalo del 1 al 5 estrellas
- 🔗 Comparte tu lista con un simple enlace
- 🙈 **No ves lo que añaden o comentan tus familiares** (mantiene la sorpresa)

### Para los Colaboradores (Familia)
- 👀 Ven toda la lista con prioridades
- 🎁 Reservan regalos de forma anónima
- 👥 Piden ayuda para compras grupales
- 💡 Añaden sugerencias que el cumpleañero NO ve
- 📱 Sin instalaciones, solo abren el enlace

## 📱 Cómo Usar

### Para el Cumpleañero

#### Opción 1: Desde el Móvil (Más común)
1. Abre `wishlist.html` en tu navegador
2. Instala como app (opcional): Menú → "Añadir a pantalla de inicio"
3. Para añadir regalos:
   - Ve a Amazon (o cualquier tienda)
   - Toca el botón "Compartir" en el producto
   - Selecciona "Copiar enlace"
   - Vuelve a tu lista
   - Toca el botón "+" 
   - Pega el enlace → "Extraer Datos"
   - Asigna estrellas y guarda
4. Comparte el enlace generado con tu familia

#### Opción 2: Desde PC con Extensión Chrome
1. Instala la extensión desde la carpeta `extension/`:
   - Abre Chrome → `chrome://extensions`
   - Activa "Modo de desarrollador"
   - Click "Cargar extensión sin empaquetar"
   - Selecciona la carpeta `extension`
2. Navega a cualquier producto online
3. Click en el icono 🎁 de la extensión
4. Asigna estrellas y guarda (se añade automáticamente)

### Para la Familia

1. Abre el enlace compartido (desde WhatsApp, email, etc.)
2. **No necesitas instalar nada**
3. Ves la lista completa con prioridades
4. Para reservar un regalo:
   - Click en "Reservar"
   - Pon tu nombre
   - Indica si necesitas ayuda para comprarlo
   - El cumpleañero NO verá que lo reservaste
5. Para añadir una sugerencia:
   - Click en el botón "💡"
   - Añade el producto (igual que el creador)
   - **El cumpleañero no lo verá** (mantiene la sorpresa)

## 🔧 Instalación Técnica

### Desarrollo Local
```bash
# Servidor simple
python -m http.server 8000
# Abre: http://localhost:8000/wishlist.html
```

### Despliegue en Producción

**📘 [Ver guía completa de despliegue →](DEPLOY.md)**

Resumen rápido:
```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU-USUARIO/wishlist-app.git
git push -u origin main

# 2. Desplegar en Vercel
# Ve a vercel.com → Import desde GitHub → Deploy
```

Tu app estará online en minutos con una URL tipo: `https://tu-app.vercel.app`

### Características en Producción
- ✅ **Extracción real de metadatos** via API serverless (`/api/extract.js`)
- ✅ **HTTPS automático** (Vercel)
- ✅ **Auto-deploy** en cada push a GitHub
- ⚠️ Datos en `localStorage` (para persistencia real, considera Firebase)

## 🎯 Flujo de Uso Completo

```
CUMPLEAÑERO:
Amazon app → Compartir → Copiar enlace → Webapp → Pegar → ⭐⭐⭐⭐⭐ → Guardar
                                                    ↓
                                            Compartir enlace
                                                    ↓
FAMILIA:                                            
Recibe enlace → Abre en navegador → Ve lista → Reserva regalo (anónimo)
                                              ↘ Añade sugerencia (invisible para cumpleañero)
```

## 🔐 Privacidad

- **Reservas anónimas**: El cumpleañero no ve quién reservó qué
- **Sugerencias ocultas**: Lo que añaden familiares es invisible para el cumpleañero
- **Sin registro**: Solo se necesita el enlace compartido
- **Datos locales**: Todo se guarda en el navegador (localStorage)

## 📝 Limitaciones Actuales

Esta es una **versión demo/MVP**. Para producción real necesitarías:

1. **Extracción real de metadatos**: Actualmente es simulada. Necesitas un servidor que:
   - Reciba URLs
   - Descargue el HTML
   - Extraiga Open Graph metadata
   - Devuelva título, precio, imagen

2. **Base de datos compartida**: Actualmente usa localStorage (datos solo en tu dispositivo)

3. **Sistema de autenticación**: Para listas múltiples y gestión real

## 🚀 Próximas Mejoras

- [ ] Backend real para extracción de productos
- [ ] Base de datos compartida (Firebase/Supabase)
- [ ] Notificaciones cuando alguien reserva
- [ ] Gestión de compras grupales con split de pagos
- [ ] Comparación automática de precios
- [ ] Alertas de cambios de precio
- [ ] Múltiples listas (cumpleaños, bodas, baby shower)

## 📄 Licencia

MIT - Usa libremente para tu proyecto

---

**Creado para mantener la magia de la sorpresa en los regalos** 🎉
