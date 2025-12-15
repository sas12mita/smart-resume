import React, { useState } from 'react';
import axios from 'axios'; 
// Assuming redirect is available (like in Next.js or via router)

// --- Styling for a Clean, Centered Card Layout ---
const styles = {
    page: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7f9',
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        color: '#212529', // Dark text color
        fontSize: '1.8rem',
        borderBottom: '2px solid #007bff', // Blue underline
        display: 'inline-block',
        paddingBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        border: '1px solid #ced4da',
        borderRadius: '5px',
        boxSizing: 'border-box',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        marginTop: '20px',
        backgroundColor: '#007bff', // Primary Blue color
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    buttonHover: {
        backgroundColor: '#0056b3', // Darker blue on hover
    },
    error: {
        color: '#dc3545', // Keeping error message red for visibility
        marginTop: '15px',
        fontWeight: 'bold',
    },
};

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Placeholder for your API URL
const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        console.log(API_URL)
        const secureLoginEndpoint = `${API_URL}/api/admin/login`; 
        console.log(secureLoginEndpoint)
        try {
            const response = await axios.post(secureLoginEndpoint, {
                email,
                password,
            });


            const token = response.data.token;
            if (token) {
                localStorage.setItem("adminToken", token);
                window.location.href = "/admin/dashboard"; 
            } else {
                setError('Login failed. Please check credentials.');
            }

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Invalid Credentials or server error.';
            setError(errorMsg);
            console.error("Login Error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    
                    {error && <div style={styles.error}>{error}</div>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    >
                        {isSubmitting ? 'Logging In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}