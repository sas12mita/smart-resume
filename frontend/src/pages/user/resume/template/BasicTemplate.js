import React from 'react';

/**
 * MAIN COMPONENT
 * Handles the Layout, Toolbar, and Page Logic
 */
export default function ResumeBuilder({ data }) {
  // Check if user has entered any data yet
  const hasContent = 
    data.bio?.fullname || 
    data.bio?.email || 
    (data.experience && data.experience.length > 0) ||
    (data.education && data.education.length > 0);

  // --- STYLES ---
  const styles = {
    wrapper: {
      backgroundColor: '#f4f7fa',
      minHeight: '100vh',
      padding: '40px 0',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '210mm',
      margin: '0 auto 20px auto',
    },
    dropdown: {
      padding: '8px 16px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    downloadBtn: {
      backgroundColor: '#2196F3',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    // The A4 Paper Logic
    paper: {
      backgroundColor: '#fff',
      width: '210mm',
      minHeight: '297mm', // Exact A4 height
      margin: '0 auto',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      position: 'relative',
      // This creates a visual "fold" line to show where Page 1 ends
      backgroundImage: 'linear-gradient(to bottom, transparent 296.5mm, #e0e0e0 296.5mm, #e0e0e0 297mm, transparent 297mm)',
      backgroundSize: '100% 297mm',
    },
    emptyState: {
      height: '297mm',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ccc',
      fontSize: '18px'
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* 1. TOOLBAR */}
      <div style={styles.toolbar} className="no-print">
        <div style={styles.dropdown}>
           <span style={{fontWeight: 'bold'}}>☷ Professional 2</span> ⌵
        </div>
        <button style={styles.downloadBtn} onClick={() => alert('Please Login to Download')}>
          Login to Download <span style={{fontSize: '18px'}}>↓</span>
        </button>
      </div>

      {/* 2. THE RESUME CONTENT */}
      <div style={styles.paper}>
        {!hasContent ? (
          <div style={styles.emptyState}>
            {/* Blank at the beginning */}
          </div>
        ) : (
          <ProfessionalTemplate data={data} />
        )}
      </div>

      {/* 3. PRINT CSS (Injecting via style tag for easy copy-paste) */}
      <style>{`
        @media print {
          body { background: none !important; padding: 0 !important; }
          .no-print { display: none !important; }
          div { box-shadow: none !important; margin: 0 !important; }
          
          @page {
            size: A4;
            margin: 0;
          }

          /* Prevent content from splitting in half */
          section, .resume-item {
            page-break-inside: avoid;
          }
          
          /* Ensures the background line doesn't print */
          div { background-image: none !important; }
        }
      `}</style>
    </div>
  );
}

/**
 * TEMPLATE COMPONENT
 * The actual design of the resume
 */
function ProfessionalTemplate({ data }) {
  const styles = {
    container: {
      padding: '20mm', // Standard A4 margins
      color: '#333',
      lineHeight: '1.6',
    },
    header: { marginBottom: '30px' },
    name: { fontSize: '32px', fontWeight: 'bold', margin: '0', color: '#000' },
    title: { fontSize: '18px', textDecoration: 'underline', color: '#444', marginTop: '5px' },
    contactRow: { display: 'grid', gridTemplateColumns: '150px 1fr', gap: '5px', marginTop: '15px', fontSize: '14px' },
    label: { fontWeight: 'bold', color: '#666' },
    section: { marginTop: '25px' },
    sectionTitle: {
      fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase',
      borderBottom: '1px solid #ddd', paddingBottom: '5px', marginBottom: '15px'
    },
    item: { marginBottom: '20px' },
    itemHeader: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' },
    subText: { fontStyle: 'italic', color: '#555', fontSize: '14px' },
    desc: { fontSize: '14px', whiteSpace: 'pre-line', marginTop: '5px' }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.name}>{data.bio?.fullname}</h1>
        <p style={styles.title}>{data.experience?.[0]?.role || ""}</p>
        
        <div style={styles.contactRow}>
          {data.bio?.address && <><span style={styles.label}>Address:</span><span>{data.bio.address}</span></>}
          {data.bio?.phone && <><span style={styles.label}>Phone:</span><span>{data.bio.phone}</span></>}
          {data.bio?.email && <><span style={styles.label}>Email:</span><span>{data.bio.email}</span></>}
        </div>
      </header>

      {/* SUMMARY */}
      {data.bio?.summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.desc}>{data.bio.summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section style={styles.section} className="resume-item">
          <h2 style={styles.sectionTitle}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{exp.company}</span>
                <span style={{fontWeight: 'normal'}}>{exp.start_date} – {exp.end_date || 'Present'}</span>
              </div>
              <div style={styles.subText}>{exp.role}</div>
              <p style={styles.desc}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section style={styles.section} className="resume-item">
          <h2 style={styles.sectionTitle}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{edu.institution}</span>
                <span style={{fontWeight: 'normal'}}>{edu.start_year} – {edu.end_year}</span>
              </div>
              <div style={styles.subText}>{edu.degree}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}