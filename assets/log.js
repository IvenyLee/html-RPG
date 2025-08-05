export function log(message) {
  const logBox = document.getElementById("log");
  if (!logBox) return;

  const p = document.createElement("p");
  p.textContent = message;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
}
