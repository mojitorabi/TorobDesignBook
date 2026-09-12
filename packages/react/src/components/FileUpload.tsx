/* FileUpload — Torob Design System
 * عکس محصول و مدارک فروشگاه. از دوربین گوشی یا از پوشهٔ دسکتاپ.
 * Docs: /components/file-upload.html
 */
import { clsx, toFa, formatPrice, formatDistance } from '../utils';

export function FileUpload({ accept, multiple, maxSize, files, onFiles, hint }) {
  const [dragging, setDragging] = useState(false);
  const take = list => onFiles([...list].filter(f => !maxSize || f.size <= maxSize));
  return (
    <>
      <label className="t-upload" data-dragging={dragging || undefined}
             onDragOver={e => { e.preventDefault(); setDragging(true); }}
             onDragLeave={() => setDragging(false)}
             onDrop={e => { e.preventDefault(); setDragging(false); take(e.dataTransfer.files); }}>
        <UploadIcon className="t-icon t-upload__icon" aria-hidden="true" />
        <span className="t-upload__title">{dragging ? 'رها کنید' : 'انتخاب عکس'}</span>
        <span className="t-upload__hint">{hint}</span>
        <input type="file" accept={accept} multiple={multiple}
               onChange={e => take(e.target.files)} />
      </label>
      <div className="t-upload-list" aria-live="polite">
        {files.map(f => (
          <div className="t-upload-item" key={f.name}>
            <ImageIcon className="t-icon t-icon--sm" aria-hidden="true" />
            <span className="t-upload-item__name">{f.name}</span>
            <span className="t-upload-item__size">{faSize(f.size)}</span>
            <IconButton size="sm" label={`حذف ${f.name}`} onClick={() => onFiles(files.filter(x => x !== f))}>
              <CloseIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </>
  );
}
