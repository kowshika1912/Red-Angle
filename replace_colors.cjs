const fs = require('fs');
const path = require('path');

const directory = 'src';
const replacements = {
    // Backgrounds
    "'#050505'": "'var(--color-bg)'",
    "'#0a0805'": "'var(--color-bg)'",
    "'#0a0a0a'": "'var(--color-surface)'",
    "'#030404'": "'var(--color-bg-2)'",
    "'#111'": "'var(--color-surface-2)'",
    "'#111111'": "'var(--color-surface-2)'",
    "'#141209'": "'var(--color-surface)'",
    "'#1c1810'": "'var(--color-surface-2)'",
    "'rgba(0, 0, 0, 0.9)'": "'rgba(255, 255, 255, 0.9)'",
    "'rgba(0, 0, 0, 0.8)'": "'rgba(255, 255, 255, 0.8)'",
    "'rgba(0, 0, 0, 0.5)'": "'rgba(255, 255, 255, 0.5)'",
    "'rgba(0,0,0,0.9)'": "'rgba(255, 255, 255, 0.9)'",
    "'rgba(0,0,0,0.8)'": "'rgba(255, 255, 255, 0.8)'",
    "'rgba(0,0,0,0.5)'": "'rgba(255, 255, 255, 0.5)'",
    
    // Text colors
    "'#fff'": "'var(--text-primary)'",
    "'#ffffff'": "'var(--text-primary)'",
    "'#a0a0a0'": "'var(--text-secondary)'",
    "'#999'": "'var(--text-muted)'",
    "'#888'": "'var(--text-muted)'",
    "'#666'": "'var(--text-muted)'",
    "'#000'": "'var(--color-bg)'",
};

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
        for (const [oldVal, newVal] of Object.entries(replacements)) {
            const regex = new RegExp(oldVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            content = content.replace(regex, newVal);
        }
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
