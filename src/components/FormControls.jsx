import './FormControls.scss';

export function Section({ eyebrow, title, description, children }) {
  return (
    <div className="cfg-section">
      <div className="cfg-section__head">
        {eyebrow && <span className="cfg-section__eyebrow">{eyebrow}</span>}
        <h3 className="cfg-section__title">{title}</h3>
        {description && <p className="cfg-section__desc">{description}</p>}
      </div>
      <div className="cfg-section__body">{children}</div>
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="cfg-field">
      <span className="cfg-field__label">{label}</span>
      {children}
      {hint && <span className="cfg-field__hint">{hint}</span>}
    </label>
  );
}

export function TextInput({ value, onChange, placeholder, maxLength }) {
  return (
    <input
      className="cfg-input"
      type="text"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function TextArea({ value, onChange, placeholder, rows = 2 }) {
  return (
    <textarea
      className="cfg-input cfg-input--area"
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`cfg-toggle ${checked ? 'cfg-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="cfg-toggle__track">
        <span className="cfg-toggle__thumb" />
      </span>
      {label && <span className="cfg-toggle__label">{label}</span>}
    </button>
  );
}

export function SegmentedControl({ value, onChange, options }) {
  return (
    <div className="cfg-segmented" role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          className={`cfg-segmented__item ${value === opt.value ? 'cfg-segmented__item--active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function ColorField({ label, value, onChange }) {
  return (
    <div className="cfg-color">
      <span className="cfg-color__label">{label}</span>
      <div className="cfg-color__control">
        <label className="cfg-color__swatch-wrap" style={{ background: value }}>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="cfg-color__native"
            aria-label={label}
          />
        </label>
        <input
          type="text"
          className="cfg-color__hex"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={7}
        />
      </div>
    </div>
  );
}

export function SliderField({ label, value, onChange, min, max, step = 1, unit = '' }) {
  return (
    <div className="cfg-slider">
      <div className="cfg-slider__top">
        <span className="cfg-slider__label">{label}</span>
        <span className="cfg-slider__value">{value}{unit}</span>
      </div>
      <input
        type="range"
        className="cfg-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function ButtonGroup({ value, onChange, options }) {
  return (
    <div className="cfg-btngroup">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`cfg-btngroup__item ${value === opt.value ? 'cfg-btngroup__item--active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
