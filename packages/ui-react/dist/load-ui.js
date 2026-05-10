// packages/ui-react/src/load-ui.ts
var SCRIPT_ID = "roxyapi-ui-loader";
var CDN_BASE_LATEST = "https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn";
var CDN_BASE_PREFIX = "https://cdn.jsdelivr.net/npm/@roxyapi/ui@";
var CDN_BASE_SUFFIX = "/dist/cdn";
var loaded = null;
function buildBase(version) {
  if (!version || version === "latest") return CDN_BASE_LATEST;
  return `${CDN_BASE_PREFIX}${version}${CDN_BASE_SUFFIX}`;
}
function ensureScriptLoaded(version = "latest") {
  if (typeof document === "undefined") return Promise.resolve();
  if (loaded) return loaded;
  loaded = new Promise((resolve, reject) => {
    const url = `${buildBase(version)}/roxy-ui.js`;
    let existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("roxy-ui load failed")));
      }
      return;
    }
    existing = document.createElement("script");
    existing.id = SCRIPT_ID;
    existing.src = url;
    existing.async = true;
    existing.crossOrigin = "anonymous";
    existing.addEventListener("load", () => {
      existing.dataset.loaded = "true";
      resolve();
    });
    existing.addEventListener("error", () => reject(new Error("roxy-ui load failed")));
    document.head.appendChild(existing);
  });
  return loaded;
}
var load_ui_default = ensureScriptLoaded;
var ROXY_UI_VERSION = "0.1.3";
export {
  ROXY_UI_VERSION,
  load_ui_default as default,
  ensureScriptLoaded
};
//# sourceMappingURL=load-ui.js.map
