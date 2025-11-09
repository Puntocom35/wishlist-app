# 🔧 Solución de Problemas

## 🚨 Errores Comunes y Soluciones

### 1. Error: "Firebase: No Firebase App '[DEFAULT]' has been created"

**Causa:** La configuración de Firebase no está correctamente insertada

**Solución:**
1. Abre `wishlist.html`
2. Busca la línea ~585
3. Verifica que el código sea:

```javascript
const firebaseConfig = {
    apiKey: "TU-CLAVE-REAL-AQUI",  // ⚠️ Debe empezar con "AIzaSy..."
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:xxxxx"
};

const app = initializeApp(firebaseConfig);  // ✅ Esta línea debe existir
const db = getFirestore(app);
```

---

### 2. Error: "Missing or insufficient permissions"

**Causa:** Las reglas de Firestore no están configuradas correctamente

**Solución:**
1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto
3. **Firestore Database** > **Reglas**
4. Debe decir EXACTAMENTE:

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

5. Clic en **"Publicar"**
6. Espera 1-2 minutos para que se aplique

---

### 3. Error: "Failed to fetch" al extraer datos

**Causa:** La API `/api/extract` solo funciona en Vercel, no en local

**Solución 1 (Recomendada):**
- Despliega en Vercel primero
- La API funcionará automáticamente

**Solución 2 (Alternativa):**
- Completa los datos manualmente
- No uses el botón "🔍 Extraer Datos"

---

### 4. Los cambios no se sincronizan entre dispositivos

**Diagnóstico:**
Abre la consola del navegador (F12) en ambos dispositivos

**Posibles causas y soluciones:**

#### Causa A: Diferentes enlaces
❌ **Incorrecto:**
- Dispositivo 1: `https://mi-app.vercel.app/`
- Dispositivo 2: `https://mi-app.vercel.app/?list=abc123`

✅ **Correcto:**
- Ambos: `https://mi-app.vercel.app/?list=abc123`

**Solución:** Usa el MISMO enlace en todos los dispositivos

#### Causa B: Error de Firebase
Revisa la consola (F12) > Console tab

Si ves errores rojos de Firebase:
1. Verifica las credenciales (Problema #1)
2. Verifica las reglas (Problema #2)

#### Causa C: Sin conexión a Internet
**Solución:** Verifica tu conexión WiFi/datos

---

### 5. No puedo eliminar regalos

**Causa:** Estás en modo colaborador

**Cómo verificar:**
- ¿Tu URL tiene `?list=xxxxx`? → Eres colaborador ❌
- ¿Tu URL NO tiene parámetros? → Eres creador ✅

**Solución:**
- Solo el creador puede eliminar
- El creador debe abrir la app SIN el parámetro `?list=`
- O usar el enlace original que generó al principio

---

### 6. El botón de añadir (💡 o +) no hace nada

**Diagnóstico:**
1. Presiona F12
2. Ve a la pestaña **Console**
3. Haz clic en el botón
4. ¿Aparecen errores?

**Soluciones según el error:**

#### "Cannot read property 'classList' of null"
El HTML está corrupto. Re-descarga `wishlist.html`

#### "Firebase is not defined"
Problema de configuración (ver Problema #1)

#### Sin errores pero no abre el modal
Limpia la caché:
- Chrome: Ctrl + Shift + R
- Firefox: Ctrl + F5

---

### 7. La API de extracción no encuentra precio/imagen

**Causa:** Algunas tiendas bloquean el scraping o usan JavaScript

**URLs que funcionan mejor:**
✅ Amazon: `https://www.amazon.es/...`
✅ Sitios con Open Graph tags

**URLs que pueden fallar:**
❌ AliExpress (usa mucho JavaScript)
❌ Sitios con anti-bot

**Solución:**
- Usa el botón "🔍 Extraer Datos"
- Si falla, completa manualmente:
  - Nombre: escribe el nombre del producto
  - Precio: escribe el precio (ej: "29.99€")
  - Imagen: copia la URL de la imagen (clic derecho > copiar dirección de imagen)

---

### 8. Error al desplegar en Vercel

#### Error: "No vercel.json found"

**Solución:**
Crea el archivo `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/", "destination": "/wishlist.html" }
  ]
}
```

#### Error: "Invalid vercel.json"

**Solución:**
Verifica que el JSON sea válido:
```bash
# En la terminal:
cat vercel.json
```

Debe mostrar exactamente:
```json
{
  "rewrites": [
    { "source": "/", "destination": "/wishlist.html" }
  ]
}
```

---

### 9. La app funciona en mi PC pero no en el móvil

**Posibles causas:**

#### A. Cache del móvil
**Solución:**
1. En el móvil, abre el navegador
2. Ve a Configuración > Borrar datos de navegación
3. Marca "Imágenes y archivos en caché"
4. Borra
5. Recarga la app

#### B. Versión antigua del navegador
**Solución:**
- Actualiza Chrome/Safari a la última versión
- O usa un navegador moderno

---

### 10. No recibo actualizaciones en tiempo real

**Diagnóstico:**
1. Abre la app
2. F12 > Console
3. Busca mensajes de Firebase
4. ¿Dice "Connected to Firestore"?

**Si NO:**

#### Posible causa: Firewall/VPN
Algunos firewalls bloquean WebSockets

**Solución:**
- Desactiva VPN temporalmente
- Verifica firewall corporativo
- Prueba con datos móviles (no WiFi)

#### Posible causa: Reglas de Firestore
**Solución:**
- Revisa el Problema #2
- Asegúrate que las reglas estén publicadas

---

## 🔍 Debugging Avanzado

### Ver datos en Firebase Console

1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto
3. **Firestore Database** > **Datos**
4. Deberías ver:
   ```
   lists/
     └── list_abc123/
         └── items/
             └── 1699999999/
                 ├── name: "PlayStation 5"
                 ├── price: "499€"
                 ├── ...
   ```

Si NO ves nada:
- Los datos no se están guardando
- Revisa Problema #1 y #2

### Inspeccionar llamadas de red

1. F12 > **Network**
2. Intenta añadir un regalo
3. Busca llamadas a `firestore.googleapis.com`
4. ¿Status 200? → OK ✅
5. ¿Status 403? → Problema de permisos (Problema #2)
6. ¿Status 401? → Problema de autenticación (Problema #1)

### Logs de JavaScript

Añade esto temporalmente en `wishlist.html` (línea ~612):

```javascript
console.log('Firebase initialized:', app);
console.log('Firestore initialized:', db);
console.log('Current list ID:', currentListId);
console.log('Is owner?', isOwner);
```

Revisa la consola para ver estos logs.

---

## 🆘 Última Opción: Reset Completo

Si nada funciona, reset completo:

1. **Firebase:**
   - Ve a Firestore Database
   - Borra la colección `lists`
   - Republica las reglas

2. **Vercel:**
   ```bash
   vercel --force
   ```

3. **Navegador:**
   - Ctrl + Shift + Delete
   - Borra TODO el caché
   - Cierra y abre el navegador

4. **Código:**
   - Re-descarga `wishlist.html`
   - Vuelve a insertar las credenciales

---

## 📞 Cómo Reportar un Bug

Si encuentras un bug que no está aquí:

1. Abre la consola (F12)
2. Copia TODOS los mensajes de error (rojos)
3. Anota:
   - Sistema operativo (Windows, Mac, Android, iOS)
   - Navegador (Chrome, Firefox, Safari, etc.)
   - URL de tu app
   - Qué estabas haciendo cuando falló
   - ¿Eres creador o colaborador?

4. Revisa que tu configuración de Firebase sea correcta
5. Revisa que las reglas estén publicadas

---

## ✅ Check de Salud Rápido

Responde estas preguntas:

- [ ] ¿La consola (F12) muestra errores rojos de Firebase? → Revisar Problema #1
- [ ] ¿Puedes ver datos en Firebase Console? → Si NO, revisar Problema #2
- [ ] ¿Ambos dispositivos usan el MISMO enlace? → Revisar Problema #4
- [ ] ¿Tu app está desplegada en Vercel? → La API solo funciona en producción
- [ ] ¿Han pasado 2 minutos desde que publicaste las reglas? → Espera un poco más

Si todas las respuestas son correctas y AÚN falla:
- Reset completo (ver arriba)
- Verifica paso a paso [VERIFICACION.md](VERIFICACION.md)
