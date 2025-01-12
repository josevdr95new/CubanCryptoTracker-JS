const glossaryTerms = [
    // A
  {
    term: "Airdrop",
    definition: "Distribución gratuita de tokens o criptomonedas a los titulares de una billetera específica."
  },
  {
    term: "Altcoin",
    definition: "Cualquier criptomoneda que no sea Bitcoin. Ejemplos incluyen Ethereum, Litecoin y Ripple."
  },
  {
    term: "ASIC",
    definition: "Circuitos Integrados de Aplicación Específica (Application-Specific Integrated Circuit), hardware especializado para la minería de criptomonedas."
  },
  {
    term: "ATH",
    definition: "All-Time High (Máximo histórico), el precio más alto que ha alcanzado una criptomoneda."
  },
  {
    term: "Atomic Swap",
    definition: "Intercambio directo de criptomonedas entre dos partes sin necesidad de un intermediario."
  },

  // B
  {
    term: "Bear Market",
    definition: "Un mercado en declive, donde los precios de los activos caen durante un período prolongado."
  },
  {
    term: "Blockchain",
    definition: "Una cadena de bloques que registra transacciones de manera segura y transparente."
  },
  {
    term: "Bull Market",
    definition: "Un mercado en alza, donde los precios de los activos aumentan durante un período prolongado."
  },
  {
    term: "Byzantine Fault Tolerance",
    definition: "La capacidad de un sistema para alcanzar un consenso a pesar de que algunos nodos fallen o actúen de manera maliciosa."
  },
  {
    term: "Bitcoin",
    definition: "La primera criptomoneda descentralizada, creada por Satoshi Nakamoto en 2009."
  },

  // C
  {
    term: "Cold Wallet",
    definition: "Una billetera de criptomonedas que no está conectada a Internet, lo que la hace más segura contra hackeos."
  },
  {
    term: "Consenso",
    definition: "Un mecanismo utilizado en blockchain para lograr un acuerdo entre los nodos sobre el estado de la red."
  },
  {
    term: "Cryptography",
    definition: "La ciencia de proteger información mediante técnicas de cifrado, fundamental para la seguridad de las criptomonedas."
  },
  {
    term: "Custodial Wallet",
    definition: "Una billetera donde un tercero tiene el control de las claves privadas del usuario."
  },
  {
    term: "Circulating Supply",
    definition: "La cantidad de tokens o monedas que están actualmente en circulación en el mercado."
  },

  // D
  {
    term: "DAO",
    definition: "Organización Autónoma Descentralizada (Decentralized Autonomous Organization), una entidad gobernada por smart contracts."
  },
  {
    term: "DApp",
    definition: "Aplicación descentralizada (Decentralized Application), que funciona en una red blockchain."
  },
  {
    term: "DeFi",
    definition: "Finanzas descentralizadas, un ecosistema de aplicaciones financieras basadas en blockchain."
  },
  {
    term: "DEX",
    definition: "Intercambio descentralizado (Decentralized Exchange), una plataforma que permite el comercio de criptomonedas sin un intermediario central."
  },
  {
    term: "Double Spending",
    definition: "El riesgo de que una criptomoneda se gaste dos veces, resuelto por el mecanismo de consenso de blockchain."
  },

  // E
  {
    term: "Ethereum",
    definition: "Una plataforma blockchain que permite la creación de contratos inteligentes y aplicaciones descentralizadas."
  },
  {
    term: "ERC-20",
    definition: "Un estándar técnico utilizado para emitir tokens en la red Ethereum."
  },
  {
    term: "Exchange",
    definition: "Una plataforma donde los usuarios pueden comprar, vender o intercambiar criptomonedas."
  },
  {
    term: "Escrow",
    definition: "Un servicio de custodia temporal de fondos durante una transacción, para garantizar la seguridad de ambas partes."
  },
  {
    term: "EIP",
    definition: "Propuesta de Mejora de Ethereum (Ethereum Improvement Proposal), sugerencias para mejorar la red Ethereum."
  },

  // F
  {
    term: "Fiat",
    definition: "Moneda emitida por un gobierno, como el dólar estadounidense o el euro."
  },
  {
    term: "FOMO",
    definition: "Miedo a perderse algo (Fear Of Missing Out), un sentimiento que lleva a los inversores a comprar activos rápidamente."
  },
  {
    term: "Fork",
    definition: "Una bifurcación en la blockchain que resulta en dos versiones diferentes de la cadena."
  },
  {
    term: "FUD",
    definition: "Miedo, Incertidumbre y Duda (Fear, Uncertainty, and Doubt), un sentimiento negativo que puede afectar el mercado."
  },
  {
    term: "Faucet",
    definition: "Un sitio web o aplicación que distribuye pequeñas cantidades de criptomonedas de forma gratuita."
  },

  // G
  {
    term: "Gas",
    definition: "La tarifa requerida para realizar transacciones o ejecutar contratos inteligentes en la red Ethereum."
  },
  {
    term: "Genesis Block",
    definition: "El primer bloque de una blockchain, que marca el inicio de la cadena."
  },
  {
    term: "Governance",
    definition: "El proceso de toma de decisiones en una red blockchain, a menudo gestionado por los poseedores de tokens."
  },
  {
    term: "GPU Mining",
    definition: "Minería de criptomonedas utilizando unidades de procesamiento gráfico (GPU)."
  },
  {
    term: "Gwei",
    definition: "Una unidad de medida para el gas en la red Ethereum, equivalente a 0.000000001 ETH."
  },

  // H
  {
    term: "Halving",
    definition: "Un evento en el que la recompensa por minar bloques de Bitcoin se reduce a la mitad, ocurre aproximadamente cada 4 años."
  },
  {
    term: "Hard Fork",
    definition: "Una bifurcación en la blockchain que no es compatible con versiones anteriores, resultando en una nueva cadena."
  },
  {
    term: "Hash Rate",
    definition: "La velocidad a la que un minero puede resolver problemas criptográficos, medida en hashes por segundo."
  },
  {
    term: "HODL",
    definition: "Término derivado de un error tipográfico que significa mantener criptomonedas a largo plazo."
  },
  {
    term: "Hot Wallet",
    definition: "Una billetera de criptomonedas conectada a Internet, más vulnerable a hackeos pero más conveniente para transacciones frecuentes."
  },

  // I
  {
    term: "ICO",
    definition: "Oferta Inicial de Monedas (Initial Coin Offering), una forma de recaudar fondos para nuevos proyectos de criptomonedas."
  },
  {
    term: "Immutable",
    definition: "La característica de una blockchain que hace que los datos una vez escritos no puedan ser alterados."
  },
  {
    term: "Interoperability",
    definition: "La capacidad de diferentes blockchains para interactuar y compartir información entre sí."
  },
  {
    term: "IPFS",
    definition: "Sistema de Archivos Interplanetario (InterPlanetary File System), un protocolo descentralizado para almacenar y compartir archivos."
  },
  {
    term: "Inflation",
    definition: "El aumento en la oferta de una criptomoneda, que puede reducir su valor con el tiempo."
  },

  // J
  {
    term: "JSON-RPC",
    definition: "Un protocolo ligero de comunicación utilizado para interactuar con nodos de blockchain."
  },
  {
    term: "JOMO",
    definition: "Alegría de perderse algo (Joy Of Missing Out), lo opuesto a FOMO, donde los inversores evitan tomar decisiones impulsivas."
  },
  {
    term: "Junk Coins",
    definition: "Término despectivo para referirse a criptomonedas de baja calidad o sin valor real."
  },

  // K
  {
    term: "KYC",
    definition: "Conozca a su Cliente (Know Your Customer), un proceso de verificación de identidad utilizado por las plataformas de criptomonedas."
  },
  {
    term: "Keccak",
    definition: "Una función hash utilizada en la red Ethereum."
  },
  {
    term: "Key Pair",
    definition: "Un par de claves criptográficas, una pública y una privada, utilizadas para realizar transacciones en blockchain."
  },

  // L
  {
    term: "Layer 2",
    definition: "Soluciones de escalabilidad construidas sobre una blockchain principal para mejorar su rendimiento."
  },
  {
    term: "Ledger",
    definition: "Un registro de todas las transacciones en una blockchain."
  },
  {
    term: "Liquidity",
    definition: "La facilidad con la que un activo puede ser comprado o vendido sin afectar su precio."
  },
  {
    term: "Lightning Network",
    definition: "Una solución de segunda capa para Bitcoin que permite transacciones rápidas y de bajo costo."
  },
  {
    term: "Litecoin",
    definition: "Una criptomoneda creada como una alternativa más ligera y rápida que Bitcoin."
  },

  // M
  {
    term: "Mainnet",
    definition: "La red principal de una blockchain, donde las transacciones reales tienen lugar."
  },
  {
    term: "Mempool",
    definition: "Un área de espera donde las transacciones no confirmadas se almacenan antes de ser incluidas en un bloque."
  },
  {
    term: "Minería",
    definition: "El proceso de validar transacciones y agregarlas a la blockchain, recompensado con criptomonedas."
  },
  {
    term: "Mining Pool",
    definition: "Un grupo de mineros que combinan su poder de cómputo para aumentar las posibilidades de minar bloques."
  },
  {
    term: "Mnemonic Phrase",
    definition: "Una serie de palabras que se utilizan para recuperar una billetera de criptomonedas."
  },

  // N
  {
    term: "Node",
    definition: "Un dispositivo que participa en la red blockchain, validando y transmitiendo transacciones."
  },
  {
    term: "NFT",
    definition: "Token no fungible, un activo digital único que representa propiedad de un objeto digital o físico."
  },
  {
    term: "Nonce",
    definition: "Un número utilizado una sola vez en criptografía, importante en la minería de bloques."
  },
  {
    term: "Network Fee",
    definition: "La tarifa pagada por los usuarios para realizar transacciones en una red blockchain."
  },
  {
    term: "Nakamoto Consensus",
    definition: "El mecanismo de consenso utilizado en Bitcoin, basado en Proof of Work."
  },

  // O
  {
    term: "Oracle",
    definition: "Un servicio que proporciona datos externos a los contratos inteligentes en una blockchain."
  },
  {
    term: "Off-Chain",
    definition: "Transacciones o procesos que ocurren fuera de la blockchain principal."
  },
  {
    term: "On-Chain",
    definition: "Transacciones o procesos que ocurren directamente en la blockchain."
  },
  {
    term: "Open Source",
    definition: "Software cuyo código fuente está disponible para que cualquiera lo revise, modifique o distribuya."
  },
  {
    term: "OTC",
    definition: "Mercado extrabursátil (Over-The-Counter), donde las transacciones se realizan directamente entre dos partes sin un intercambio centralizado."
  },

  // P
  {
    term: "Peer-to-Peer",
    definition: "Una red donde los participantes interactúan directamente sin un intermediario central."
  },
  {
    term: "Private Key",
    definition: "Una clave criptográfica que permite el acceso a una billetera de criptomonedas."
  },
  {
    term: "Public Key",
    definition: "Una clave criptográfica que se comparte públicamente y se utiliza para recibir fondos."
  },
  {
    term: "Proof of Stake",
    definition: "Un mecanismo de consenso que valida transacciones basado en la cantidad de tokens que posee un usuario."
  },
  {
    term: "Proof of Work",
    definition: "Un mecanismo de consenso que requiere esfuerzo computacional para validar transacciones."
  },

  // Q
  {
    term: "QR Code",
    definition: "Un código de barras bidimensional que se utiliza para compartir direcciones de billetera de criptomonedas."
  },
  {
    term: "Quantum Resistance",
    definition: "La capacidad de una blockchain para resistir ataques de computación cuántica."
  },
  {
    term: "Quorum",
    definition: "El número mínimo de participantes necesarios para validar una transacción en una red blockchain."
  },

  // R
  {
    term: "Rug Pull",
    definition: "Un tipo de estafa en DeFi donde los desarrolladores abandonan un proyecto y se llevan los fondos de los inversores."
  },
  {
    term: "Ripple",
    definition: "Una criptomoneda y protocolo de pago diseñado para transacciones rápidas y de bajo costo."
  },
  {
    term: "Reorg",
    definition: "Reorganización de la blockchain, donde se descartan bloques previamente confirmados."
  },
  {
    term: "Rollup",
    definition: "Una solución de escalabilidad que agrupa múltiples transacciones en una sola para reducir costos."
  },
  {
    term: "RPC",
    definition: "Llamada a Procedimiento Remoto (Remote Procedure Call), un protocolo utilizado para interactuar con nodos de blockchain."
  },

  // S
  {
    term: "Satoshi",
    definition: "La unidad más pequeña de Bitcoin, equivalente a 0.00000001 BTC."
  },
  {
    term: "Smart Contract",
    definition: "Un contrato autoejecutable con términos del acuerdo escritos directamente en código."
  },
  {
    term: "Stablecoin",
    definition: "Una criptomoneda diseñada para mantener un valor estable, a menudo vinculada a una moneda fiduciaria como el dólar estadounidense."
  },
  {
    term: "Staking",
    definition: "El proceso de bloquear criptomonedas para apoyar la red y recibir recompensas."
  },
  {
    term: "SegWit",
    definition: "Segregated Witness, una actualización de Bitcoin que aumenta la capacidad de la red y reduce las tarifas."
  },

  // T
  {
    term: "Token",
    definition: "Un activo digital emitido sobre una blockchain existente, que puede representar un activo o utilidad."
  },
  {
    term: "Transaction Fee",
    definition: "La tarifa pagada por los usuarios para realizar transacciones en una red blockchain."
  },
  {
    term: "Turing Complete",
    definition: "La capacidad de una blockchain para ejecutar cualquier cálculo, como en el caso de Ethereum."
  },
  {
    term: "Testnet",
    definition: "Una red de prueba utilizada por los desarrolladores para probar aplicaciones sin usar criptomonedas reales."
  },
  {
    term: "Tokenomics",
    definition: "El estudio de la economía de un token, incluyendo su oferta, distribución y uso."
  },

  // U
  {
    term: "Uniswap",
    definition: "Un intercambio descentralizado (DEX) basado en Ethereum que permite el comercio de tokens ERC-20."
  },
  {
    term: "UTXO",
    definition: "Salida de Transacción no Gastada (Unspent Transaction Output), un modelo utilizado en Bitcoin para rastrear fondos."
  },
  {
    term: "Utility Token",
    definition: "Un token que proporciona acceso a un servicio o producto dentro de una plataforma."
  },
  {
    term: "Uphold",
    definition: "Una plataforma de intercambio de criptomonedas y activos digitales."
  },

  // V
  {
    term: "Validator",
    definition: "Un nodo en una red blockchain que valida transacciones y participa en el consenso."
  },
  {
    term: "Volatility",
    definition: "La fluctuación en el precio de un activo, común en las criptomonedas."
  },
  {
    term: "Vesting",
    definition: "El proceso de liberar gradualmente tokens o acciones a los inversores o empleados."
  },
  {
    term: "Vitalik Buterin",
    definition: "El cofundador de Ethereum, una de las figuras más influyentes en el espacio de las criptomonedas."
  },

  // W
  {
    term: "Wallet",
    definition: "Una billetera digital que permite almacenar, enviar y recibir criptomonedas."
  },
  {
    term: "Whale",
    definition: "Un individuo o entidad que posee una gran cantidad de criptomonedas, capaz de influir en el mercado."
  },
  {
    term: "Web3",
    definition: "La próxima generación de Internet, basada en tecnologías descentralizadas como blockchain."
  },
  {
    term: "Whitepaper",
    definition: "Un documento técnico que describe los detalles de un proyecto de criptomonedas o blockchain."
  },

  // X
  {
    term: "XRP",
    definition: "La criptomoneda nativa de la red Ripple, diseñada para pagos transfronterizos rápidos."
  },
  {
    term: "XMR",
    definition: "El símbolo de Monero, una criptomoneda centrada en la privacidad."
  },

  // Y
  {
    term: "Yield Farming",
    definition: "El proceso de obtener recompensas por proporcionar liquidez a un protocolo DeFi."
  },
  {
    term: "YFI",
    definition: "El token de gobernanza de Yearn.finance, un protocolo DeFi que optimiza el rendimiento de los fondos."
  },

  // Z
  {
    term: "Zero-Knowledge Proof",
    definition: "Un método criptográfico que permite a una parte probar que conoce un valor sin revelar el valor en sí."
  },
  {
    term: "Zcash",
    definition: "Una criptomoneda centrada en la privacidad que utiliza pruebas de conocimiento cero."
  },
  {
    term: "ZK-Rollup",
    definition: "Una solución de escalabilidad que utiliza pruebas de conocimiento cero para agrupar transacciones."
  }
];

function loadGlossary() {
  const glossaryContainer = document.getElementById('glossaryContainer');
  glossaryContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar los términos

  glossaryTerms.sort((a, b) => a.term.localeCompare(b.term)).forEach(term => {
    const termElement = document.createElement('div');
    termElement.className = 'glossary-term';
    termElement.innerHTML = `
      <h3>${term.term}</h3>
      <p>${term.definition}</p>
    `;
    glossaryContainer.appendChild(termElement);
  });
}

function filterGlossary() {
  const searchTerm = document.getElementById('glossarySearch').value.toLowerCase();
  const glossaryTerms = document.querySelectorAll('.glossary-term');

  glossaryTerms.forEach(term => {
    const termText = term.querySelector('h3').textContent.toLowerCase();
    if (termText.includes(searchTerm)) {
      term.style.display = 'block';
    } else {
      term.style.display = 'none';
    }
  });
}

function showGlossaryModal() {
  const modal = document.getElementById('glossaryModal');
  const overlay = document.getElementById('overlay');
  modal.style.display = 'block';
  overlay.style.display = 'block';

  // Cargar los términos del glosario al abrir el modal
  loadGlossary();
}

// Cargar el glosario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Si deseas cargar el glosario automáticamente al cargar la página, descomenta la siguiente línea:
  // loadGlossary();
});