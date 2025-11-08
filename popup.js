let currentRating = 3;
let productData = {};

document.addEventListener('DOMContentLoaded', async () => {
    showLoading();
    
    // Obtener datos de la página actual
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.sendMessage(tab.id, { action: 'getProductData' }, (response) => {
        if (response && response.success) {
            productData = response.data;
            displayProduct();
        } else {
            // Fallback: usar datos básicos de la pestaña
            productData = {
                title: tab.title,
                url: tab.url,
                price: '',
                image: ''
            };
            displayProduct();
        }
    });
    
    // Event listeners
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value);
            updateStars();
        });
    });
    
    document.getElementById('saveBtn').addEventListener('click', saveToWishlist);
    
    updateStars();
});

function displayProduct() {
    hideLoading();
    document.getElementById('content').style.display = 'block';
    
    document.getElementById('productTitle').textContent = productData.title || 'Producto sin título';
    document.getElementById('productPrice').textContent = productData.price || 'Precio no disponible';
    
    if (productData.image) {
        const img = document.getElementById('productImage');
        img.src = productData.image;
        img.style.display = 'block';
    }
}

function updateStars() {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < currentRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

async function saveToWishlist() {
    const item = {
        id: Date.now().toString(),
        name: productData.title,
        price: productData.price,
        image: productData.image,
        url: productData.url,
        rating: currentRating,
        isSuggestion: false,
        reserved: false,
        createdAt: new Date().toISOString()
    };
    
    // Guardar en storage local (sincroniza con la webapp)
    chrome.storage.local.get(['listId'], (result) => {
        const listId = result.listId || 'default';
        const storageKey = 'wishlist_' + listId;
        
        chrome.storage.local.get([storageKey], (data) => {
            const items = data[storageKey] ? JSON.parse(data[storageKey]) : [];
            items.push(item);
            
            chrome.storage.local.set({ [storageKey]: JSON.stringify(items) }, () => {
                showSuccess();
            });
        });
    });
}

function showSuccess() {
    document.getElementById('content').style.display = 'none';
    const status = document.getElementById('status');
    status.textContent = '✓ Añadido a tu lista de deseos';
    status.className = 'status success';
    status.style.display = 'block';
    
    setTimeout(() => {
        window.close();
    }, 1500);
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}
