import { useCampaign } from '../context/CampaignContext';
import { Section, ColorField, SliderField, ButtonGroup } from './FormControls';

export default function StylingTab() {
  const { campaign, updateStyling } = useCampaign();
  const s = campaign.styling;

  return (
    <div>
      <Section eyebrow="Surface" title="Background & text colors">
        <ColorField
          label="Background color"
          value={s.backgroundColor}
          onChange={(v) => updateStyling({ backgroundColor: v })}
        />
        <ColorField
          label="Title color"
          value={s.titleColor}
          onChange={(v) => updateStyling({ titleColor: v })}
        />
        <ColorField
          label="Subtitle color"
          value={s.subtitleColor}
          onChange={(v) => updateStyling({ subtitleColor: v })}
        />
      </Section>

      <Section eyebrow="Typography" title="Font size & weight">
        <SliderField
          label="Font size"
          value={s.fontSize}
          min={12}
          max={24}
          unit="px"
          onChange={(v) => updateStyling({ fontSize: v })}
        />
        <div>
          <span className="cfg-field__label" style={{ display: 'block', marginBottom: 8 }}>
            Font weight
          </span>
          <ButtonGroup
            value={s.fontWeight}
            onChange={(v) => updateStyling({ fontWeight: v })}
            options={[
              { value: 400, label: 'Regular' },
              { value: 600, label: 'Medium' },
              { value: 800, label: 'Bold' },
            ]}
          />
        </div>
      </Section>

      <Section eyebrow="Buttons" title="Button appearance">
        <ColorField
          label="Button color"
          value={s.buttonColor}
          onChange={(v) => updateStyling({ buttonColor: v })}
        />
        <ColorField
          label="Button text color"
          value={s.buttonTextColor}
          onChange={(v) => updateStyling({ buttonTextColor: v })}
        />
        <SliderField
          label="Button width"
          value={s.buttonWidth}
          min={40}
          max={100}
          unit="%"
          onChange={(v) => updateStyling({ buttonWidth: v })}
        />
        <SliderField
          label="Button height"
          value={s.buttonHeight}
          min={36}
          max={64}
          unit="px"
          onChange={(v) => updateStyling({ buttonHeight: v })}
        />
      </Section>

      <Section eyebrow="Shape" title="Corner radius">
        <SliderField
          label="Border radius"
          value={s.borderRadius}
          min={0}
          max={32}
          unit="px"
          onChange={(v) => updateStyling({ borderRadius: v })}
        />
      </Section>

      <Section eyebrow="Rating" title="Rating colors">
        <ColorField
          label="Selected color"
          value={s.ratingSelectedColor}
          onChange={(v) => updateStyling({ ratingSelectedColor: v })}
        />
        <ColorField
          label="Unselected color"
          value={s.ratingUnselectedColor}
          onChange={(v) => updateStyling({ ratingUnselectedColor: v })}
        />
      </Section>
    </div>
  );
}
