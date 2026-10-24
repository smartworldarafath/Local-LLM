const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, '..', 'README.md');
let markdown = fs.readFileSync(readmePath, 'utf8');

// Basic markdown-to-html helper for the non-HTML parts of README
function parseMarkdownToHtml(md) {
  let html = md;

  // Replace header titles
  html = html.replace(/####\s+(.*)/g, '<h4>$1</h4>');
  html = html.replace(/###\s+(.*)/g, '<h3>$1</h3>');
  html = html.replace(/##\s+(.*)/g, '<h2>$1</h2>');
  html = html.replace(/#\s+(.*)/g, '<h1>$1</h1>');

  // Convert bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert code blocks
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Replace markdown tables: | col1 | col2 |
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.includes('---')) {
        continue;
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHtml = '<table width="100%"><thead><tr>' + cells.map(c => `<th align="left">${c}</th>`).join('') + '</tr></thead><tbody>';
      } else {
        tableHtml += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
    } else {
      if (inTable) {
        tableHtml += '</tbody></table>';
        newLines.push(tableHtml);
        inTable = false;
        tableHtml = '';
      }
      newLines.push(lines[i]);
    }
  }
  if (inTable) {
    tableHtml += '</tbody></table>';
    newLines.push(tableHtml);
  }

  return newLines.join('\n');
}

const parsedBody = parseMarkdownToHtml(markdown);

const fullHtml = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>README Preview - Local LLM (Material 3 Expressive)</title>
  <style>
    :root {
      --bg: #0d1117;
      --text: #c9d1d9;
      --border: #30363d;
      --card-bg: #161b22;
      --link: #58a6ff;
    }
    html[data-theme="light"] {
      --bg: #ffffff;
      --text: #24292f;
      --border: #d0d7de;
      --card-bg: #f6f8fa;
      --link: #0969da;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: background-color 0.2s, color 0.2s;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      background: var(--card-bg);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }
    .toolbar-title {
      font-weight: 700;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .theme-toggle {
      background: none;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.2s;
    }
    .theme-toggle:hover {
      background: var(--border);
    }
    .container {
      width: 100%;
      max-width: 980px;
      padding: 32px 24px 64px 24px;
      box-sizing: border-box;
      line-height: 1.6;
    }
    a {
      color: var(--link);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    h1, h2, h3, h4 {
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      margin-top: 28px;
    }
    table {
      border-collapse: collapse;
      margin: 16px 0;
      width: 100%;
    }
    table, th, td {
      border: 1px solid var(--border);
    }
    th, td {
      padding: 10px 14px;
    }
    pre {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      overflow-x: auto;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      font-size: 85%;
      background: rgba(175, 184, 193, 0.2);
      padding: 0.2em 0.4em;
      border-radius: 6px;
    }
    pre code {
      background: none;
      padding: 0;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    p {
      margin: 14px 0;
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="toolbar-title">
      <span>📱 Local LLM — Google Pixel M3E README Preview</span>
    </div>
    <button class="theme-toggle" id="toggleTheme">Switch to Light Theme</button>
  </div>
  <div class="container">
    ${parsedBody}
  </div>

  <script>
    const btn = document.getElementById('toggleTheme');
    const html = document.documentElement;
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      btn.textContent = next === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'readme-preview.html'), fullHtml, 'utf8');
console.log('Successfully generated public/readme-preview.html!');
