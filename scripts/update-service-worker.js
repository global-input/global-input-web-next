const fs = require('fs');
const path = require('path');

function generateBuildId () {
    return `build-${Date.now()}`;
}
const buildId= generateBuildId();

const sourcePath = path.join(__dirname, '../public/service-worker.js');
const destPath = path.join(__dirname, '../out/service-worker.js');

let content = fs.readFileSync(sourcePath, 'utf8');
content = content.replace('{{BUILD_ID}}', buildId);

fs.writeFileSync(destPath, content);
console.log(`Service Worker updated with build ID: ${buildId} in out folder`);