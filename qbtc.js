// Declarar bitcoinFAQData primero (ámbito global)
const bitcoinFAQData = [
  {
    question: "¿Qué es Bitcoin?",
    answer: "Bitcoin es una <strong>moneda digital</strong> creada en 2009 por una persona (o grupo) bajo el seudónimo de <strong>Satoshi Nakamoto</strong>. A diferencia del dinero tradicional, Bitcoin no está controlado por ningún gobierno o banco. Es descentralizado, lo que significa que funciona en una red de computadoras llamada <strong>blockchain</strong>."
  },
  {
    question: "¿Qué es Blockchain?",
    answer: "La <strong>blockchain</strong> es la tecnología detrás de Bitcoin. Es como un <strong>libro de contabilidad digital</strong> donde se registran todas las transacciones. Cada bloque contiene un conjunto de transacciones y está conectado al bloque anterior mediante un <strong>hash</strong> (un código único). Esto hace que la blockchain sea segura e inmutable."
  },
  {
    question: "¿Cómo funciona Bitcoin?",
    answer: "Bitcoin funciona gracias a una red de computadoras llamadas <strong>nodos</strong>. Estas computadoras verifican y transmiten transacciones. Los <strong>mineros</strong> resuelven problemas matemáticos complejos para agregar nuevos bloques a la blockchain y reciben una recompensa en Bitcoin por su trabajo."
  },
  {
    question: "¿Qué es un Halving?",
    answer: "El <strong>Halving</strong> es un evento que ocurre aproximadamente cada 4 años. Reduce a la mitad la recompensa que reciben los mineros por agregar nuevos bloques a la blockchain. Este mecanismo controla la emisión de nuevos Bitcoins y asegura que solo habrá <strong>21 millones</strong> en existencia."
  },
  {
    question: "¿Cómo se creó Bitcoin?",
    answer: "Bitcoin fue creado en 2009 por <strong>Satoshi Nakamoto</strong>, cuya identidad real sigue siendo un misterio. El primer bloque, llamado <strong>Bloque Génesis</strong>, contenía una recompensa de 50 BTC. Desde entonces, Bitcoin ha crecido hasta convertirse en un sistema financiero global descentralizado."
  },
  {
    question: "¿Por qué es seguro Bitcoin?",
    answer: "Bitcoin utiliza <strong>criptografía</strong> para proteger las transacciones. Cada usuario tiene una <strong>clave privada</strong> (como una contraseña) y una <strong>clave pública</strong> (como una dirección). Esto garantiza que solo el dueño de los Bitcoins pueda gastarlos. Además, la blockchain es inmutable, lo que significa que nadie puede alterar las transacciones ya registradas."
  },
  {
    question: "¿Qué es una billetera de Bitcoin?",
    answer: "Una <strong>billetera de Bitcoin</strong> es una herramienta que te permite almacenar, enviar y recibir Bitcoins. Hay dos tipos principales: <strong>Billeteras calientes (Hot Wallets)</strong>, conectadas a Internet, y <strong>Billeteras frías (Cold Wallets)</strong>, no conectadas a Internet y más seguras para almacenar grandes cantidades de Bitcoin."
  },
  {
    question: "¿Cuáles son los riesgos de Bitcoin?",
    answer: "Bitcoin tiene algunos riesgos que debes conocer: <strong>Volatilidad</strong> (el precio puede subir o bajar rápidamente), <strong>Seguridad</strong> (si pierdes tu clave privada, pierdes acceso a tus Bitcoins), y <strong>Regulación</strong> (los gobiernos pueden imponer restricciones al uso de Bitcoin)."
  },
  {
    question: "¿Cuál es el futuro de Bitcoin?",
    answer: "El futuro de Bitcoin es emocionante pero incierto. Algunas posibilidades incluyen: <strong>Adopción masiva</strong> (más personas y empresas usando Bitcoin como medio de pago), <strong>Reserva de valor</strong> (Bitcoin como 'oro digital'), y <strong>Innovación tecnológica</strong> (mejoras en la escalabilidad y usabilidad de Bitcoin)."
  },
  {
    question: "¿Qué es la minería de Bitcoin?",
    answer: "La <strong>minería de Bitcoin</strong> es el proceso mediante el cual los mineros utilizan hardware especializado para resolver problemas matemáticos complejos. Al resolver estos problemas, los mineros validan las transacciones y las agregan a la blockchain. Como recompensa, reciben nuevos Bitcoins y tarifas de transacción."
  },
  {
    question: "¿Qué es una dirección Bitcoin?",
    answer: "Una <strong>dirección Bitcoin</strong> es una cadena alfanumérica que se utiliza para recibir Bitcoins. Es similar a un número de cuenta bancaria, pero es única y se genera a partir de una clave pública. Las direcciones Bitcoin son públicas y se pueden compartir para recibir pagos."
  },
  {
    question: "¿Qué es una clave privada?",
    answer: "Una <strong>clave privada</strong> es un código secreto que permite acceder y gestionar los Bitcoins asociados a una dirección. Es esencial mantener la clave privada segura, ya que quien la posee tiene control total sobre los fondos asociados a esa dirección."
  },
  {
    question: "¿Qué es una transacción Bitcoin?",
    answer: "Una <strong>transacción Bitcoin</strong> es una transferencia de valor entre dos direcciones Bitcoin. Cada transacción se registra en la blockchain y es verificada por los nodos de la red. Las transacciones son irreversibles una vez confirmadas."
  },
  {
    question: "¿Qué es la escalabilidad en Bitcoin?",
    answer: "La <strong>escalabilidad</strong> se refiere a la capacidad de Bitcoin para manejar un mayor número de transacciones por segundo. Debido a las limitaciones del tamaño de bloque, Bitcoin ha enfrentado desafíos de escalabilidad. Soluciones como la <strong>Red Lightning</strong> han sido desarrolladas para mejorar la escalabilidad."
  },
  {
    question: "¿Qué es la Red Lightning?",
    answer: "La <strong>Red Lightning</strong> es una solución de segunda capa para Bitcoin que permite transacciones rápidas y de bajo costo fuera de la blockchain principal. Facilita micropagos y transacciones frecuentes sin sobrecargar la red principal de Bitcoin."
  },
  {
    question: "¿Qué es un nodo completo?",
    answer: "Un <strong>nodo completo</strong> es una computadora que descarga y valida toda la blockchain de Bitcoin. Los nodos completos son esenciales para la red, ya que ayudan a mantener la descentralización y la seguridad al verificar todas las transacciones y bloques."
  },
  {
    question: "¿Qué es un fork en Bitcoin?",
    answer: "Un <strong>fork</strong> es una división en la blockchain que puede ocurrir cuando hay un desacuerdo entre los participantes de la red. Los forks pueden ser <strong>soft forks</strong> (compatibles con versiones anteriores) o <strong>hard forks</strong> (no compatibles), como el caso de Bitcoin Cash."
  },
  {
    question: "¿Qué es Bitcoin Cash?",
    answer: "<strong>Bitcoin Cash</strong> es una criptomoneda que surgió de un hard fork de Bitcoin en 2017. Su objetivo principal era aumentar el tamaño de los bloques para permitir más transacciones por segundo y reducir las tarifas. Sin embargo, no es lo mismo que Bitcoin original."
  },
  {
    question: "¿Qué es la privacidad en Bitcoin?",
    answer: "Aunque Bitcoin es <strong>pseudoanónimo</strong> (las transacciones no están directamente vinculadas a identidades reales), no es completamente privado. Herramientas como <strong>CoinJoin</strong> y <strong>Taproot</strong> han sido desarrolladas para mejorar la privacidad en las transacciones."
  },
  {
    question: "¿Qué es Taproot?",
    answer: "<strong>Taproot</strong> es una actualización de Bitcoin implementada en 2021 que mejora la privacidad, la eficiencia y la flexibilidad de las transacciones. Permite que las transacciones complejas (como las multisignature) parezcan transacciones simples, mejorando la privacidad."
  },
  {
    question: "¿Qué es un contrato inteligente en Bitcoin?",
    answer: "Aunque Bitcoin no es tan flexible como Ethereum para los contratos inteligentes, soporta ciertos tipos de contratos inteligentes básicos, como los <strong>HTLCs</strong> (Hashed Timelock Contracts), que se utilizan en la Red Lightning y otros protocolos."
  },
  {
    question: "¿Qué es la prueba de trabajo (PoW)?",
    answer: "La <strong>prueba de trabajo (PoW)</strong> es el mecanismo de consenso utilizado por Bitcoin. Los mineros compiten para resolver problemas matemáticos complejos, y el primero en resolverlo agrega un nuevo bloque a la blockchain. Este proceso asegura la red y previene el doble gasto."
  },
  {
    question: "¿Qué es el doble gasto?",
    answer: "El <strong>doble gasto</strong> es un problema potencial en las monedas digitales donde un usuario intenta gastar la misma cantidad de criptomoneda dos veces. Bitcoin evita este problema mediante el uso de la blockchain y el consenso de la red."
  },
  {
    question: "¿Qué es la adopción institucional de Bitcoin?",
    answer: "La <strong>adopción institucional</strong> se refiere a la participación de grandes empresas, fondos de inversión y bancos en el mercado de Bitcoin. Esto incluye la compra de Bitcoin como reserva de valor, la creación de productos financieros basados en Bitcoin, y la integración de servicios relacionados con criptomonedas."
  },
  // ... más preguntas y respuestas
];

// Función para mostrar el modal con las preguntas y respuestas
function showBitcoinFAQModal() {
  const modal = document.getElementById('bitcoinFAQModal');
  const faqContainer = modal.querySelector('.faq-container');

  // Limpiar el contenido previo
  faqContainer.innerHTML = '';

  // Recorrer los datos y crear las secciones de preguntas y respuestas
  bitcoinFAQData.forEach((item, index) => {
    const faqSection = document.createElement('div');
    faqSection.classList.add('faq-section');

    const question = document.createElement('h3');
    question.textContent = item.question;

    const answer = document.createElement('p');
    answer.innerHTML = item.answer;

    faqSection.appendChild(question);
    faqSection.appendChild(answer);

    faqContainer.appendChild(faqSection);
  });

  // Mostrar el modal y el overlay
  modal.style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

// Asignar la función al botón que abre el modal
document.addEventListener('DOMContentLoaded', () => {
  const faqButton = document.getElementById('faqButton');
  if (faqButton) {
    faqButton.addEventListener('click', showBitcoinFAQModal);
  }
});