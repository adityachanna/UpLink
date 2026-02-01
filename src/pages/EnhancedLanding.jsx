import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import {
    Menu, X, Battery,
    ShieldCheck, BarChart3, Zap,
    Phone, Users, MapPin, CheckCircle,
    Quote
} from 'lucide-react';
import './EnhancedLanding.css';

/* --- Components --- */

const Navbar = ({ onLoginClick, isLoggedIn }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="landing-container">
                <div className="landing-logo">
                    <Battery className="logo-icon" />
                    <span className="logo-text">
                        UpLink
                    </span>
                </div>

                <div className="landing-nav-desktop">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#stats" className="nav-link">Impact</a>
                    <a href="#praises" className="nav-link">Praises</a>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onLoginClick}
                        className="login-btn"
                    >
                        {isLoggedIn ? 'Dashboard' : 'Login'}
                    </motion.button>
                </div>

                <div className="landing-nav-mobile">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mobile-menu"
                >
                    <div className="mobile-menu-content">
                        <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
                        <a href="#stats" onClick={() => setIsOpen(false)}>Impact</a>
                        <a href="#praises" onClick={() => setIsOpen(false)}>Praises</a>
                        <button onClick={() => { setIsOpen(false); onLoginClick(); }} className="mobile-login-btn">
                            {isLoggedIn ? 'Go to Dashboard' : 'Login'}
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

const LoginModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            setError('');
            
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });

            if (error) throw error;
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.message || 'Failed to login. Please try again.');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="modal-overlay"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="modal-content"
                >
                    <div className="modal-glow modal-glow-top" />
                    <div className="modal-glow modal-glow-bottom" />

                    <button onClick={onClose} className="modal-close">
                        <X size={24} />
                    </button>

                    <div className="modal-header">
                        <h2>Welcome Back</h2>
                        <p>Access your Auto-QA Dashboard</p>
                    </div>

                    <div className="modal-body">
                         {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                        
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="google-btn"
                        >
                            {loading ? (
                                <div className="spinner" />
                            ) : (
                                <>
                                    <svg className="google-icon" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </button>

                        <div className="modal-divider">
                            <span>SECURE CORP LOGIN ONLY</span>
                        </div>
                    </div>

                    <div className="modal-footer">
                        Protected Verification System • HackSmart 2026
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const Hero = ({ onDemoClick }) => {
    return (
        <section className="hero-section">
            <div className="hero-bg">
                <div className="hero-gradient hero-gradient-left" />
                <div className="hero-gradient hero-gradient-right" />
            </div>

            <div className="landing-container hero-grid">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-text"
                >
                    <div className="hero-badge">
                        <span className="pulse-dot" />
                        HackSmart 2026 Innovation
                    </div>

                    <h1 className="hero-title">
                        Auto-QA & <br />
                        <span className="hero-title-gradient">
                            Coaching Insights
                        </span>
                    </h1>

                    <p className="hero-description">
                        AI-powered quality assurance that reviews <span className="highlight">100% of calls</span>,
                        detects risk patterns, and generates coaching insights automatically.
                    </p>

                    
                </motion.div>

                <div className="hero-visual">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="phone-mockup"
                    >
                        <div className="phone-screen">
                            <div className="phone-notch" />

                            <div className="phone-content">
                                <div className="phone-card">
                                    <div className="phone-card-header">
                                        <span>Call ID: #8492</span>
                                        <span className="analyzing">Analyzing...</span>
                                    </div>
                                    <div className="waveform">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [10, 24, 10] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 1,
                                                    delay: i * 0.1,
                                                    ease: "easeInOut"
                                                }}
                                                className="waveform-bar"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="phone-card sentiment-card">
                                    <div className="sentiment-label">Sentiment Score</div>
                                    <div className="sentiment-value">92/100</div>
                                    <div className="sentiment-bar-bg">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '92%' }}
                                            transition={{ delay: 1, duration: 1.5 }}
                                            className="sentiment-bar"
                                        />
                                    </div>
                                </div>

                                <div className="phone-card sop-card">
                                    <div className="sop-content">
                                        <div className="sop-icon">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <div className="sop-title">SOP Compliance</div>
                                            <div className="sop-subtitle">Script Adherence</div>
                                        </div>
                                        <div className="sop-status">Pass</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="floating-card floating-card-right"
                    >
                        <div className="floating-card-content">
                            <div className="floating-card-icon">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="floating-card-value">100%</span>
                        </div>
                        <p className="floating-card-label">Compliance Rate</p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [15, -15, 15] }}
                        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                        className="floating-card floating-card-left"
                    >
                        <div className="floating-card-content">
                            <div className="floating-card-icon floating-card-icon-blue">
                                <BarChart3 size={20} />
                            </div>
                            <span className="floating-card-value">Risk Flag</span>
                        </div>
                        <p className="floating-card-label">Auto-Detected</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const statsData = [
    { icon: Phone, label: "Calls Analyzed", value: "1.2M", suffix: "+" },
    { icon: Users, label: "Active Agents", value: "850", suffix: "" },
    { icon: MapPin, label: "Cities Covered", value: "24", suffix: "" },
    { icon: CheckCircle, label: "Correction Rate", value: "98", suffix: "%" },
];

const Stats = () => {
    return (
        <section id="stats" className="stats-section">
            <div className="landing-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="stats-header"
                >
                    <h2 className="stats-title">
                        Unmatched <span className="stats-accent">Scale & Impact</span>
                    </h2>
                    <p className="stats-description">
                        Processing support interactions at enterprise scale across India.
                    </p>
                </motion.div>

                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="stat-card"
                        >
                            <div className="stat-icon">
                                <stat.icon size={24} />
                            </div>
                            <div className="stat-value">
                                {stat.value}<span className="stat-suffix">{stat.suffix}</span>
                            </div>
                            <div className="stat-label">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const testimonials = [
    {
        text: "Auto-QA reduced our manual review time by 90% in just two weeks.",
        author: "Operations Head",
        location: "Delhi NCR"
    },
    {
        text: "The coaching insights are spot on. Our agents significantly improved their script adherence.",
        author: "Training Manager",
        location: "Bangalore"
    },
    {
        text: "Finally, we have visibility into 100% of our support interactions.",
        author: "VP of Quality",
        location: "Hyderabad"
    },
    {
        text: "The risk detection flags helped us prevent major escalations.",
        author: "Senior Supervisor",
        location: "Pune"
    }
];

const Testimonials = () => {
    return (
        <section id="praises" className="testimonials-section">
            <div className="landing-container testimonials-header">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="testimonials-badge">Success Stories</span>
                    <h2 className="testimonials-title">Trusted by Leaders</h2>
                </motion.div>
            </div>

            <div className="testimonials-marquee">
                <div className="testimonials-track">
                    {[...testimonials, ...testimonials].map((testimonial, i) => (
                        <div key={i} className="testimonial-card">
                            <Quote className="testimonial-quote" size={32} />
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="testimonial-name">{testimonial.author}</div>
                                    <div className="testimonial-location">{testimonial.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="marquee-fade marquee-fade-left" />
                <div className="marquee-fade marquee-fade-right" />
            </div>
        </section>
    );
};

/* --- Main Component --- */

function EnhancedLanding() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate('/dashboard');
            }
        };
        checkSession();
    }, [navigate]);

    return (
        <div className="landing-page">
            <Navbar
                onLoginClick={() => setIsLoginOpen(true)}
                isLoggedIn={false}
            />

            <main>
                <Hero onDemoClick={() => setIsLoginOpen(true)} />
                <Stats />
                <Testimonials />

                <footer className="landing-footer">
                    <div className="landing-container">
                        <p>&copy; 2026 Battery Smart. HackSmart Innovation Project.</p>
                        <div className="footer-links">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                </footer>
            </main>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </div>
    );
}

export default EnhancedLanding;