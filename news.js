/**
 * Fetches news from an RSS feed using a proxy and displays them.
 */
const loadNews = async () => {
  // Get the container element where news will be displayed
  const newsContainer = document.getElementById('newsContainer');
  // Display a loading message
  newsContainer.innerHTML = '<p>Cargando noticias...</p>'; // Loading news...

  // Add CSS styles dynamically for the date/time display
  // (Consider moving this to a separate CSS file for better organization)
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
    // URL of the RSS feed
    const rssUrl = 'https://es.cointelegraph.com/rss';
    // Add a unique timestamp parameter to try and bypass caching
    const uniqueParam = `?timestamp=${new Date().getTime()}`;
    // Use a CORS proxy (allorigins.win) to fetch the RSS feed from a different domain
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl + uniqueParam)}`;

    // Fetch the data from the proxy
    const response = await fetch(proxyUrl);

    // Check if the fetch request was successful
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`); // Error in request
    }

    // Get the response body as text (expecting XML)
    const rssText = await response.text();
    // Create a DOM parser to parse the XML text
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(rssText, "text/xml");

    // Check if the parser encountered an error (invalid XML)
    const errorNode = xmlDoc.querySelector('parsererror');
    if (errorNode) {
      console.error("Parser Error Details:", errorNode.textContent);
      throw new Error('El contenido del RSS no es un XML válido.'); // The RSS content is not valid XML.
    }

    // Find all the 'item' elements in the XML (representing news articles)
    const items = xmlDoc.querySelectorAll("item");
    // Clear the loading message
    newsContainer.innerHTML = '';

    // Process each news item
    items.forEach(item => {
      // Extract data from the XML elements
      const title = item.querySelector("title")?.textContent || 'Sin título'; // No title
      const link = item.querySelector("link")?.textContent || '#';
      const description = item.querySelector("description")?.textContent || 'Sin descripción'; // No description
      const pubDate = item.querySelector("pubDate")?.textContent;

      let formattedDate = 'Fecha no disponible'; // Date not available
      if (pubDate) {
          try {
            // Parse the publication date
            const date = new Date(pubDate);
            // Format the date for Spanish locale
            formattedDate = date.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          } catch (dateError) {
              console.error("Error parsing date:", pubDate, dateError);
              // Keep 'Fecha no disponible' if parsing fails
          }
      }


      // Create a new div element for the news item
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item p-4 mb-4 border border-gray-200 rounded-lg shadow-sm'; // Added Tailwind classes for basic styling

      // Set the inner HTML of the news item element
      // Using onclick directly is generally okay for simple cases, but consider addEventListener for more complex scenarios
      newsItem.innerHTML = `
        <div class="news-title font-bold text-lg mb-1">${title}</div>
        <div class="news-date text-sm text-gray-600 mb-2">${formattedDate}</div>
        <div class="news-description mb-3">${description}</div>
        <a class="news-link text-blue-600 hover:underline" href="${link}"
           onclick="openExternalLink('${link}'); return false;">
          Leer más...
        </a>
      `;
      // Append the new item to the container
      newsContainer.appendChild(newsItem);
    });

  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error cargando noticias:', error); // Error loading news:
    // Display an error message to the user
    newsContainer.innerHTML = '<p class="text-red-500">Error al cargar las noticias. Inténtalo de nuevo más tarde.</p>'; // Error loading news. Try again later.
  }
};

/**
 * Shows the news modal and triggers loading the news.
 */
const showNewsModal = () => {
  // Assuming 'showModal' is a globally defined function to display a modal with the given ID
  showModal('news');
  // Load the news content when the modal is shown
  loadNews();
};

/**
 * Fetches news/messages specific to the application from a JSON file.
 */
const loadAppNews = async () => {
  // Get the container for app-specific news
  const appNewsContainer = document.getElementById('appNewsContainer');
  // Display loading message
  appNewsContainer.innerHTML = '<p>Cargando noticias...</p>'; // Loading news...

  try {
    // Fetch the JSON data containing app messages/news
    // Ensure this URL is correct and accessible
    const response = await fetch('https://josevdr95new.github.io/CubanCryptoTracker-JS/msgserver.json');

     // Check if the fetch request was successful
    if (!response.ok) {
        throw new Error(`Error fetching app news: ${response.status} - ${response.statusText}`);
    }

    // Get the response body as text
    const text = await response.text();

    // --- Security Note on eval() ---
    // Using eval() can be a security risk if the source of the text is not fully trusted.
    // It executes the text as JavaScript code.
    // If msgserver.json is guaranteed to be safe and correctly formatted JSON,
    // using JSON.parse(text) is much safer and generally preferred.
    // Example: const messages = JSON.parse(text);
    // However, if msgserver.json is *not* standard JSON but actual JavaScript code
    // (e.g., `[{...}, {...}]`), then eval might be necessary, but be aware of the risks.
    // Assuming here the structure requires eval based on the original code.
    const messages = eval(text); // Use JSON.parse(text) if it's standard JSON data.

    // Sort messages by date, newest first
    messages.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    // Get only the 5 most recent messages
    const recentMessages = messages.slice(0, 5);
    // Clear loading message
    appNewsContainer.innerHTML = '';

    // Process each app news item
    recentMessages.forEach((item, index) => {
      const newsItem = document.createElement('div');
      newsItem.className = 'app-news-item mb-4 pb-4'; // Basic margin bottom

      // Format date (assuming item.fecha is a string like "YYYY-MM-DD")
      let formattedAppDate = item.fecha; // Default to original string
      try {
          const appDate = new Date(item.fecha);
          // Check if the date is valid before formatting
          if (!isNaN(appDate.getTime())) {
             formattedAppDate = appDate.toLocaleDateString('es-ES', {
                year: 'numeric', month: 'long', day: 'numeric'
             });
          }
      } catch(e) {
          console.error("Error parsing app news date:", item.fecha, e);
      }


      // Set the inner HTML for the app news item
      newsItem.innerHTML = `
        ${item.img ? `<img src="${item.img}" alt="Imagen de la noticia" class="mb-2 rounded max-w-full h-auto">` : ''} <div class="app-news-content">
          <div class="news-date text-sm text-gray-600 mb-1">${formattedAppDate}</div>
          <h4 class="font-semibold text-md mb-1">${item.titulo || 'Noticia'}</h4> <p class="text-sm mb-2">${item.descripcion}</p>
          ${item.enlace ? `
            <a href="${item.enlace}"
               class="text-blue-600 hover:underline"
               onclick="openExternalLink('${item.enlace}'); return false;">
              Leer más... </a>
          ` : ''}
        </div>
      `;
      appNewsContainer.appendChild(newsItem);

      // Add a separator line between items, but not after the last one
      if (index < recentMessages.length - 1) {
        const separator = document.createElement('hr');
        separator.className = 'news-separator my-4 border-gray-200'; // Tailwind classes for separator
        appNewsContainer.appendChild(separator);
      }
    });
  } catch (error) {
    console.error('Error cargando noticias de la app:', error); // Error loading app news:
    appNewsContainer.innerHTML = '<p class="text-red-500">Error al cargar las noticias de la app.</p>'; // Error loading app news.
  }
};

/**
 * Attempts to open a URL in an external browser, trying different methods.
 * This is often needed in hybrid app environments (like Cordova/Capacitor).
 * @param {string} url - The URL to open.
 */
const openExternalLink = (url) => {
  console.log("Attempting to open URL:", url);
  // Method 1: Check for a specific Android interface (common in older Cordova/WebView setups)
  if (window.Android && typeof window.Android.openUrl === 'function') {
    console.log("Using window.Android.openUrl");
    try {
        window.Android.openUrl(url);
        return; // Exit if successful
    } catch(e) {
        console.error("Error using window.Android.openUrl:", e);
        // Continue to next method if this fails
    }
  }

  // Method 2: Use window.open with '_system' target (standard for many hybrid frameworks like Cordova/Capacitor)
  // This specifically tells the webview to try and open it in the system's default browser.
  try {
    console.log("Trying window.open(url, '_system')");
    const newWindow = window.open(url, '_system');
    if (newWindow) {
        // window.open succeeded in creating a window reference,
        // but doesn't guarantee it opened externally. Usually does with '_system'.
        console.log("window.open with '_system' called.");
        // It's hard to be 100% sure it worked externally from here,
        // but this is often the most reliable cross-platform way in hybrid apps.
        return; // Exit if we think it worked
    } else {
         console.log("window.open(url, '_system') returned null or undefined.");
         // If window.open is blocked or fails, it might return null.
    }
  } catch (e) {
    console.error("Error using window.open(url, '_system'):", e);
    // Continue to next method if this fails
  }

  // Method 3: Standard browser behavior - use target='_blank'
  // This works in regular web browsers but might open inside the app's webview
  // in some hybrid environments if Method 2 failed or wasn't applicable.
  try {
    console.log("Trying standard <a target='_blank'> click");
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    // rel='noopener noreferrer' is good practice for security and performance
    a.setAttribute('rel', 'noopener noreferrer');
    // Simulate a click on the link
    a.style.display = 'none'; // Hide the element
    document.body.appendChild(a); // Add to DOM to make it clickable
    a.click();
    document.body.removeChild(a); // Clean up the element
    console.log("Simulated click on target='_blank' link.");
    return; // Exit if click simulation was initiated
  } catch (e) {
    console.error("Error simulating click on target='_blank' link:", e);
    // Continue to the last resort
  }

  // Method 4: Last resort - redirect the current window/webview
  // This is generally undesirable as it navigates the user away from your app's current view.
  console.warn("Last resort: Setting window.location.href");
  window.location.href = url;
};

// --- Making functions globally accessible ---
// This makes the functions callable from HTML event attributes (like onclick="")
// or from other scripts, assuming this script is loaded globally.
// Note: This step isn't strictly necessary if you attach event listeners using JavaScript
// (e.g., document.getElementById('myButton').addEventListener('click', showNewsModal);)
// which is often considered a cleaner approach than inline onclick attributes.

window.loadNews = loadNews;
window.showNewsModal = showNewsModal;
window.loadAppNews = loadAppNews;
// We keep this assignment even though the error wasn't here,
// because the original code intended openExternalLink to be globally accessible.
window.openExternalLink = openExternalLink;

// --- Optional: Initial Load ---
// You might want to load one of the news feeds when the page loads initially.
// Uncomment the one you want to load by default.
// document.addEventListener('DOMContentLoaded', () => {
//   // loadNews(); // Load RSS news on page load
//   // loadAppNews(); // Load App news on page load
// });
