import { X } from 'lucide-react';
import { getPopupStyles } from './popupStyleUtils';
import './Popup.scss';

export default function PopupInitial({ campaign }) {
  const { initial } = campaign.content;
  const styles = getPopupStyles(campaign.styling);

  return (
    <div className="popup-card" style={styles.card}>
      <button className="popup-card__close" aria-hidden="true" tabIndex={-1}>
        <X size={13} />
      </button>
      <div className="popup-card__grabber" />
      <h3 className="popup-card__title" style={styles.title}>
        {initial.title || 'How was your experience?'}
      </h3>
      <p className="popup-card__subtitle" style={styles.subtitle}>
        {initial.subtitle || 'Your feedback helps us get better.'}
      </p>
      <button className="popup-card__button" style={styles.button} tabIndex={-1}>
        Start
      </button>
    </div>
  );
}
