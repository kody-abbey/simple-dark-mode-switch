console.log("CONTENT SCRIPT LOADED");

function applyDarkMode() {
  if (document.getElementById("simple-dark-mode-style")) return;

  const style = document.createElement("style");
  style.id = "simple-dark-mode-style";
  style.textContent = `
    html, body {
      filter: invert(1) hue-rotate(180deg) !important;
      background-color: #111 !important;
    }

    // img, video, iframe {
    //   filter: invert(1) hue-rotate(180deg) !important;
    // }
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
