// news.js
const loadNews = async () => {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<p>Cargando noticias...</p>';

  // Estilos CSS
  const style = document.createElement('style');
  style.textContent = `
    .news-date {
      font-size: 0.9em;
      color: #666;
      margin-top: 5px;
      margin-bottom: 10px;
      font-style: italic;
    }
    .news-item { margin-bottom: 20px; }
    .news-link { color: #1a73e8; cursor: pointer; }
  `;
  document.head.appendChild(style);

  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const uniqueParam = `?timestamp=${new Date().getTime()}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl + uniqueParam)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const rssText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, "text/xml");

    if (xmlDoc.querySelector('parsererror')) {
      throw new Error('XML inválido');
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
        <a class="news-link" onclick="handleLinkClick('${link}')">Leer más...</a>
      `;
      newsContainer.appendChild(newsItem);
    });

  } catch (error) {
    console.error('Error:', error);
    newsContainer.innerHTML = '<p>Error al cargar noticias</p>';
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
          ${item.enlace ? `<a onclick="handleLinkClick('${item.enlace}')">Leer más...</a>` : ''}
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
    console.error('Error:', error);
    appNewsContainer.innerHTML = '<p>Error al cargar noticias</p>';
  }
};

// Función global mejorada para Android 12+
window.handleLinkClick = (url) => {
  const cleanedUrl = url.replace(/^https?:\/\//, '').split('#')[0];
  const fallbackUrl = `https://${cleanedUrl}`;
  
  try {
    const intentUrl = `intent://${cleanedUrl}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
    
    // Método mejorado para lanzar intents
    const anchor = document.createElement('a');
    anchor.href = intentUrl;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Fallback inteligente
    setTimeout(() => {
      if (!document.hidden) {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.location.href = fallbackUrl;
        } else {
          window.location.href = fallbackUrl;
        }
      }
    }, 1000);
    
  } catch (e) {
    window.open(fallbackUrl, '_blank');
  }
  return false;
};

// Funciones globales
window.loadNews = loadNews;
window.loadAppNews = loadAppNews;
window.showNewsModal = () => {
  showModal('news');
  loadNews();
};
