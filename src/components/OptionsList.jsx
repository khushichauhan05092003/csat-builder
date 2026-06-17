import { Plus, X, GripVertical } from 'lucide-react';
import './OptionsList.scss';

export default function OptionsList({ options, onAdd, onUpdate, onDelete, max = 6 }) {
  return (
    <div className="opts">
      <div className="opts__list">
        {options.map((opt, idx) => (
          <div className="opts__row" key={opt.id}>
            <GripVertical size={14} className="opts__grip" aria-hidden="true" />
            <input
              className="opts__input"
              type="text"
              value={opt.label}
              placeholder={`Option ${idx + 1}`}
              maxLength={40}
              onChange={(e) => onUpdate(opt.id, e.target.value)}
            />
            <button
              type="button"
              className="opts__delete"
              onClick={() => onDelete(opt.id)}
              disabled={options.length <= 1}
              aria-label={`Delete option ${idx + 1}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {options.length === 0 && (
        <p className="opts__empty">No options yet. Add one below.</p>
      )}

      <button
        type="button"
        className="opts__add"
        onClick={onAdd}
        disabled={options.length >= max}
      >
        <Plus size={14} />
        Add option
      </button>
      <span className="opts__limit">{options.length}/{max} options</span>
    </div>
  );
}
