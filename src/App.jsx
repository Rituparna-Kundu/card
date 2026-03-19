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
          <span style={{ fontSize: '1.4rem' }}>🕌</span>
          <span className="header-title-text">Eid Card Creator</span>
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
