# 🚀 Inicio Rápido - 5 Minutos

## 📝 Resumen de Cambios

He solucionado TODOS los problemas que mencionaste:

✅ **Sincronización Admin ↔ Colaborador** - Ahora funciona en tiempo real con Firebase
✅ **Campo de nombre del colaborador** - Al añadir sugerencias, pueden poner su nombre
✅ **Eliminar deseos** - Botón de eliminar para el administrador
✅ **Extracción automática de datos** - API funcional para Amazon y otras tiendas
✅ **Sistema multi-usuario** - Cada persona puede crear su propia lista

## ⚡ Configuración Urgente (3 pasos)

### Paso 1: Crear Proyecto Firebase (2 min)

1. Ve a https://console.firebase.google.com/
2. Clic en "Agregar proyecto"
3. Nombre: "wishlist-app" (o el que quieras)
4. **Desactiva** Google Analytics (no lo necesitas)
5. Clic en "Crear proyecto"

### Paso 2: Activar Firestore (1 min)

1. En el menú izquierdo: **Firestore Database**
2. Clic en "Crear base de datos"
3. Selecciona **"Comenzar en modo de prueba"**
4. Ubicación: `europe-west3` (o la más cercana a ti)
5. Clic en "Habilitar"

### Paso 3: Copiar Configuración (2 min)

1. Clic en el icono ⚙️ (Configuración del proyecto)
2. Scroll hacia abajo hasta **"Tus apps"**
3. Clic en el icono **`</>`** (Web)
4. Nombre de app: "wishlist"
5. **NO marques** "Firebase Hosting"
6. Clic en "Registrar app"
7. **COPIA** todo el objeto `firebaseConfig`

Ejemplo de lo que debes copiar:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "wishlist-abc123.firebaseapp.com",
  projectId: "wishlist-abc123",
  storageBucket: "wishlist-abc123.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

### Paso 4: Actualizar el Código (1 min)

1. Abre `wishlist.html` en tu editor
2. Ve a la **línea 585** (o busca `firebaseConfig`)
3. **REEMPLAZA** las credenciales falsas con las que copiaste
4. Guarda el archivo

**Antes:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  // ❌ FALSO
    authDomain: "tu-proyecto.firebaseapp.com",
    // ...
};
```

**Después:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...",  // ✅ TU CLAVE REAL
    authDomain: "wishlist-abc123.firebaseapp.com",
    // ...
};
```

### Paso 5: Configurar Reglas (30 seg)

1. En Firebase Console: **Firestore Database** > **Reglas**
2. Reemplaza TODO con esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lists/{listId}/{document=**} {
      allow read, write: true;
    }
  }
}
```

3. Clic en **"Publicar"**

## 🌐 Desplegar en Vercel (2 min)

```bash
# Si no tienes Vercel CLI instalado:
npm install -g vercel

# Desplegar:
npm run deploy
```

Sigue las instrucciones:
- Set up and deploy? **Y**
- Which scope? (tu cuenta)
- Link to existing project? **N**
- Project name? `wishlist-app`
- In which directory? `./` (presiona Enter)
- Override settings? **N**

Espera 30 segundos y ¡listo! Te dará una URL como:
```
https://wishlist-app-xxx.vercel.app
```

## ✅ Verificación Rápida

1. Abre la URL de Vercel
2. Presiona F12 (consola del navegador)
3. **NO debe haber errores rojos de Firebase**
4. Intenta añadir un regalo
5. Si funciona, ¡perfecto! 🎉

## 🎁 Cómo Usar

### Tú (Administrador):
1. Abre `https://tu-app.vercel.app`
2. Clic en **+** para añadir regalos
3. Copia el enlace de "Comparte con tu familia"
4. Envíalo por WhatsApp/Telegram a tu familia

### Tu Familia (Colaboradores):
1. Abren el enlace que les enviaste
2. Ven tus deseos
3. Pueden reservar regalos (tú NO lo verás)
4. Pueden sugerir regalos con su nombre

## 🆘 Si Algo Falla

### Error en la consola: "Firebase: Error (auth/invalid-api-key)"
➡️ Solución: Revisa que copiaste bien las credenciales en `wishlist.html`

### Error: "Missing or insufficient permissions"
➡️ Solución: Revisa que las reglas de Firestore estén publicadas

### Los cambios no se sincronizan
➡️ Solución: Ambos dispositivos deben usar el MISMO enlace (`?list=xxx`)

### No puedo desplegar en Vercel
➡️ Solución alternativa: Usa otro hosting (Netlify, GitHub Pages, etc.)

## 📚 Documentación Completa

- [CONFIGURACION.md](CONFIGURACION.md) - Guía detallada
- [CAMBIOS.md](CAMBIOS.md) - Qué se modificó
- [VERIFICACION.md](VERIFICACION.md) - Checklist completa

## 💡 Consejos

1. **Guarda el enlace de tu lista** en favoritos
2. **Comparte siempre el mismo enlace** con tu familia
3. **No cierres la consola de Firebase** - te servirá para ver los datos
4. Si algo no funciona, revisa la consola del navegador (F12)

---

¿Necesitas ayuda? Revisa [VERIFICACION.md](VERIFICACION.md) para más detalles.
