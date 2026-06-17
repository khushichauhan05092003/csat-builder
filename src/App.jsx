import { useState } from 'react';
import { CampaignProvider } from './context/CampaignContext';
import ContentTab from './components/ContentTab';
import StylingTab from './components/StylingTab';
import MobilePreview from './components/MobilePreview';
import './App.scss';

function App() {
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'styling'

  return (
    <CampaignProvider>
      <div className="app">
        <header className="app__topbar">
          <div className="app__brand">
            <span className="app__brand-mark">CS</span>
            <div className="app__brand-text">
              <span className="app__brand-name">CSAT Campaign Builder</span>
              <span className="app__brand-sub">Configure once, preview live</span>
            </div>
          </div>
          <div className="app__status">
            <span className="app__status-dot" />
            Live preview synced
          </div>
        </header>

        <div className="app__body">
          <section className="app__editor">
            <nav className="tabnav" role="tablist" aria-label="Campaign editor sections">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'content'}
                className={`tabnav__item ${activeTab === 'content' ? 'tabnav__item--active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                <span className="tabnav__eyebrow">01</span>
                Content
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'styling'}
                className={`tabnav__item ${activeTab === 'styling' ? 'tabnav__item--active' : ''}`}
                onClick={() => setActiveTab('styling')}
              >
                <span className="tabnav__eyebrow">02</span>
                Styling
              </button>
            </nav>

            <div className="app__panel">
              {activeTab === 'content' ? <ContentTab /> : <StylingTab />}
            </div>
          </section>

          <section className="app__preview">
            <MobilePreview />
          </section>
        </div>
      </div>
    </CampaignProvider>
  );
}

export default App;
