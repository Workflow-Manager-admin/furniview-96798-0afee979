import React, { useState } from 'react';
import { insertInquiry } from '../utils/supabaseClient';

// PUBLIC_INTERFACE
function ContactModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setError] = useState('');
  const [done, setDone] = useState(false);

  // Simple contact/inquiry form
  const [form, setForm] = useState({
    name: '', email: '', message: ''
  });

  // PUBLIC_INTERFACE
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // PUBLIC_INTERFACE
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.message)
      return setError('All fields are required.');
    setLoading(true);
    try {
      const res = await insertInquiry(form);
      if (res.error) {
        setError('Could not send inquiry. Please try again.');
      } else {
        setDone(true);
      }
    } catch {
      setError('Could not send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="fv-modal-bg" onClick={onClose} role="dialog" aria-modal="true">
        <div className="fv-modal" onClick={e => e.stopPropagation()}>
          <button className="fv-modal-close" onClick={onClose} aria-label="Close form">&times;</button>
          <div style={{fontWeight: 700, fontSize: '1.25rem', margin: '2rem 0 1.7rem'}}>
            Thank you for your inquiry!<br />We'll contact you soon.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fv-modal-bg" onClick={onClose} role="dialog" aria-modal="true">
      <form
        className="fv-modal"
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        autoComplete="off"
        aria-labelledby="contact-title"
      >
        <button className="fv-modal-close" onClick={onClose} aria-label="Close form" type="button">&times;</button>
        <div id="contact-title" style={{fontWeight: 700, fontSize: '1.11rem', marginBottom: '.9rem'}}>
          Contact / Inquiry
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name</label>
          <input className="form-input" name="name" type="text" value={form.name} onChange={handleChange} autoFocus required maxLength={32} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} required maxLength={50} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="message">Message</label>
          <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} required maxLength={512} />
        </div>
        {errorMsg && <div className="form-error">{errorMsg}</div>}
        <button className="btn-main" type="submit" disabled={loading} style={{width:'100%'}}>
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
}
export default ContactModal;
