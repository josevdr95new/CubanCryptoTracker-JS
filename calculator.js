// Formatting functions
const formatPriceWith8Decimals = (price) => {
  return parseFloat(price).toFixed(8);
};

const formatPriceDefault = (price) => {
  return parseFloat(price).toFixed(2);
};

// Conversion logic map
const conversionLogic = {
  'cryptoToCurrency': (cryptoSelect, amount, currencySelect) => {
    const cryptoPrice = prices[cryptoSelect];
    const usdtToCup = prices.usdt;
    if (currencySelect === 'cup') {
      return cryptoSelect === 'usdt' ? amount * usdtToCup : amount * cryptoPrice * usdtToCup;
    } else if (currencySelect === 'usdt') {
      return cryptoSelect === 'usdt' ? amount : amount * cryptoPrice;
    }
  },
  'currencyToCrypto': (amount, currencySelect, cryptoSelect) => {
    const cryptoPrice = prices[cryptoSelect];
    const usdtToCup = prices.usdt;
    if (currencySelect === 'cup') {
      return cryptoSelect === 'usdt' ? amount / usdtToCup : amount / (usdtToCup * cryptoPrice);
    } else if (currencySelect === 'usdt') {
      return cryptoSelect === 'usdt' ? amount : amount / cryptoPrice;
    }
  }
};

// Main function
const calculateConversion = () => {
  const cryptoSelect = document.getElementById('cryptoSelect').value;
  const amountInput = parseFloat(document.getElementById('amountInput').value);
  const currencySelect = document.getElementById('currencySelect').value;
  const conversionType = document.getElementById('conversionType').value;

  if (isNaN(amountInput) || amountInput <= 0) {
    document.getElementById('resultText').textContent = 'Ingresa una cantidad válida.';
    return;
  }

  if (!prices[cryptoSelect] || !prices.usdt) {
    document.getElementById('resultText').textContent = 'Los precios no están disponibles. Intenta de nuevo más tarde.';
    return;
  }

  try {
    const calculationFunction = conversionLogic[conversionType];
    if (!calculationFunction) {
      throw new Error('Tipo de conversión no válido.');
    }

    let result;
    if (conversionType === 'cryptoToCurrency') {
      result = calculationFunction(cryptoSelect, amountInput, currencySelect);
      result = formatPriceDefault(result);
    } else if (conversionType === 'currencyToCrypto') {
      result = calculationFunction(amountInput, currencySelect, cryptoSelect);
      result = formatPriceWith8Decimals(result);
    }

    const resultText = `${amountInput} ${cryptoSelect.toUpperCase()} = ${result} ${currencySelect.toUpperCase()}`;
    document.getElementById('resultText').textContent = resultText;
  } catch (error) {
    console.error('Error en la conversión:', error);
    document.getElementById('resultText').textContent = error.message || 'Operación no válida.';
  }
};

// Ensure the function is globally accessible if needed
window.calculateConversion = calculateConversion;