import React from 'react';

export default function ResumeBuilder({ data }) {
  // Enhanced content check including all new sections
  const hasContent = 
    data.bio?.fullname || 
    data.bio?.email || 
    (data.experience?.length > 0) ||
    (data.education?.length > 0) ||
    (data.skills?.length > 0) ||
    (data.projects?.length > 0) ||
    (data.training?.length > 0);

  const handlePrint = () => {
    window.print();
  };

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
      backgroundColor: '#2563eb',
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
    paper: {
      backgroundColor: '#fff',
      width: '210mm',
      minHeight: '297mm', 
      margin: '0 auto',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',
      position: 'relative',
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
      <div style={styles.toolbar} className="no-print">
        <div style={styles.dropdown}>
           <span style={{fontWeight: 'bold'}}>☷ Professional Template</span> ⌵
        </div>
        <button style={styles.downloadBtn} onClick={handlePrint}>
          Print / Save PDF <span style={{fontSize: '18px'}}>↓</span>
        </button>
      </div>

      <div style={styles.paper}>
        {!hasContent ? (
          <div style={styles.emptyState}>No content added yet. Start filling your bio!</div>
        ) : (
          <ProfessionalTemplate data={data} />
        )}
      </div>

      <style>{`
        @media print {
          body { background: none !important; padding: 0 !important; }
          .no-print { display: none !important; }
          div { box-shadow: none !important; margin: 0 !important; width: 100% !important; }
          @page { size: A4; margin: 0; }
          section, .resume-item { page-break-inside: avoid; }
          div { background-image: none !important; }
        }
        /* Handle Quill HTML content */
        .description-content ul, .description-content ol { padding-left: 20px; margin: 5px 0; }
      `}</style>
    </div>
  );
}

function ProfessionalTemplate({ data }) {
  const styles = {
    container: { padding: '15mm 20mm', color: '#333', lineHeight: '1.5' },
    header: { marginBottom: '20px' },
    name: { fontSize: '28pt', fontWeight: 'bold', margin: '0', color: '#000', textTransform: 'uppercase' },
    designation: { fontSize: '14pt', color: '#2563eb', fontWeight: '600', marginTop: '5px' },
    contactRow: { display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px', fontSize: '10pt', color: '#555' },
    section: { marginTop: '20px' },
    sectionTitle: {
      fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase',
      borderBottom: '2px solid #333', paddingBottom: '3px', marginBottom: '10px', color: '#000'
    },
    item: { marginBottom: '15px' },
    itemHeader: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' },
    subText: { fontStyle: 'italic', color: '#444', fontSize: '10.5pt' },
    desc: { fontSize: '10pt', marginTop: '5px', textAlign: 'justify' },
    gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    skillTag: { fontSize: '10pt', background: '#f0f0f0', padding: '2px 8px', borderRadius: '4px', marginRight: '5px', display: 'inline-block', marginBottom: '5px' }
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.name}>{data.bio?.fullname || "Your Name"}</h1>
        <p style={styles.designation}>{data.bio?.designation || data.experience?.[0]?.role}</p>
        
        <div style={styles.contactRow}>
          {data.bio?.email && <span>✉ {data.bio.email}</span>}
          {data.bio?.phone && <span>📞 {data.bio.phone}</span>}
          {data.bio?.address && <span>📍 {data.bio.address}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {data.bio?.summary && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Summary</h2>
          <div style={styles.desc} dangerouslySetInnerHTML={{ __html: data.bio.summary }} />
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Work Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={styles.item} className="resume-item">
              <div style={styles.itemHeader}>
                <span>{exp.company} {exp.city && `| ${exp.city}`}</span>
                <span>{exp.start_date} — {exp.currentlyWorking ? 'Present' : exp.end_date}</span>
              </div>
              <div style={styles.subText}>{exp.role}</div>
              <div style={styles.desc} className="description-content" dangerouslySetInnerHTML={{ __html: exp.description }} />
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={styles.item} className="resume-item">
              <div style={styles.itemHeader}>
                <span>{edu.institution} | {edu.city}</span>
                <span>{edu.start_date} — {edu.end_date}</span>
              </div>
              <div style={styles.subText}>{edu.degree}</div>
            </div>
          ))}
        </section>
      )}

      <div style={styles.gridContainer}>
        {/* SKILLS */}
        {data.skills?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Skills</h2>
            <div>
              {data.skills.map((s, i) => (
                <div key={i} style={styles.skillTag}>
                  <strong>{s.skill_name}</strong> {s.skill_level && `(${s.skill_level})`}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {data.languages?.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Languages</h2>
            {data.languages.map((l, i) => (
              <div key={i} style={{fontSize: '10pt', marginBottom: '3px'}}>
                <strong>{l.language_name}</strong>: {l.proficiency}
              </div>
            ))}
          </section>
        )}
      </div>

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {data.projects.map((p, i) => (
            <div key={i} style={styles.item} className="resume-item">
              <div style={styles.itemHeader}>
                <span>{p.title}</span>
                {p.link && <span style={{fontSize: '9pt', fontWeight: 'normal'}}>{p.link}</span>}
              </div>
              <div style={styles.desc} dangerouslySetInnerHTML={{ __html: p.description }} />
            </div>
          ))}
        </section>
      )}

      {/* TRAINING & CERTIFICATIONS */}
      {data.training?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Certifications</h2>
          {data.training.map((t, i) => (
            <div key={i} style={{...styles.item, marginBottom: '5px'}} className="resume-item">
              <div style={styles.itemHeader}>
                <span>{t.title} - {t.institution}</span>
                <span style={{fontWeight: 'normal'}}>{t.completion_date}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* HOBBIES */}
      {data.hobbies?.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Interests</h2>
          <p style={{fontSize: '10pt'}}>{data.hobbies.map(h => h.hobby_name).join(', ')}</p>
        </section>
      )}
    </div>
  );
}