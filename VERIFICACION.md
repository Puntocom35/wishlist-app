# ✅ Lista de Verificación

## Antes de Desplegar

### 1. Configuración de Firebase ⚠️ IMPORTANTE

- [ ] Has creado un proyecto en [Firebase Console](https://console.firebase.google.com/)
- [ ] Has activado Firestore Database
- [ ] Has configurado las reglas de Firestore (ver CONFIGURACION.md)
- [ ] Has copiado la configuración de Firebase
- [ ] Has actualizado `wishlist.html` línea 585 con tus credenciales

**Cómo verificar:**
```javascript
// Abre wishlist.html y busca esta sección (línea ~585)
const firebaseConfig = {
    apiKey: "TU_CLAVE_REAL_AQUI",  // ⚠️ NO debe ser "AIzaSyBXXX..."
    authDomain: "tu-proyecto-real.firebaseapp.com",
    projectId: "tu-proyecto-id-real",
    // ...
};
```

### 2. Estructura de Archivos

Verifica que tienes estos archivos:

- [ ] `wishlist.html` (modificado con Firebase)
- [ ] `api/extract.js` (nueva API)
- [ ] `package.json` (con dependencia firebase)
- [ ] `vercel.json` (configuración de Vercel)
- [ ] `.gitignore` (para no subir archivos sensibles)

### 3. Prueba Local (Opcional)

Antes de desplegar, puedes probar localmente:

```bash
# Instalar un servidor HTTP simple
npm install -g http-server

# Ejecutar en el directorio del proyecto
http-server -p 8000

# Abrir en el navegador
# http://localhost:8000/wishlist.html
```

**⚠️ Nota:** La API `/api/extract` solo funcionará en Vercel, no en local.

## Después de Desplegar

### 1. Verificar Firebase

- [ ] Abre la app desplegada
- [ ] Abre la consola del navegador (F12)
- [ ] No debe haber errores de Firebase
- [ ] Intenta añadir un regalo
- [ ] Ve a Firebase Console > Firestore > Datos
- [ ] Deberías ver: `lists/{id}/items/{itemId}`

### 2. Verificar Sincronización

- [ ] Abre la app en el navegador A
- [ ] Copia el enlace para compartir
- [ ] Ábrelo en el navegador B (o modo incógnito)
- [ ] Añade un regalo en el navegador A
- [ ] **Debe aparecer instantáneamente en B**

### 3. Verificar API de Extracción

- [ ] Intenta añadir un regalo con URL de Amazon
- [ ] Ejemplo: https://www.amazon.es/cualquier-producto
- [ ] Haz clic en "🔍 Extraer Datos"
- [ ] Debería autocompletar título, precio e imagen
- [ ] Si falla, puedes completar manualmente

### 4. Verificar Funcionalidades

#### Como Creador:
- [ ] Puedo añadir regalos
- [ ] Puedo eliminar regalos (botón 🗑️)
- [ ] Veo el enlace para compartir
- [ ] NO veo los regalos reservados

#### Como Colaborador:
- [ ] Veo todos los regalos del creador
- [ ] Puedo reservar regalos (botón 🎁)
- [ ] Puedo añadir sugerencias (botón 💡)
- [ ] Debo poner mi nombre al añadir sugerencia
- [ ] Veo qué regalos están reservados

## Problemas Comunes

### Error: "Firebase is not defined"
**Solución:** Verifica que la configuración de Firebase esté correctamente insertada en `wishlist.html`

### Error: "Missing or insufficient permissions"
**Solución:** Revisa las reglas de Firestore en Firebase Console

### Los datos no se sincronizan
**Solución:**
1. Verifica que ambos dispositivos usen el mismo enlace (`?list=xxx`)
2. Comprueba la conexión a internet
3. Revisa la consola del navegador para errores

### La API de extracción no funciona
**Causas posibles:**
- Solo funciona en producción (Vercel), no en local
- Algunas tiendas bloquean el scraping
- La URL no es válida

**Solución:** Completa los datos manualmente si falla

### No puedo eliminar regalos
**Posible causa:** Estás en modo colaborador
**Solución:** Solo el creador (enlace sin `?list=xxx`) puede eliminar

## Testing Paso a Paso

### Test 1: Crear Lista
1. Abre la app
2. Deberías ver "Creador" como rol
3. Deberías ver un campo "Comparte con tu familia"
4. La URL del share debe tener `?list=xxxxx`

### Test 2: Añadir Regalo
1. Clic en el botón **+**
2. Pega una URL de producto
3. Clic en "🔍 Extraer Datos"
4. Completa los datos
5. Guarda
6. El regalo debe aparecer inmediatamente

### Test 3: Compartir
1. Copia el enlace de "Comparte con tu familia"
2. Ábrelo en otra ventana/navegador
3. Deberías ver "Colaborador" como rol
4. Deberías ver el regalo que añadiste
5. NO deberías ver el botón de eliminar

### Test 4: Reservar
1. Desde el modo colaborador
2. Clic en "🎁 Reservar" en un regalo
3. Escribe tu nombre
4. Confirma
5. El regalo debe mostrar "✓ Reservado por [tu nombre]"

### Test 5: Sugerencia
1. Desde el modo colaborador
2. Clic en el botón **💡**
3. Deberías ver el campo "Tu nombre"
4. Añade un producto
5. El creador debe verlo como "💡 Sugerencia de [tu nombre]"

### Test 6: Eliminar
1. Desde el modo creador
2. Cada regalo debe tener un botón "🗑️ Eliminar"
3. Clic en eliminar
4. Confirma
5. El regalo debe desaparecer de todas las vistas

## Checklist Final

- [ ] Firebase configurado y funcionando
- [ ] App desplegada en Vercel
- [ ] Sincronización en tiempo real funciona
- [ ] Puedo añadir regalos
- [ ] Puedo eliminar regalos (como creador)
- [ ] Puedo reservar regalos (como colaborador)
- [ ] Puedo añadir sugerencias con nombre
- [ ] La API de extracción funciona (o puedo completar manual)
- [ ] El enlace para compartir funciona
- [ ] He compartido el enlace con mi familia

## 🎉 Todo Listo!

Si todos los checks están marcados, ¡tu app está lista para usar!

Guarda el enlace de tu lista en un lugar seguro (favoritos del navegador, nota, etc.)
