// calculator.js - Versión corregida

// Verificar si formatPrice ya existe para evitar redeclaración
if (typeof window.formatPrice === 'undefined') {
  window.formatPrice = function(number) {
    return number.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
}

// Función principal de conversión
window.calculateConversion = function() {
  const cryptoSelect = document.getElementById('cryptoSelect').value;
  const amountInput = parseFloat(document.getElementById('amountInput').value);
  const currencySelect = document.getElementById('currencySelect').value;
  const conversionType = document.getElementById('conversionType').value;

  if (isNaN(amountInput) {
    document.getElementById('resultText').textContent = 'Ingresa una cantidad válida.';
    return;
  }

  if (!window.prices || !window.prices[cryptoSelect]) {
    document.getElementById('resultText').textContent = 'Los precios no están disponibles.';
    return;
  }

  const cryptoPrice = window.prices[cryptoSelect];
  const usdtToCup = window.prices.usdt;
  let result, resultText;

  try {
    if (conversionType === 'cryptoToCurrency') {
      if (currencySelect === 'cup') {
        result = cryptoSelect === 'usdt' 
          ? amountInput * usdtToCup 
          : amountInput * cryptoPrice * usdtToCup;
        resultText = `${amountInput} ${cryptoSelect.toUpperCase()} = ${window.formatPrice(result)} CUP`;
      } 
      else if (currencySelect === 'usdt') {
        result = cryptoSelect === 'usdt' 
          ? amountInput 
          : amountInput * cryptoPrice;
        resultText = `${amountInput} ${cryptoSelect.toUpperCase()} = ${window.formatPrice(result)} USDT`;
      }
    } 
    else if (conversionType === 'currencyToCrypto') {
      if (currencySelect === 'cup') {
        result = cryptoSelect === 'usdt' 
          ? amountInput / usdtToCup 
          : amountInput / (usdtToCup * cryptoPrice);
        resultText = `${amountInput} CUP = ${window.formatPrice(result)} ${cryptoSelect.toUpperCase()}`;
      } 
      else if (currencySelect === 'usdt') {
        result = cryptoSelect === 'usdt' 
          ? amountInput 
          : amountInput / cryptoPrice;
        resultText = `${amountInput} USDT = ${window.formatPrice(result)} ${cryptoSelect.toUpperCase()}`;
      }
    }

    document.getElementById('resultText').textContent = resultText;
  } catch (error) {
    console.error("Error en calculateConversion:", error);
    document.getElementById('resultText').textContent = '❌ Error en la conversión';
  }
};