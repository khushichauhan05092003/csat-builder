import { createContext, useContext, useState, useCallback } from 'react';

const CampaignContext = createContext(null);

let optionIdCounter = 0;
const nextOptionId = () => `opt_${Date.now()}_${optionIdCounter++}`;

export const defaultCampaign = {
  content: {
    initial: {
      title: 'How was your experience?',
      subtitle: 'Your feedback helps us get better.',
    },
    feedback: {
      ratingStyle: 'stars', // 'stars' | 'numbers'
      options: [
        { id: nextOptionId(), label: 'Easy to use' },
        { id: nextOptionId(), label: 'Great support' },
        { id: nextOptionId(), label: 'Fast performance' },
      ],
      commentEnabled: true,
      commentPlaceholder: 'Tell us more (optional)',
      submitText: 'Submit Feedback',
    },
    thankYou: {
      mediaType: 'none', // 'none' | 'image' | 'lottie'
      mediaUrl: '',
      mediaName: '',
      title: 'Thank you!',
      subtitle: 'We appreciate you taking the time to share your thoughts.',
      buttonText: 'Done',
    },
  },
  styling: {
    backgroundColor: '#FFFFFF',
    titleColor: '#15161A',
    subtitleColor: '#6B6F76',
    buttonColor: '#6457E8',
    buttonTextColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 16,
    buttonWidth: 100, // percent
    buttonHeight: 48,
    ratingSelectedColor: '#6457E8',
    ratingUnselectedColor: '#D8D9DE',
  },
};

export function CampaignProvider({ children }) {
  const [campaign, setCampaign] = useState(defaultCampaign);
  const [activePreviewPage, setActivePreviewPage] = useState('initial'); // 'initial' | 'feedback' | 'thankYou'

  const updateContent = useCallback((section, patch) => {
    setCampaign((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: {
          ...prev.content[section],
          ...patch,
        },
      },
    }));
  }, []);

  const updateStyling = useCallback((patch) => {
    setCampaign((prev) => ({
      ...prev,
      styling: {
        ...prev.styling,
        ...patch,
      },
    }));
  }, []);

  const addOption = useCallback(() => {
    setCampaign((prev) => {
      const options = prev.content.feedback.options;
      if (options.length >= 6) return prev;
      return {
        ...prev,
        content: {
          ...prev.content,
          feedback: {
            ...prev.content.feedback,
            options: [...options, { id: nextOptionId(), label: '' }],
          },
        },
      };
    });
  }, []);

  const updateOption = useCallback((id, label) => {
    setCampaign((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        feedback: {
          ...prev.content.feedback,
          options: prev.content.feedback.options.map((o) =>
            o.id === id ? { ...o, label } : o
          ),
        },
      },
    }));
  }, []);

  const deleteOption = useCallback((id) => {
    setCampaign((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        feedback: {
          ...prev.content.feedback,
          options: prev.content.feedback.options.filter((o) => o.id !== id),
        },
      },
    }));
  }, []);

  const value = {
    campaign,
    updateContent,
    updateStyling,
    addOption,
    updateOption,
    deleteOption,
    activePreviewPage,
    setActivePreviewPage,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error('useCampaign must be used within CampaignProvider');
  return ctx;
}
