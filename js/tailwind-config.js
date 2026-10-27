/**
 * Delta Transit Pulse - Shared Tailwind Configuration
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-fixed-dim": "#ffb3ad",
        "outline-variant": "#c4c5d5",
        "outline": "#757684",
        "on-secondary": "#ffffff",
        "surface": "#faf8ff",
        "tertiary-container": "#9b0015",
        "surface-bright": "#faf8ff",
        "inverse-primary": "#b8c4ff",
        "surface-variant": "#dae2fd",
        "on-error": "#ffffff",
        "primary-fixed": "#dde1ff",
        "secondary-container": "#40c2fd",
        "surface-tint": "#3755c3",
        "on-secondary-fixed-variant": "#004c69",
        "inverse-surface": "#283044",
        "surface-container-high": "#e2e7ff",
        "on-primary-fixed-variant": "#173bab",
        "surface-container-low": "#f2f3ff",
        "on-primary-fixed": "#001453",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#ffa39c",
        "on-tertiary-fixed": "#410004",
        "on-secondary-fixed": "#001e2c",
        "inverse-on-surface": "#eef0ff",
        "primary-fixed-dim": "#b8c4ff",
        "secondary": "#00668a",
        "tertiary": "#70000c",
        "surface-container": "#eaedff",
        "surface-dim": "#d2d9f4",
        "primary": "#00288e",
        "tertiary-fixed": "#ffdad7",
        "on-tertiary-fixed-variant": "#930013",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#7bd0ff",
        "primary-container": "#1e40af",
        "secondary-fixed": "#c4e7ff",
        "error": "#ba1a1a",
        "on-surface": "#131b2e",
        "background": "#faf8ff",
        "surface-container-highest": "#dae2fd",
        "on-primary-container": "#a8b8ff",
        "on-background": "#131b2e",
        "surface-container-lowest": "#ffffff",
        "error-container": "#ffdad6",
        "on-tertiary": "#ffffff",
        "on-surface-variant": "#444653",
        "on-secondary-container": "#004d6a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "margin": "1rem",
        "margin-md": "1.5rem",
        "margin-lg": "2.5rem",
        "gutter": "1rem",
        "gutter-lg": "1.5rem"
      },
      fontFamily: {
        "label-sm": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "display-lg": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "headline-lg": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "body-md": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "display-lg-mobile": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "headline-md": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "body-lg": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "label-lg": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
        "label-md": ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"]
      },
      fontSize: {
        "label-sm": ["11px", { "lineHeight": "14px", "letterSpacing": "0.5px", "fontWeight": "500" }],
        "display-lg": ["48px", { "lineHeight": "56px", "fontWeight": "700" }],
        "headline-lg": ["28px", { "lineHeight": "36px", "fontWeight": "600" }],
        "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "display-lg-mobile": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "headline-md": ["22px", { "lineHeight": "28px", "fontWeight": "600" }],
        "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-lg": ["14px", { "lineHeight": "20px", "fontWeight": "600" }],
        "label-md": ["12px", { "lineHeight": "16px", "fontWeight": "500" }]
      }
    }
  }
};
