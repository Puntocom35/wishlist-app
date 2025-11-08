# 🚀 Guía de Despliegue - GitHub + Vercel

## Paso 1: Subir a GitHub

### Opción A: Desde la línea de comandos

```bash
# 1. Inicializar repositorio Git
cd [carpeta-del-proyecto]
git init

# 2. Añadir todos los archivos
git add .

# 3. Hacer el primer commit
git commit -m "Initial commit: Wishlist app"

# 4. Crear repositorio en GitHub
# Ve a github.com → New repository → Crea "wishlist-app" (o el nombre que quieras)

# 5. Conectar y subir
git remote add origin https://github.com/TU-USUARIO/wishlist-app.git
git branch -M main
git push -u origin main
```

### Opción B: Desde GitHub Desktop

1. Descarga [GitHub Desktop](https://desktop.github.com/)
2. File → Add Local Repository → Selecciona la carpeta
3. Publish repository
4. Marca como público o privado
5. Publish

## Paso 2: Desplegar en Vercel

### Método 1: Desde la Web (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Sign up / Login (con GitHub)
3. Click "Add New..." → "Project"
4. Import tu repositorio GitHub
5. Configuración:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (dejar vacío)
   - **Output Directory**: (dejar vacío)
6. Click "Deploy"
7. ¡Listo! En ~30 segundos tendrás tu URL

### Método 2: Desde CLI

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Desplegar
vercel

# 4. Para producción
vercel --prod
```

## Paso 3: Configurar Dominio (Opcional)

1. En el dashboard de Vercel → tu proyecto
2. Settings → Domains
3. Añade tu dominio personalizado
4. Sigue las instrucciones para configurar DNS

## 🔧 Variables de Entorno (si las necesitas)

Si en el futuro añades funcionalidades que requieren API keys:

1. En Vercel → tu proyecto → Settings → Environment Variables
2. Añade las variables necesarias
3. Redeploy

## 📱 Compartir la App

Una vez desplegada, tu URL será algo como:
```
https://wishlist-app.vercel.app
```

Comparte esta URL con tus familiares. Ellos solo necesitan:
1. Abrir el link
2. Listo, funciona sin instalaciones

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel automáticamente detectará el push y redesplegará la app.

## ✅ Checklist Post-Despliegue

- [ ] App funciona en móvil
- [ ] Puedes añadir productos desde Amazon
- [ ] El enlace compartido funciona
- [ ] Las reservas son anónimas
- [ ] La extracción de metadatos funciona

## 🐛 Troubleshooting

### La API de extracción no funciona
- Verifica que `/api/extract.js` esté en la carpeta correcta
- Chequea los logs en Vercel Dashboard

### Los estilos no cargan
- Asegúrate de que `manifest.json` y `sw.js` estén en la raíz
- Limpia caché del navegador

### LocalStorage no persiste
- Es normal, localStorage es por dispositivo
- Para persistencia real, considera Firebase (futuro)

## 🎉 ¡Ya está!

Tu app ahora está online y lista para usar. Comparte el enlace y disfruta de tu lista de deseos.
