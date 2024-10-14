const fs = require('fs');

// Fungsi rekursif untuk membalikkan key dan value
function reverseObject(obj) {
  const reversed = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      // Jika value adalah objek, proses objek tersebut secara rekursif
      Object.assign(reversed, reverseObject(value));
    } else {
      reversed[value] = key;
    }
  }

  return reversed;
}

// Membaca data dari file JSON
fs.readFile('kodeWilayah.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parsing data JSON
  const originalData = JSON.parse(data);

  // Membalikkan key dan value
  const reversedData = reverseObject(originalData);

  // Mengubah hasil ke format JSON dan menyimpannya
  const reversedJson = JSON.stringify(reversedData, null, 2);
  fs.writeFile('reversed_data.json', reversedJson, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Data successfully reversed and saved to reversed_data.json');
  });
});
