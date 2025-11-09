# 🎁 Lista de Deseos - v2.0

## ✨ ¿Qué se ha mejorado?

Tu app ahora tiene **sincronización en tiempo real** y todas las funcionalidades que pediste:

| Problema Original | ✅ Solución Implementada |
|------------------|--------------------------|
| Los deseos no aparecen en colaboradores | **Firebase Firestore** - Sincronización instantánea |
| Falta campo de nombre del colaborador | Campo "Tu nombre" al añadir sugerencias |
| No se pueden eliminar deseos | Botón "🗑️ Eliminar" para el creador |
| No extrae info de Amazon | **API `/api/extract`** funcional |
| Solo para un usuario | Sistema de **listas múltiples** con ID único |

## 🚀 Inicio en 3 Pasos

### 1️⃣ Configurar Firebase (5 min)
Lee: **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)**

### 2️⃣ Desplegar en Vercel (2 min)
```bash
npm run deploy
```

### 3️⃣ Compartir con familia
Copia el enlace y envíalo por WhatsApp

## 📚 Documentación

| Archivo | Cuándo usarlo |
|---------|---------------|
| **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)** | ⭐ Empieza aquí - Guía de 5 minutos |
| [CONFIGURACION.md](CONFIGURACION.md) | Configuración detallada de Firebase |
| [CAMBIOS.md](CAMBIOS.md) | Qué se modificó en el código |
| [VERIFICACION.md](VERIFICACION.md) | Checklist completa de testing |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Si algo no funciona |

## ⚡ Configuración Mínima Requerida

### Antes de desplegar:

1. **Crear proyecto Firebase** (gratis)
   - https://console.firebase.google.com/

2. **Activar Firestore Database**
   - Modo de prueba

3. **Copiar credenciales**
   - Pegar en `wishlist.html` línea 585

4. **Publicar reglas**
   - Ver [INICIO-RAPIDO.md](INICIO-RAPIDO.md) paso 5

### Desplegar:

```bash
npm install -g vercel  # Solo la primera vez
npm run deploy         # Desplegar
```

## 🎯 Características Nuevas

### Para el Creador (Admin):
- ✅ Añadir regalos con extracción automática de datos
- ✅ Eliminar regalos
- ✅ Ver sugerencias de la familia con nombre del colaborador
- ✅ Compartir lista vía enlace
- ✅ **NO ve** qué regalos están reservados (sorpresa!)

### Para los Colaboradores (Familia):
- ✅ Ver todos los regalos
- ✅ Reservar regalos (el admin NO lo verá)
- ✅ Añadir sugerencias con su nombre
- ✅ Ver qué regalos ya reservó otro familiar

### Técnico:
- ✅ Sincronización en tiempo real (Firebase Firestore)
- ✅ API de extracción de productos (Amazon, AliExpress, etc.)
- ✅ Sistema multi-lista (cada usuario puede tener su lista)
- ✅ PWA (se puede instalar como app)
- ✅ Responsive (móvil + desktop)

## 📱 Ejemplo de Uso

### Juan quiere hacer su lista de cumpleaños:

1. **Juan** abre `https://su-app.vercel.app`
2. Añade 5 regalos que quiere
3. Copia el enlace: `https://su-app.vercel.app?list=abc123`
4. Lo envía a su familia por WhatsApp

### María (hermana de Juan) abre el enlace:

1. Ve los 5 regalos de Juan
2. Reserva uno: "PlayStation 5" ← **Juan NO lo verá reservado**
3. Añade una sugerencia: "Zapatillas Nike" con su nombre

### Pedro (amigo de Juan) abre el enlace:

1. Ve los 5 regalos originales
2. Ve la sugerencia de María
3. Ve que "PlayStation 5" está reservada
4. Reserva otro regalo diferente

### Juan revisa su lista:

1. Ve sus 5 regalos originales
2. Ve la sugerencia: "💡 Sugerencia de María: Zapatillas Nike"
3. **NO ve** qué regalos están reservados
4. Puede eliminar regalos si cambia de opinión

## 🔧 Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Base de datos:** Firebase Firestore (NoSQL, tiempo real)
- **API:** Vercel Serverless Functions
- **Hosting:** Vercel
- **PWA:** Instalable como app nativa

## 📊 Estructura del Proyecto

```
wishlist-app/
├── wishlist.html          # App principal (con Firebase integrado)
├── api/
│   └── extract.js         # API de extracción de productos
├── package.json           # Dependencias (Firebase)
├── vercel.json           # Configuración de Vercel
├── manifest.json         # PWA manifest
├── sw.js                 # Service Worker
│
├── LEEME.md              # ← Estás aquí
├── INICIO-RAPIDO.md      # Guía de 5 minutos
├── CONFIGURACION.md      # Configuración detallada
├── CAMBIOS.md            # Changelog
├── VERIFICACION.md       # Testing checklist
└── TROUBLESHOOTING.md    # Solución de problemas
```

## 🎓 Aprende más

### Firebase Firestore:
- Documentación: https://firebase.google.com/docs/firestore
- Es **gratis** hasta 50,000 lecturas/día (más que suficiente para uso familiar)

### Vercel:
- Documentación: https://vercel.com/docs
- Despliegue gratuito con dominio HTTPS

## ⚠️ Importante

### Seguridad Básica:
Las reglas actuales permiten lectura/escritura a CUALQUIERA con el enlace. Esto es OK para uso familiar, pero NO para datos sensibles.

Para mejorar la seguridad:
- Implementa autenticación de Firebase
- Modifica las reglas de Firestore
- Ver [CONFIGURACION.md](CONFIGURACION.md) sección "Mejorar Seguridad"

### Límites de Firebase (Plan Gratuito):
- 50,000 lecturas/día
- 20,000 escrituras/día
- 1 GB almacenamiento

Para uso familiar esto es **MÁS QUE SUFICIENTE**.

## 🎉 ¡Listo para Usar!

Si tienes 5 minutos ahora:
1. Abre **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)**
2. Sigue los 5 pasos
3. ¡Comparte con tu familia!

Si necesitas ayuda:
- Revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Verifica [VERIFICACION.md](VERIFICACION.md)

---

## 📝 Notas de la Versión

### v2.0.0 (Actual)
- ✅ Firebase Firestore integrado
- ✅ Sincronización en tiempo real
- ✅ API de extracción de productos
- ✅ Sistema multi-lista
- ✅ Campo de nombre para colaboradores
- ✅ Funcionalidad de eliminar
- ✅ Mejoras en UI/UX

### v1.0.0 (Anterior)
- localStorage local (sin sincronización)
- Lista única
- Sin API de extracción funcional

---

Hecho con ❤️ para tu familia
