// API de extracción de información de productos
// Soporta Amazon, AliExpress y otras tiendas mediante scraping básico

export default async function handler(req, res) {
    // Permitir CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({
            success: false,
            error: 'Se requiere una URL'
        });
    }

    try {
        // Intentar extraer información del producto
        const productData = await extractProductData(url);

        return res.status(200).json({
            success: true,
            data: productData
        });
    } catch (error) {
        console.error('Error al extraer datos:', error);
        return res.status(200).json({
            success: false,
            error: 'No se pudo extraer la información del producto',
            message: error.message
        });
    }
}

async function extractProductData(url) {
    try {
        // Hacer fetch del HTML de la página
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo acceder a la URL');
        }

        const html = await response.text();

        // Detectar el tipo de tienda
        if (url.includes('amazon.')) {
            return extractAmazonData(html, url);
        } else if (url.includes('aliexpress.')) {
            return extractAliExpressData(html, url);
        } else {
            return extractGenericData(html, url);
        }
    } catch (error) {
        throw new Error('Error al obtener la página: ' + error.message);
    }
}

function extractAmazonData(html, url) {
    // Extraer título
    let title = '';
    const titleMatch = html.match(/<span id="productTitle"[^>]*>([^<]+)</i);
    if (titleMatch) {
        title = titleMatch[1].trim();
    } else {
        // Intentar con meta tags
        const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
        if (ogTitleMatch) title = ogTitleMatch[1];
    }

    // Extraer precio
    let price = '';
    const priceMatch = html.match(/<span class="a-price-whole">([^<]+)</i);
    if (priceMatch) {
        const decimal = html.match(/<span class="a-price-fraction">([^<]+)</i);
        price = priceMatch[1] + (decimal ? decimal[1] : '') + '€';
    }

    // Extraer imagen
    let image = '';
    const imageMatch = html.match(/<img[^>]+id="landingImage"[^>]+src="([^"]+)"/i);
    if (imageMatch) {
        image = imageMatch[1];
    } else {
        // Intentar con meta tags
        const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (ogImageMatch) image = ogImageMatch[1];
    }

    return {
        title: title || 'Producto de Amazon',
        price: price,
        image: image
    };
}

function extractAliExpressData(html, url) {
    // AliExpress usa mucho JavaScript, extraemos lo básico
    let title = '';
    const titleMatch = html.match(/<title>([^<]+)</i);
    if (titleMatch) {
        title = titleMatch[1].replace(' - AliExpress', '').trim();
    }

    let price = '';
    const priceMatch = html.match(/"minActivityAmount":\{"value":"([^"]+)"/i);
    if (priceMatch) {
        price = priceMatch[1] + '€';
    }

    let image = '';
    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
    if (ogImageMatch) image = ogImageMatch[1];

    return {
        title: title || 'Producto de AliExpress',
        price: price,
        image: image
    };
}

function extractGenericData(html, url) {
    // Extracción genérica usando Open Graph y meta tags
    let title = '';
    let price = '';
    let image = '';

    // Título
    const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
    if (ogTitleMatch) {
        title = ogTitleMatch[1];
    } else {
        const titleMatch = html.match(/<title>([^<]+)</i);
        if (titleMatch) title = titleMatch[1];
    }

    // Precio (buscar patrones comunes)
    const pricePatterns = [
        /price["\s:]+([0-9]+[.,][0-9]+)\s*€/i,
        /€\s*([0-9]+[.,][0-9]+)/i,
        /([0-9]+[.,][0-9]+)\s*EUR/i,
        /"price":"([0-9]+[.,][0-9]+)"/i
    ];

    for (const pattern of pricePatterns) {
        const match = html.match(pattern);
        if (match) {
            price = match[1] + '€';
            break;
        }
    }

    // Imagen
    const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
    if (ogImageMatch) {
        image = ogImageMatch[1];
    }

    return {
        title: title || 'Producto',
        price: price,
        image: image
    };
}
