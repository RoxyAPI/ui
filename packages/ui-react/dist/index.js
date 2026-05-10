// packages/ui-react/src/load-ui.ts
var SCRIPT_ID = "roxyapi-ui-loader";
var CDN_BASE = "https://cdn.jsdelivr.net/npm/@roxyapi/ui@latest/dist/cdn";
var loaded = null;
function ensureScriptLoaded(version = "0.1.2") {
  if (typeof document === "undefined") return Promise.resolve();
  if (loaded) return loaded;
  loaded = new Promise((resolve, reject) => {
    void version;
    const url = `${CDN_BASE}/roxy-ui.js`;
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

// packages/ui-react/src/components/natal-chart.tsx
import * as React from "react";
var RoxyNatalChart = React.forwardRef(
  function RoxyNatalChart2({ data, ...rest }, ref) {
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
    return React.createElement("roxy-natal-chart", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/horoscope-card.tsx
import * as React2 from "react";
var RoxyHoroscopeCard = React2.forwardRef(
  function RoxyHoroscopeCard2({ data, ...rest }, ref) {
    const internal = React2.useRef(null);
    React2.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React2.useState(false);
    React2.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React2.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React2.createElement("roxy-horoscope-card", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/synastry-chart.tsx
import * as React3 from "react";
var RoxySynastryChart = React3.forwardRef(
  function RoxySynastryChart2({ data, ...rest }, ref) {
    const internal = React3.useRef(null);
    React3.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React3.useState(false);
    React3.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React3.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React3.createElement("roxy-synastry-chart", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/compatibility-card.tsx
import * as React4 from "react";
var RoxyCompatibilityCard = React4.forwardRef(
  function RoxyCompatibilityCard2({ data, ...rest }, ref) {
    const internal = React4.useRef(null);
    React4.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React4.useState(false);
    React4.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React4.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React4.createElement("roxy-compatibility-card", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/moon-phase.tsx
import * as React5 from "react";
var RoxyMoonPhase = React5.forwardRef(
  function RoxyMoonPhase2({ data, ...rest }, ref) {
    const internal = React5.useRef(null);
    React5.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React5.useState(false);
    React5.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React5.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React5.createElement("roxy-moon-phase", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/vedic-kundli.tsx
import * as React6 from "react";
var RoxyVedicKundli = React6.forwardRef(
  function RoxyVedicKundli2({ data, ...rest }, ref) {
    const internal = React6.useRef(null);
    React6.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React6.useState(false);
    React6.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React6.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React6.createElement("roxy-vedic-kundli", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/panchang-table.tsx
import * as React7 from "react";
var RoxyPanchangTable = React7.forwardRef(
  function RoxyPanchangTable2({ data, ...rest }, ref) {
    const internal = React7.useRef(null);
    React7.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React7.useState(false);
    React7.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React7.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React7.createElement("roxy-panchang-table", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/dasha-timeline.tsx
import * as React8 from "react";
var RoxyDashaTimeline = React8.forwardRef(
  function RoxyDashaTimeline2({ data, ...rest }, ref) {
    const internal = React8.useRef(null);
    React8.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React8.useState(false);
    React8.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React8.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React8.createElement("roxy-dasha-timeline", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/dosha-card.tsx
import * as React9 from "react";
var RoxyDoshaCard = React9.forwardRef(
  function RoxyDoshaCard2({ data, ...rest }, ref) {
    const internal = React9.useRef(null);
    React9.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React9.useState(false);
    React9.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React9.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React9.createElement("roxy-dosha-card", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/guna-milan.tsx
import * as React10 from "react";
var RoxyGunaMilan = React10.forwardRef(
  function RoxyGunaMilan2({ data, ...rest }, ref) {
    const internal = React10.useRef(null);
    React10.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React10.useState(false);
    React10.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React10.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React10.createElement("roxy-guna-milan", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/kp-planets-table.tsx
import * as React11 from "react";
var RoxyKpPlanetsTable = React11.forwardRef(
  function RoxyKpPlanetsTable2({ data, ...rest }, ref) {
    const internal = React11.useRef(null);
    React11.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React11.useState(false);
    React11.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React11.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React11.createElement("roxy-kp-planets-table", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/numerology-card.tsx
import * as React12 from "react";
var RoxyNumerologyCard = React12.forwardRef(
  function RoxyNumerologyCard2({ data, ...rest }, ref) {
    const internal = React12.useRef(null);
    React12.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React12.useState(false);
    React12.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React12.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React12.createElement("roxy-numerology-card", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/tarot-card.tsx
import * as React13 from "react";
var RoxyTarotCard = React13.forwardRef(
  function RoxyTarotCard2({ data, ...rest }, ref) {
    const internal = React13.useRef(null);
    React13.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React13.useState(false);
    React13.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React13.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React13.createElement("roxy-tarot-card", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/tarot-spread.tsx
import * as React14 from "react";
var RoxyTarotSpread = React14.forwardRef(
  function RoxyTarotSpread2({ data, ...rest }, ref) {
    const internal = React14.useRef(null);
    React14.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React14.useState(false);
    React14.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React14.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React14.createElement("roxy-tarot-spread", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/biorhythm-chart.tsx
import * as React15 from "react";
var RoxyBiorhythmChart = React15.forwardRef(
  function RoxyBiorhythmChart2({ data, ...rest }, ref) {
    const internal = React15.useRef(null);
    React15.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React15.useState(false);
    React15.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React15.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React15.createElement("roxy-biorhythm-chart", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/hexagram.tsx
import * as React16 from "react";
var RoxyHexagram = React16.forwardRef(
  function RoxyHexagram2({ data, ...rest }, ref) {
    const internal = React16.useRef(null);
    React16.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React16.useState(false);
    React16.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React16.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React16.createElement("roxy-hexagram", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/endpoint-form.tsx
import * as React17 from "react";
var RoxyEndpointForm = React17.forwardRef(
  function RoxyEndpointForm2({ data, ...rest }, ref) {
    const internal = React17.useRef(null);
    React17.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React17.useState(false);
    React17.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React17.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React17.createElement("roxy-endpoint-form", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/location-search.tsx
import * as React18 from "react";
var RoxyLocationSearch = React18.forwardRef(
  function RoxyLocationSearch2({ data, ...rest }, ref) {
    const internal = React18.useRef(null);
    React18.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React18.useState(false);
    React18.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React18.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React18.createElement("roxy-location-search", { ref: internal, ...rest });
  }
);

// packages/ui-react/src/components/data.tsx
import * as React19 from "react";
var RoxyData = React19.forwardRef(
  function RoxyData2({ data, ...rest }, ref) {
    const internal = React19.useRef(null);
    React19.useImperativeHandle(ref, () => internal.current);
    const [loaded2, setLoaded] = React19.useState(false);
    React19.useEffect(() => {
      let active = true;
      ensureScriptLoaded().then(() => {
        if (active) setLoaded(true);
      });
      return () => {
        active = false;
      };
    }, []);
    React19.useEffect(() => {
      if (internal.current && data !== void 0) {
        internal.current.data = data;
      }
    }, [data, loaded2]);
    return React19.createElement("roxy-data", { ref: internal, ...rest });
  }
);
export {
  RoxyBiorhythmChart,
  RoxyCompatibilityCard,
  RoxyDashaTimeline,
  RoxyData,
  RoxyDoshaCard,
  RoxyEndpointForm,
  RoxyGunaMilan,
  RoxyHexagram,
  RoxyHoroscopeCard,
  RoxyKpPlanetsTable,
  RoxyLocationSearch,
  RoxyMoonPhase,
  RoxyNatalChart,
  RoxyNumerologyCard,
  RoxyPanchangTable,
  RoxySynastryChart,
  RoxyTarotCard,
  RoxyTarotSpread,
  RoxyVedicKundli,
  ensureScriptLoaded
};
//# sourceMappingURL=index.js.map
