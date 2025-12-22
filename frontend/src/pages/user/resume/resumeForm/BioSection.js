import React from "react";

export default function BioSection({ open, onOpen, data, setData }) {
  const bio = data.bio;

  // Handle input changes
  const handleChange = (e) => {
    setData({
      ...data,
      bio: { ...bio, [e.target.name]: e.target.value }
    });
  };

  // Close the form
  const handleDone = () => {
    onOpen(null);
  };

  return (
    <div className="section-card">
      {/* Header */}
      <div className="section-header">
        <h4>Bio</h4>
        {/* Show Add button only if section is closed */}
        {!open && (
          <button className="add-btn" onClick={() => onOpen("bio")}>
            Add
          </button>
        )}
      </div>

      {/* Form or Summary */}
      {open ? (
        <>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullname"
              value={bio.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={bio.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input name="phone" value={bio.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input name="address" value={bio.address} onChange={handleChange} />
          </div>

          <div className="form-actions">
            <button className="done-btn" onClick={handleDone}>
              Done
            </button>
          </div>
        </>
      ) : (
        // Show summary if fullname exists
        bio.fullname && (
          <div className="summary-card">
            <strong>{bio.fullname}</strong>
            <br />
            {bio.email}
          </div>
        )
      )}
    </div>
  );
}
