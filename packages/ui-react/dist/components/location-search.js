// packages/ui-react/src/components/location-search.tsx
import * as React from "react";

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

// packages/ui-react/src/components/location-search.tsx
var RoxyLocationSearch = React.forwardRef(
  function RoxyLocationSearch2({ className, style, onRoxyLocationSelect, onRoxyValidationError, ...rest }, ref) {
    const internal = React.useRef(null);
    React.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      }).catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      });
      return () => {
        active = false;
      };
    }, []);
    React.useEffect(() => {
      const el = internal.current;
      const handler = onRoxyLocationSelect;
      if (!el || !handler) return;
      const listener = (event) => handler(event);
      el.addEventListener("roxy-location-select", listener);
      return () => el.removeEventListener("roxy-location-select", listener);
    }, [onRoxyLocationSelect, loaded2]);
    React.useEffect(() => {
      const el = internal.current;
      const handler = onRoxyValidationError;
      if (!el || !handler) return;
      const listener = (event) => handler(event);
      el.addEventListener("roxy-validation-error", listener);
      return () => el.removeEventListener("roxy-validation-error", listener);
    }, [onRoxyValidationError, loaded2]);
    if (error) {
      return React.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React.createElement("roxy-location-search", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);
export {
  RoxyLocationSearch
};
//# sourceMappingURL=location-search.js.map
