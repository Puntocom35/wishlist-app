// API endpoint para extraer metadatos de URLs de productos
// Uso: /api/extract?url=https://amazon.com/product/...

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ 
      success: false, 
      error: 'URL parameter is required' 
    });
  }

  try {
    // Validar URL
    new URL(url);

    // Fetch del HTML de la página
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WishlistBot/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    
    // Extraer metadatos usando expresiones regulares
    const metadata = {
      title: extractMeta(html, [
        /<meta property="og:title" content="([^"]+)"/,
        /<meta name="twitter:title" content="([^"]+)"/,
        /<title>([^<]+)<\/title>/,
        /<h1[^>]*>([^<]+)<\/h1>/
      ]),
      price: extractMeta(html, [
        /<meta property="og:price:amount" content="([^"]+)"/,
        /<meta property="product:price:amount" content="([^"]+)"/,
        /class="[^"]*price[^"]*"[^>]*>([^<]+)</i,
        /id="priceblock_ourprice"[^>]*>([^<]+)</,
        /"price":"([^"]+)"/
      ]),
      image: extractMeta(html, [
        /<meta property="og:image" content="([^"]+)"/,
        /<meta name="twitter:image" content="([^"]+)"/,
        /<meta property="og:image:secure_url" content="([^"]+)"/,
        /id="landingImage"[^>]*src="([^"]+)"/
      ]),
      currency: extractMeta(html, [
        /<meta property="og:price:currency" content="([^"]+)"/,
        /<meta property="product:price:currency" content="([^"]+)"/
      ]) || 'EUR',
      description: extractMeta(html, [
        /<meta property="og:description" content="([^"]+)"/,
        /<meta name="description" content="([^"]+)"/
      ])
    };

    // Limpiar y formatear datos
    metadata.title = cleanText(metadata.title) || 'Producto sin título';
    metadata.price = formatPrice(metadata.price, metadata.currency);
    metadata.description = cleanText(metadata.description)?.substring(0, 200);

    // Validar que al menos tengamos título
    if (!metadata.title || metadata.title === 'Producto sin título') {
      return res.status(400).json({
        success: false,
        error: 'No se pudo extraer información del producto'
      });
    }

    return res.status(200).json({
      success: true,
      data: metadata
    });

  } catch (error) {
    console.error('Error extracting metadata:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Error al extraer datos del producto'
    });
  }
}

// Función auxiliar para extraer con múltiples patrones
function extractMeta(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Limpiar texto HTML
function cleanText(text) {
  if (!text) return null;
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Formatear precio
function formatPrice(price, currency) {
  if (!price) return '';
  
  // Extraer solo números y punto decimal
  const numericPrice = price.replace(/[^\d.,]/g, '').replace(',', '.');
  
  if (!numericPrice) return price;
  
  const symbols = {
    'EUR': '€',
    'USD': '$',
    'GBP': '£'
  };
  
  const symbol = symbols[currency] || currency;
  return `${numericPrice}${symbol}`;
}
