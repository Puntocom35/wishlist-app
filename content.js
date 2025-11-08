// Content script que extrae metadatos de productos de la página actual

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getProductData') {
        const productData = extractProductData();
        sendResponse({ success: true, data: productData });
    }
    return true;
});

function extractProductData() {
    const data = {
        title: '',
        price: '',
        image: '',
        url: window.location.href
    };
    
    // Intentar extraer título
    data.title = 
        document.querySelector('meta[property="og:title"]')?.content ||
        document.querySelector('meta[name="twitter:title"]')?.content ||
        document.querySelector('h1')?.textContent?.trim() ||
        document.title;
    
    // Intentar extraer precio
    const priceSelectors = [
        'meta[property="og:price:amount"]',
        '[itemprop="price"]',
        '.price',
        '#priceblock_ourprice',
        '#priceblock_dealprice',
        '.a-price-whole',
        '[data-price]'
    ];
    
    for (const selector of priceSelectors) {
        const element = document.querySelector(selector);
        if (element) {
            data.price = element.content || 
                        element.getAttribute('data-price') || 
                        element.textContent?.trim();
            if (data.price) break;
        }
    }
    
    // Limpiar precio
    if (data.price) {
        data.price = data.price.replace(/\s+/g, ' ').trim();
    }
    
    // Intentar extraer imagen
    data.image = 
        document.querySelector('meta[property="og:image"]')?.content ||
        document.querySelector('meta[name="twitter:image"]')?.content ||
        document.querySelector('[itemprop="image"]')?.src ||
        document.querySelector('#landingImage')?.src ||
        document.querySelector('.product-image img')?.src ||
        '';
    
    // Limpiar título
    data.title = data.title.replace(/\s+/g, ' ').trim().substring(0, 200);
    
    return data;
}

// Detección específica para Amazon
if (window.location.hostname.includes('amazon')) {
    function getAmazonData() {
        return {
            title: document.getElementById('productTitle')?.textContent?.trim() || '',
            price: document.querySelector('.a-price-whole')?.textContent?.trim() || 
                   document.getElementById('priceblock_ourprice')?.textContent?.trim() || '',
            image: document.getElementById('landingImage')?.src || 
                   document.querySelector('#imgBlkFront')?.src || '',
            url: window.location.href
        };
    }
}
