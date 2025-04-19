// sharing-scripts.js
document.getElementById('share-button').addEventListener('click', () => {
    const text = encodeURIComponent('Visita CubanCrypto-Tracker en https://www.apklis.cu/application/appinventor.ai_josevdr95.CubanCrypto_Tracker');
    const fallbackUrl = `https://api.whatsapp.com/send?text=${text}`;
    // Intent mejorado para WhatsApp
    window.location.href = `intent://send?text=${text}#Intent;action=android.intent.action.SEND;type=text/plain;scheme=https;package=com.whatsapp;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
});

document.getElementById('send-email-button').addEventListener('click', () => {
    // Esquema universal mailto (sin paquete específico)
    window.location.href = "mailto:CubanCrypto-Tracker@proton.me?subject=Contacto";
});

document.getElementById('visit-website-button').addEventListener('click', () => {
    const url = "https://cubancrypto-tracker.pages.dev/";
    // Intent con fallback al navegador predeterminado
    window.location.href = `intent://${url.replace('https://', '')}#Intent;scheme=https;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(url)};end`;
});