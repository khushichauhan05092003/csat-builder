import { Star, Hash } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { Section, Field, TextInput, TextArea, Toggle, SegmentedControl } from './FormControls';
import OptionsList from './OptionsList';
import MediaUpload from './MediaUpload';

export default function ContentTab() {
  const {
    campaign,
    updateContent,
    addOption,
    updateOption,
    deleteOption,
    setActivePreviewPage,
  } = useCampaign();

  const { initial, feedback, thankYou } = campaign.content;

  return (
    <div>
      <Section
        eyebrow="Step 1"
        title="Initial prompt"
        description="The first thing a customer sees when the popup opens."
      >
        <div onFocus={() => setActivePreviewPage('initial')}>
          <Field label="Title">
            <TextInput
              value={initial.title}
              placeholder="How was your experience?"
              maxLength={60}
              onChange={(v) => updateContent('initial', { title: v })}
            />
          </Field>
          <Field label="Subtitle">
            <TextArea
              value={initial.subtitle}
              placeholder="Your feedback helps us get better."
              rows={2}
              onChange={(v) => updateContent('initial', { subtitle: v })}
            />
          </Field>
        </div>
      </Section>

      <Section
        eyebrow="Step 2"
        title="Feedback page"
        description="Where the customer rates their experience and leaves details."
      >
        <div onFocus={() => setActivePreviewPage('feedback')}>
          <Field label="Rating style">
            <SegmentedControl
              value={feedback.ratingStyle}
              onChange={(v) => updateContent('feedback', { ratingStyle: v })}
              options={[
                { value: 'stars', label: 'Stars', icon: <Star /> },
                { value: 'numbers', label: 'Numbers 1–5', icon: <Hash /> },
              ]}
            />
          </Field>

          <Field label="Feedback options" hint="Shown as selectable tags under the rating. Up to 6.">
            <OptionsList
              options={feedback.options}
              onAdd={addOption}
              onUpdate={updateOption}
              onDelete={deleteOption}
            />
          </Field>

          <Field label="Additional comment box">
            <Toggle
              checked={feedback.commentEnabled}
              onChange={(v) => updateContent('feedback', { commentEnabled: v })}
              label={feedback.commentEnabled ? 'Visible to customers' : 'Hidden'}
            />
          </Field>

          {feedback.commentEnabled && (
            <Field label="Comment placeholder">
              <TextInput
                value={feedback.commentPlaceholder}
                placeholder="Tell us more (optional)"
                maxLength={60}
                onChange={(v) => updateContent('feedback', { commentPlaceholder: v })}
              />
            </Field>
          )}

          <Field label="Submit button text">
            <TextInput
              value={feedback.submitText}
              placeholder="Submit Feedback"
              maxLength={24}
              onChange={(v) => updateContent('feedback', { submitText: v })}
            />
          </Field>
        </div>
      </Section>

      <Section
        eyebrow="Step 3"
        title="Thank you page"
        description="The closing message shown once feedback is submitted."
      >
        <div onFocus={() => setActivePreviewPage('thankYou')}>
          <Field label="Media" hint="PNG, JPG, JPEG, GIF, or Lottie (.json)">
            <MediaUpload
              mediaType={thankYou.mediaType}
              mediaUrl={thankYou.mediaUrl}
              mediaName={thankYou.mediaName}
              onChange={(patch) => updateContent('thankYou', patch)}
            />
          </Field>
          <Field label="Title">
            <TextInput
              value={thankYou.title}
              placeholder="Thank you!"
              maxLength={60}
              onChange={(v) => updateContent('thankYou', { title: v })}
            />
          </Field>
          <Field label="Subtitle">
            <TextArea
              value={thankYou.subtitle}
              placeholder="We appreciate you taking the time to share your thoughts."
              rows={2}
              onChange={(v) => updateContent('thankYou', { subtitle: v })}
            />
          </Field>
          <Field label="Button text">
            <TextInput
              value={thankYou.buttonText}
              placeholder="Done"
              maxLength={24}
              onChange={(v) => updateContent('thankYou', { buttonText: v })}
            />
          </Field>
        </div>
      </Section>
    </div>
  );
}
