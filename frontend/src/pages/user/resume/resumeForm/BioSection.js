import React from 'react';

export default function BioSection({ data, setData, onNext }) {
  const bio = data.bio || {};

  const handleChange = (e) => {
    setData({
      ...data,
      bio: { ...bio, [e.target.name]: e.target.value }
    });
  };

  // --- INTERNAL STYLES OBJECT ---
  const s = {
    container: { padding: '20px', backgroundColor: '#fff' },
    title: { color: '#2196f3', fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' },
    subtitle: { color: '#666', fontSize: '13px', marginBottom: '25px' },
    photoRow: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' },
    photoCircle: { width: '80px', height: '80px', borderRadius: '50%', border: '1px solid #e5e7eb' },
    uploadBtn: { background: 'none', border: 'none', color: '#2196f3', fontSize: '13px', cursor: 'pointer', fontWeight: '500' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    fullWidth: { gridColumn: 'span 2' },
    label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' },
    input: { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f9fafb', outline: 'none' },
    editor: { border: '1px solid #d1d5db', borderRadius: '6px', marginTop: '10px' },
    toolbar: { background: '#f9fafb', padding: '8px', borderBottom: '1px solid #d1d5db', display: 'flex', gap: '15px', color: '#333' },
    textarea: { width: '100%', border: 'none', padding: '10px', fontSize: '13px', minHeight: '100px', outline: 'none' },
    footer: { display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' },
    btnBack: { padding: '10px 25px', borderRadius: '4px', border: '1px solid #333', background: '#fff', cursor: 'pointer' },
    btnNext: { padding: '10px 25px', borderRadius: '4px', border: 'none', background: '#2196f3', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <div style={s.container}>
      <h1 style={s.title}>About yourself</h1>
      <p style={s.subtitle}>Fill out your primary information.</p>

      {/* PHOTO UPLOAD */}
      <div style={s.photoRow}>
        <div style={s.photoCircle}></div>
        <button style={s.uploadBtn}>↑ Upload Photo</button>
      </div>

      <div style={s.grid}>
        {/* FIRST & LAST NAME */}
        <div style={s.formGroup}>
          <label style={s.label}>First Name</label>
          <input name="firstName" style={s.input} value={bio.firstName || ""} onChange={handleChange} />
        </div>
        <div style={s.formGroup}>
          <label style={s.label}>Last Name</label>
          <input name="lastName" style={s.input} value={bio.lastName || ""} onChange={handleChange} />
        </div>

        {/* DESIGNATION */}
        <div style={{ ...s.formGroup, ...s.fullWidth }}>
          <label style={s.label}>Designation</label>
          <input name="designation" style={s.input} placeholder="Accountant" value={bio.designation || ""} onChange={handleChange} />
        </div>

        {/* ADDRESS & CITY */}
        <div style={s.formGroup}>
          <label style={s.label}>Address</label>
          <input name="address" style={s.input} value={bio.address || ""} onChange={handleChange} />
        </div>
        <div style={s.formGroup}>
          <label style={s.label}>City</label>
          <input name="city" style={s.input} value={bio.city || ""} onChange={handleChange} />
        </div>

        {/* EMAIL & PHONE */}
        <div style={s.formGroup}>
          <label style={s.label}>Email</label>
          <input name="email" style={s.input} value={bio.email || ""} onChange={handleChange} />
        </div>
        <div style={s.formGroup}>
          <label style={s.label}>Phone</label>
          <input name="phone" style={s.input} value={bio.phone || ""} onChange={handleChange} />
        </div>

        {/* SUMMARY */}
        <div style={{ ...s.formGroup, ...s.fullWidth }}>
          <label style={s.label}>Summary</label>
          <div style={s.editor}>
            <div style={s.toolbar}>
              <b>B</b> <i>I</i> <u>U</u> <span>≡</span> <span>🔗</span>
            </div>
            <textarea 
              name="summary" 
              style={s.textarea} 
              placeholder="How would you describe yourself?" 
              value={bio.summary || ""} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </div>

      <div style={s.footer}>
        <button style={s.btnBack}>Back</button>
        <button style={s.btnNext} onClick={onNext}>
          Continue to Education ›
        </button>
      </div>
    </div>
  );
}