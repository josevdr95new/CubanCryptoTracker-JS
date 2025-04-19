// news.js
const loadNews = async () => {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<p>Cargando noticias...</p>';

  // Añadir estilos CSS simples
  const style = document.createElement('style');
  style.textContent = `
    .news-item {
      background: #2d2d2d;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 5px;
      border-left: 4px solid #3b82f6;
    }
    
    .news-title {
      color: #fff;
      font-size: 1.1rem;
      margin: 0 0 5px 0;
    }
    
    .news-date {
      color: #aaa;
      font-size: 0.8rem;
      margin: 0 0 10px 0;
      font-style: italic;
    }
    
    .news-description {
      color: #ccc;
      font-size: 0.9rem;
      line-height: 1.4;
      margin: 0 0 10px 0;
    }
    
    .news-link {
      color: #3b82f6;
      text-decoration: none;
      font-size: 0.9rem;
    }
    
    .news-link:hover {
      text-decoration: underline;
    }
    
    .app-news-item {
      background: #2d2d2d;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 5px;
    }
    
    .app-news-item img {
      max-width: 100%;
      border-radius: 3px;
      margin-bottom: 10px;
    }
    
    .app-news-content h4 {
      color: #fff;
      margin: 5px 0;
    }
    
    .news-separator {
      border-color: #444;
      margin: 10px 0;
    }
  `;
  document.head.appendChild(style);

  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const uniqueParam = `?timestamp=${new Date().getTime()}`;
    //const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl + uniqueParam)}`;
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
        <a class="news-link" href="#" onclick="window.location.href = 'intent://${link.replace(/^https?:\/\//, '')}#Intent;scheme=https;end'">Leer más...</a>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error cargando noticias:', error);
    newsContainer.innerHTML = '<p>Error al cargar las noticias. Inténtalo de nuevo más tarde.</p>';
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
    const response = await fetch('https://josevdr95new.github.io/CubanCryptoTracker-JS/msgserver.json');
    const text = await response.text();
    const messages = JSON.parse(text);

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
          ${item.enlace && item.enlace.trim() !== '' ? `<a href="#" onclick="window.location.href = 'intent://${item.enlace.replace(/^https?:\/\//, '')}#Intent;scheme=https;end'">Clic para descargar...</a>` : ''}
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

window.loadNews = loadNews;
window.showNewsModal = showNewsModal;
window.loadAppNews = loadAppNews;