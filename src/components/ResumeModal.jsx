import React from 'react';

function ResumeModal() {
  return (
    <div className="cv-modal" id="cv-modal" aria-hidden="true">
      <div className="cv-modal-backdrop" data-close-cv="true"></div>
      <div className="cv-modal-panel" role="dialog" aria-modal="true" aria-labelledby="cv-modal-title">
        <div className="cv-modal-head">
          <h3 id="cv-modal-title">Mohan&apos;s Resume</h3>
          <button className="cv-modal-close" id="close-cv-modal" type="button" aria-label="Close CV preview">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="cv-modal-actions">
          <a className="btn btn-primary" href="/Mohan_Resume.pdf" download>
            Download CV
          </a>
          <a className="btn btn-ghost" href="/Mohan_Resume.pdf" target="_blank" rel="noreferrer">
            Open in New Tab
          </a>
        </div>
        <div className="cv-modal-viewer">
          <iframe src="/Mohan_Resume.pdf#view=FitH" title="Mohan&apos;s Resume PDF preview" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
