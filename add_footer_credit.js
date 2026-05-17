const fs = require('fs');
const path = require('path');

const dirPath = __dirname;

const targetStr = '<p>&copy; 2026 Aarohi Hotels. All rights reserved.</p>';
const replacementStr = '<p>&copy; 2026 Aarohi Hotels. All rights reserved. <span class="mx-2 hidden md:inline">|</span><br class="md:hidden"> Built by <a href="https://ujjwalrupakheti.com.np" target="_blank" rel="noopener noreferrer" class="font-medium hover:text-black transition-colors underline underline-offset-2">Ujjwal Rupakheti</a></p>';

fs.readdir(dirPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }
    
    files.forEach(file => {
        if (path.extname(file) === '.html') {
            const filePath = path.join(dirPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            if (content.includes(targetStr)) {
                content = content.replace(targetStr, replacementStr);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated footer in ${file}`);
            } else if (content.includes('Built by')) {
                console.log(`Footer already updated in ${file}`);
            } else {
                console.log(`Target string not found in ${file}`);
            }
        }
    });
});
