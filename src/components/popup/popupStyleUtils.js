export function getPopupStyles(styling) {
  return {
    card: {
      background: styling.backgroundColor,
      borderRadius: `${styling.borderRadius}px`,
      fontSize: `${styling.fontSize}px`,
    },
    title: {
      color: styling.titleColor,
      fontWeight: styling.fontWeight,
      fontSize: `${styling.fontSize + 4}px`,
    },
    subtitle: {
      color: styling.subtitleColor,
      fontWeight: 400,
      fontSize: `${styling.fontSize - 1}px`,
    },
    button: {
      background: styling.buttonColor,
      color: styling.buttonTextColor,
      fontWeight: styling.fontWeight,
      fontSize: `${styling.fontSize}px`,
      width: `${styling.buttonWidth}%`,
      height: `${styling.buttonHeight}px`,
      borderRadius: `${Math.min(styling.borderRadius, styling.buttonHeight / 2)}px`,
    },
  };
}
