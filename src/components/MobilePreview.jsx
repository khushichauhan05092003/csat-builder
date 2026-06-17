import { useCampaign } from '../context/CampaignContext';
import PopupInitial from './popup/PopupInitial';
import PopupFeedback from './popup/PopupFeedback';
import PopupThankYou from './popup/PopupThankYou';
import './MobilePreview.scss';

const PAGES = [
  { key: 'initial', label: 'Initial' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'thankYou', label: 'Thank you' },
];

export default function MobilePreview() {
  const { campaign, activePreviewPage, setActivePreviewPage } = useCampaign();

  return (
    <div className="mpreview">
      <div className="mpreview__label">
        <span className="mpreview__label-dot" />
        Live preview
      </div>

      <div className="mpreview__phone">
        <div className="mpreview__notch" />
        <div className="mpreview__screen">
          <div className="mpreview__statusbar">
            <span>9:41</span>
            <div className="mpreview__statusbar-icons" />
          </div>

          <div className="mpreview__appbg">
            <div className="mpreview__popup-anchor">
              {activePreviewPage === 'initial' && <PopupInitial campaign={campaign} />}
              {activePreviewPage === 'feedback' && <PopupFeedback campaign={campaign} />}
              {activePreviewPage === 'thankYou' && <PopupThankYou campaign={campaign} />}
            </div>
          </div>
        </div>
        <div className="mpreview__homebar" />
      </div>

      <div className="mpreview__switcher" role="tablist" aria-label="Preview page">
        {PAGES.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={activePreviewPage === p.key}
            className={`mpreview__switch-item ${activePreviewPage === p.key ? 'mpreview__switch-item--active' : ''}`}
            onClick={() => setActivePreviewPage(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
