const codeInput = document.getElementById('code-input');
const beautifiedCode = document.getElementById('beautified-code');

codeInput.addEventListener('input', () => {
  const code = codeInput.value;
  beautifiedCode.textContent = beautify(code);
});

function beautify(code) {
  const indent = '  ';
  let currentIndent = '';
  let beautifiedCode = '';
  let insideString = false;
  let insideComment = false;
  
  for (let i = 0; i < code.length; i++) {
    const char = code.charAt(i);
    const nextChar = code.charAt(i + 1);
    
    if (insideComment) {
      if (char === '*' && nextChar === '/') {
        insideComment = false;
        beautifiedCode += '*/';
        i++;
        continue;
      }
      beautifiedCode += char;
      continue;
    }
    
    if (char === '/') {
      if (nextChar === '/') {
        insideComment = true;
        beautifiedCode += '//';
        i++;
        continue;
      }
      beautifiedCode += char;
      continue;
    }
    
    if (insideString) {
      if (char === '\\' && nextChar === '\'') {
        beautifiedCode += '\\\'';
        i++;
        continue;
      }
      if (char === '\'') {
        insideString = false;
      }
      beautifiedCode += char;
      continue;
    }
    
    if (char === '\'') {
      insideString = true;
      beautifiedCode += char;
      continue;
    }
    
    if (char === '{' || char === '(' || char === '[') {
      currentIndent += indent;
      beautifiedCode += char + '\n' + currentIndent;
      continue;
    }
    
    if (char === '}' || char === ')' || char === ']') {
      currentIndent = currentIndent.slice(0, -indent.length);
      beautifiedCode += '\n' + currentIndent + char;
      continue;
    }
    
    beautifiedCode += char;
  }
  
  return beautifiedCode;
}
