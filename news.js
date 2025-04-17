// news.js
const loadNews = async () => {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<p>Cargando noticias...</p>';

  // Añadir estilos CSS
  const style = document.createElement('style');
  style.textContent = `
    .news-date {
      font-size: 0.9em;
      color: #666;
      margin-top: 5px;
      margin-bottom: 10px;
      font-style: italic;
    }
    .news-item {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .news-link {
      color: #0066cc;
      text-decoration: none;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const rssText = await response.text();
    const xmlDoc = new DOMParser().parseFromString(rssText, "text/xml");

    if (xmlDoc.querySelector('parsererror')) {
      throw new Error('XML inválido');
    }

    newsContainer.innerHTML = '';
    xmlDoc.querySelectorAll("item").forEach(item => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const description = item.querySelector("description").textContent;
      const pubDate = item.querySelector("pubDate").textContent;

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
        <a class="news-link" href="${link}" target="_blank" onclick="event.preventDefault(); window.open('${link}', '_system');">Leer más...</a>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error:', error);
    newsContainer.innerHTML = '<p>Error al cargar noticias. Inténtalo de nuevo más tarde.</p>';
  }
};

const loadAppNews = async () => {
  const appNewsContainer = document.getElementById('appNewsContainer');
  appNewsContainer.innerHTML = '<p>Cargando noticias...</p>';

  try {
    const response = await fetch('https://josevdr95new.github.io/CubanCryptoTracker-JS/msgserver.json');
    const messages = await response.json();

    messages.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const recentMessages = messages.slice(0, 5);
    
    appNewsContainer.innerHTML = '';
    recentMessages.forEach((item, index) => {
      const newsItem = document.createElement('div');
      newsItem.className = 'app-news-item';
      newsItem.innerHTML = `
        ${item.img ? `<img src="${item.img}" alt="Noticia" style="max-width:100%; border-radius:8px; margin-bottom:10px;">` : ''}
        <div class="app-news-content">
          <div class="news-date">${item.fecha}</div>
          <h4 style="margin:5px 0;">${item.titulo || 'Noticia'}</h4>
          <p style="margin:5px 0 10px;">${item.descripcion}</p>
          ${item.enlace ? `<a href="#" onclick="event.preventDefault(); window.open('${item.enlace}', '_system');" style="color:#0066cc; text-decoration:none; font-weight:bold;">Leer más...</a>` : ''}
        </div>
      `;
      appNewsContainer.appendChild(newsItem);

      if (index < recentMessages.length - 1) {
        const separator = document.createElement('hr');
        separator.style.border = 'none';
        separator.style.height = '1px';
        separator.style.backgroundColor = '#eee';
        separator.style.margin = '15px 0';
        appNewsContainer.appendChild(separator);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    appNewsContainer.innerHTML = '<p>Error al cargar noticias de la app.</p>';
  }
};

// Funciones globales
window.loadNews = loadNews;
window.showNewsModal = () => {
  if (typeof showModal === 'function') {
    showModal('news');
  }
  loadNews();
};
window.loadAppNews = loadAppNews;

// Función para abrir enlaces de forma universal
window.openExternalLink = (url) => {
  try {
    // Intenta abrir con el método '_system' (compatible con WebView)
    window.open(url, '_system');
  } catch (e) {
    // Fallback para navegadores normales
    window.open(url, '_blank');
  }
};