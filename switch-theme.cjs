const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Amit\\.gemini\\antigravity-ide\\scratch\\DigitalDukaan\\Frontend\\src';

function switchTheme(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  
  // Replace both blue- and indigo- with amber- to be safe
  content = content.replace(/(blue|indigo)-([0-9]+)/g, 'amber-$2');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated theme in:', filePath);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.css')) {
      switchTheme(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Theme switch to Amber complete!');
