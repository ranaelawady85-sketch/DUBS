---
name: Delta Transit Pulse
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#444653'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#40c2fd'
  on-secondary-container: '#004d6a'
  tertiary: '#70000c'
  on-tertiary: '#ffffff'
  tertiary-container: '#9b0015'
  on-tertiary-container: '#ffa39c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: IBM Plex Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  display-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-precision, modern transit intelligence aesthetic tailored for higher education fleet logistics. It serves two distinct archetypes: university students/faculty demanding friction-free booking, boarding, and schedule reliability; and fleet operators/drivers needing rapid legibility and operational clarity under varied lighting conditions.

The visual direction merges **Modern Corporate Precision** with subtle **Glassmorphism & Tonal Layering**. Deep navy anchors the visual field, evocative of institutional trust and enterprise reliability, while kinetic royal blue and cyan accents introduce technical agility. Interfaces must feel fluid, authoritative, and frictionless, prioritizing bilingual legibility with native Arabic (RTL) ergonomics.

## Colors

The palette balances clinical transit efficiency with energetic accents:

- **Primary (`#1e40af` & `#2563eb`)**: Delta Royal Blue represents primary actions, route lines, dynamic UI highlights, and standard available states.
- **Secondary (`#38bdf8`)**: Electric Cyan serves as telemetry indicators, live tracking pings, current location markers, and progress feedback.
- **Tertiary / Destructive (`#ef4444`)**: Crisp Vibrant Crimson reserved strictly for occupied/booked seats, urgent trip cancellations, countdown thresholds under 5 minutes, and hazard alerts.
- **Surface & Backgrounds**: Base background is set to `#f8fafc` in light mode for crisp daylight readability. Deep contrast containers leverage `#0f172a` for night mode, trip HUDs, and driver terminal consoles.
- **Success / Status**: `#10b981` denotes on-time arrivals, validated boarding QR scans, and active vehicle diagnostics.

## Typography

The design system standardizes on **IBM Plex Sans** (paired natively with IBM Plex Sans Arabic). It delivers geometric structure with industrial humanist curves, providing visual parity across Latin route codes, telemetry numbers, and Arabic university signage.

- **RTL Considerations**: Ensure line-height values maintain at least 1.45x–1.5x in Arabic contexts to prevent ascender/descender clipping on diacritics. Letter spacing tokens must be zeroed for Arabic strings to preserve cursive baseline connectivity.
- **Tabular Figures**: Numeric outputs across trip timers, ETA badges, seat numbers, and bus plate displays strictly implement `font-variant-numeric: tabular-nums`.

## Layout & Spacing

A responsive 12-column fluid grid system governs the supervisor desktop dashboard, collapsing to an 8-column layout for driver mounted tablets, and a 4-column single-column flow for passenger mobile web views.

- **Mobile Viewports (<640px)**: 16px (`1rem`) outer margin, 16px gutter. Sticky bottom action sheets for ticket access and seat submission.
- **Tablet Consoles (640px–1024px)**: 24px (`1.5rem`) margin, optimized for landscape cockpit mounts with split map-and-manifest views.
- **Desktop Management (>1024px)**: 40px (`2.5rem`) outer margin, fluid multi-panel layouts with sticky data filter bars.
- **Spatial Rhythm**: All component padding and stack layouts adhere to an 8pt base scale (`space-xs` through `space-xl`).

## Elevation & Depth

Visual hierarchy leverages ambient colored lighting and subtle surface tiering to separate interactive transit telemetry from baseline navigation:

- **Level 0 (Canvas)**: `#f8fafc` in student light view; `#0b1120` in driver/night mode.
- **Level 1 (Cards, Tables)**: Pure white `#ffffff` with a fine structural border `1px solid rgba(15, 23, 42, 0.08)` and subtle diffuse drop `0 2px 8px -2px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Active Modals, Seat Chooser Sheet)**: Lifted using `0 12px 32px -4px rgba(30, 64, 175, 0.12)`, emphasizing transit focus.
- **Glassmorphism (Floating Overlays)**: Map controls, quick-switch route pills, and ETA floating chips use `backdrop-filter: blur(12px)` over `rgba(255, 255, 255, 0.85)` with a `1px` translucent edge `rgba(255, 255, 255, 0.6)`.

## Shapes

The interface adopts a balanced **Rounded (`roundedness: 2`)** approach:

- Base inputs, buttons, and micro-cards use `0.5rem` (8px).
- Seat indicators within the bus cabin map utilize `0.5rem` top radiuses with slightly flattened bases (`4px`) to mimic actual ergonomic seating profiles.
- Ticket cards and map floating widgets carry `rounded-lg` (`1rem`).
- Pills, route category chips, and live status badges are fully rounded (`rounded-full`).

## Components

### Bus Seat Selection Matrix
- **Layout**: 2x2 aisle configuration with front driver seat schematic.
- **Available Seat**: Outlined with `2px solid #2563eb`, filled with light tint `rgba(37, 99, 235, 0.06)`, dark slate text. Hover/focus states elevate with `#2563eb` fill and pure white text.
- **Reserved / Occupied Seat**: Flat fill of `#ef4444`, white glyph, non-interactive, low-opacity disabled indicator pattern.
- **Selected by User**: Vibrant royal-to-cyan gradient background with soft outer glow `0 0 0 4px rgba(56, 189, 248, 0.3)`.

### QR Code Ticket Card
- Dual-compartment card design with a perforated separation line. Top section holds student ID, route details, and dynamic countdown timer (e.g., `04:59`). The bottom section contains high-contrast QR display.
- **Expiration Dynamics**: When remaining time is > 10 minutes, background glow is subtle cyan. When < 5 minutes, countdown numerals switch to bold `#ef4444` with a gentle pulsing perimeter warning border.

### Interactive Live Map Tracking Widget
- Canvas map overlay featuring a styled dark-mode or muted vector map base.
- Floating translucent telemetry badge showing dynamic speed (km/h), next stop name in Arabic/English, and calculated headway.
- Bus icon rendered inside a `#1e40af` circular pin featuring a `#38bdf8` directional radar cone indicator.

### Driver Trip Console Controls
- Oversized touch targets (minimum height 56px) for rapid tactile inputs.
- Quick buttons for "Confirm Boarding", "Skip Passenger", and "Emergency Delay Alert". High-contrast switch states prevent accidental tapping during vehicle movement.

### Supervisor Fleet Scheduling Data Table
- High-density tabular layout using alternating row fills (`#ffffff` and `#f8fafc`).
- Visual badges for route health: On-Time (Emerald), Delayed (Amber), Standby (Slate).
- Direct inline trigger to reassign buses or broadcast urgent SMS/app notifications to all students on a given route line.