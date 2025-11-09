# 🎁 Configuración de la App de Lista de Deseos

## 📋 Pasos de Configuración

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. En el menú lateral, ve a **Firestore Database**
4. Haz clic en **Crear base de datos**
5. Selecciona **Modo de prueba** (o configura reglas personalizadas)
6. Elige una ubicación cercana (ej: europe-west3)

### 2. Obtener la Configuración de Firebase

1. En la consola de Firebase, ve a **Configuración del proyecto** (⚙️)
2. Desplázate hasta **Tus apps**
3. Haz clic en el icono **</>** (Web)
4. Registra tu app con un nombre (ej: "Lista de Deseos")
5. **Copia la configuración** que aparece

### 3. Actualizar el Código

Abre el archivo `wishlist.html` y busca la línea 585 (aproximadamente):

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

**Reemplaza** estos valores con los de tu proyecto Firebase.

### 4. Configurar Reglas de Firestore (Importante)

En la consola de Firebase, ve a **Firestore Database** > **Reglas** y pega esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura/escritura en todas las listas
    match /lists/{listId}/{document=**} {
      allow read, write: true;
    }
  }
}
```

⚠️ **Nota de seguridad**: Estas reglas son básicas para empezar. Para producción, deberías implementar autenticación y reglas más estrictas.

### 5. Desplegar en Vercel

1. Instala Vercel CLI si no lo tienes:
   ```bash
   npm install -g vercel
   ```

2. Despliega el proyecto:
   ```bash
   npm run deploy
   ```

3. Sigue las instrucciones en pantalla

## ✨ Funcionalidades Implementadas

✅ **Sincronización en tiempo real** - Los cambios se reflejan instantáneamente en todos los dispositivos
✅ **Sistema multi-lista** - Cada lista tiene un ID único generado automáticamente
✅ **Campo de nombre para colaboradores** - Los colaboradores pueden identificarse al sugerir regalos
✅ **Eliminar deseos** - El creador puede eliminar items de su lista
✅ **Extracción automática de datos** - API que extrae título, precio e imagen de Amazon y otras tiendas
✅ **Reservar regalos** - Los colaboradores pueden reservar regalos (el creador no lo ve)

## 🔧 Cómo Usar

### Como Creador:
1. Abre la app (se generará un ID único para tu lista)
2. Copia el enlace que aparece en "Comparte con tu familia"
3. Añade tus deseos usando el botón **+**
4. Comparte el enlace con tu familia

### Como Colaborador:
1. Abre el enlace que te compartió el creador
2. Verás todos los deseos de la lista
3. Puedes:
   - **Reservar** un regalo (el creador no lo verá)
   - **Añadir sugerencias** con el botón **💡**
   - Ver qué regalos están reservados por otros

## 🐛 Solución de Problemas

### "Error al conectar con la base de datos"
- Verifica que la configuración de Firebase sea correcta
- Comprueba que las reglas de Firestore estén publicadas
- Revisa la consola del navegador (F12) para más detalles

### "No se pudo extraer la información del producto"
- Algunas tiendas bloquean el scraping
- En ese caso, completa los datos manualmente
- La extracción funciona mejor con Amazon

### Los cambios no se sincronizan
- Verifica tu conexión a internet
- Asegúrate de que ambos dispositivos usen el mismo enlace (mismo `?list=xxx`)
- Revisa que Firebase esté correctamente configurado

## 📱 Instalar como PWA

Puedes instalar la app en tu móvil:

1. Abre la app en Chrome/Safari móvil
2. Toca el menú (⋮ o ⎙)
3. Selecciona "Añadir a pantalla de inicio"
4. La app se abrirá como una aplicación nativa

## 🔐 Mejorar Seguridad (Opcional)

Para un uso más seguro en producción:

1. Implementa Firebase Authentication
2. Actualiza las reglas de Firestore para requerir autenticación
3. Añade validación de datos en las reglas
4. Considera usar Cloud Functions para lógica del servidor

## 📞 Soporte

Si encuentras problemas:
1. Revisa la consola del navegador (F12 > Console)
2. Verifica la configuración de Firebase
3. Asegúrate de que Vercel esté sirviendo correctamente los archivos
