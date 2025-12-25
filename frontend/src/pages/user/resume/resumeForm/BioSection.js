import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";


export default function BioSection({ data, setData, onNext, onBack }) {
  const bio = data.bio || {};
  const socialLinks = bio.socialLinks || [];
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  // IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({
          ...data,
          bio: { ...bio, photo: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // FORM CHANGE
  const handleChange = (e) => {
    setData({
      ...data,
      bio: { ...bio, [e.target.name]: e.target.value }
    });
  };

  // SOCIAL MEDIA
  const addSocialLink = () => {
    const newLinks = [...socialLinks, { platform: '', url: '' }];
    setData({ ...data, bio: { ...bio, socialLinks: newLinks } });
  };
  const handleSocialChange = (index, e) => {
    const updatedLinks = socialLinks.map((link, i) =>
      i === index ? { ...link, [e.target.name]: e.target.value } : link
    );
    setData({ ...data, bio: { ...bio, socialLinks: updatedLinks } });
  };
  const removeSocialLink = (index) => {
    const filteredLinks = socialLinks.filter((_, i) => i !== index);
    setData({ ...data, bio: { ...bio, socialLinks: filteredLinks } });
  };

  // AI SUMMARY GENERATION
  const generateSummary = async () => {
    if (!bio.designation) {
      Swal.fire({
        icon: "warning",
        title: "Designation Required",
        text: "Please enter your designation before generating a summary.",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const secureSummaryGenerateEndpoint = `${API_URL}/api/generate-summary`;

      const res = await axios.post(secureSummaryGenerateEndpoint, {
        designation: bio.designation,
        skills: bio.skills?.join(', '),
        experience: bio.experience || ''
      });
      setData({
        ...data,
        bio: { ...bio, summary: res.data.summary }
      });
    } catch (err) {
      setErrorMsg(
        err.response?.data?.error ||
        "Free model busy. Please try again in a moment."
      );
    }
    setLoading(false);
  };

  // STYLES
  const s = {
    container: { padding: '20px', backgroundColor: '#fff' },
    title: { color: '#2196f3', fontSize: '28px', margin: '0 0 5px 0', fontWeight: 'bold' },
    subtitle: { color: '#666', fontSize: '13px', marginBottom: '25px' },
    photoRow: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' },
    photoCircle: {
      width: '80px', height: '80px', borderRadius: '50%', border: '1px solid #e5e7eb',
      backgroundImage: `url(${bio.photo || ''})`, backgroundSize: 'cover',
      backgroundPosition: 'center', backgroundColor: '#f9fafb', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    },
    uploadBtn: { background: 'none', border: 'none', color: '#2196f3', fontSize: '13px', cursor: 'pointer', fontWeight: '500' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    fullWidth: { gridColumn: 'span 2' },
    label: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px' },
    input: { width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f9fafb', outline: 'none' },
    editor: { border: '1px solid #d1d5db', borderRadius: '6px', marginTop: '10px' },
    toolbar: { display: 'flex', justifyContent: 'flex-end', padding: '6px 12px', borderBottom: '1px solid #d1d5db' },
    textarea: { width: '100%', border: 'none', padding: '12px', fontSize: '13px', minHeight: '120px', outline: 'none', resize: 'vertical' },
    socialRow: { display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-end' },
    removeBtn: { padding: '10px', color: '#ff4d4f', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' },
    footer: { display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' },
    btnBack: { padding: '10px 25px', borderRadius: '4px', border: '1px solid #333', background: '#fff', cursor: 'pointer', fontWeight: '600' },
    btnNext: { padding: '10px 30px', borderRadius: '4px', border: 'none', background: '#2196f3', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }
  };

  return (
    <div style={s.container}>
      <h1 style={s.title}>About Yourself</h1>
      <p style={s.subtitle}>Fill out your primary information.</p>

      {/* PHOTO */}
      <div style={s.photoRow}>
        <div style={s.photoCircle}>{!bio.photo && '👤'}</div>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
        <button style={s.uploadBtn} onClick={() => fileInputRef.current.click()}>↑ Upload Photo</button>
      </div>

      {/* PERSONAL INFO */}
      <div style={s.grid}>
        <div><label style={s.label}>First Name</label><input name="firstName" style={s.input} value={bio.firstName || ""} onChange={handleChange} /></div>
        <div><label style={s.label}>Last Name</label><input name="lastName" style={s.input} value={bio.lastName || ""} onChange={handleChange} /></div>
        <div style={s.fullWidth}><label style={s.label}>Designation</label><input name="designation" style={s.input} placeholder="Barista" value={bio.designation || ""} onChange={handleChange} /></div>
        <div><label style={s.label}>Address</label><input name="address" style={s.input} value={bio.address || ""} onChange={handleChange} /></div>
        <div><label style={s.label}>City</label><input name="city" style={s.input} value={bio.city || ""} onChange={handleChange} /></div>
        <div><label style={s.label}>Email</label><input name="email" style={s.input} value={bio.email || ""} onChange={handleChange} /></div>
        <div><label style={s.label}>Phone</label><input name="phone" style={s.input} value={bio.phone || ""} onChange={handleChange} /></div>

        {/* SUMMARY */}
        <div style={s.fullWidth}>
          <label style={s.label}>Summary</label>
          <div style={s.editor}>
            <div style={s.toolbar}>

              <button onClick={generateSummary} disabled={loading} style={{ padding: '4px 8px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                {loading ? 'Generating...' : 'Generate with AI'}
              </button>


            </div>

            <textarea name="summary" style={s.textarea} placeholder="How would you describe yourself?" value={bio.summary || ""} onChange={handleChange} />
          </div>
        </div>
        <div>
          {errorMsg && (
            <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "6px" }}>
              {errorMsg}
            </p>
          )}
        </div>
        {/* SOCIAL LINKS */}
        <div style={{ ...s.fullWidth, marginTop: '20px' }}>
          <label style={s.label}>Social Media Links</label>
          {socialLinks.map((link, index) => (
            <div key={index} style={s.socialRow}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '10px', color: '#999' }}>Platform</label>
                <input name="platform" style={s.input} value={link.platform} onChange={(e) => handleSocialChange(index, e)} />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ fontSize: '10px', color: '#999' }}>Profile Link</label>
                <input name="url" style={s.input} value={link.url} onChange={(e) => handleSocialChange(index, e)} />
              </div>
              <button style={s.removeBtn} onClick={() => removeSocialLink(index)}>×</button>
            </div>
          ))}
          <button type="button" style={{ ...s.uploadBtn, marginTop: '10px' }} onClick={addSocialLink}>+ Add Social Link</button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={s.footer}>
        <button style={s.btnBack} onClick={onBack}>Back</button>
        <button style={s.btnNext} onClick={onNext}>Continue to Education ›</button>
      </div>
    </div>
  );
}
