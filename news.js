// news.js
const loadNews = async () => {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<div class="loading-spinner"></div>';

  // Añadir estilos CSS en modo oscuro
  const style = document.createElement('style');
  style.textContent = `
    /* Contenedores */
    #newsContainer, #appNewsContainer {
      display: grid;
      gap: 1.5rem;
      padding: 1rem;
      max-height: 80vh;
      overflow-y: auto;
      background-color: #1a1a1a;
      color: #e0e0e0;
    }

    /* Spinner de carga */
    .loading-spinner {
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top: 4px solid #3b82f6;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 2rem auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Items de noticias */
    .news-item, .app-news-item {
      background: #2d2d2d;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      border: 1px solid #333;
    }

    .news-item:hover, .app-news-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      background: #333;
    }

    /* Títulos */
    .news-title, .app-news-content h4 {
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    /* Fechas */
    .news-date {
      color: #a0a0a0;
      font-size: 0.85rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-style: italic;
    }

    /* Descripciones */
    .news-description, .app-news-content p {
      color: #b0b0b0;
      line-height: 1.6;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    /* Enlaces */
    .news-link, .app-news-content a {
      color: #5d9eff;
      text-decoration: none;
      font-weight: 500;
      display: inline-block;
      transition: color 0.2s ease;
    }

    .news-link:hover, .app-news-content a:hover {
      color: #7ab1ff;
      text-decoration: underline;
    }

    /* Imágenes en noticias de app */
    .app-news-item img {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 1rem;
      border: 1px solid #444;
    }

    /* Separadores */
    .news-separator {
      border: none;
      height: 1px;
      background: #444;
      margin: 1rem 0;
    }

    /* Mensajes de error */
    .error-message {
      color: #ff6b6b;
      text-align: center;
      padding: 1rem;
    }

    .retry-button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-top: 0.5rem;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .retry-button:hover {
      background: #2563eb;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .news-item, .app-news-item {
        padding: 1rem;
      }
      
      #newsContainer, #appNewsContainer {
        padding: 0.5rem;
        max-height: 70vh;
      }
    }
  `;
  document.head.appendChild(style);

  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const uniqueParam = `?timestamp=${new Date().getTime()}`;
    const proxyUrl = `https://qvapay-proxy.josevdr95.workers.dev/?url=${encodeURIComponent(rssUrl + uniqueParam)}`;

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
      const title = item.querySelector("title")?.textContent || 'Sin título';
      const link = item.querySelector("link")?.textContent || '#';
      const description = item.querySelector("description")?.textContent || 'Sin descripción disponible';
      const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString();

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
        <h3 class="news-title">${title}</h3>
        <div class="news-date">${formattedDate}</div>
        <div class="news-description">${description}</div>
        <a class="news-link" href="${link}" target="_blank" rel="noopener noreferrer">Leer más...</a>
      `;
      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Error cargando noticias:', error);
    newsContainer.innerHTML = `
      <div class="error-message">
        <p>Error al cargar las noticias. Inténtalo de nuevo más tarde.</p>
        <button onclick="loadNews()" class="retry-button">Reintentar</button>
      </div>
    `;
  }
};

const loadAppNews = async () => {
  const appNewsContainer = document.getElementById('appNewsContainer');
  appNewsContainer.innerHTML = '<div class="loading-spinner"></div>';

  try {
    const response = await fetch('https://josevdr95new.github.io/CubanCryptoTracker-JS/msgserver.json');
    if (!response.ok) throw new Error('Error al cargar noticias de la app');
    
    const text = await response.text();
    const messages = JSON.parse(text);

    messages.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const recentMessages = messages.slice(0, 5);
    appNewsContainer.innerHTML = '';

    recentMessages.forEach((item, index) => {
      const newsItem = document.createElement('div');
      newsItem.className = 'app-news-item';
      newsItem.innerHTML = `
        ${item.img ? `<img src="${item.img}" alt="${item.titulo || 'Noticia'}">` : ''}
        <div class="app-news-content">
          <div class="news-date">${item.fecha}</div>
          <h4>${item.titulo || 'Noticia'}</h4>
          <p>${item.descripcion || ''}</p>
          ${item.enlace ? `<a href="${item.enlace}" target="_blank" rel="noopener noreferrer">Leer más...</a>` : ''}
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
    appNewsContainer.innerHTML = `
      <div class="error-message">
        <p>Error al cargar las noticias de la app.</p>
        <button onclick="loadAppNews()" class="retry-button">Reintentar</button>
      </div>
    `;
  }
};

const showNewsModal = () => {
  showModal('news');
  loadNews();
};

// Hacer las funciones accesibles globalmente
window.loadNews = loadNews;
window.showNewsModal = showNewsModal;
window.loadAppNews = loadAppNews;

// Cargar noticias al iniciar si el contenedor existe
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('newsContainer')) loadNews();
  if (document.getElementById('appNewsContainer')) loadAppNews();
});