// news.js
const loadNews = async () => {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<p>Cargando noticias...</p>';

  // Añadir estilos CSS directamente en el JS (solo para la fecha y hora)
  const style = document.createElement('style');
  style.textContent = `
    .news-date {
      font-size: 0.9em;
      color: #666;
      margin-top: 5px;
      margin-bottom: 10px;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);

  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const uniqueParam = `?timestamp=${new Date().getTime()}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    const rssText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, "text/xml");

    const errorNode = xmlDoc.querySelector('parsererror');
    if (errorNode) {
      throw new Error('El contenido del RSS no es un XML válido.');
    }

    const items = xmlDoc.querySelectorAll("item");
    newsContainer.innerHTML = '';

    items.forEach(item => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const description = item.querySelector("description").textContent;
      const pubDate = item.querySelector("pubDate").textContent;

      const date = new Date(pubDate);
      const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      newsItem.innerHTML = `
        <div class="news-title">${title}</div>
        <div class="news-date">${formattedDate}</div>
        <div class="news-description">${description}</div>
        <a class="news-link" href="#" 
           onclick="handleCustomIntent('${link.replace(/^https?:\/\//, '')}')">
           Leer más...
        </a>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error cargando noticias:', error);
    newsContainer.innerHTML = '<p>Error al cargar las noticias. Inténtalo de nuevo más tarde.</p>';
  }
};

const loadAppNews = async () => {
  const appNewsContainer = document.getElementById('appNewsContainer');
  appNewsContainer.innerHTML = '<p>Cargando noticias...</p>';

  try {
    const response = await fetch('https://josevdr95new.github.io/CubanCryptoTracker-JS/msgserver.json');
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
          ${item.enlace ? `
            <a href="#" 
               onclick="handleCustomIntent('${item.enlace.replace(/^https?:\/\//, '')}')">
               Leer más...
            </a>` : ''}
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

// Nueva función global para manejar intents
function handleCustomIntent(link) {
  const fallbackUrl = `https://${link}`;
  const intentUrl = `intent://${link}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;

  window.location.href = intentUrl;
  
  setTimeout(() => {
    if (!document.hidden) {
      window.location.href = fallbackUrl;
    }
  }, 500);
}

// Hacer las funciones accesibles globalmente
window.loadNews = loadNews;
window.showNewsModal = showNewsModal;
window.loadAppNews = loadAppNews;
window.handleCustomIntent = handleCustomIntent;

// Función showModal (asumiendo que existe)
const showModal = (modalId) => {
  // Tu implementación existente de showModal
  document.getElementById(modalId).style.display = 'block';
};

// Función showNewsModal actualizada
const showNewsModal = () => {
  showModal('news');
  loadNews();
};
