const fs = require('fs');
const path = require('path');

const directory = 'src';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(directory, function(filePath) {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Fix remaining borders and colors
        content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'rgba(0,0,0,0.05)');
        content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'rgba(0,0,0,0.05)');
        content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'rgba(0,0,0,0.1)');
        content = content.replace(/rgba\(255, 255, 255, 0\.02\)/g, 'rgba(0, 0, 0, 0.02)');
        content = content.replace(/#0a0a0a/g, 'var(--color-surface)');
        content = content.replace(/#050505/g, 'var(--color-bg)');
        content = content.replace(/#030404/g, 'var(--color-bg-2)');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
