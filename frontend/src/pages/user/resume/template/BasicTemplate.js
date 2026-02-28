import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeBuilder({ data }) {
  const paperRef = useRef(null);
  const [pageBreaks, setPageBreaks] = useState([]);

  // Updated hasContent to check for designation and skill_name from your schema
  const hasContent = data.bio?.fullname || data.experience?.length > 0 || data.skills?.length > 0;

  // Calculate page breaks for preview
  useEffect(() => {
    if (!paperRef.current || !hasContent) return;

    const calculatePageBreaks = () => {
      const element = paperRef.current;
      const pageHeight = 297; // A4 height in mm
      const contentHeight = element.scrollHeight / 3.78; // Convert pixels to mm (approximate)
      
      const breaks = [];
      for (let i = 1; i < Math.ceil(contentHeight / pageHeight); i++) {
        breaks.push(i * pageHeight);
      }
      setPageBreaks(breaks);
    };

    // Small delay to ensure content is rendered
    setTimeout(calculatePageBreaks, 100);
  }, [data, hasContent]);

  const handleDownloadPDF = async () => {
    const element = paperRef.current;
    if (!element) return;

    // Save original styles
    const originalStyle = element.style.cssText;
    element.style.backgroundImage = 'none';
    element.style.backgroundColor = '#ffffff';
    element.style.margin = '0';
    element.style.padding = '0';

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      allowTaint: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // Restore original styles
    element.style.cssText = originalStyle;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ 
      orientation: 'portrait', 
      unit: 'mm', 
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const NEXT_PAGE_TOP_MARGIN = 20; 
    
    let position = 0;
    let heightLeft = imgHeight;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add subsequent pages with top margin
    while (heightLeft > -10) {
      position = position - pdfHeight + NEXT_PAGE_TOP_MARGIN;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${data.bio?.fullname || 'Resume'}.pdf`);
  };

  const styles = {
    wrapper: {
      backgroundColor: '#94a3b8',
      minHeight: '100vh',
      padding: '40px 0',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '210mm',
      margin: '0 auto 20px auto',
      backgroundColor: '#94a3b8',
      padding: '0 10px',
    },
    downloadBtn: {
      backgroundColor: '#2563eb',
      color: '#fff',
      marginRight:'-20px',
      padding: '10px 24px',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s',
    },
    paper: {
      backgroundColor: '#fff',
      width: '210mm',
      minHeight: '297mm',
      margin: '0 auto',
      position: 'relative',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      backgroundImage: 'none',
      overflow: 'visible',
    },
    pageBreakIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#1d1a1a',
      opacity: 0.5,
      zIndex: 10,
      margin:'10px',
      pointerEvents: 'none',
    },
    pageBreakLabel: {
      position: 'absolute',
      right: '10px',
      top: '-20px',
      backgroundColor: '#131313',
      color: 'white',
      fontSize: '10px',
      padding: '2px 6px',
      borderRadius: '4px',
      opacity: 0.8,
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.toolbar} className="no-print">
        <button 
          style={styles.downloadBtn} 
          onClick={handleDownloadPDF}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          Download PDF
        </button>
      </div>

      <div style={styles.paper} ref={paperRef}>
        {!hasContent ? (
          <div style={{padding: '50px', textAlign: 'center', color: '#94a3b8'}}>Enter details...</div>
        ) : (
          <>
            <BasicTemplate data={data} />
            {pageBreaks.map((position, index) => (
              <div 
                key={index}
                style={{
                  ...styles.pageBreakIndicator,
                  top: `${position * 3.78}px`,
                }}
              >
                <div style={styles.pageBreakLabel}>
                  Page {index + 2} (20mm margin)
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <style>{`
        @media print { 
          .no-print { display: none !important; } 
        }
        .resume-item { 
          margin-bottom: 1.5rem; 
        }
        * {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `}</style>
    </div>
  );
}

// BasicTemplate Component - Fully matched to your SQL Schema
function BasicTemplate({ data }) {
  const styles = {
    container: { 
      padding: '20mm', 
      color: '#000', 
      lineHeight: '1.4', 
      textAlign: 'left',
      backgroundColor: '#ffffff',
      position: 'relative',
      zIndex: 1,
    },
    header: { marginBottom: '20px' },
    name: { fontSize: '32px', fontWeight: '800', margin: '0 0 5px 0', color: '#000' },
    // Matched to column: bio.designation
    jobTitle: { 
      fontSize: '18px', 
      textDecoration: 'underline', 
      marginBottom: '20px', 
      display: 'block',
      color: '#000',
    },
    table: { width: '100%', marginBottom: '25px', fontSize: '14px', borderCollapse: 'collapse' },
    label: { width: '150px', fontWeight: '400', paddingBottom: '5px', color: '#000', verticalAlign: 'top' },
    sectionTitle: { 
      fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', 
      marginTop: '25px', marginBottom: '10px', color: '#000',
      borderBottom: '1px solid #000', paddingBottom: '5px',
    },
    bold: { fontWeight: 'bold', fontSize: '16px', color: '#000' },
    text: { fontSize: '14px', color: '#000', marginTop: '5px' },
    skillsContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    skillItem: { fontSize: '14px', color: '#000' },
    hobbiesContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    hobbyItem: { fontSize: '14px', color: '#000' }
  };

  return (
    <div style={styles.container}>
      {/* BIO SECTION - Matches bio table */}
      <header style={styles.header}>
        <h1 style={styles.name}>{data.bio?.fullname || ' '}</h1>
        <span style={styles.jobTitle}>{data.bio?.designation || ' '}</span>
        <table style={styles.table}>
          <tbody>
            <tr><td style={styles.label}>Address</td><td>{data.bio?.address || ' '}</td></tr>
            <tr><td style={styles.label}>Contact Number</td><td>{data.bio?.phone || ' '}</td></tr>
            <tr><td style={styles.label}>Email</td><td>{data.bio?.email || ' '}</td></tr>
          </tbody>
        </table>
      </header>

      {/* SUMMARY - bio.summary */}
      {data.bio?.summary && (
        <section className="resume-item">
          <h2 style={styles.sectionTitle}>Summary</h2>
          <div style={styles.text} dangerouslySetInnerHTML={{ __html: data.bio.summary }} />
        </section>
      )}

      {/* EXPERIENCE - Matches experience table */}
      {data.experience?.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="resume-item">
              <div style={styles.bold}>{exp.company || ' '} {exp.city && `| ${exp.city}`}</div>
              <div>{exp.role || ' '}</div>
              <div style={{fontSize: '13px', color: '#444'}}>
                {exp.start_date || ''} - {exp.end_date || 'Present'}
              </div>
              <div style={styles.text} dangerouslySetInnerHTML={{ __html: exp.description || ' ' }} />
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION - Matches education table */}
      {data.education?.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="resume-item">
              <div style={styles.bold}>{edu.institution || ' '} {edu.city && `| ${edu.city}`}</div>
              <div>{edu.degree || ' '}</div>
              <div style={{fontSize: '13px'}}>
                {edu.start_date || ''} - {edu.end_date || ''}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* TRAINING - Matches training table */}
      {data.training?.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>Training</h2>
          {data.training.map((t, i) => (
            <div key={i} className="resume-item">
              <div style={styles.bold}>{t.title || ' '}</div>
              <div>{t.institution || ' '}</div>
              <div style={{fontSize: '13px', color: '#444'}}>
                Completion: {t.completion_date || ''}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS - Matches projects table */}
      {data.projects?.length > 0 && (
        <section>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {data.projects.map((p, i) => (
            <div key={i} className="resume-item">
              <div style={styles.bold}>{p.title || ' '}</div>
              {p.link && <div style={{fontSize: '12px', color: 'blue'}}>{p.link}</div>}
              <div style={styles.text} dangerouslySetInnerHTML={{ __html: p.description || ' ' }} />
            </div>
          ))}
        </section>
      )}

      {/* SKILLS - Matches skills table (skill_name) */}
      {data.skills?.length > 0 && (
        <section className="resume-item">
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.skillsContainer}>
            {data.skills.map((skill, i) => (
              <span key={i} style={styles.skillItem}>
                • {skill.skill_name || ' '} {skill.skill_level && `(${skill.skill_level})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* LANGUAGES - Matches languages table (language_name) */}
      {data.languages?.length > 0 && (
        <section className="resume-item">
          <h2 style={styles.sectionTitle}>Languages</h2>
          <div style={styles.text}>
            {data.languages.map((lang, i) => (
              <span key={i}>
                {lang.language_name} {lang.proficiency && `(${lang.proficiency})`}
                {i < data.languages.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* HOBBIES - Matches hobbies table (hobby_name) */}
      {data.hobbies?.length > 0 && (
        <section className="resume-item">
          <h2 style={styles.sectionTitle}>Interests</h2>
          <div style={styles.hobbiesContainer}>
            {data.hobbies.map((h, i) => (
              <span key={i} style={styles.hobbyItem}>
                • {h.hobby_name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}