import React from "react";

export default function BioSection({ open, onOpen, data, setData }) {
  const bio = data.bio;

  const handleChange = (e) => {
    setData({
      ...data,
      bio: { ...bio, [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div>
          <h4>Personal Information</h4>
          <small style={{ color: "#6b7280" }}>Basic details employers look first</small>
        </div>
        {!open && (
          <button className="add-btn" onClick={() => onOpen("bio")}>
            Edit
          </button>
        )}
      </div>

      {open ? (
        <>
          <div className="avatar-row">
            <div className="avatar-circle">👤</div>
            <span className="avatar-text">Profile photo (optional)</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="fullname"
                placeholder="e.g. Sasmita Poudel"
                value={bio.fullname}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                placeholder="example@email.com"
                value={bio.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                placeholder="+977 98XXXXXXXX"
                value={bio.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                placeholder="Pokhara, Nepal"
                value={bio.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="done-btn" onClick={() => onOpen(null)}>
              Save & Continue
            </button>
          </div>
        </>
      ) : (
        bio.fullname && (
          <div className="summary-card">
            <strong>{bio.fullname}</strong>
            <br />
            {bio.email} · {bio.phone}
            <br />
            {bio.address}
          </div>
        )
      )}
    </div>
  );
}
