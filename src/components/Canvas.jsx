import React, { useState, useRef, useMemo } from 'react';
import { ClassicLayout, CosmicLayout, FloralLayout, MandalaLayout } from './StructuredLayouts';

const LAYOUT_MAP = {
  ClassicLayout,
  CosmicLayout,
  FloralLayout,
  MandalaLayout,
};

/* Generate a set of random sparkle particles */
function generateSparkles(count = 12) {
  const sparks = [];
  for (let i = 0; i < count; i++) {
    sparks.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${40 + Math.random() * 60}%`,
      size: 2 + Math.random() * 4,
      dur: 2 + Math.random() * 3,
      delay: Math.random() * 4,
    });
  }
  return sparks;
}

/* Convert a hex colour to rgba with the given alpha (0-1) */
function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const Canvas = ({ elements, updateElement, removeElement, activeElementId, setActiveElementId, canvasBg, canvasBorderColor, toName, fromName, messageBn, messageEn, messageFont, messageSize, messageColor, isExporting, structuredLayout }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const sparkles = useMemo(() => generateSparkles(14), []);

  const handlePointerDown = (e, id) => {
    e.stopPropagation();
    setActiveElementId(id);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !activeElementId || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;
    updateElement(activeElementId, { x: newX, y: newY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const renderBackground = () => {
    if (canvasBg.type === 'gradient') return canvasBg.value;
    return canvasBg.value || '#ffffff';
  };

  const isEmpty = elements.length === 0 && !toName && !fromName && !structuredLayout;

  /* Resolve the structured SVG renderer */
  const renderStructured = () => {
    if (!structuredLayout) return null;
    const LayoutComponent = LAYOUT_MAP[structuredLayout.layoutId];
    if (!LayoutComponent) return null;
    return (
      <LayoutComponent
        {...structuredLayout.props}
        toName={toName}
        fromName={fromName}
        messageBn={messageBn}
        messageEn={messageEn}
        messageFont={messageFont}
        messageSize={messageSize}
        messageColor={messageColor}
      />
    );
  };

  return (
    <div
      className="canvas-wrapper"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="canvas-glow-frame">
        <div
          ref={containerRef}
          id="card-canvas"
          onClick={() => setActiveElementId(null)}
          style={{
            width: '400px',
            height: '560px',
            background: structuredLayout ? 'none' : renderBackground(),
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            cursor: isDragging ? 'grabbing' : 'default',
          }}
        >
          {/* Structured SVG layout fills the whole card */}
          {structuredLayout && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              {renderStructured()}
            </div>
          )}
          {/* Decorative inner border */}
          <div style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '13px',
            border: `2px solid ${hexToRgba(canvasBorderColor || '#fde68a', 0.75)}`,
            zIndex: 8,
            pointerEvents: 'none',
            boxShadow: `inset 0 0 18px ${hexToRgba(canvasBorderColor || '#fde68a', 0.18)}, 0 0 10px ${hexToRgba(canvasBorderColor || '#fde68a', 0.22)}`,
          }} />
          {/* Inner border – thinner decorative line */}
          <div style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '10px',
            border: `1px solid ${hexToRgba(canvasBorderColor || '#fde68a', 0.35)}`,
            zIndex: 8,
            pointerEvents: 'none',
          }} />
          {/* Corner diamonds */}
          {[
            { top: '8px', left: '8px' },
            { top: '8px', right: '8px' },
            { bottom: '8px', left: '8px' },
            { bottom: '8px', right: '8px' },
          ].map((pos, i) => (
            <div key={i} style={{
              position: 'absolute',
              ...pos,
              width: '10px',
              height: '10px',
              background: hexToRgba(canvasBorderColor || '#fde68a', 0.85),
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              zIndex: 9,
              pointerEvents: 'none',
              filter: `drop-shadow(0 0 5px ${hexToRgba(canvasBorderColor || '#fde68a', 0.75)})`,
            }} />
          ))}

          {/* Sparkle Overlay — hidden during export */}
          {!isExporting && (
            <div className="sparkle-overlay">
              {sparkles.map(s => (
                <div
                  key={s.id}
                  className="spark"
                  style={{
                    left: s.left,
                    top: s.top,
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    '--dur': `${s.dur}s`,
                    '--delay': `${s.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Wishing [name] — top of card */}
          {toName && (
            <div style={{
              position: 'absolute',
              top: '22px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 10,
              pointerEvents: 'none',
              padding: '0 28px',
            }}>
              <span style={{
                fontFamily: "'Outfit', 'Anek Bangla', sans-serif",
                fontSize: '19px',
                fontWeight: 800,
                color: hexToRgba(canvasBorderColor || '#fde68a', 1),
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                textShadow: `0 0 18px ${hexToRgba(canvasBorderColor || '#fde68a', 0.9)}, 0 2px 6px rgba(0,0,0,0.5)`,
              }}>
                ✦ Wishing {toName} ✦
              </span>
            </div>
          )}

          {/* Placeholder */}
          {isEmpty && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', gap: '10px'
            }}>
              <span style={{ fontSize: '52px', filter: 'drop-shadow(0 0 12px rgba(129,140,248,0.4))' }}>🕌</span>
              <p style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', fontFamily: 'Anek Bangla' }}>
                ঈদ মুবারক
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)', marginTop: '-4px' }}>
                Pick a template or add elements
              </p>
            </div>
          )}

          {/* Elements */}
          {elements.map(el => (
            <div
              key={el.id}
              onPointerDown={(e) => handlePointerDown(e, el.id)}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                left: el.x || 0,
                top: el.y || 0,
                cursor: isDragging && activeElementId === el.id ? 'grabbing' : 'grab',
                outline: activeElementId === el.id ? '2px dashed rgba(129,140,248,0.8)' : '2px solid transparent',
                outlineOffset: '4px',
                padding: '4px',
                userSelect: 'none',
                touchAction: 'none',
                animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              }}
            >
              {/* ✕ Delete button — appears on selection */}
              {activeElementId === el.id && !isExporting && (
                <button
                  onPointerDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); removeElement(el.id); }}
                  style={{
                    position: 'absolute', top: '-14px', right: '-14px',
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: '#ef4444', color: '#fff', border: '2px solid #fff',
                    fontSize: '14px', fontWeight: 'bold', lineHeight: 1,
                    cursor: 'pointer', zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 10px rgba(239,68,68,0.7)',
                  }}
                >✕</button>
              )}
              {el.type === 'text' && (
                <div style={{
                  fontFamily: el.fontFamily || 'Inter',
                  color: el.color || '#ffffff',
                  fontSize: el.fontSize || '24px',
                  fontWeight: el.fontWeight || 'bold',
                  whiteSpace: 'pre-wrap',
                  maxWidth: '360px',
                  lineHeight: 1.3,
                  textShadow: el.textShadow || '0 2px 8px rgba(0,0,0,0.3)'
                }}>
                  {el.content}
                </div>
              )}
              {el.type === 'sticker' && (
                <div style={{
                  fontSize: el.fontSize || '64px',
                  lineHeight: 1,
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
                  transition: 'transform 0.2s ease',
                }}>
                  {el.content}
                </div>
              )}
            </div>
          ))}

          {/* From your beloved [name] — bottom of card */}
          {fromName && (
            <div style={{
              position: 'absolute',
              bottom: '22px',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 10,
              pointerEvents: 'none',
              padding: '0 28px',
            }}>
              <span style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: '16px',
                fontStyle: 'italic',
                fontWeight: 700,
                color: hexToRgba(canvasBorderColor || '#fde68a', 1),
                letterSpacing: '0.5px',
                textShadow: `0 0 16px ${hexToRgba(canvasBorderColor || '#fde68a', 0.85)}, 0 2px 6px rgba(0,0,0,0.5)`,
              }}>
                — From your beloved {fromName} —
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
