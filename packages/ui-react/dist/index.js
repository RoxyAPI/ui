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
var ROXY_UI_VERSION = "0.2.2";

// packages/ui-react/src/components/natal-chart.tsx
import * as React from "react";
var RoxyNatalChart = React.forwardRef(
  function RoxyNatalChart2({ data, className, style, ...rest }, ref) {
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
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React.createElement("roxy-natal-chart", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/horoscope-card.tsx
import * as React2 from "react";
var RoxyHoroscopeCard = React2.forwardRef(
  function RoxyHoroscopeCard2({ data, className, style, ...rest }, ref) {
    const internal = React2.useRef(null);
    React2.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React2.useState(false);
    const [error, setError] = React2.useState(null);
    React2.useEffect(() => {
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
    React2.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React2.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React2.createElement("roxy-horoscope-card", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/synastry-chart.tsx
import * as React3 from "react";
var RoxySynastryChart = React3.forwardRef(
  function RoxySynastryChart2({ data, className, style, ...rest }, ref) {
    const internal = React3.useRef(null);
    React3.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React3.useState(false);
    const [error, setError] = React3.useState(null);
    React3.useEffect(() => {
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
    React3.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React3.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React3.createElement("roxy-synastry-chart", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/compatibility-card.tsx
import * as React4 from "react";
var RoxyCompatibilityCard = React4.forwardRef(
  function RoxyCompatibilityCard2({ data, className, style, ...rest }, ref) {
    const internal = React4.useRef(null);
    React4.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React4.useState(false);
    const [error, setError] = React4.useState(null);
    React4.useEffect(() => {
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
    React4.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React4.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React4.createElement("roxy-compatibility-card", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/moon-phase.tsx
import * as React5 from "react";
var RoxyMoonPhase = React5.forwardRef(
  function RoxyMoonPhase2({ data, className, style, ...rest }, ref) {
    const internal = React5.useRef(null);
    React5.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React5.useState(false);
    const [error, setError] = React5.useState(null);
    React5.useEffect(() => {
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
    React5.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React5.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React5.createElement("roxy-moon-phase", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/vedic-kundli.tsx
import * as React6 from "react";
var RoxyVedicKundli = React6.forwardRef(
  function RoxyVedicKundli2({ data, className, style, ...rest }, ref) {
    const internal = React6.useRef(null);
    React6.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React6.useState(false);
    const [error, setError] = React6.useState(null);
    React6.useEffect(() => {
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
    React6.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React6.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React6.createElement("roxy-vedic-kundli", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/panchang-table.tsx
import * as React7 from "react";
var RoxyPanchangTable = React7.forwardRef(
  function RoxyPanchangTable2({ data, className, style, ...rest }, ref) {
    const internal = React7.useRef(null);
    React7.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React7.useState(false);
    const [error, setError] = React7.useState(null);
    React7.useEffect(() => {
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
    React7.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React7.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React7.createElement("roxy-panchang-table", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/dasha-timeline.tsx
import * as React8 from "react";
var RoxyDashaTimeline = React8.forwardRef(
  function RoxyDashaTimeline2({ data, className, style, ...rest }, ref) {
    const internal = React8.useRef(null);
    React8.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React8.useState(false);
    const [error, setError] = React8.useState(null);
    React8.useEffect(() => {
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
    React8.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React8.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React8.createElement("roxy-dasha-timeline", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/dosha-card.tsx
import * as React9 from "react";
var RoxyDoshaCard = React9.forwardRef(
  function RoxyDoshaCard2({ data, className, style, ...rest }, ref) {
    const internal = React9.useRef(null);
    React9.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React9.useState(false);
    const [error, setError] = React9.useState(null);
    React9.useEffect(() => {
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
    React9.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React9.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React9.createElement("roxy-dosha-card", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/guna-milan.tsx
import * as React10 from "react";
var RoxyGunaMilan = React10.forwardRef(
  function RoxyGunaMilan2({ data, className, style, ...rest }, ref) {
    const internal = React10.useRef(null);
    React10.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React10.useState(false);
    const [error, setError] = React10.useState(null);
    React10.useEffect(() => {
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
    React10.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React10.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React10.createElement("roxy-guna-milan", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/kp-planets-table.tsx
import * as React11 from "react";
var RoxyKpPlanetsTable = React11.forwardRef(
  function RoxyKpPlanetsTable2({ data, className, style, ...rest }, ref) {
    const internal = React11.useRef(null);
    React11.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React11.useState(false);
    const [error, setError] = React11.useState(null);
    React11.useEffect(() => {
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
    React11.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React11.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React11.createElement("roxy-kp-planets-table", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/transits-table.tsx
import * as React12 from "react";
var RoxyTransitsTable = React12.forwardRef(
  function RoxyTransitsTable2({ data, className, style, ...rest }, ref) {
    const internal = React12.useRef(null);
    React12.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React12.useState(false);
    const [error, setError] = React12.useState(null);
    React12.useEffect(() => {
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
    React12.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React12.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React12.createElement("roxy-transits-table", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/divisional-chart.tsx
import * as React13 from "react";
var RoxyDivisionalChart = React13.forwardRef(
  function RoxyDivisionalChart2({ data, className, style, ...rest }, ref) {
    const internal = React13.useRef(null);
    React13.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React13.useState(false);
    const [error, setError] = React13.useState(null);
    React13.useEffect(() => {
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
    React13.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React13.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React13.createElement("roxy-divisional-chart", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/ashtakavarga-grid.tsx
import * as React14 from "react";
var RoxyAshtakavargaGrid = React14.forwardRef(
  function RoxyAshtakavargaGrid2({ data, className, style, ...rest }, ref) {
    const internal = React14.useRef(null);
    React14.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React14.useState(false);
    const [error, setError] = React14.useState(null);
    React14.useEffect(() => {
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
    React14.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React14.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React14.createElement("roxy-ashtakavarga-grid", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/shadbala-table.tsx
import * as React15 from "react";
var RoxyShadbalaTable = React15.forwardRef(
  function RoxyShadbalaTable2({ data, className, style, ...rest }, ref) {
    const internal = React15.useRef(null);
    React15.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React15.useState(false);
    const [error, setError] = React15.useState(null);
    React15.useEffect(() => {
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
    React15.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React15.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React15.createElement("roxy-shadbala-table", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/yoga-list.tsx
import * as React16 from "react";
var RoxyYogaList = React16.forwardRef(
  function RoxyYogaList2({ data, className, style, ...rest }, ref) {
    const internal = React16.useRef(null);
    React16.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React16.useState(false);
    const [error, setError] = React16.useState(null);
    React16.useEffect(() => {
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
    React16.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React16.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React16.createElement("roxy-yoga-list", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/choghadiya-grid.tsx
import * as React17 from "react";
var RoxyChoghadiyaGrid = React17.forwardRef(
  function RoxyChoghadiyaGrid2({ data, className, style, ...rest }, ref) {
    const internal = React17.useRef(null);
    React17.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React17.useState(false);
    const [error, setError] = React17.useState(null);
    React17.useEffect(() => {
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
    React17.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React17.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React17.createElement("roxy-choghadiya-grid", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/numerology-card.tsx
import * as React18 from "react";
var RoxyNumerologyCard = React18.forwardRef(
  function RoxyNumerologyCard2({ data, className, style, ...rest }, ref) {
    const internal = React18.useRef(null);
    React18.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React18.useState(false);
    const [error, setError] = React18.useState(null);
    React18.useEffect(() => {
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
    React18.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React18.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React18.createElement("roxy-numerology-card", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/tarot-card.tsx
import * as React19 from "react";
var RoxyTarotCard = React19.forwardRef(
  function RoxyTarotCard2({ data, className, style, ...rest }, ref) {
    const internal = React19.useRef(null);
    React19.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React19.useState(false);
    const [error, setError] = React19.useState(null);
    React19.useEffect(() => {
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
    React19.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React19.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React19.createElement("roxy-tarot-card", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/tarot-spread.tsx
import * as React20 from "react";
var RoxyTarotSpread = React20.forwardRef(
  function RoxyTarotSpread2({ data, className, style, ...rest }, ref) {
    const internal = React20.useRef(null);
    React20.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React20.useState(false);
    const [error, setError] = React20.useState(null);
    React20.useEffect(() => {
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
    React20.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React20.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React20.createElement("roxy-tarot-spread", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/biorhythm-chart.tsx
import * as React21 from "react";
var RoxyBiorhythmChart = React21.forwardRef(
  function RoxyBiorhythmChart2({ data, className, style, ...rest }, ref) {
    const internal = React21.useRef(null);
    React21.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React21.useState(false);
    const [error, setError] = React21.useState(null);
    React21.useEffect(() => {
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
    React21.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React21.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React21.createElement("roxy-biorhythm-chart", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/hexagram.tsx
import * as React22 from "react";
var RoxyHexagram = React22.forwardRef(
  function RoxyHexagram2({ data, className, style, ...rest }, ref) {
    const internal = React22.useRef(null);
    React22.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React22.useState(false);
    const [error, setError] = React22.useState(null);
    React22.useEffect(() => {
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
    React22.useEffect(() => {
      const el = internal.current;
      if (el && data !== void 0) {
        el.data = data;
      }
    }, [data, loaded2]);
    if (error) {
      return React22.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React22.createElement("roxy-hexagram", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/endpoint-form.tsx
import * as React23 from "react";
var RoxyEndpointForm = React23.forwardRef(
  function RoxyEndpointForm2({ className, style, onRoxySubmit, onRoxyValidationError, onRoxySpecError, ...rest }, ref) {
    const internal = React23.useRef(null);
    React23.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React23.useState(false);
    const [error, setError] = React23.useState(null);
    React23.useEffect(() => {
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
    React23.useEffect(() => {
      const el = internal.current;
      const handler = onRoxySubmit;
      if (!el || !handler) return;
      const listener = (event) => handler(event);
      el.addEventListener("roxy-submit", listener);
      return () => el.removeEventListener("roxy-submit", listener);
    }, [onRoxySubmit, loaded2]);
    React23.useEffect(() => {
      const el = internal.current;
      const handler = onRoxyValidationError;
      if (!el || !handler) return;
      const listener = (event) => handler(event);
      el.addEventListener("roxy-validation-error", listener);
      return () => el.removeEventListener("roxy-validation-error", listener);
    }, [onRoxyValidationError, loaded2]);
    React23.useEffect(() => {
      const el = internal.current;
      const handler = onRoxySpecError;
      if (!el || !handler) return;
      const listener = (event) => handler(event);
      el.addEventListener("roxy-spec-error", listener);
      return () => el.removeEventListener("roxy-spec-error", listener);
    }, [onRoxySpecError, loaded2]);
    if (error) {
      return React23.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React23.createElement("roxy-endpoint-form", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/location-search.tsx
import * as React24 from "react";
var RoxyLocationSearch = React24.forwardRef(
  function RoxyLocationSearch2({ className, style, onRoxyLocationSelect, onRoxyValidationError, ...rest }, ref) {
    const internal = React24.useRef(null);
    React24.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React24.useState(false);
    const [error, setError] = React24.useState(null);
    React24.useEffect(() => {
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
    React24.useEffect(() => {
      const el = internal.current;
      const handler = onRoxyLocationSelect;
      if (!el || !handler) return;
      const listener = (event) => handler(event);
      el.addEventListener("roxy-location-select", listener);
      return () => el.removeEventListener("roxy-location-select", listener);
    }, [onRoxyLocationSelect, loaded2]);
    React24.useEffect(() => {
      const el = internal.current;
      const handler = onRoxyValidationError;
      if (!el || !handler) return;
      const listener = (event) => handler(event);
      el.addEventListener("roxy-validation-error", listener);
      return () => el.removeEventListener("roxy-validation-error", listener);
    }, [onRoxyValidationError, loaded2]);
    if (error) {
      return React24.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React24.createElement("roxy-location-search", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);

// packages/ui-react/src/components/data.tsx
import * as React25 from "react";
var RoxyData = React25.forwardRef(
  function RoxyData2({ className, style, ...rest }, ref) {
    const internal = React25.useRef(null);
    React25.useImperativeHandle(
      ref,
      () => internal.current,
      []
    );
    const [loaded2, setLoaded] = React25.useState(false);
    const [error, setError] = React25.useState(null);
    React25.useEffect(() => {
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
    if (error) {
      return React25.createElement(
        "div",
        { role: "alert", className, style },
        `Roxy UI script load failed: ${error.message}`
      );
    }
    return React25.createElement("roxy-data", {
      ref: internal,
      className,
      style,
      ...rest
    });
  }
);
export {
  ROXY_UI_VERSION,
  RoxyAshtakavargaGrid,
  RoxyBiorhythmChart,
  RoxyChoghadiyaGrid,
  RoxyCompatibilityCard,
  RoxyDashaTimeline,
  RoxyData,
  RoxyDivisionalChart,
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
  RoxyShadbalaTable,
  RoxySynastryChart,
  RoxyTarotCard,
  RoxyTarotSpread,
  RoxyTransitsTable,
  RoxyVedicKundli,
  RoxyYogaList,
  ensureScriptLoaded
};
//# sourceMappingURL=index.js.map
