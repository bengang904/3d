let models = [];
const searchInput = document.getElementById('searchInput');
const modelGallery = document.getElementById('modelGallery');

window.onload = async function () {
    const response = await fetch('models.json');
    models = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q') || '';
    
    if (initialQuery) {
        searchInput.value = initialQuery;
    }

    executeFilter(initialQuery);

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            filterCards();
        }
    });
};

function renderGallery(data) {
    modelGallery.innerHTML = '';

    if (data.length === 0) {
        modelGallery.innerHTML = '<p style="color: #6c757d; font-size: 1.2rem; margin-top: 50px;">抱歉，没有找到匹配的模型。</p>';
        return;
    }

    data.forEach(model => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <a href="look.html?model=${encodeURIComponent(model.glb)}" style="text-decoration: none; color: inherit;">
                <img src="${model.image}" alt="${model.name}" />
                <h3>${model.name}</h3>
            </a>
        `;
        modelGallery.appendChild(card);
    });
}

function executeFilter(query) {
    if (query === '') {
        renderGallery(models);
        return;
    }

    try {
        const regex = new RegExp(query, 'i');
        const filtered = models.filter(model => regex.test(model.name));
        renderGallery(filtered);
    } catch (e) {
        console.error("搜索关键字无效:", e);
        renderGallery(models);
    }
}

function filterCards() {
    const input = searchInput.value.trim();
    const baseUrl = window.location.origin + window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);

    if (input) {
        urlParams.set('q', input);
    } else {
        urlParams.delete('q');
    }
    
    const newUrl = baseUrl + (urlParams.toString() ? '?' + urlParams.toString() : '');
    window.history.pushState({ path: newUrl }, '', newUrl);

    executeFilter(input);
}

