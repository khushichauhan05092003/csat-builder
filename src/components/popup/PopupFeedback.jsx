import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { getPopupStyles } from './popupStyleUtils';
import './Popup.scss';

export default function PopupFeedback({ campaign }) {
  const { feedback } = campaign.content;
  const { styling } = campaign;
  const styles = getPopupStyles(styling);

  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState(() => new Set());

  const toggleTag = (id) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="popup-card" style={styles.card}>
      <button className="popup-card__close" aria-hidden="true" tabIndex={-1}>
        <X size={13} />
      </button>
      <div className="popup-card__grabber" />
      <h3 className="popup-card__title" style={styles.title}>
        Rate your experience
      </h3>
      <p className="popup-card__subtitle" style={styles.subtitle}>
        Tap to choose a rating
      </p>

      {feedback.ratingStyle === 'stars' ? (
        <div className="popup-stars">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n <= (hoverRating || rating);
            return (
              <button
                key={n}
                className="popup-stars__star"
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(n)}
                aria-label={`Rate ${n} stars`}
              >
                <Star
                  size={26}
                  fill={active ? styling.ratingSelectedColor : 'none'}
                  color={active ? styling.ratingSelectedColor : styling.ratingUnselectedColor}
                  strokeWidth={1.8}
                />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="popup-numbers">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n === rating;
            return (
              <button
                key={n}
                className="popup-numbers__num"
                onClick={() => setRating(n)}
                style={{
                  background: active ? styling.ratingSelectedColor : 'transparent',
                  borderColor: active ? styling.ratingSelectedColor : styling.ratingUnselectedColor,
                  color: active ? styling.buttonTextColor : styling.ratingUnselectedColor,
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      )}

      {feedback.options.length > 0 && (
        <div className="popup-tags">
          {feedback.options.map((opt) => (
            <button
              key={opt.id}
              className={`popup-tags__tag ${selectedTags.has(opt.id) ? 'popup-tags__tag--selected' : ''}`}
              onClick={() => toggleTag(opt.id)}
            >
              {opt.label || 'Option'}
            </button>
          ))}
        </div>
      )}

      {feedback.commentEnabled && (
        <textarea
          className="popup-comment"
          placeholder={feedback.commentPlaceholder || 'Tell us more (optional)'}
          tabIndex={-1}
        />
      )}

      <button className="popup-card__button" style={styles.button} tabIndex={-1}>
        {feedback.submitText || 'Submit Feedback'}
      </button>
    </div>
  );
}
