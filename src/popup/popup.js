const statusText = document.getElementById("status");
const toggleBtn = document.getElementById("toggleBtn");

// ===== Get current active tab =====
async function getCurrentDomain() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  try {
    const url = new URL(tabs[0].url);
    return url.hostname;
  } catch {
    return null;
  }
}

// ===== Update UI =====
function updateUI(isOn) {
  if (isOn) {
    statusText.textContent = "🌙 Dark Mode is ON";
    toggleBtn.textContent = "Turn OFF";
    toggleBtn.className = "on";
  } else {
    statusText.textContent = "☀️ Dark Mode is OFF";
    toggleBtn.textContent = "Turn ON";
    toggleBtn.className = "off";
  }
}

// ===== Load state =====
async function loadState() {
  const domain = await getCurrentDomain();
  const result = await browser.storage.local.get(domain);

  const isOn = !!result[domain];
  updateUI(isOn);
}

// ===== Toggle state =====
toggleBtn.addEventListener("click", async () => {
  const domain = await getCurrentDomain();
  const result = await browser.storage.local.get(domain);

  const newState = !result[domain];

  await browser.storage.local.set({ [domain]: newState });

  updateUI(newState);

  // Reload tab to apply content script again
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  browser.tabs.reload(tabs[0].id);
});

// Initialize
loadState();
