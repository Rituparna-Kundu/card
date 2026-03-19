import React, { useState } from 'react';
import TEMPLATES from '../utils/templates';

const TOOLS = [
    { id: 'templates', icon: '📋', label: 'Templates' },
    { id: 'background', icon: '🎨', label: 'BG' },
    { id: 'text', icon: 'T', label: 'Text' },
    { id: 'stickers', icon: '🌙', label: 'Stickers' },
    { id: 'tofrom', icon: '💌', label: 'To/From' },
];

const PRESET_COLORS = ['#ffffff', '#f8fafc', '#e2e8f0', '#fecdd3', '#bfdbfe', '#fef08a', '#c7d2fe', '#0f172a', '#166534', '#7c2d12'];
const PRESET_GRADIENTS = [
    { label: 'Sunset', value: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
    { label: 'Ocean', value: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
    { label: 'Lavender', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { label: 'Night', value: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' },
    { label: 'Gold', value: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
    { label: 'Emerald', value: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
    { label: 'Rose', value: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)' },
    { label: 'Midnight', value: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
];

const STICKERS = ['🌙', '🕌', '✨', '⭐', '🏮', '📿', '🕋', '🌟', '🎆', '🤲', '💚', '🌿', '🌹', '🎁', '💫', '🪷'];
const FONTS = ['Anek Bangla', 'Inter', 'Outfit', 'Georgia', 'Impact', 'Trebuchet MS'];
const TEXT_COLORS = ['#0f172a', '#ffffff', '#fde68a', '#86efac', '#f9a8d4', '#93c5fd', '#ef4444', '#22c55e', '#c084fc', '#f59e0b'];
const TEXT_SIZES = [
    { label: 'S', value: '18px' },
    { label: 'M', value: '28px' },
    { label: 'L', value: '40px' },
    { label: 'XL', value: '56px' },
];

const ToolsPanel = ({
    selectedTool, setSelectedTool, addElement, canvasBg, setCanvasBg,
    elements, activeElementId, updateElement, removeElement,
    toName, setToName, fromName, setFromName,
    messageBn, setMessageBn, messageEn, setMessageEn,
    messageFont, setMessageFont, messageSize, setMessageSize,
    messageColor, setMessageColor,
    applyTemplate
}) => {
    const [textInput, setTextInput] = useState('Eid Mubarak');
    const [textColor, setTextColor] = useState('#ffffff');
    const [textFont, setTextFont] = useState('Anek Bangla');
    const [textSize, setTextSize] = useState('32px');
    const [confirmTemplate, setConfirmTemplate] = useState(null);

    const activeEl = elements?.find(el => el.id === activeElementId);

    const handleAddText = () => {
        addElement({
            type: 'text',
            content: textInput,
            x: 80,
            y: 200,
            scale: 1,
            rotation: 0,
            color: textColor,
            fontFamily: textFont,
            fontSize: textSize,
            fontWeight: 'bold'
        });
    };

    const handleAddSticker = (sticker) => {
        addElement({
            type: 'sticker',
            content: sticker,
            x: 140,
            y: 140,
            scale: 1,
            rotation: 0,
            fontSize: '64px'
        });
    };

    const handleTemplateClick = (template) => {
        if (elements.length > 0) {
            setConfirmTemplate(template);
        } else {
            applyTemplate(template);
        }
    };

    const confirmApplyTemplate = () => {
        if (confirmTemplate) {
            applyTemplate(confirmTemplate);
            setConfirmTemplate(null);
        }
    };

    return (
        <>
            <aside className="tools-panel glass">
                {/* Tool Navigation */}
                <div className="tool-nav">
                    {TOOLS.map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setSelectedTool(tool.id)}
                            className={`tool-nav-btn ${selectedTool === tool.id ? 'active' : ''}`}
                        >
                            <span className="tool-icon">{tool.icon}</span>
                            <span className="tool-label">{tool.label}</span>
                        </button>
                    ))}
                </div>

                {/* Active Element Controls */}
                {activeEl && (
                    <div style={{
                        borderBottom: '1px solid var(--panel-border)',
                        padding: '12px 16px',
                        background: 'rgba(129, 140, 248, 0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                ✦ Selected Element
                            </span>
                            <button onClick={() => removeElement(activeElementId)} className="btn-danger">
                                🗑 Delete
                            </button>
                        </div>
                        {activeEl.type === 'text' && (
                            <>
                                <div>
                                    <label className="section-label" style={{ marginBottom: '4px', display: 'block' }}>Font Size</label>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {TEXT_SIZES.map(s => (
                                            <button key={s.value} onClick={() => updateElement(activeElementId, { fontSize: s.value })}
                                                className={`size-btn ${activeEl.fontSize === s.value ? 'active' : ''}`}>
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="section-label" style={{ marginBottom: '4px', display: 'block' }}>Color</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {TEXT_COLORS.map(c => (
                                            <button key={c} onClick={() => updateElement(activeElementId, { color: c })}
                                                className={`color-swatch ${activeEl.color === c ? 'active' : ''}`}
                                                style={{ width: '24px', height: '24px', background: c }} />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="section-label" style={{ marginBottom: '4px', display: 'block' }}>Font</label>
                                    <select value={activeEl.fontFamily}
                                        onChange={e => updateElement(activeElementId, { fontFamily: e.target.value })}
                                        className="select-dark">
                                        {FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                                    </select>
                                </div>
                            </>
                        )}
                        {activeEl.type === 'sticker' && (
                            <div>
                                <label className="section-label" style={{ marginBottom: '4px', display: 'block' }}>Size</label>
                                <input type="range" min={32} max={128} value={parseInt(activeEl.fontSize)}
                                    onChange={e => updateElement(activeElementId, { fontSize: `${e.target.value}px` })}
                                    style={{ width: '100%', accentColor: 'var(--primary)' }} />
                            </div>
                        )}
                    </div>
                )}

                {/* Tool Content Area */}
                <div className="tool-content" style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* TEMPLATES */}
                    {selectedTool === 'templates' && (
                        <>
                            <div>
                                <h3 className="section-label">Choose a Template</h3>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', marginTop: '-6px' }}>
                                    Pick a pre-designed card and customize it
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    {TEMPLATES.map((tmpl, i) => (
                                        <div key={tmpl.id} className="template-card" style={{ '--delay': `${i * 0.08}s` }} onClick={() => handleTemplateClick(tmpl)}>
                                            <div className="template-card-inner">
                                                <div className="template-card-preview" style={{ background: tmpl.bg.value }}>
                                                    <span className="template-emoji" style={{ '--delay': `${i * 0.3}s` }}>
                                                        {tmpl.emoji}
                                                    </span>
                                                </div>
                                                <div className="template-card-info">
                                                    <div className="template-card-name">{tmpl.name}</div>
                                                    <div className="template-card-desc">{tmpl.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* BACKGROUND */}
                    {selectedTool === 'background' && (
                        <>
                            <div>
                                <h3 className="section-label">Solid Colors</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {PRESET_COLORS.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setCanvasBg({ type: 'color', value: color })}
                                            title={color}
                                            className={`color-swatch ${canvasBg.value === color ? 'active' : ''}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="section-label">Gradients</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    {PRESET_GRADIENTS.map(g => (
                                        <button
                                            key={g.value}
                                            onClick={() => setCanvasBg({ type: 'gradient', value: g.value })}
                                            className={`gradient-swatch ${canvasBg.value === g.value ? 'active' : ''}`}
                                            style={{ background: g.value }}
                                            title={g.label}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* TEXT */}
                    {selectedTool === 'text' && (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>Card Text</label>
                                    <textarea
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        placeholder="ঈদ মুবারক / Eid Mubarak"
                                        className="input-dark"
                                        style={{
                                            minHeight: '72px', resize: 'vertical',
                                            fontFamily: textFont, lineHeight: 1.5
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>Font</label>
                                    <select value={textFont} onChange={e => setTextFont(e.target.value)} className="select-dark">
                                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>Size</label>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {TEXT_SIZES.map(s => (
                                            <button key={s.value} onClick={() => setTextSize(s.value)}
                                                className={`size-btn ${textSize === s.value ? 'active' : ''}`}>
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>Color</label>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                        {TEXT_COLORS.map(c => (
                                            <button key={c} onClick={() => setTextColor(c)}
                                                className={`color-swatch ${textColor === c ? 'active' : ''}`}
                                                style={{ width: '28px', height: '28px', background: c }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '16px' }}>
                                <p className="section-label">Presets</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {['ঈদ মুবারক 🌙', 'Eid Mubarak', 'ঈদের শুভেচ্ছা', 'Happy Eid!', 'জুমা মুবারক', 'May Allah bless you ✨'].map(preset => (
                                        <button key={preset} onClick={() => setTextInput(preset)} className="text-preset-btn">
                                            {preset}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button onClick={handleAddText} className="btn-primary">
                                ＋ Add to Canvas
                            </button>
                        </>
                    )}

                    {/* STICKERS */}
                    {selectedTool === 'stickers' && (
                        <>
                            <div>
                                <h3 className="section-label">Tap to Add</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                                    {STICKERS.map(sticker => (
                                        <button
                                            key={sticker}
                                            onClick={() => handleAddSticker(sticker)}
                                            className="sticker-btn"
                                        >
                                            {sticker}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* TO / FROM */}
                    {selectedTool === 'tofrom' && (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <h3 className="section-label">Personalize Your Card</h3>
                                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '-6px', marginBottom: '12px' }}>
                                        Names appear as glowing text on the card
                                    </p>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '8px' }}>Message Size</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                                        {[
                                            { label: 'S', value: '11' },
                                            { label: 'M', value: '13' },
                                            { label: 'L', value: '15' },
                                            { label: 'XL', value: '18' }
                                        ].map(s => (
                                            <button
                                                key={s.label}
                                                onClick={() => setMessageSize(s.value)}
                                                className={`size-btn ${messageSize === s.value ? 'active' : ''}`}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '8px' }}>Message Color</label>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {TEXT_COLORS.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setMessageColor(c)}
                                                className="color-btn"
                                                style={{
                                                    backgroundColor: c,
                                                    border: messageColor === c ? '2px solid #818cf8' : '2px solid transparent',
                                                    transform: messageColor === c ? 'scale(1.15)' : 'scale(1)',
                                                    width: '28px', height: '28px', borderRadius: '8px'
                                                }}
                                                title={c}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '4px' }}>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '8px' }}>Message Font</label>
                                    <select value={messageFont} onChange={e => setMessageFont(e.target.value)} className="select-dark">
                                        {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>
                                        💌 Message (Bangla)
                                    </label>
                                    <textarea
                                        value={messageBn}
                                        onChange={(e) => setMessageBn(e.target.value)}
                                        placeholder="আল্লাহ আপনার রহমত বর্ষণ করুন..."
                                        className="input-dark"
                                        style={{ minHeight: '60px', resize: 'vertical', fontFamily: 'Anek Bangla' }}
                                    />
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>
                                        💌 Message (English)
                                    </label>
                                    <textarea
                                        value={messageEn}
                                        onChange={(e) => setMessageEn(e.target.value)}
                                        placeholder="May Allah bless you with peace..."
                                        className="input-dark"
                                        style={{ minHeight: '60px', resize: 'vertical' }}
                                    />
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>
                                        🌟 Recipient name
                                        <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: '6px' }}>→ "Wishing _"</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={toName}
                                        onChange={(e) => setToName(e.target.value.slice(0, 30))}
                                        placeholder="e.g. Poushe, Rahima, Bhaiya..."
                                        className="input-dark"
                                    />
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
                                        {toName.length}/30
                                    </div>
                                </div>
                                <div>
                                    <label className="section-label" style={{ display: 'block', marginBottom: '6px' }}>
                                        ✍ Sender name
                                        <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: '6px' }}>→ "From your beloved _"</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={fromName}
                                        onChange={(e) => setFromName(e.target.value.slice(0, 30))}
                                        placeholder="e.g. Ritu, Your name..."
                                        className="input-dark"
                                    />
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
                                        {fromName.length}/30
                                    </div>
                                </div>

                                {/* Live Preview */}
                                {(toName || fromName || messageBn || messageEn) && (
                                    <div style={{
                                        background: 'linear-gradient(135deg, rgba(129,140,248,0.1), rgba(192,132,252,0.08))',
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '14px',
                                        border: '1px solid var(--panel-border)',
                                        textAlign: 'center'
                                    }}>
                                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Preview</p>
                                        {toName && (
                                            <p style={{ fontSize: '14px', color: '#fde68a', fontWeight: 600, fontFamily: 'Outfit' }}>
                                                Wishing {toName}
                                            </p>
                                        )}
                                        {messageBn && (
                                            <p style={{ fontSize: '13px', color: 'var(--text-main)', fontFamily: 'Anek Bangla', marginTop: '6px' }}>
                                                {messageBn}
                                            </p>
                                        )}
                                        {messageEn && (
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter', marginTop: '4px' }}>
                                                {messageEn}
                                            </p>
                                        )}
                                        {fromName && (
                                            <p style={{ fontSize: '13px', color: '#c4b5fd', fontStyle: 'italic', fontFamily: 'Outfit', marginTop: '6px' }}>
                                                From your beloved {fromName}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {(toName || fromName || messageBn || messageEn) && (
                                    <button
                                        onClick={() => { setToName(''); setFromName(''); setMessageBn(''); setMessageEn(''); }}
                                        style={{
                                            background: 'rgba(239,68,68,0.1)',
                                            color: '#f87171',
                                            padding: '8px',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Clear Names
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </aside>

            {/* Template Confirmation Dialog */}
            {confirmTemplate && (
                <div className="confirm-overlay" onClick={() => setConfirmTemplate(null)}>
                    <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
                        <h3>Apply "{confirmTemplate.name}"?</h3>
                        <p>This will replace your current card elements with the template design.</p>
                        <div className="confirm-buttons">
                            <button
                                onClick={() => setConfirmTemplate(null)}
                                style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmApplyTemplate}
                                className="btn-primary"
                            >
                                Apply Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ToolsPanel;
