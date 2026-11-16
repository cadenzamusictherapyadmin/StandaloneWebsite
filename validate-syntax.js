#!/usr/bin/env node

/**
 * Validate CSS syntax - checks for balanced braces
 * This catches the type of errors we've been making
 */

const fs = require('fs');
const path = require('path');

function validateCSS(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let braceCount = 0;
    let lineNum = 1;
    let errors = [];
    
    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        
        if (char === '\n') {
            lineNum++;
        } else if (char === '{') {
            braceCount++;
        } else if (char === '}') {
            braceCount--;
            if (braceCount < 0) {
                errors.push(`Line ${lineNum}: Unexpected closing brace - more closing braces than opening braces`);
                braceCount = 0;
            }
        }
    }
    
    if (braceCount > 0) {
        errors.push(`End of file: ${braceCount} unclosed brace(s) - more opening braces than closing braces`);
    } else if (braceCount < 0) {
        errors.push(`End of file: ${Math.abs(braceCount)} unmatched closing brace(s)`);
    }
    
    return errors;
}

function validateHTML(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let errors = [];
    
    // Check for script tags without closing tags
    const scriptRegex = /<script[^>]*>/g;
    const closeScriptRegex = /<\/script>/g;
    const scriptMatches = content.match(scriptRegex) || [];
    const closeScriptMatches = content.match(closeScriptRegex) || [];
    
    if (scriptMatches.length !== closeScriptMatches.length) {
        errors.push(`Mismatched script tags: ${scriptMatches.length} opening, ${closeScriptMatches.length} closing`);
    }
    
    return errors;
}

// Main
const cssFiles = ['style.css', 'demo.css', 'piano.css'].filter(f => fs.existsSync(f));
const htmlFiles = ['index.html', 'demo.html', 'piano.html'].filter(f => fs.existsSync(f));

let hasErrors = false;

cssFiles.forEach(file => {
    const errors = validateCSS(file);
    if (errors.length > 0) {
        console.error(`\n❌ ${file}:`);
        errors.forEach(err => console.error(`   ${err}`));
        hasErrors = true;
    } else {
        console.log(`✅ ${file}: CSS syntax valid`);
    }
});

htmlFiles.forEach(file => {
    const errors = validateHTML(file);
    if (errors.length > 0) {
        console.error(`\n❌ ${file}:`);
        errors.forEach(err => console.error(`   ${err}`));
        hasErrors = true;
    } else {
        console.log(`✅ ${file}: HTML syntax valid`);
    }
});

if (hasErrors) {
    process.exit(1);
}
