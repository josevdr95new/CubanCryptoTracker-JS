// Contenido del modal de Ayuda
const helpModalContent = `
  <button class="modal-close" onclick="closeModal('helpModal')"><i class="bi bi-x"></i></button>
  <h2>Centro de Ayuda</h2>
  <p>¿Necesitas asistencia? Aquí hay algunas preguntas y respuestas comunes para ayudarte a comenzar con CubanCrypto-Tracker:</p>
  <ul>
    <li><strong>¿De dónde se obtienen los precios?</strong><br>Los precios de las criptomonedas (BTC, BNB, TRX, etc.) se obtienen de la API pública de <a href="https://www.coingecko.com/en/api" target="_blank" class="api-link">CoinGecko</a>. El precio de <strong>USDT/CUP</strong> se obtiene de la API pública de <a href="https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP" target="_blank" class="api-link">QvaPay</a>.</li>
    <li><strong>¿Es seguro invertir basándose en esta información?</strong><br>No recomendamos invertir basándose en los datos proporcionados. Esta plataforma es únicamente informativa y los precios pueden variar según el mercado.</li>
    <li><strong>¿Cómo se calculan los precios de USDT/CUP?</strong><br>Los precios de <strong>USDT/CUP</strong> se obtienen directamente de la API de <strong>QvaPay</strong>. No somos responsables por la exactitud o actualización de estos datos.</li>
    <li><strong>¿Cómo se calculan los precios de las criptomonedas en CUP?</strong><br>Los precios de las criptomonedas en CUP se calculan utilizando el valor de <strong>USDT/CUP</strong> como referencia. Por ejemplo, si el precio de BTC/USDT es $30,000 y el valor de USDT/CUP es 120 CUP, entonces el precio de BTC/CUP sería 30,000 * 120 = 3,600,000 CUP.</li>
    <li><strong>¿Puedo confiar en los datos mostrados?</strong><br>Los datos son obtenidos de APIs públicas y se presentan "tal cual". Le recomendamos verificar la información por su cuenta antes de tomar cualquier decisión.</li>
    <li><strong>¿Qué hago si encuentro un error en los datos?</strong><br>Si encuentra algún error, puede contactarnos, pero tenga en cuenta que no garantizamos la actualización inmediata de la información.</li>
  </ul>
`;

// Contenido del modal de Contacto
const contactModalContent = `
  <button class="modal-close" onclick="closeModal('contactModal')"><i class="bi bi-x"></i></button>
  <h2>Contáctanos</h2>
  <p>Para más información o soporte, no dudes en contactarnos:</p>
  <ul>
    <li><strong>Correo:</strong> <a href="mailto:CubanCrypto-Tracker@proton.me">CubanCrypto-Tracker@proton.me</a></li>
    <li><strong>Sitio web:</strong> <a href="https://josevdr95new.github.io/CubanCryptoTracker-JS/" target="_blank">CubanCrypto-Tracker</a></li>
  </ul>
  <p>¿Te gustaría promocionar tu proyecto <strong>CubanCrypto-Tracker</strong>? ¡Contáctanos por correo y te ayudaremos!</p>
  <p>¡Estamos aquí para ayudarte!</p>
`;

// Contenido del modal de Información de Mercado
const infoModalContent = `
  <button class="modal-close" onclick="closeModal('infoModal')"><i class="bi bi-x"></i></button>
  <h2>Información del Mercado</h2>
  <p>Los precios mostrados en esta plataforma se obtienen de APIs públicas. Los precios de las criptomonedas (BTC, BNB, TRX, etc.) se obtienen de la API de <a href="https://www.coingecko.com/en/api" target="_blank" class="api-link">CoinGecko</a>. El precio de <strong>USDT/CUP</strong> se obtiene de la API de <a href="https://qvapay.com/api/p2p/completed_pairs_average?coin=BANK_CUP" target="_blank" class="api-link">QvaPay</a>. <strong>Nota:</strong> El USDT no está vinculado al USD en el contexto de Cuba. Su valor puede variar según el mercado informal.</p>
  <p><strong>Importante:</strong> Estos datos se presentan únicamente con fines informativos. No recomendamos invertir basándose en esta información. Los precios pueden variar según el mercado y no somos responsables por su exactitud o actualización.</p>
  <p><strong>Cálculo de precios de criptomonedas en CUP:</strong> Los precios de las criptomonedas en CUP se calculan utilizando el valor de <strong>USDT/CUP</strong> como referencia. Por ejemplo, si el precio de BTC/USDT es $30,000 y el valor de USDT/CUP es 120 CUP, entonces el precio de BTC/CUP sería 30,000 * 120 = 3,600,000 CUP.</p>
`;

// Contenido del modal de Contacto
const contactModalContent = `
  <button class="modal-close" onclick="closeModal('contactModal')"><i class="bi bi-x"></i></button>
  <h2>Contáctanos</h2>
  <p>Correo: josevdr95@gmail.com<br><br>Teléfono:</p>
`;

// Contenido del modal de Acerca de (aboutModal)
const aboutModalContent = `
  <button class="modal-close" onclick="closeModal('aboutModal')"><i class="bi bi-x"></i></button>
  <h2>Acerca de CubanCrypto-Tracker</h2>
  <p><strong>Versión:</strong> 0.2 BETA 2025</p>
  <p><strong>Autor:</strong> josevdr95</p>
  <p>Esta aplicación es solo informativa y no ofrece recomendaciones de inversión. Los datos proporcionados se obtienen de APIs públicas como CoinGecko y QvaPay.</p>
  <p><strong>Nota:</strong> El valor de USDT/CUP se basa en el mercado informal cubano y puede variar según las condiciones del mercado.</p>
  <p><strong>Agradecimientos especiales:</strong></p>
  <ul>
    <li>A nuestros Beta Testers, especialmente a <span style="font-weight: bold; color: #00b894; text-decoration: underline; font-style: italic;">@jmorenoc</span>, por su dedicación, feedback y soporte durante la fase de pruebas.</li>
  </ul>
`;

// Función para cargar el contenido de los modales
const loadModalContent = () => {
  // Cargar contenido de los modales
  const helpModal = document.getElementById('helpModal');
  const disclaimerModal = document.getElementById('disclaimerModal');
  const infoModal = document.getElementById('infoModal');
  const contactModal = document.getElementById('contactModal');
  const aboutModal = document.getElementById('aboutModal');

  if (helpModal) helpModal.innerHTML = helpModalContent;
  if (disclaimerModal) disclaimerModal.innerHTML = disclaimerModalContent;
  if (infoModal) infoModal.innerHTML = infoModalContent;
  if (contactModal) contactModal.innerHTML = contactModalContent;
  if (aboutModal) aboutModal.innerHTML = aboutModalContent;

  // Agregar evento de escucha a los enlaces dentro de los modales
  const modals = [helpModal, disclaimerModal, infoModal, contactModal, aboutModal];
  modals.forEach(modal => {
    if (modal) {
      const links = modal.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (event) => {
          event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
          const url = link.href;
          window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        });
      });
    }
  });
};

// Cargar el contenido dinámico cuando la página se cargue
document.addEventListener('DOMContentLoaded', loadModalContent);