import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import ToolsPanel from './components/ToolsPanel';
import Canvas from './components/Canvas';
import { exportCardAsImage } from './utils/export';

function App() {
  const [selectedTool, setSelectedTool] = useState('templates');
  const [elements, setElements] = useState([]);
  const [activeElementId, setActiveElementId] = useState(null);
  const [canvasBg, setCanvasBg] = useState({ type: 'gradient', value: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' });
  const [canvasBorderColor, setCanvasBorderColor] = useState('#fde68a');
  const [isExporting, setIsExporting] = useState(false);
  const [toName, setToName] = useState('');
  const [structuredLayout, setStructuredLayout] = useState(null);
  const [fromName, setFromName] = useState('');
  const [messageBn, setMessageBn] = useState('');
  const [messageEn, setMessageEn] = useState('');
  const [messageFont, setMessageFont] = useState('Anek Bangla');
  const [messageSize, setMessageSize] = useState('13');
  const [messageColor, setMessageColor] = useState('');
  const [toLabel, setToLabel] = useState({ bangla: 'প্রতি', english: 'To' });
  const [fromLabel, setFromLabel] = useState({ bangla: 'পক্ষ থেকে', english: 'From' });

  // Keep a ref so the keyboard handler always sees current state
  const stateRef = useRef({ activeElementId, elements });
  useEffect(() => {
    stateRef.current = { activeElementId, elements };
  }, [activeElementId, elements]);

  // Keyboard shortcut: Delete / Backspace removes selected element
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if ((e.key === 'Delete' || e.key === 'Backspace') && stateRef.current.activeElementId) {
        setElements(prev => prev.filter(el => el.id !== stateRef.current.activeElementId));
        setActiveElementId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const addElement = (element) => {
    setElements(prev => [...prev, { ...element, id: Date.now().toString() + Math.random().toString(36).slice(2, 5) }]);
  };

  const updateElement = (id, newProps) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...newProps } : el));
  };

  const removeElement = (id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (activeElementId === id) setActiveElementId(null);
  };

  const applyTemplate = (template) => {
    setActiveElementId(null);
    setCanvasBg(template.bg);
    if (template.borderColor) setCanvasBorderColor(template.borderColor);
    if (template.toLabel) setToLabel(template.toLabel);
    if (template.fromLabel) setFromLabel(template.fromLabel);
    if (template.structured) {
      setStructuredLayout({ layoutId: template.layoutId, props: template.layoutProps });
    } else {
      setStructuredLayout(null);
    }
    const newElements = (template.elements || []).map((el, i) => ({
      ...el,
      id: Date.now().toString() + '_' + i
    }));
    setElements(newElements);
  };

  const handleExport = async () => {
    setActiveElementId(null);
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 150));
    await exportCardAsImage('card-canvas', 'eid-mubarak-card.png');
    setIsExporting(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title">
          <div className="glitter-logo-container">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="glitter-logo-svg">
              <defs>
                <linearGradient id="logo-grad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818CF8" />
                  <stop offset="0.5" stopColor="#C084FC" />
                  <stop offset="1" stopColor="#F59E0B" />
                </linearGradient>
                <filter id="logo-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path d="M16 2L19.4 10.6L28 12.5L21.2 18L23.4 26.5L16 22L8.6 26.5L10.8 18L4 12.5L12.6 10.6L16 2Z" fill="url(#logo-grad)" filter="url(#logo-glow)" />
              <circle cx="16" cy="16" r="4" fill="white" opacity="0.3" />
            </svg>
            <span className="glitter-stars">✨</span>
          </div>
          <span className="header-title-text" style={{ letterSpacing: '0.5px' }}>RuhaniCards</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
            {elements.length} element{elements.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-primary"
            style={{
              width: 'auto',
              padding: '9px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: isExporting ? 0.7 : 1,
              cursor: isExporting ? 'wait' : 'pointer',
              background: isExporting ? '#475569' : undefined
            }}
          >
            {isExporting ? '⏳ Exporting...' : '⬇ Download Card'}
          </button>
        </div>
      </header>
      <main className="workspace-area">
        <ToolsPanel
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          addElement={addElement}
          canvasBg={canvasBg}
          setCanvasBg={setCanvasBg}
          elements={elements}
          activeElementId={activeElementId}
          updateElement={updateElement}
          removeElement={removeElement}
          toName={toName}
          setToName={setToName}
          fromName={fromName}
          setFromName={setFromName}
          messageBn={messageBn}
          setMessageBn={setMessageBn}
          messageEn={messageEn}
          setMessageEn={setMessageEn}
          messageFont={messageFont}
          setMessageFont={setMessageFont}
          messageSize={messageSize}
          setMessageSize={setMessageSize}
          messageColor={messageColor}
          setMessageColor={setMessageColor}
          applyTemplate={applyTemplate}
        />
        <Canvas
          elements={elements}
          updateElement={updateElement}
          removeElement={removeElement}
          activeElementId={activeElementId}
          setActiveElementId={setActiveElementId}
          canvasBg={canvasBg}
          canvasBorderColor={canvasBorderColor}
          toName={toName}
          fromName={fromName}
          messageBn={messageBn}
          messageEn={messageEn}
          messageFont={messageFont}
          messageSize={messageSize}
          messageColor={messageColor}
          isExporting={isExporting}
          structuredLayout={structuredLayout}
        />
      </main>
    </div>
  );
}

export default App;
