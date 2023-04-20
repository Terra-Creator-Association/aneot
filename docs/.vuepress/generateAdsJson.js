const fs = require('fs');
const path = require('path');

const adsDir = path.join(__dirname, 'public', 'fake-ads');
const adsJsonFile = path.join(adsDir, 'ads.json');

function generateAdsJson() {
  const webpFiles = [];
  const txtFiles = [];

  fs.readdirSync(adsDir).forEach((file) => {
    const ext = path.extname(file);
    const filename = path.basename(file, ext);

    if (ext === '.webp') {
      webpFiles.push(filename);
    } else if (ext === '.txt') {
      txtFiles.push(filename);
    }
  });

  const commonFiles = webpFiles.filter((file) => txtFiles.includes(file));

  const adsJson = {
    files: commonFiles,
  };

  fs.writeFileSync(adsJsonFile, JSON.stringify(adsJson, null, 2));
}

generateAdsJson();
