// script.js

let tradingViewWidget;
let pricesLoaded = false;
let fearGreedIndexLoaded = false;

const prices = {
  btc: 0, bnb: 0, trx: 0, usdt: 0, eth: 0, ton: 0, polygon: 0, sfl: 0, axs: 0, slp: 0, ron: 0
};

const showWarningModal = (link) => {
  currentProjectLink = link;
  showModal('warning');
};

const toggleAcceptButton = () => {
  const acceptButton = document.getElementById('acceptButton');
  acceptButton.disabled = !document.getElementById('acceptCheckbox').checked;
};

const acceptModal = () => {
  if (currentProjectLink) openExternalLink(currentProjectLink);
  closeModal('warningModal');
};

const resetCheckbox = () => {
  document.getElementById('acceptCheckbox').checked = false;
  toggleAcceptButton();
};

const openExternalLink = (url) => {
  window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
  setTimeout(() => window.open(url, '_blank'), 500);
  resetCheckbox();
};

const initTradingViewWidget = (symbol = 'BTCUSDT') => {
  if (tradingViewWidget) tradingViewWidget.remove();
  tradingViewWidget = new TradingView.widget({
    width: "100%", height: "100%", symbol: "BINANCE:" + symbol, interval: "D", timezone: "Etc/UTC", theme: "dark", style: "1", locale: "es",
    toolbar_bg: "#f1f3f6", enable_publishing: false, hide_side_toolbar: false, allow_symbol_change: true, show_popup_button: true,
    popup_width: "1000", popup_height: "650", container_id: "tradingview_chart"
  });
};

const formatPrice = (price) => parseFloat(price) < 1 ? parseFloat(price).toFixed(6) : parseFloat(price).toFixed(2);

const showLoading = () => document.getElementById('loadingOverlay').style.display = 'flex';
const hideLoading = () => document.getElementById('loadingOverlay').style.display = 'none';

const checkInternetConnection = () => new Promise((resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://httpbin.org/get', true);
  xhr.timeout = 10000;
  xhr.onload = () => resolve(xhr.status >= 200 && xhr.status < 300);
  xhr.onerror = () => resolve(false);
  xhr.ontimeout = () => resolve(false);
  xhr.send();
});

const showConnectionError = () => {
  const loadingMessage = document.getElementById('loadingMessage');
  const retryButtonContainer = document.getElementById('retryButtonContainer');
  const loadingSpinner = document.querySelector('.loading-spinner');
  loadingMessage.textContent = 'No hay conexión a Internet.';
  retryButtonContainer.style.display = 'block';
  loadingSpinner.style.display = 'none';
};

const hideConnectionError = () => {
  const loadingMessage = document.getElementById('loadingMessage');
  const retryButtonContainer = document.getElementById('retryButtonContainer');
  const loadingSpinner = document.querySelector('.loading-spinner');
  loadingMessage.textContent = 'Cargando...';
  retryButtonContainer.style.display = 'none';
  loadingSpinner.style.display = 'block';
};

const retryLoading = () => {
  hideConnectionError();
  showLoading();
  initializeApp();
};

const getUSDTtoCUP = async () => {
  const tryWithProxy = async (proxyUrl) => {
    try {
      const targetUrl = encodeURIComponent('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP');
      const response = await fetch(proxyUrl + targetUrl, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
      return JSON.parse((await response.json()).contents);
    } catch (error) {
      console.error(`Error con el proxy ${proxyUrl}:`, error);
      return null;
    }
  };

  // Primero intenta con api.allorigins.win
  let result = await tryWithProxy('https://api.allorigins.win/get?url=');
  if (result) {
    console.log('Usando https://api.allorigins.win/ para obtener los datos.');
    return result;
  }

  // Si falla, intenta con corsproxy.io
  console.log('api.allorigins.win no está disponible, intentando con https://corsproxy.io/...');
  result = await tryWithProxy('https://corsproxy.io/?url=');
  if (result) {
    console.log('Usando https://corsproxy.io/ para obtener los datos.');
    return result;
  }

  // Si ambos fallan, devuelve null
  console.error('No se pudo obtener el precio de USDT/CUP desde QvaPay.');
  return null;
};

const getCryptoPricesInUSDT = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,tron,ethereum,the-open-network,matic-network,sunflower-land,axie-infinity,smooth-love-potion,ronin&vs_currencies=usd', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const defaultPrices = { bitcoin: { usd: 0 }, binancecoin: { usd: 0 }, tron: { usd: 0 }, ethereum: { usd: 0 }, 'the-open-network': { usd: 0 }, 'matic-network': { usd: 0 }, 'sunflower-land': { usd: 0 }, 'axie-infinity': { usd: 0 }, 'smooth-love-potion': { usd: 0 }, ronin: { usd: 0 } };
    return { ...defaultPrices, ...data };
  } catch (error) {
    console.error('Error obteniendo precios de criptomonedas en USDT desde CoinGecko:', error);
    return null;
  }
};

const updatePrices = async () => {
  console.log("Iniciando actualización de precios...");
  const [qvaPayData, cryptoPricesInUSDT] = await Promise.all([getUSDTtoCUP(), getCryptoPricesInUSDT()]);
  if (qvaPayData && cryptoPricesInUSDT) {
    console.log("Datos obtenidos correctamente:", qvaPayData, cryptoPricesInUSDT);
    Object.assign(prices, { btc: cryptoPricesInUSDT.bitcoin.usd, bnb: cryptoPricesInUSDT.binancecoin.usd, trx: cryptoPricesInUSDT.tron.usd, usdt: qvaPayData.average, eth: cryptoPricesInUSDT.ethereum.usd, ton: cryptoPricesInUSDT['the-open-network'].usd, polygon: cryptoPricesInUSDT['matic-network'].usd, sfl: cryptoPricesInUSDT['sunflower-land'].usd, axs: cryptoPricesInUSDT['axie-infinity'].usd, slp: cryptoPricesInUSDT['smooth-love-potion'].usd, ron: cryptoPricesInUSDT.ronin.usd });
    const fechaActualizacion = new Date().toLocaleString();
    document.getElementById('btc-price').textContent = `$${formatPrice(prices.btc)}`;
    document.getElementById('bnb-price').textContent = `$${formatPrice(prices.bnb)}`;
    document.getElementById('trx-price').textContent = `$${formatPrice(prices.trx)}`;
    document.getElementById('usdt-price').textContent = `${formatPrice(prices.usdt)} CUP`;
    updateMarqueeContent(fechaActualizacion);
    pricesLoaded = true; // Marcar que los precios se han cargado
  } else {
    console.error("Error al obtener los datos de las APIs");
  }
};

const updateMarqueeContent = (fechaActualizacion) => {
  const marqueeContent = `
    <span class="marquee-item"><i class="bi bi-exclamation-circle"></i> Precios del Mercado Informal:</span>
    <span class="marquee-item">★ ••★•• ••★•• ••★•• ★</span>
    <span class="marquee-item"><i class="bi bi-currency-dollar"></i> 1 USDT = ${formatPrice(prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-bitcoin"></i> 1 BTC = ${formatPrice(prices.btc * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 ETH = ${formatPrice(prices.eth * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 BNB = ${formatPrice(prices.bnb * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-coin"></i> 1 TRX = ${formatPrice(prices.trx * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 POLYGON = ${formatPrice(prices.polygon * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 TON = ${formatPrice(prices.ton * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 AXS = ${formatPrice(prices.axs * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 SLP = ${formatPrice(prices.slp * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 RON = ${formatPrice(prices.ron * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 SFL = ${formatPrice(prices.sfl * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-clock"></i> Última Actualización: ${fechaActualizacion} ➤</span>
    <span class="marquee-item"><i class="bi bi-star"></i> ¡Mantente al día con los precios! <i class="bi bi-star"></i></span>
    <span class="marquee-item">★ ••★•• ••★•• ••★•• ★</span>
  `;
  document.getElementById('priceMarquee').innerHTML = marqueeContent;
};

const toggleMenu = () => {
  const menu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  menu.classList.toggle('active');
  overlay.style.display = menu.classList.contains('active') ? 'block' : 'none';
  overlay.onclick = () => {
    menu.classList.remove('active');
    overlay.style.display = 'none';
  };
};

const showSection = (section) => {
  event.preventDefault();
  
  // Mostrar la pantalla de carga
  showLoading();

  // Ocultar todas las secciones
  const sections = ['mainContent', 'projectsContent', 'marketContent'];
  sections.forEach(id => document.getElementById(id).style.display = 'none');
  
  const header = document.querySelector('.header');
  const utilityNav = document.querySelector('.utility-nav-container');
  header.style.display = 'none';
  utilityNav.style.display = 'none';

  // Esperar 2 segundos antes de mostrar la sección seleccionada
  setTimeout(() => {
    if (section === 'main') {
      document.getElementById('mainContent').style.display = 'block';
      header.style.display = 'flex';
      utilityNav.style.display = 'block';
      if (!pricesLoaded) {
        updatePrices();
        pricesLoaded = true;
      }
      if (!fearGreedIndexLoaded) {
        getFearGreedIndex();
        fearGreedIndexLoaded = true;
      }
    } else if (section === 'projects') {
      showModal('projectsDisclaimer');
    } else if (section === 'market') {
      document.getElementById('marketContent').style.display = 'block';
    }

    // Ocultar la pantalla de carga después de mostrar la sección
    hideLoading();
  }, 1000); // 2000 milisegundos = 2 segundos
};

const showModal = (type) => {
  const modal = document.getElementById(`${type}Modal`);
  const overlay = document.getElementById('overlay');
  modal.style.display = 'block';
  overlay.style.display = 'block';
  document.getElementById('sideMenu').classList.remove('active');
};

let projectInterval; // Variable para almacenar el intervalo
let currentIndex = 0; // Variable para almacenar el índice actual del proyecto

// Función para mostrar un proyecto
const showNextProject = () => {
  const allProjects = Object.values(window.projectsData).flat();
  const project = allProjects[currentIndex];

  const welcomeCard = document.querySelector('.glossary-style-card');
  if (!welcomeCard || !window.projectsData || allProjects.length === 0) return;

  // Crear el contenido del proyecto
  const projectContent = `
    <h3>¡Bienvenido a CubanCrypto-Tracker!</h3>
    <p>Aquí tienes un proyecto que podría interesarte:</p>
    <div class="project-card">
      <div class="project-image">
        <img src="${project.imagen}" alt="${project.nombre}">
      </div>
      <div class="project-content">
        <h4>${project.nombre}</h4>
        <p>${project.descripcion}</p>
        <div class="project-details">
          <p><strong>Estado:</strong> ${project.estado}</p>
          <p><strong>Pago:</strong> ${project.pago}</p>
          <p><strong>Gratis:</strong> ${project.gratis}</p>
        </div>
        <a href="#" onclick="handleProjectLinkClick('${project.enlace}')" class="project-link">Visitar proyecto</a>
      </div>
    </div>
  `;

  // Aplicar efecto de fade-out antes de cambiar el contenido
  welcomeCard.classList.add('fade-out');
  setTimeout(() => {
    // Cambiar el contenido
    welcomeCard.innerHTML = projectContent;

    // Aplicar efecto de fade-in después de cambiar el contenido
    welcomeCard.classList.remove('fade-out');
    welcomeCard.classList.add('fade-in');

    // Eliminar la clase fade-in después de la animación
    setTimeout(() => {
      welcomeCard.classList.remove('fade-in');
    }, 500); // Duración de la animación (0.5 segundos)
  }, 500); // Duración de la animación (0.5 segundos)

  // Incrementar el índice para el próximo proyecto
  currentIndex = (currentIndex + 1) % allProjects.length;
};

const closeModal = (modalId) => {
  document.getElementById(modalId).style.display = 'none';
  document.getElementById('overlay').style.display = 'none';

  // Reiniciar el intervalo solo si es necesario
  if (modalId === 'warningModal') {
    clearInterval(projectInterval); // Detener el intervalo actual
    projectInterval = setInterval(showNextProject, 10000); // Reiniciar el intervalo
  }
};

const handleProjectLinkClick = (link) => {
  event.preventDefault(); // Evitar que el enlace se abra automáticamente
  clearInterval(projectInterval); // Detener el intervalo
  showWarningModal(link); // Mostrar el modal de advertencia
};

const getFearGreedIndex = () => {
  const fearGreedImg = 'https://alternative.me/crypto/fear-and-greed-index.png';
  const fearGreedEl = document.querySelector('.fear-greed-container');
  fearGreedEl.innerHTML = `<img src="${fearGreedImg}" alt="Crypto Fear & Greed Index" style="max-width: 100%; height: auto;">`;
};

const reloadApp = () => {
  const reloadButton = document.getElementById('reloadButton');
  const lastReloadTime = localStorage.getItem('lastReloadTime');
  const currentTime = new Date().getTime();
  const twoMinutes = 2 * 60 * 1000;
  if (lastReloadTime && (currentTime - lastReloadTime < twoMinutes)) return;
  reloadButton.classList.add('blocked');
  reloadButton.style.pointerEvents = 'none';
  reloadButton.style.opacity = '0.5';
  reloadButton.style.cursor = 'not-allowed';
  localStorage.setItem('lastReloadTime', currentTime);
  showLoading();
  setTimeout(() => window.location.reload(true), 1000);
  setTimeout(() => {
    reloadButton.classList.remove('blocked');
    reloadButton.style.pointerEvents = 'auto';
    reloadButton.style.opacity = '1';
    reloadButton.style.cursor = 'pointer';
  }, twoMinutes);
};

const showRandomProjects = () => {
  const welcomeCard = document.querySelector('.glossary-style-card');
  if (!welcomeCard || !window.projectsData) return;

  // Aplanar todos los proyectos en un solo array
  const allProjects = Object.values(window.projectsData).flat();

  if (allProjects.length === 0) {
    welcomeCard.innerHTML = `
      <h3>¡Bienvenido a CubanCrypto-Tracker!</h3>
      <p>No hay proyectos disponibles en este momento.</p>
    `;
    return;
  }

  // Mostrar el primer proyecto inmediatamente
  showNextProject();

  // Cambiar de proyecto cada 10 segundos
  projectInterval = setInterval(showNextProject, 10000); // Almacenar el intervalo en la variable global
};

// Cargar proyectos y mostrar aleatorios al inicio
document.addEventListener('DOMContentLoaded', () => {
  window.loadProjects().then(() => {
    showRandomProjects(); // Mostrar proyectos aleatorios después de cargar los datos
  });
  showLoading();
  initializeApp();
});

window.addEventListener('online', () => {
  if (document.getElementById('loadingOverlay').style.display === 'flex') retryLoading();
});

window.addEventListener('offline', () => {
  if (document.getElementById('loadingOverlay').style.display === 'flex') showConnectionError();
});

const initializeApp = async () => {
  const isConnected = await checkInternetConnection();
  if (!isConnected) {
    showConnectionError();
    return;
  }

  // Mostrar la pantalla de carga
  showLoading();

  // Ocultar otras secciones
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('marketContent').style.display = 'none';
  document.getElementById('projectsContent').style.display = 'none';

  // Inicializar el widget de TradingView
  initTradingViewWidget();

  // Actualizar los precios y esperar a que se completen
  try {
    await updatePrices(); // Esperar a que los precios se actualicen
    pricesLoaded = true; // Marcar que los precios se han cargado
  } catch (error) {
    console.error('Error al actualizar los precios:', error);
    showConnectionError(); // Mostrar error si no se pueden cargar los precios
    return;
  }

  // Cargar el índice de miedo y codicia
  getFearGreedIndex();
  fearGreedIndexLoaded = true;

  // Cargar noticias de la aplicación
  loadAppNews();

  // Ocultar la pantalla de carga solo después de que los precios se hayan cargado
  hideLoading();

  // Mostrar la sección principal
  document.getElementById('mainContent').style.display = 'block';

  // Actualizar los precios cada 5 minutos
  setInterval(updatePrices, 300000);
};

const showQvaPayData = async () => {
  showModal('qvaPayData');
  const qvaPayDataContainer = document.getElementById('qvaPayDataContainer');
  qvaPayDataContainer.innerHTML = '<p>Cargando datos de QvaPay...</p>';
  try {
    const qvaPayData = await getUSDTtoCUP();
    if (qvaPayData) {
      qvaPayDataContainer.innerHTML = `
        <p><strong>Promedio:</strong> ${qvaPayData.average}</p>
        <p><strong>Promedio de Compra:</strong> ${qvaPayData.average_buy}</p>
        <p><strong>Promedio de Venta:</strong> ${qvaPayData.average_sell}</p>
        <p><strong>Mediana de Compra:</strong> ${qvaPayData.median_buy}</p>
        <p><strong>Mediana de Venta:</strong> ${qvaPayData.median_sell}</p>
      `;
    } else {
      qvaPayDataContainer.innerHTML = '<p>No se pudieron cargar los datos de QvaPay.</p>';
    }
  } catch (error) {
    console.error('Error obteniendo datos de QvaPay:', error);
    qvaPayDataContainer.innerHTML = '<p>Error al cargar los datos de QvaPay.</p>';
  }
};

const showFearGreedModal = () => showModal('fearGreed');