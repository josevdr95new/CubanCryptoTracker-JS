const formatPrice = (number) => {
    // Formatea el número con 2 decimales, puntos para miles y comas para decimales
    return number.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

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

  const cryptoPrice = prices[cryptoSelect];
  const usdtToCup = prices.usdt;
  let result;
  let resultText = '';

  try {
    if (conversionType === 'cryptoToCurrency') {
      if (currencySelect === 'cup') {
        if (cryptoSelect === 'usdt') {
          result = amountInput * usdtToCup;
          resultText = `${amountInput} USDT = ${formatPrice(result)} CUP`;
        } else {
          result = amountInput * cryptoPrice * usdtToCup;
          resultText = `${amountInput} ${cryptoSelect.toUpperCase()} = ${formatPrice(result)} CUP`;
        }
      } else if (currencySelect === 'usdt') {
        if (cryptoSelect === 'usdt') {
          result = amountInput;
          resultText = `${amountInput} USDT = ${formatPrice(result)} USDT`;
        } else {
          result = amountInput * cryptoPrice;
          resultText = `${amountInput} ${cryptoSelect.toUpperCase()} = ${formatPrice(result)} USDT`;
        }
      } else {
        throw new Error('Moneda no válida seleccionada.');
      }
    } else if (conversionType === 'currencyToCrypto') {
      if (currencySelect === 'cup') {
        if (cryptoSelect === 'usdt') {
          result = amountInput / usdtToCup;
          resultText = `${amountInput} CUP = ${formatPrice(result)} USDT`;
        } else {
          result = amountInput / usdtToCup / cryptoPrice;
          resultText = `${amountInput} CUP = ${formatPrice(result)} ${cryptoSelect.toUpperCase()}`;
        }
      } else if (currencySelect === 'usdt') {
        if (cryptoSelect === 'usdt') {
          result = amountInput;
          resultText = `${amountInput} USDT = ${formatPrice(result)} USDT`;
        } else {
          result = amountInput / cryptoPrice;
          resultText = `${amountInput} USDT = ${formatPrice(result)} ${cryptoSelect.toUpperCase()}`;
        }
      } else {
        throw new Error('Moneda no válida seleccionada.');
      }
    } else {
      throw new Error('Tipo de conversión no válido.');
    }
    document.getElementById('resultText').textContent = resultText;
  } catch (error) {
    console.error('Error en la conversión:', error);
    document.getElementById('resultText').textContent = error.message || 'Operación no válida.';
  }
};

// Asegúrate de que la función esté disponible globalmente si es necesario
window.calculateConversion = calculateConversion;