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
  document.head.appendChild(style); // Añadir el estilo al documento

  try {
    const rssUrl = 'https://es.cointelegraph.com/rss';
    const uniqueParam = `?timestamp=${new Date().getTime()}`; // Agrega un parámetro único
    //const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl + uniqueParam)}`;
	const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

    // Realizar la solicitud al proxy
    const response = await fetch(proxyUrl);

    // Verificar si la respuesta es válida
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }

    // Obtener el contenido del RSS como texto
    const rssText = await response.text();

    // Parsear el contenido del RSS como XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, "text/xml");

    // Verificar si el XML es válido
    const errorNode = xmlDoc.querySelector('parsererror');
    if (errorNode) {
      throw new Error('El contenido del RSS no es un XML válido.');
    }

    // Obtener los elementos "item" del RSS
    const items = xmlDoc.querySelectorAll("item");
    newsContainer.innerHTML = '';

    // Mostrar las noticias en el contenedor
    items.forEach(item => {
      const title = item.querySelector("title").textContent;
      const link = item.querySelector("link").textContent;
      const description = item.querySelector("description").textContent;
      const pubDate = item.querySelector("pubDate").textContent;

      // Formatear la fecha y hora
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
    const messages = eval(text);

    // Ordenar las noticias por fecha (más recientes primero)
    messages.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Mostrar solo las 5 noticias más recientes
    const recentMessages = messages.slice(0, 5);
    appNewsContainer.innerHTML = '';

    // Mostrar las noticias en el contenedor
    recentMessages.forEach((item, index) => {
      const newsItem = document.createElement('div');
      newsItem.className = 'app-news-item';
      newsItem.innerHTML = `
        ${item.img ? `<img src="${item.img}" alt="Noticia">` : ''}
        <div class="app-news-content">
          <div class="news-date">${item.fecha}</div>
          <h4>${item.titulo || 'Noticia'}</h4>
          <p>${item.descripcion}</p>
          ${item.enlace ? `<a href="${item.enlace}" target="_blank">Leer más...</a>`</a>` : ''}
        </div>
      `;
      appNewsContainer.appendChild(newsItem);

      // Agregar un separador entre noticias (excepto después de la última)
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