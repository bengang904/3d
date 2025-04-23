let models = [];

window.onload = async function () {
  const response = await fetch('models.json');
  models = await response.json();
  renderGallery(models);

  // 回车键触发搜索
  document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      filterCards();
    }
  });
};

function renderGallery(data) {
  const gallery = document.getElementById('modelGallery');
  gallery.innerHTML = ''; // 清空内容

  data.forEach(model => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <a href="viewer.html?model=${encodeURIComponent(model.glb)}" style="text-decoration: none; color: inherit;">
        <img src="${model.image}" alt="${model.name}" />
        <h3>${model.name}</h3>
      </a>
    `;
    gallery.appendChild(card);
  });
}

function filterCards() {
  const input = document.getElementById('searchInput').value;
  const regex = new RegExp(input, 'i');
  const filtered = models.filter(model => regex.test(model.name));
  renderGallery(filtered);
}
