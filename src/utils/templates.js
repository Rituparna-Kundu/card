/**
 * Structured SVG Pinterest-style Eid card templates.
 * Each template maps to a layout component in StructuredLayouts.jsx.
 */

const TEMPLATES = [
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    emoji: '🕌',
    description: 'Traditional Blue & Gold Motif',
    structured: true,
    layoutId: 'ClassicLayout',
    layoutProps: {
      bgColor: '#1a5c9e',
      patternColor: 'rgba(100,170,230,0.28)',
      archColor: '#f5f0dc',
      textColor: '#1a5099',
      accentColor: '#f0a500',
    },
    bg: { type: 'color', value: '#1a5c9e' },
    borderColor: '#f0a500',
  },
  {
    id: 'cosmic-purple',
    name: 'Cosmic Night',
    emoji: '🌌',
    description: 'Midnight Indigo with Glowing Stars',
    structured: true,
    layoutId: 'CosmicLayout',
    layoutProps: {
      accentColor: '#c084fc',
    },
    bg: { type: 'color', value: '#1e1060' },
    borderColor: '#c084fc',
  },
  {
    id: 'floral-rose',
    name: 'Rose Floral',
    emoji: '🌸',
    description: 'Soft Pink with Floral Borders',
    structured: true,
    layoutId: 'FloralLayout',
    layoutProps: {
      archColor: '#fff5f5',
      textColor: '#6b2142',
      accentColor: '#d45c7a',
    },
    bg: { type: 'color', value: '#ffe4d8' },
    borderColor: '#d45c7a',
  },
  {
    id: 'mandala-gold',
    name: 'Mandala Gold',
    emoji: '✨',
    description: 'Dark Obsidian with Gold Mandalas',
    structured: true,
    layoutId: 'MandalaLayout',
    layoutProps: {
      accentColor: '#facc15',
    },
    bg: { type: 'color', value: '#11100c' },
    borderColor: '#facc15',
  },
  {
    id: 'classic-emerald',
    name: 'Emerald Arch',
    emoji: '🌿',
    description: 'Deep Green & Gold Classic',
    structured: true,
    layoutId: 'ClassicLayout',
    layoutProps: {
      bgColor: '#0a4a2e',
      patternColor: 'rgba(80,180,120,0.28)',
      archColor: '#f0f8f0',
      textColor: '#0a4a2e',
      accentColor: '#f0c030',
    },
    bg: { type: 'color', value: '#0a4a2e' },
    borderColor: '#f0c030',
  },
  {
    id: 'cosmic-teal',
    name: 'Aurora Sky',
    emoji: '🌠',
    description: 'Teal Night with Shooting Stars',
    structured: true,
    layoutId: 'CosmicLayout',
    layoutProps: {
      accentColor: '#5eead4',
    },
    bg: { type: 'color', value: '#042f2e' },
    borderColor: '#5eead4',
  },
];

export default TEMPLATES;
