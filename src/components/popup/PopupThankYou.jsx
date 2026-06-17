import { Check, Sparkles, X } from 'lucide-react';
import { getPopupStyles } from './popupStyleUtils';
import './Popup.scss';

export default function PopupThankYou({ campaign }) {
  const { thankYou } = campaign.content;
  const styles = getPopupStyles(campaign.styling);

  return (
    <div className="popup-card" style={styles.card}>
      <button className="popup-card__close" aria-hidden="true" tabIndex={-1}>
        <X size={13} />
      </button>
      <div className="popup-card__grabber" />

      {thankYou.mediaType === 'image' && thankYou.mediaUrl ? (
        <div className="popup-media">
          <img src={thankYou.mediaUrl} alt="" />
        </div>
      ) : thankYou.mediaType === 'lottie' ? (
        <div className="popup-media popup-media--placeholder">
          <Sparkles size={28} />
        </div>
      ) : (
        <div className="popup-media popup-media--check">
          <Check size={30} strokeWidth={2.4} />
        </div>
      )}

      <h3 className="popup-card__title" style={styles.title}>
        {thankYou.title || 'Thank you!'}
      </h3>
      <p className="popup-card__subtitle" style={styles.subtitle}>
        {thankYou.subtitle || 'We appreciate you taking the time to share your thoughts.'}
      </p>
      <button className="popup-card__button" style={styles.button} tabIndex={-1}>
        {thankYou.buttonText || 'Done'}
      </button>
    </div>
  );
}
