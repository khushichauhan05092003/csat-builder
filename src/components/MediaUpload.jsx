import { useRef } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import './MediaUpload.scss';

const ACCEPTED = '.png,.jpg,.jpeg,.gif,.json';

export default function MediaUpload({ mediaType, mediaUrl, mediaName, onChange }) {
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const isLottie = file.name.toLowerCase().endsWith('.json');
    const isImage = /\.(png|jpe?g|gif)$/i.test(file.name);

    if (!isLottie && !isImage) {
      alert('Please upload a PNG, JPG, JPEG, GIF, or Lottie (.json) file.');
      return;
    }

    if (isLottie) {
      // Store as lottie reference; we don't render the animation itself,
      // just acknowledge the upload in the preview.
      onChange({ mediaType: 'lottie', mediaUrl: '', mediaName: file.name });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({ mediaType: 'image', mediaUrl: reader.result, mediaName: file.name });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const clear = () => {
    onChange({ mediaType: 'none', mediaUrl: '', mediaName: '' });
    if (inputRef.current) inputRef.current.value = '';
  };

  if (mediaType !== 'none') {
    return (
      <div className="media-upload media-upload--filled">
        <div className="media-upload__preview">
          {mediaType === 'image' ? (
            <img src={mediaUrl} alt="Uploaded media" />
          ) : (
            <div className="media-upload__lottie-badge">
              <Sparkles size={18} />
            </div>
          )}
        </div>
        <div className="media-upload__meta">
          <span className="media-upload__name">{mediaName}</span>
          <span className="media-upload__type">{mediaType === 'lottie' ? 'Lottie animation' : 'Image'}</span>
        </div>
        <button type="button" className="media-upload__clear" onClick={clear} aria-label="Remove media">
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="media-upload media-upload--empty"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click(); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <div className="media-upload__icon">
        <Upload size={18} />
      </div>
      <div className="media-upload__copy">
        <span className="media-upload__title">Upload media</span>
        <span className="media-upload__hint">PNG, JPG, JPEG, GIF, or Lottie · Click or drag a file</span>
      </div>
      <ImageIcon size={16} className="media-upload__decor" />
    </div>
  );
}
