// script.js

let tradingViewWidget;
let pricesLoaded = false;
let fearGreedIndexLoaded = false;

// Objeto para almacenar los precios de las criptomonedas
const prices = {
  btc: 0, bnb: 0, trx: 0, usdt: 0, eth: 0, ton: 0, polygon: 0, sfl: 0, axs: 0, slp: 0, ron: 0,
  sol: 0, doge: 0, ada: 0, avax: 0, dot: 0, ltc: 0, bch: 0, xrp: 0, link: 0,
  shib: 0, atom: 0, xlm: 0, xmr: 0, algo: 0, vet: 0, xtz: 0
};

// Función para mostrar el modal de advertencia
const showWarningModal = (link) => {
  currentProjectLink = link;
  showModal('warning');
};

// Habilitar o deshabilitar el botón de aceptar en el modal de advertencia
const toggleAcceptButton = () => {
  const acceptButton = document.getElementById('acceptButton');
  acceptButton.disabled = !document.getElementById('acceptCheckbox').checked;
};

// Aceptar el modal de advertencia y abrir el enlace externo
const acceptModal = () => {
  if (currentProjectLink) openExternalLink(currentProjectLink);
  closeModal('warningModal');
};

// Reiniciar el checkbox del modal de advertencia
const resetCheckbox = () => {
  document.getElementById('acceptCheckbox').checked = false;
  toggleAcceptButton();
};

// Abrir un enlace externo
const openExternalLink = (url) => {
  window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
  setTimeout(() => window.open(url, '_blank'), 500);
  resetCheckbox();
};

// Inicializar el widget de TradingView
const initTradingViewWidget = (symbol = 'BTCUSDT') => {
  if (tradingViewWidget) tradingViewWidget.remove();
  tradingViewWidget = new TradingView.widget({
    width: "100%", height: "100%", symbol: "COINEX:" + symbol, interval: "D", timezone: "Etc/UTC", theme: "dark", style: "1", locale: "es",
    toolbar_bg: "#f1f3f6", enable_publishing: false, hide_side_toolbar: false, allow_symbol_change: true, show_popup_button: true,
    popup_width: "1000", popup_height: "650", container_id: "tradingview_chart"
  });
};

const showMarketWithSymbol = (symbol) => {
  showSection('market');
  initTradingViewWidget(symbol);
};

// Formatear el precio para mostrar 8 decimales si es menor a 1, de lo contrario 2 decimales
const formatPrice = (price) => parseFloat(price) < 1 ? parseFloat(price).toFixed(8) : parseFloat(price).toFixed(2);

// Mostrar la pantalla de carga
const showLoading = () => document.getElementById('loadingOverlay').style.display = 'flex';

// Ocultar la pantalla de carga
const hideLoading = () => document.getElementById('loadingOverlay').style.display = 'none';

// Verificar la conexión a Internet
const checkInternetConnection = () => new Promise((resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://josevdr95new.github.io/CubanCryptoTracker-JS/online', true);
  xhr.timeout = 10000;
  xhr.onload = () => resolve(xhr.status >= 200 && xhr.status < 300);
  xhr.onerror = () => resolve(false);
  xhr.ontimeout = () => resolve(false);
  xhr.send();
});

// Mostrar error de conexión
const showConnectionError = () => {
  const loadingMessage = document.getElementById('loadingMessage');
  const retryButtonContainer = document.getElementById('retryButtonContainer');
  const loadingSpinner = document.querySelector('.loading-spinner');
  loadingMessage.textContent = 'No hay conexión a Internet.';
  retryButtonContainer.style.display = 'block';
  loadingSpinner.style.display = 'none';
};

// Ocultar error de conexión
const hideConnectionError = () => {
  const loadingMessage = document.getElementById('loadingMessage');
  const retryButtonContainer = document.getElementById('retryButtonContainer');
  const loadingSpinner = document.querySelector('.loading-spinner');
  loadingMessage.textContent = 'Cargando...';
  retryButtonContainer.style.display = 'none';
  loadingSpinner.style.display = 'block';
};

// Reintentar la carga de la aplicación
const retryLoading = () => {
  hideConnectionError();
  showLoading();
  initializeApp();
};

// Obtener el precio de USDT a CUP desde QvaPay
const getUSDTtoCUP = async () => {
  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  //const proxyUrl = 'https://qvapay-proxy.josevdr95.workers.dev/?url=';
  const targetUrl = encodeURIComponent('https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP');

  try {
    const response = await fetch(proxyUrl + targetUrl, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo el precio de USDT/CUP desde QvaPay:', error);
    return null;
  }
};

// Cargar datos de criptomonedas
const loadCryptoData = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,chainlink,binancecoin,tron,tether,matic-network,ripple,the-open-network,axie-infinity,smooth-love-potion,ronin,solana,dogecoin,cardano,avalanche-2,polkadot,litecoin,bitcoin-cash,sunflower-land,shiba-inu,cosmos,stellar,monero,algorand,vechain,tezos'
    );
    if (!response.ok) throw new Error('Error al cargar los datos de las criptomonedas');
    const data = await response.json();
    window.cryptoData = data;
    return data;
  } catch (error) {
    console.error('Error al cargar los datos de las criptomonedas:', error);
    return null;
  }
};

// Actualizar los precios de las criptomonedas
const updatePrices = async () => {
  console.log("Iniciando actualización de precios...");
  const [qvaPayData, cryptoData] = await Promise.all([getUSDTtoCUP(), loadCryptoData()]);
  if (qvaPayData && cryptoData) {
    console.log("Datos obtenidos correctamente:", qvaPayData, cryptoData);
    Object.assign(prices, {
      btc: cryptoData.find(c => c.id === 'bitcoin').current_price,
      bnb: cryptoData.find(c => c.id === 'binancecoin').current_price,
      trx: cryptoData.find(c => c.id === 'tron').current_price,
      link: cryptoData.find(c => c.id === 'chainlink').current_price,
      usdt: qvaPayData.average,
      eth: cryptoData.find(c => c.id === 'ethereum').current_price,
      ton: cryptoData.find(c => c.id === 'the-open-network').current_price,
      polygon: cryptoData.find(c => c.id === 'matic-network').current_price,
      sfl: cryptoData.find(c => c.id === 'sunflower-land').current_price,
      axs: cryptoData.find(c => c.id === 'axie-infinity').current_price,
      slp: cryptoData.find(c => c.id === 'smooth-love-potion').current_price,
      ron: cryptoData.find(c => c.id === 'ronin').current_price,
      sol: cryptoData.find(c => c.id === 'solana').current_price,
      doge: cryptoData.find(c => c.id === 'dogecoin').current_price,
      ada: cryptoData.find(c => c.id === 'cardano').current_price,
      avax: cryptoData.find(c => c.id === 'avalanche-2').current_price,
      dot: cryptoData.find(c => c.id === 'polkadot').current_price,
      ltc: cryptoData.find(c => c.id === 'litecoin').current_price,
      bch: cryptoData.find(c => c.id === 'bitcoin-cash').current_price,
      xrp: cryptoData.find(c => c.id === 'ripple').current_price,
      shib: cryptoData.find(c => c.id === 'shiba-inu').current_price,
      atom: cryptoData.find(c => c.id === 'cosmos').current_price,
      xlm: cryptoData.find(c => c.id === 'stellar').current_price,
      xmr: cryptoData.find(c => c.id === 'monero').current_price,
      algo: cryptoData.find(c => c.id === 'algorand').current_price,
      vet: cryptoData.find(c => c.id === 'vechain').current_price,
      xtz: cryptoData.find(c => c.id === 'tezos').current_price
    });

    const lastUpdated = cryptoData.find(c => c.id === 'bitcoin').last_updated;
    document.getElementById('btc-price').textContent = `$${formatPrice(prices.btc)}`;
    document.getElementById('trx-price').textContent = `$${formatPrice(prices.trx)}`;
    document.getElementById('usdt-price').textContent = `${formatPrice(prices.usdt)} CUP`;
    updateMarqueeContent(lastUpdated);
    pricesLoaded = true;
    updateCryptoCard();
  } else {
    console.error("Error al obtener los datos de las APIs");
  }
};

// Actualizar el contenido del marquee con los precios
const updateMarqueeContent = (lastUpdated) => {
  const marqueeContent = `
    <span class="marquee-item"><i class="bi bi-exclamation-circle"></i> Precios del Mercado Informal:</span>
    <span class="marquee-item">★ ••★•• ••★•• ••★•• ★</span>
    <span class="marquee-item"><i class="bi bi-currency-dollar"></i> 1 USDT = ${formatPrice(prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-bitcoin"></i> 1 BTC = ${formatPrice(prices.btc * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 ETH = ${formatPrice(prices.eth * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 BNB = ${formatPrice(prices.bnb * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-coin"></i> 1 TRX = ${formatPrice(prices.trx * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 LINK = ${formatPrice(prices.link * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 POL = ${formatPrice(prices.polygon * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 XRP = ${formatPrice(prices.xrp * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 TON = ${formatPrice(prices.ton * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 AXS = ${formatPrice(prices.axs * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 SLP = ${formatPrice(prices.slp * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 RON = ${formatPrice(prices.ron * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 SOL = ${formatPrice(prices.sol * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 DOGE = ${formatPrice(prices.doge * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 ADA = ${formatPrice(prices.ada * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 AVAX = ${formatPrice(prices.avax * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 DOT = ${formatPrice(prices.dot * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 LTC = ${formatPrice(prices.ltc * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 BCH = ${formatPrice(prices.bch * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 SFL = ${formatPrice(prices.sfl * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 SHIB = ${formatPrice(prices.shib * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 ATOM = ${formatPrice(prices.atom * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 XLM = ${formatPrice(prices.xlm * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 XMR = ${formatPrice(prices.xmr * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 ALGO = ${formatPrice(prices.algo * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 VET = ${formatPrice(prices.vet * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-currency-exchange"></i> 1 XTZ = ${formatPrice(prices.xtz * prices.usdt)} CUP ➤</span>
    <span class="marquee-item"><i class="bi bi-clock"></i> Última Actualización: ${new Date(lastUpdated).toLocaleString()} ➤</span>
    <span class="marquee-item"><i class="bi bi-star"></i> ¡Mantente al día con los precios! <i class="bi bi-star"></i></span>
    <span class="marquee-item">★ ••★•• ••★•• ••★•• ★</span>
  `;
  document.getElementById('priceMarquee').innerHTML = marqueeContent;
};

// Mostrar u ocultar el menú lateral
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

// Mostrar una sección específica
const showSection = (section) => {
  event.preventDefault();
  showLoading();
  const sections = ['mainContent', 'projectsContent', 'marketContent'];
  sections.forEach(id => document.getElementById(id).style.display = 'none');

  const header = document.querySelector('.header');
  const utilityNav = document.querySelector('.utility-nav-container');
  header.style.display = 'none';
  utilityNav.style.display = 'none';

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
    hideLoading();
  }, 1000);
};

// Mostrar un modal
const showModal = (type) => {
  const modal = document.getElementById(`${type}Modal`);
  const overlay = document.getElementById('overlay');
  modal.style.display = 'block';
  overlay.style.display = 'block';
  document.getElementById('sideMenu').classList.remove('active');
};

// Cerrar un modal
const closeModal = (modalId) => {
  document.getElementById(modalId).style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
};

// Manejar clic en enlace de proyecto
const handleProjectLinkClick = (link) => {
  event.preventDefault();
  showWarningModal(link);
};

// Obtener el índice de miedo y codicia
const getFearGreedIndex = () => {
  const fearGreedImg = 'https://alternative.me/crypto/fear-and-greed-index.png';
  const fearGreedEl = document.querySelector('.fear-greed-container');
  fearGreedEl.innerHTML = `<img src="${fearGreedImg}" alt="Crypto Fear & Greed Index" style="max-width: 100%; height: auto;">`;
};

// Recargar la aplicación
const reloadApp = () => {
  const reloadButton = document.getElementById('reloadButton');
  const lastReloadTime = localStorage.getItem('lastReloadTime');
  const currentTime = new Date().getTime();
  const twoMinutes = 2 * 60 * 1000;

  if (lastReloadTime && (currentTime - lastReloadTime < twoMinutes)) {
    console.log("El botón ya está bloqueado");
    return;
  }

  console.log("Bloqueando el botón...");
  reloadButton.classList.add('blocked');
  reloadButton.style.pointerEvents = 'none';
  reloadButton.style.opacity = '0.5';
  reloadButton.style.cursor = 'not-allowed';

  localStorage.setItem('lastReloadTime', currentTime);
  showLoading();

  setTimeout(() => window.location.reload(true), 100);

  setTimeout(() => {
    console.log("Desbloqueando el botón...");
    reloadButton.classList.remove('blocked');
    reloadButton.style.pointerEvents = 'auto';
    reloadButton.style.opacity = '1';
    reloadButton.style.cursor = 'pointer';
    localStorage.removeItem('lastReloadTime');
  }, twoMinutes);
};

// Verificar el estado del botón al cargar la página
window.addEventListener('load', () => {
  const reloadButton = document.getElementById('reloadButton');
  const lastReloadTime = localStorage.getItem('lastReloadTime');
  const currentTime = new Date().getTime();
  const twoMinutes = 2 * 60 * 1000;

  if (lastReloadTime && (currentTime - lastReloadTime < twoMinutes)) {
    console.log("El botón está bloqueado al cargar la página");
    reloadButton.classList.add('blocked');
    reloadButton.style.pointerEvents = 'none';
    reloadButton.style.opacity = '0.5';
    reloadButton.style.cursor = 'not-allowed';

    const timeRemaining = twoMinutes - (currentTime - lastReloadTime);
    setTimeout(() => {
      console.log("Desbloqueando el botón...");
      reloadButton.classList.remove('blocked');
      reloadButton.style.pointerEvents = 'auto';
      reloadButton.style.opacity = '1';
      reloadButton.style.cursor = 'pointer';
      localStorage.removeItem('lastReloadTime');
    }, timeRemaining);
  }
});

// Actualizar la tarjeta de criptomonedas cuando el usuario selecciona una moneda
const updateCryptoCard = () => {
  const cryptoCard = document.getElementById('cryptoCard');
  const selectedCrypto = document.getElementById('cryptoSelector').value;

  if (!cryptoCard || !window.cryptoData) return;

  const crypto = window.cryptoData.find(c => c.id === selectedCrypto);
  if (!crypto) return;

  const cupValue = crypto.current_price * prices.usdt;
  const priceInCUP = cupValue < 0.01 ? cupValue.toFixed(4) : cupValue.toFixed(2);
  const change24h = crypto.price_change_percentage_24h;
  const changeColor = change24h < 0 ? 'red' : 'lime';
  const marketCapRank = crypto.market_cap_rank !== null ? `#${crypto.market_cap_rank}` : '?';

  const symbolMapping = {
    bitcoin: 'BTCUSDT',
    ethereum: 'ETHUSDT',
    tether: 'USDTUSD',
    binancecoin: 'BNBUSDT',
    tron: 'TRXUSDT',
    chainlink: 'LINKUSDT',
    'matic-network': 'POLUSDT',
    ripple: 'XRPUSDT',
    'the-open-network': 'TONUSDT',
    solana: 'SOLUSDT',
    dogecoin: 'DOGEUSDT',
    cardano: 'ADAUSDT',
    'avalanche-2': 'AVAXUSDT',
    polkadot: 'DOTUSDT',
    litecoin: 'LTCUSDT',
    'bitcoin-cash': 'BCHUSDT',
    'axie-infinity': 'AXSUSDT',
    ronin: 'RONUSDT',
    'smooth-love-potion': 'SLPUSDT',
    'sunflower-land': 'SFLUSDT',
    'shiba-inu': 'SHIBUSDT',
    cosmos: 'ATOMUSDT',
    stellar: 'XLMUSDT',
    monero: 'XMRUSDT',
    algorand: 'ALGOUSDT',
    vechain: 'VETUSDT',
    tezos: 'XTZUSDT'
  };

  const tradingViewSymbol = symbolMapping[selectedCrypto] || 'BTCUSDT';

  const cryptoContent = `
    <div class="crypto-image">
      <img src="${crypto.image}" alt="${crypto.name}">
      <div class="market-cap-rank">${marketCapRank}</div>
    </div>
    <div class="crypto-content">
      <h4>${crypto.name} (${crypto.id === 'matic-network' ? 'POL' : crypto.symbol.toUpperCase()})</h4>
      <p><strong>Precio actual:</strong> $${formatPrice(crypto.current_price)}</p>
      <p><strong>Precio en CUP:</strong> ${priceInCUP} CUP</p>
      <p><strong>Capitalización de mercado:</strong> $${formatPrice(crypto.market_cap)}</p>
      <p><strong>Volumen (24h):</strong> $${formatPrice(crypto.total_volume)}</p>
      <p><strong>Cambio (24h):</strong> <span style="color: ${changeColor};">${change24h.toFixed(2)}%</span></p>
      <p><strong>Máximo histórico:</strong> $${formatPrice(crypto.ath)} (${new Date(crypto.ath_date).toLocaleDateString()})</p>
      <p><strong>Mínimo histórico:</strong> $${formatPrice(crypto.atl)} (${new Date(crypto.atl_date).toLocaleDateString()})</p>
      <button class="chart-button" onclick="showMarketWithSymbol('${tradingViewSymbol}')">
        <i class="bi bi-graph-up"></i> Ver Gráfica
      </button>
    </div>
  `;

  cryptoCard.innerHTML = cryptoContent;
};

// Cargar datos del clima del mercado
const fetchMarketWeather = async () => {
  const marketWeatherContainer = document.getElementById('marketWeatherContainer');
  marketWeatherContainer.innerHTML = '<p>Cargando datos del clima del mercado...</p>';

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/global');
    if (!response.ok) throw new Error('Error al cargar los datos del clima del mercado');
    const data = await response.json();

    const marketData = data.data;
    const marketWeatherContent = `
      <p><strong>Capitalización de mercado total:</strong> $${formatPrice(marketData.total_market_cap.usd)}</p>
      <p><strong>Volumen total (24h):</strong> $${formatPrice(marketData.total_volume.usd)}</p>
      <p><strong>Dominancia de Bitcoin:</strong> ${marketData.market_cap_percentage.btc.toFixed(2)}%</p>
      <p><strong>Dominancia de Ethereum:</strong> ${marketData.market_cap_percentage.eth.toFixed(2)}%</p>
      <p><strong>Número de criptomonedas:</strong> ${marketData.active_cryptocurrencies}</p>
      <p><strong>Número de exchanges:</strong> ${marketData.markets}</p>
      <p><strong>Cambio en el mercado (24h):</strong> ${marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>
    `;

    marketWeatherContainer.innerHTML = marketWeatherContent;
  } catch (error) {
    console.error('Error al cargar los datos del clima del mercado:', error);
    marketWeatherContainer.innerHTML = '<p>Error al cargar los datos del clima del mercado.</p>';
  }
};

// Mostrar el modal del clima del mercado
const showMarketWeatherModal = () => {
  showModal('marketWeather');
};

// Inicializar la aplicación
const initializeApp = async () => {
  const isConnected = await checkInternetConnection();
  if (!isConnected) {
    showConnectionError();
    return;
  }

  showLoading();

  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('marketContent').style.display = 'none';
  document.getElementById('projectsContent').style.display = 'none';

  initTradingViewWidget();

  try {
    await updatePrices();
    pricesLoaded = true;
  } catch (error) {
    console.error('Error al actualizar los precios:', error);
    showConnectionError();
    return;
  }

  getFearGreedIndex();
  fearGreedIndexLoaded = true;

  loadAppNews();

  // Cargar el clima del mercado al iniciar la aplicación
  fetchMarketWeather();

  hideLoading();

  document.getElementById('mainContent').style.display = 'block';

  setInterval(updatePrices, 660000);
};

// Cargar datos de QvaPay
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

// Mostrar el modal de Fear & Greed
const showFearGreedModal = () => showModal('fearGreed');

// Cargar la aplicación al iniciar
document.addEventListener('DOMContentLoaded', () => {
  showLoading();
  loadCryptoData().then(() => {});
  initializeApp();
});

// Manejar cambios en la conexión a Internet
window.addEventListener('online', () => {
  if (document.getElementById('loadingOverlay').style.display === 'flex') retryLoading();
});

window.addEventListener('offline', () => {
  if (document.getElementById('loadingOverlay').style.display === 'flex') showConnectionError();
});