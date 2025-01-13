// news.js

const fetchWithFallback = async (url) => {
  const services = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?url=${encodeURIComponent(url)}`
  ];

  for (let service of services) {
    try {
      const response = await fetch(service, { cache: 'no-cache' });
      if (response.ok) {
        console.log(`Usando servicio: ${service}`);
        return await response.json();
      }
    } catch (error) {
      console.error(`Error con el servicio ${service}:`, error);
    }
  }
  throw new Error('Todos los servicios fallaron');
};

const loadNews = async () => {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<p>Cargando noticias...</p>';
  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const data = await fetchWithFallback(rssUrl);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    newsContainer.innerHTML = '';
    items.forEach(item => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const description = item.querySelector("description").textContent;
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <div class="news-title">${title}</div>
        <div class="news-description">${description}</div>
        <a class="news-link" href="#" onclick="window.location.href = 'intent://${link.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end'">Leer más...</a>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error cargando noticias:', error);
    newsContainer.innerHTML = '<p>Error al cargar las noticias.</p>';
  }
};

const showNewsModal = () => {
  showModal('news');
  loadNews();
};

const loadAppNews = async () => {
  const appNewsContainer = document.getElementById('appNewsContainer');
  appNewsContainer.innerHTML = '<p>Cargando noticias...</p>';
  try {
    const response = await fetch('https://josevdr95new.github.io/CubanCryptoTracker-JS/msgserver.json', { cache: 'no-cache' });
    const text = await response.text();
    const messages = eval(text);
    messages.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const recentMessages = messages.slice(0, 5);
    appNewsContainer.innerHTML = '';
    recentMessages.forEach((item, index) => {
      const newsItem = document.createElement('div');
      newsItem.className = 'app-news-item';
      newsItem.innerHTML = `
        ${item.img ? `<img src="${item.img}" alt="Noticia">` : ''}
        <div class="app-news-content">
          <div class="news-date">${item.fecha}</div>
          <h4>${item.titulo || 'Noticia'}</h4>
          <p>${item.descripcion}</p>
          ${item.enlace ? `<a href="#" onclick="window.location.href = 'intent://${item.enlace.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end'">Leer más...</a>` : ''}
        </div>
      `;
      appNewsContainer.appendChild(newsItem);
      if (index < recentMessages.length - 1) {
        const separator = document.createElement('hr');
        separator.className = 'news-separator';
        appNewsContainer.appendChild(separator);
      }
    });
  } catch (error) {
    console.error('Error cargando noticias de la app:', error);
    appNewsContainer.innerHTML = '<p>Error al cargar las noticias de la app.</p>';
  }
};

// Hacer las funciones accesibles globalmente
window.loadNews = loadNews;
window.showNewsModal = showNewsModal;
window.loadAppNews = loadAppNews;