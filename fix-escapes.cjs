const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Amit\\.gemini\\antigravity-ide\\scratch\\DigitalDukaan\\Frontend\\src';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  // Replace \` with ` and \$ with $
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed:', filePath);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      fixFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Done!');
