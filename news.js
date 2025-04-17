// news.js
const openInExternalBrowser = (url) => {
  try {
    // Detectar si es un dispositivo Android
    const isAndroid = /android/i.test(navigator.userAgent);
    
    if (isAndroid) {
      // Intentar abrir con Intent de Android (sin forzar navegador específico)
      window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=;action=android.intent.action.VIEW;end`;
    } else {
      // Para iOS y otros dispositivos, abrir normalmente
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } catch (e) {
    // Fallback seguro si falla el intent
    console.error('Error al abrir enlace:', e);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

const loadNews = async () => {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<p>Cargando noticias...</p>';

  // Añadir estilos CSS para las noticias
  const style = document.createElement('style');
  style.textContent = `
    .news-item {
      margin-bottom: 20px;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }
    .news-title {
      font-weight: bold;
      font-size: 1.1em;
      margin-bottom: 5px;
      color: #333;
    }
    .news-date {
      font-size: 0.9em;
      color: #666;
      margin-top: 5px;
      margin-bottom: 10px;
      font-style: italic;
    }
    .news-description {
      font-size: 0.95em;
      line-height: 1.4;
      color: #444;
      margin-bottom: 10px;
    }
    .news-link {
      color: #0066cc;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
    }
    .news-link:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const uniqueParam = `?timestamp=${new Date().getTime()}`;
    const proxyUrl = `https://qvapay-proxy.josevdr95.workers.dev/?url=${encodeURIComponent(rssUrl + uniqueParam)}`;

    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const rssText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, "text/xml");

    if (xmlDoc.querySelector('parsererror')) {
      throw new Error('El contenido del RSS no es válido');
    }

    const items = xmlDoc.querySelectorAll("item");
    newsContainer.innerHTML = '';

    items.forEach(item => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const description = item.querySelector("description").textContent;
      const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString();

      const formattedDate = new Date(pubDate).toLocaleDateString('es-ES', {
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
        <a class="news-link" onclick="event.preventDefault(); openInExternalBrowser('${link.replace(/'/g, "\\'")}')">Leer más...</a>
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
  appNewsContainer.innerHTML = '<p>Cargando noticias de la aplicación...</p>';

  // Estilos para noticias de la app
  const style = document.createElement('style');
  style.textContent = `
    .app-news-item {
      margin-bottom: 20px;
      padding: 15px;
    }
    .app-news-item img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    .app-news-content h4 {
      margin: 5px 0;
      color: #333;
    }
    .news-separator {
      border: 0;
      height: 1px;
      background-color: #eee;
      margin: 15px 0;
    }
  `;
  document.head.appendChild(style);

  try {
    const response = await fetch('https://josevdr95new.github.io/CubanCryptoTracker-JS/msgserver.json');
    const messages = JSON.parse(await response.text());

    // Ordenar por fecha (más recientes primero)
    messages.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Mostrar solo las 5 más recientes
    const recentMessages = messages.slice(0, 5);
    appNewsContainer.innerHTML = '';

    recentMessages.forEach((item, index) => {
      const newsItem = document.createElement('div');
      newsItem.className = 'app-news-item';
      
      const safeLink = item.enlace ? item.enlace.replace(/'/g, "\\'") : '';
      
      newsItem.innerHTML = `
        ${item.img ? `<img src="${item.img}" alt="Noticia">` : ''}
        <div class="app-news-content">
          <div class="news-date">${item.fecha}</div>
          <h4>${item.titulo || 'Noticia'}</h4>
          <p>${item.descripcion}</p>
          ${item.enlace ? `<a class="news-link" onclick="event.preventDefault(); openInExternalBrowser('${safeLink}')">Leer más...</a>` : ''}
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
    appNewsContainer.innerHTML = '<p>Error al cargar las noticias de la aplicación.</p>';
  }
};

const showNewsModal = () => {
  // Asume que existe una función showModal definida en otro lugar
  if (typeof showModal === 'function') {
    showModal('news');
  }
  loadNews();
};

// Hacer las funciones accesibles globalmente
window.loadNews = loadNews;
window.loadAppNews = loadAppNews;
window.showNewsModal = showNewsModal;
window.openInExternalBrowser = openInExternalBrowser;

// Cargar noticias automáticamente si el contenedor existe
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('newsContainer')) {
    loadNews();
  }
  if (document.getElementById('appNewsContainer')) {
    loadAppNews();
  }
});