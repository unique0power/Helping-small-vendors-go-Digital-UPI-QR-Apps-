const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Amit\\.gemini\\antigravity-ide\\scratch\\DigitalDukaan\\Frontend\\src';

const replacements = {
  'bg-white': 'bg-white dark:bg-slate-900',
  'bg-slate-50': 'bg-slate-50 dark:bg-slate-800',
  'text-slate-900': 'text-slate-900 dark:text-slate-100',
  'text-slate-800': 'text-slate-800 dark:text-slate-200',
  'text-slate-700': 'text-slate-700 dark:text-slate-300',
  'text-slate-600': 'text-slate-600 dark:text-slate-400',
  'border-slate-200': 'border-slate-200 dark:border-slate-700',
  'border-slate-100': 'border-slate-100 dark:border-slate-800'
};

function injectDarkMode(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  
  for (const [light, darkPair] of Object.entries(replacements)) {
    // Only replace if it doesn't already have the dark pair
    const regex = new RegExp(`(?<!dark:)${light}(?! dark:)`, 'g');
    content = content.replace(regex, darkPair);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Injected dark mode in:', filePath);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.tsx')) {
      injectDarkMode(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Dark mode injection complete!');
