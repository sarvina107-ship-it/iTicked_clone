const QRCode = require('qrcode');

/**
 * Generate a QR code buffer from ticket data
 * @param {string} text - Payload to encode in QR
 * @returns {Promise<Buffer>} PNG image buffer
 */
async function generateQRCodeBuffer(text) {
  try {
    return await QRCode.toBuffer(text, {
      errorCorrectionLevel: 'H',
      type: 'png',
      margin: 2,
      width: 400,
      color: {
        dark: '#1e293b',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
}

module.exports = { generateQRCodeBuffer };
