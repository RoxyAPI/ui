// packages/ui-react/src/components/endpoint-form.tsx
import * as React from "react";

// packages/ui-react/src/load-ui.ts
var SCRIPT_ID = "roxyapi-ui-loader";
var CDN_BASE = "https://cdn.jsdelivr.net/npm/@roxyapi/ui@0/dist/cdn";
var loaded = null;
function ensureScriptLoaded(version = "0.1.0") {
  if (typeof document === "undefined") return Promise.resolve();
  if (loaded) return loaded;
  loaded = new Promise((resolve, reject) => {
    const major = version.split(".")[0];
    const url = `${CDN_BASE.replace("@0", "@" + major)}/roxy-ui.js`;
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

// packages/ui-react/src/components/endpoint-form.tsx
var RoxyEndpointForm = React.forwardRef(
  function RoxyEndpointForm2({ data, ...rest }, ref) {
    const internal = React.useRef(null);
    React.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React.useState(false);
    React.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React.createElement("roxy-endpoint-form", { ref: internal, ...rest });
  }
);
export {
  RoxyEndpointForm
};
//# sourceMappingURL=endpoint-form.js.map
