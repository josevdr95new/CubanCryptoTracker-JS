// calculator.js

// ========== FUNCIÓN PARA FORMATEAR PRECIOS ========== //
function formatPrice(number) {
    if (isNaN(number)) return "0,00"; // Manejo de errores
    
    return number.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ========== FUNCIÓN PRINCIPAL DE CONVERSIÓN ========== //
function calculateConversion() {
    // Obtener valores de los inputs
    const cryptoSelect = document.getElementById('cryptoSelect').value;
    const amountInput = parseFloat(document.getElementById('amountInput').value);
    const currencySelect = document.getElementById('currencySelect').value;
    const conversionType = document.getElementById('conversionType').value;

    // Validar entrada
    if (isNaN(amountInput) || amountInput <= 0) {
        document.getElementById('resultText').textContent = '❌ Ingresa una cantidad válida.';
        return;
    }

    // Validar precios
    if (!window.prices || !window.prices[cryptoSelect] || !window.prices.usdt) {
        document.getElementById('resultText').textContent = '❌ Los precios no están disponibles.';
        return;
    }

    // Variables para cálculo
    const cryptoPrice = window.prices[cryptoSelect];
    const usdtToCup = window.prices.usdt;
    let result, resultText;

    try {
        // Lógica de conversión
        if (conversionType === 'cryptoToCurrency') {
            if (currencySelect === 'cup') {
                result = (cryptoSelect === 'usdt') 
                    ? amountInput * usdtToCup 
                    : amountInput * cryptoPrice * usdtToCup;
                resultText = `${amountInput} ${cryptoSelect.toUpperCase()} = ${formatPrice(result)} CUP`;
            } 
            else if (currencySelect === 'usdt') {
                result = (cryptoSelect === 'usdt') 
                    ? amountInput 
                    : amountInput * cryptoPrice;
                resultText = `${amountInput} ${cryptoSelect.toUpperCase()} = ${formatPrice(result)} USDT`;
            }
        } 
        else if (conversionType === 'currencyToCrypto') {
            if (currencySelect === 'cup') {
                result = (cryptoSelect === 'usdt') 
                    ? amountInput / usdtToCup 
                    : amountInput / (usdtToCup * cryptoPrice);
                resultText = `${amountInput} CUP = ${formatPrice(result)} ${cryptoSelect.toUpperCase()}`;
            } 
            else if (currencySelect === 'usdt') {
                result = (cryptoSelect === 'usdt') 
                    ? amountInput 
                    : amountInput / cryptoPrice;
                resultText = `${amountInput} USDT = ${formatPrice(result)} ${cryptoSelect.toUpperCase()}`;
            }
        }

        // Mostrar resultado
        document.getElementById('resultText').textContent = resultText;

    } catch (error) {
        console.error("Error en calculateConversion:", error);
        document.getElementById('resultText').textContent = '❌ Error en la conversión.';
    }
}

// ========== EXPORTAR FUNCIONES AL ÁMBITO GLOBAL ========== //
if (typeof window !== 'undefined') {
    window.formatPrice = formatPrice;
    window.calculateConversion = calculateConversion;
}