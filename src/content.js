console.log("CONTENT SCRIPT LOADED");

function applyDarkMode() {
  if (document.getElementById("simple-dark-mode-style")) return;

  const style = document.createElement("style");
  style.id = "simple-dark-mode-style";
  style.textContent = `
  :root {
  color-scheme: dark !important;
}

      html {
    background: #111 !important;
  }

  body {
    background: #444 !important;
  }

  a {
  color: #7ec27e !important;
}

h1, h2, h3, h4, h5, h6 {
    background-color: #444 !important;
  color: #ddd !important;
  border-color: #444 !important;
}

h1, h2, h3, h4, h5, h6, div, span, section, article, header, footer, nav, main, form, dl, dt, dd {
  background-color: #444 !important;
  color: #ddd !important;
  border-color: #444 !important;
}
  `;

  document.documentElement.appendChild(style);
}

function removeDarkMode() {
  const style = document.getElementById("simple-dark-mode-style");
  if (style) style.remove();
}

async function checkDomain() {
  const domain = location.hostname;

  const result = await browser.storage.local.get(domain);

  if (result[domain]) {
    applyDarkMode();
  }
}

checkDomain();
