# 🔍 Diagnóstico Rápido

## Problema: Los botones no funcionan

### ✅ SOLUCIONADO
He corregido el problema principal: las funciones no eran accesibles desde el HTML porque estaban dentro de un módulo ES6.

**Cambios aplicados:**
- ✅ Todas las funciones ahora son globales (`window.funcionName`)
- ✅ `openAddModal()` - Ahora funciona
- ✅ `closeAddModal()` - Ahora funciona
- ✅ `extractProductData()` - Ahora funciona
- ✅ `handleAddItem()` - Ahora funciona
- ✅ `setRating()` - Ahora funciona
- ✅ `copyShareLink()` - Ahora funciona
- ✅ `deleteItem()` - Ahora funciona
- ✅ `openReserveModal()` - Ahora funciona
- ✅ `handleReserveItem()` - Ahora funciona

### 🚀 Pasos para Verificar

1. **Despliega los cambios:**
   ```bash
   npm run deploy
   ```

2. **Limpia la caché del navegador:**
   - Chrome: Ctrl + Shift + R (o Cmd + Shift + R en Mac)
   - O abre en modo incógnito

3. **Verifica que Firebase funciona:**
   - Abre: `https://tu-app.vercel.app/test-simple.html`
   - Haz clic en "1. Escribir Dato"
   - Deberías ver: "✅ Dato escrito correctamente!"

4. **Si ves error de permisos:**
   - Lee: [FIRESTORE-RULES.txt](FIRESTORE-RULES.txt)
   - Configura las reglas en Firebase Console
   - Espera 2 minutos
   - Vuelve a intentar

---

## Cómo Funciona Ahora

### Crear Lista (Usuario Nuevo)

1. Abre: `https://tu-app.vercel.app`
2. Automáticamente se genera un ID único (ej: `list_abc123xyz`)
3. Verás: **"Creador"** badge
4. Enlace para compartir: `https://tu-app.vercel.app?list=abc123xyz`

### Añadir Regalo (Creador)

1. Clic en botón **+** (abajo derecha)
2. Pega URL de producto
3. Clic en **🔍 Extraer Datos**
4. Completa/ajusta los datos
5. Selecciona estrellas (importancia)
6. Clic en **✓ Guardar Regalo**

### Compartir Lista

1. En la sección "Comparte con tu familia"
2. Clic en **📋 Copiar**
3. Envía el enlace por WhatsApp/email

### Abrir Lista Compartida (Colaborador)

1. Abre el enlace que te enviaron
2. Verás: **"Colaborador"** badge (verde)
3. Ves todos los regalos de la lista

### Reservar Regalo (Colaborador)

1. Clic en **🎁 Reservar**
2. Escribe tu nombre
3. Indica si necesitas ayuda
4. El creador NO verá que lo reservaste

### Añadir Sugerencia (Colaborador)

1. Clic en botón **💡** (abajo derecha)
2. Escribe TU NOMBRE (obligatorio)
3. Pega URL del producto
4. Completa como el creador
5. El creador verá: "💡 Sugerencia de [Tu Nombre]"

### Eliminar Regalo (Solo Creador)

1. En cada regalo verás: **🗑️ Eliminar**
2. Clic en eliminar
3. Confirma
4. Se borra para todos

---

## 🐛 Problemas Comunes

### "No pasa nada al hacer clic en +"
**Causa:** Caché del navegador
**Solución:**
- Ctrl + Shift + R (forzar recarga)
- O abre en modo incógnito

### "Error al guardar el regalo"
**Causa:** Reglas de Firestore no configuradas
**Solución:**
1. Lee [FIRESTORE-RULES.txt](FIRESTORE-RULES.txt)
2. Configura las reglas
3. Espera 2 minutos

### "El botón copiar no funciona"
**Causa:** Permisos del navegador
**Solución:**
- Selecciona el enlace manualmente
- Ctrl + C para copiar

### "No veo el campo de nombre al añadir sugerencia"
**Causa:** Estás en modo creador
**Solución:**
- Solo los colaboradores (enlace con `?list=xxx`) ven el campo de nombre
- El creador NO necesita poner nombre

### "Los cambios no se sincronizan"
**Causas posibles:**
1. **Diferentes listas:**
   - Verifica que ambos usen el MISMO enlace
   - El enlace debe tener `?list=xxxxxxx`

2. **Firebase no configurado:**
   - Prueba con [test-simple.html](test-simple.html)

3. **Reglas de Firestore:**
   - Revisa [FIRESTORE-RULES.txt](FIRESTORE-RULES.txt)

---

## ✅ Checklist de Verificación

### Antes de usar:
- [ ] Has desplegado en Vercel: `npm run deploy`
- [ ] Has limpiado la caché: Ctrl + Shift + R
- [ ] Has configurado reglas de Firestore
- [ ] El test simple funciona: [test-simple.html](test-simple.html)

### Funcionalidades básicas:
- [ ] Puedo abrir el modal al hacer clic en **+**
- [ ] Puedo pegar una URL
- [ ] Puedo extraer datos (o completar manual)
- [ ] Puedo guardar un regalo
- [ ] Veo el regalo en la lista
- [ ] Puedo copiar el enlace para compartir

### Funcionalidades de colaborador:
- [ ] Al abrir enlace con `?list=xxx` veo badge "Colaborador"
- [ ] Veo los regalos del creador
- [ ] Puedo reservar un regalo
- [ ] Al añadir sugerencia, aparece campo de nombre

### Funcionalidades de creador:
- [ ] Veo badge "Creador"
- [ ] Puedo eliminar regalos (botón 🗑️)
- [ ] Veo las sugerencias de colaboradores con su nombre
- [ ] NO veo qué regalos están reservados

---

## 📞 Siguiente Paso

Si TODO funciona:
1. ✅ **Comparte el enlace** con tu familia
2. ✅ Pídeles que abran el enlace
3. ✅ Verifica que pueden ver tus regalos
4. ✅ Pídeles que reserven algo o añadan sugerencia

Si algo NO funciona:
1. 🔧 Abre la consola del navegador (F12)
2. 🔧 Busca mensajes de error en rojo
3. 🔧 Copia el error completo
4. 🔧 Revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🎯 Arquitectura del Sistema

```
Usuario abre la app
    ↓
¿Tiene parámetro ?list= en URL?
    ↓
NO → Genera nuevo ID único → MODO CREADOR
    ↓                             ↓
    ├─ Puede añadir regalos
    ├─ Puede eliminar regalos
    ├─ Ve enlace para compartir
    └─ NO ve reservas

SÍ → Usa ID del enlace → MODO COLABORADOR
    ↓
    ├─ Ve todos los regalos
    ├─ Puede reservar (con nombre)
    ├─ Puede sugerir (con nombre)
    └─ Ve qué está reservado

Todos los cambios se sincronizan en tiempo real vía Firebase Firestore
```

---

## 💡 Tips

1. **Guarda tu enlace:** Añádelo a favoritos del navegador
2. **Modo incógnito:** Úsalo para probar como colaborador sin cambiar de navegador
3. **Consola de Firebase:** https://console.firebase.google.com/ - Ver datos en tiempo real
4. **Reglas permisivas:** Las reglas actuales son para uso familiar (no producción pública)

---

¿Sigue sin funcionar? Abre la consola (F12) y envíame los errores que aparecen en rojo.
