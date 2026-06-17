import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { 
    Shield, 
    ShieldAlert, 
    ShieldCheck, 
    Activity, 
    Clock, 
    FileText, 
    Key, 
    Upload, 
    X, 
    ArrowRight, 
    Search, 
    Copy, 
    Check, 
    Sun, 
    Moon, 
    Menu, 
    Info, 
    Lock, 
    Server, 
    Terminal, 
    User, 
    Mail, 
    Phone, 
    Building, 
    Calendar, 
    Paperclip, 
    ChevronRight,
    Loader2
} from 'lucide-react';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

type LatestPost = {
    id: number;
    title: string;
    slug: string;
    thumbnail_url?: string | null;
    excerpt: string;
    published_at?: string | null;
};

type LatestEvent = {
    id: number;
    title: string;
    slug: string;
    thumbnail_url?: string | null;
    excerpt: string;
    event_date: string;
    location?: string | null;
    registration_link?: string | null;
};

type WelcomeProps = {
    latestPosts?: LatestPost[];
    latestEvents?: LatestEvent[];
    canRegister?: boolean;
};

const newsPlaceholder = '/asset/img/blog-placeholder.png';

export default function Welcome({ latestPosts = [], latestEvents = [] }: WelcomeProps) {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = typeof window !== 'undefined' ? localStorage.getItem('darkMode') : null;
        return savedMode !== null ? savedMode === 'true' : true; // Default dark mode for hacker theme
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
    };

    // Mobile nav state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Incident Reporting Wizard State
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportStep, setReportStep] = useState(1);
    const [formData, setFormData] = useState({
        reporter_name: '',
        reporter_email: '',
        incident_type: 'phishing',
        vulnerability_level: 'low',
        incident_date: '',
        description: '',
    });
    const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);

    const [captchaData, setCaptchaData] = useState<{ ip: string } | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const recaptchaRef = useRef<HTMLDivElement>(null);

    const fetchCaptcha = async () => {
        try {
            const response = await fetch('/api/captcha');
            const data = await response.json();
            if (data.success) {
                setCaptchaData({
                    ip: data.ip
                });
            }
        } catch (err) {
            console.error('Error fetching IP:', err);
        }
    };

    useEffect(() => {
        if (showReportModal) {
            fetchCaptcha();
            setRecaptchaToken(null);
        }
    }, [showReportModal]);

    useEffect(() => {
        if (showReportModal && reportStep === 2) {
            const checkGrecaptcha = setInterval(() => {
                if (window.grecaptcha && recaptchaRef.current) {
                    clearInterval(checkGrecaptcha);
                    try {
                        recaptchaRef.current.innerHTML = '';
                        
                        const siteKey = document.querySelector('meta[name="recaptcha-site-key"]')?.getAttribute('content') || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
                        
                        window.grecaptcha.render(recaptchaRef.current, {
                            sitekey: siteKey,
                            callback: (token: string) => {
                                setRecaptchaToken(token);
                                setFormErrors(prev => {
                                    const next = { ...prev };
                                    delete next.recaptcha_token;
                                    return next;
                                });
                            },
                            'expired-callback': () => {
                                setRecaptchaToken(null);
                            },
                            theme: isDarkMode ? 'dark' : 'light'
                        });
                    } catch (e) {
                        console.log('reCAPTCHA render error: ', e);
                    }
                }
            }, 100);

            return () => {
                clearInterval(checkGrecaptcha);
            };
        }
    }, [showReportModal, reportStep, isDarkMode]);
    const [createdTicketNumber, setCreatedTicketNumber] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);



    // Real-time Monitoring State (Real Visitor Tracking)
    const [monitoringData, setMonitoringData] = useState<any>({
        current_user: { ip: '127.0.0.1', browser: 'Chrome', os: 'Windows', time: 'Connecting...' },
        recent_visits: [],
        stats: { incident_count: 0, cpu_load: '3%', memory_usage: '8.4 MB', active_sessions: 1 }
    });

    const fetchMonitoringData = async () => {
        try {
            const response = await fetch('/api/monitoring');
            const data = await response.json();
            if (data.success) {
                setMonitoringData(data);
            }
        } catch (err) {
            console.error('Error fetching real-time monitoring data:', err);
        }
    };

    useEffect(() => {
        fetchMonitoringData();
        const interval = setInterval(fetchMonitoringData, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    // Terminal Ticker State (Hacker Terminal style)
    const [logs, setLogs] = useState<string[]>([
        ':: Initializing RSUI Sentinel Core Daemon v4.1...',
        '[OK] Firewall rules initialized: 1,024 policy filters active.',
        '[OK] Intrusion Detection System listening on interface [eth0, eth1]',
        '[INFO] Scanning local network nodes for active threats...',
        '[SECURE] 0 active vulnerabilities detected in database cluster.'
    ]);
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const events = [
            'scanning network port 443... no leaks found.',
            'ssl certificate handshake verification: success.',
            'threat blocked: unauthorized ssh attempt from 192.168.4.11.',
            'background defense status: full shield active.',
            'anti-bruteforce watchdog: 0 active attack signatures.',
            'database connection pool health check: optimal.',
            'security log integrity verification check: 100% OK.'
        ];

        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            setLogs(prev => {
                const updated = [...prev, `[${time}] [DAEMON] ${randomEvent}`];
                return updated.slice(-10); // Keep last 10 logs
            });
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    // File selection handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 2 * 1024 * 1024) {
                setFormErrors(prev => ({ ...prev, attachment: 'Ukuran file maksimal adalah 2 MB.' }));
                setAttachmentFile(null);
            } else {
                setAttachmentFile(file);
                setFormErrors(prev => {
                    const next = { ...prev };
                    delete next.attachment;
                    return next;
                });
            }
        }
    };

    // Form inputs change handler
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    };

    // Report Form Wizard Navigation
    const validateStep = (currentStep: number) => {
        const errors: Record<string, string> = {};
        if (currentStep === 1) {
            if (!formData.reporter_name.trim()) errors.reporter_name = 'Nama lengkap wajib diisi.';
            if (!formData.reporter_email.trim()) {
                errors.reporter_email = 'Email wajib diisi.';
            } else if (!/\S+@\S+\.\S+/.test(formData.reporter_email)) {
                errors.reporter_email = 'Format email tidak valid.';
            }
            if (!formData.incident_date) errors.incident_date = 'Tanggal & waktu kejadian wajib diisi.';
        } else if (currentStep === 2) {
            if (!formData.description.trim()) errors.description = 'Kronologi/deskripsi wajib diisi.';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(reportStep)) {
            setReportStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setReportStep(prev => prev - 1);
    };

    // Submit Report
    const handleReportSubmit = async () => {
        if (!validateStep(2)) return;

        if (!recaptchaToken) {
            setFormErrors(prev => ({
                ...prev,
                recaptcha_token: 'Harap verifikasi bahwa Anda bukan robot.'
            }));
            return;
        }

        setIsSubmittingReport(true);
        const data = new FormData();
        data.append('reporter_name', formData.reporter_name);
        data.append('reporter_email', formData.reporter_email);
        data.append('incident_type', formData.incident_type);
        data.append('vulnerability_level', formData.vulnerability_level);
        data.append('incident_date', formData.incident_date);
        data.append('description', formData.description);
        if (attachmentFile) {
            data.append('attachment', attachmentFile);
        }
        data.append('recaptcha_token', recaptchaToken);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const response = await fetch('/api/incidents', {
                method: 'POST',
                body: data,
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json'
                }
            });
            const result = await response.json();

            if (response.status === 201) {
                setCreatedTicketNumber(result.ticket_number);
                setReportStep(3);
                fetchMonitoringData(); // Refresh metrics
            } else if (result.errors) {
                const valErrors: Record<string, string> = {};
                for (const key in result.errors) {
                    valErrors[key] = result.errors[key][0];
                }
                setFormErrors(valErrors);
                
                // Reset Google reCAPTCHA on validation failure
                if (window.grecaptcha) {
                    window.grecaptcha.reset();
                }
                setRecaptchaToken(null);

                if (valErrors.reporter_name || valErrors.reporter_email || valErrors.incident_date) {
                    setReportStep(1);
                } else {
                    setReportStep(2);
                }
            } else {
                alert(result.message || 'Gagal mengirim laporan.');
                if (window.grecaptcha) {
                    window.grecaptcha.reset();
                }
                setRecaptchaToken(null);
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan koneksi.');
        } finally {
            setIsSubmittingReport(false);
        }
    };

    const getIncidentTypeName = (type: string) => {
        const types: Record<string, string> = {
            phishing: 'Phishing / Social Engineering',
            malware: 'Malware Infection',
            ransomware: 'Ransomware',
            ddos: 'DDoS Attack',
            unauthorized_access: 'Unauthorized Access',
            web_defacement: 'Web Defacement',
            data_leak: 'Data Leak',
            vulnerability: 'Kerentanan Keamanan / Vulnerability',
            others: 'Lainnya'
        };
        return types[type] || type;
    };

    return (
        <>
            <Head title="CSIRT RSUI - Cyber Security Incident Response Team">
                <link rel="icon" type="image/x-icon" href="/rsui-con.ico" />
            </Head>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes cyber-scan {
                    0% { top: -10%; opacity: 0; }
                    5% { opacity: 0.8; }
                    95% { opacity: 0.8; }
                    100% { top: 110%; opacity: 0; }
                }
                .laser-scanning-line {
                    position: absolute;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(to right, transparent, rgba(34, 211, 238, 0.7) 30%, rgba(34, 211, 238, 0.7) 70%, transparent);
                    pointer-events: none;
                    z-index: 1;
                    box-shadow: 0 0 12px rgba(34, 211, 238, 0.9);
                    animation: cyber-scan 12s linear infinite;
                }
            `}} />
            
            <div className={`min-h-screen font-sans transition-colors duration-300 relative overflow-x-hidden ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
                
                {/* CYBERNETIC BACKGROUND GRID & PATTERN OVERLAYS */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
                    {/* Laser scanning beam line */}
                    <div className="laser-scanning-line"></div>

                    {/* Futuristic Grid Lines */}
                    <div 
                        className="absolute inset-0 opacity-40 dark:opacity-50" 
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, ${isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)'} 1px, transparent 1px),
                                linear-gradient(to bottom, ${isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)'} 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px'
                        }}
                    ></div>
                    {/* Matrix Dot Grid Overlay */}
                    <div 
                        className="absolute inset-0 opacity-40 dark:opacity-60"
                        style={{
                            backgroundImage: `radial-gradient(circle, ${isDarkMode ? 'rgba(20, 184, 166, 0.22)' : 'rgba(20, 184, 166, 0.12)'} 1.2px, transparent 0)`,
                            backgroundSize: '20px 20px'
                        }}
                    ></div>
                    {/* Cyber Glow Orbs */}
                    {isDarkMode && (
                        <>
                            <div className="absolute top-[-5%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-600/15 blur-[130px] animate-pulse"></div>
                            <div className="absolute top-[35%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px]"></div>
                            <div className="absolute bottom-[5%] left-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-600/15 blur-[140px] animate-pulse"></div>
                        </>
                    )}
                </div>

                {/* HEADER & NAVIGASI */}
                <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 border-b ${isDarkMode ? 'bg-slate-950/85 border-slate-900' : 'bg-white/90 border-slate-200'}`}>
                    <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 select-none z-10">
                            <img 
                                src="/asset/img/logo-full.png" 
                                alt="RSUI Logo" 
                                className="h-9 w-auto transition-all" 
                                style={{ filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}
                            />
                            <div className="h-6 w-[1px] bg-slate-700/60 hidden sm:block"></div>
                            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                                CSIRT <span className="text-xs font-medium tracking-wider text-slate-400 uppercase">RSUI</span>
                            </span>
                        </a>
                        
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium z-10">
                            <a href="#home" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Home</a>
                            <a href="#tentang" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Tentang</a>
                            <a href="#layanan" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Layanan</a>
                            <a href="#berita" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Berita</a>
                            <Link href="/events" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Acara</Link>
                            <a href="/download/rfc-2350" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                <FileText className="w-4 h-4" /> RFC 2350
                            </a>
                            <a href="/download/public-key" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                <Key className="w-4 h-4" /> Public Key
                            </a>
                        </nav>
                        
                        {/* Right Header Buttons */}
                        <div className="flex items-center gap-3 z-10">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                                aria-label="Toggle Mode"
                            >
                                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                            
                            {/* CTA Button */}
                            <button 
                                onClick={() => { setShowReportModal(true); setReportStep(1); }} 
                                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer"
                            >
                                <ShieldAlert className="w-4 h-4" />
                                Laporkan Insiden
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`lg:hidden p-2 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Dropdown */}
                    {mobileMenuOpen && (
                        <div className={`lg:hidden border-t py-4 px-6 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
                            <div className="flex flex-col space-y-4 text-sm font-medium">
                                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Home</a>
                                <a href="#tentang" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Tentang</a>
                                <a href="#layanan" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Layanan</a>
                                <a href="#berita" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Berita</a>
                                <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Acara</Link>
                                <a href="/download/rfc-2350" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-500">
                                    <FileText className="w-4 h-4" /> RFC 2350
                                </a>
                                <a href="/download/public-key" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-500">
                                    <Key className="w-4 h-4" /> Public Key
                                </a>
                                <button 
                                    onClick={() => { setMobileMenuOpen(false); setShowReportModal(true); setReportStep(1); }}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all"
                                >
                                    <ShieldAlert className="w-4 h-4" />
                                    Laporkan Insiden
                                </button>
                            </div>
                        </div>
                    )}
                </header>

                <main className="relative z-10 max-w-7xl mx-auto px-6">
                    
                    {/* HERO SECTION & METRICS */}
                    <section id="home" className="pt-0 pb-12 md:pt-1 lg:pt-2 grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                                <Activity className="w-3.5 h-3.5 animate-pulse" />
                                <span>Sentinel Shield: Active Defense</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                                Respon Insiden <br className="hidden md:inline" />
                                <span className="bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                                    Keamanan Siber
                                </span> Terpadu
                            </h1>
                            
                            <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${isDarkMode ? 'text-slate-350 text-slate-350/90' : 'text-slate-650'}`}>
                                Tim tanggap darurat siber RSUI siap mendeteksi, menangani, dan memitigasi serangan keamanan digital pada infrastruktur medis dan data pasien secara responsif, profesional, dan 24/7.
                            </p>

                            {/* CTA Action Bar */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-1">
                                <button 
                                    onClick={() => { setShowReportModal(true); setReportStep(1); }}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                                >
                                    <ShieldAlert className="w-5 h-5" />
                                    Laporkan Insiden Sekarang
                                </button>
                                <a 
                                    href="#layanan" 
                                    className={`font-semibold py-3.5 px-8 rounded-xl border transition-all text-center flex items-center justify-center gap-1.5 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                                >
                                    Layanan Deteksi
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Real-time user metrics & log simulations */}
                        <div className="lg:col-span-5 space-y-6">
                            {/* REAL TIME VISITOR MONITORING */}
                            <div className={`border rounded-2xl p-5 shadow-xl relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-slate-900/70 border-slate-800/80 backdrop-blur-md shadow-slate-950/50 hover:border-blue-500/30' : 'bg-white border-slate-200 shadow-slate-100 hover:border-blue-400/50'}`}>
                                <div className="absolute top-0 right-0 p-3 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 absolute"></span>
                                </div>
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                    <Server className="w-3.5 h-3.5 text-cyan-400" /> LIVE VISITOR TELEMETRY
                                </h3>
                                
                                <div className="space-y-3">
                                    {/* Local User Info */}
                                    <div className={`p-2.5 rounded-lg border text-[11px] ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                                        <div className="flex justify-between font-semibold text-slate-300 mb-1">
                                            <span className="text-slate-500">Visitor IP (You):</span>
                                            <span className="font-mono text-cyan-400">{monitoringData.current_user.ip}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400 text-[10px]">
                                            <span>OS & Browser:</span>
                                            <span>{monitoringData.current_user.os} ({monitoringData.current_user.browser})</span>
                                        </div>
                                    </div>

                                    {/* Real-time server diagnostics */}
                                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                                        <div className={`p-2 rounded border ${isDarkMode ? 'bg-slate-950/40 border-slate-900' : 'bg-slate-100/50 border-slate-200'}`}>
                                            <span className="block text-slate-500 text-[9px] uppercase font-bold">RAM Usage</span>
                                            <span className="font-mono text-slate-200 font-semibold">{monitoringData.stats.memory_usage}</span>
                                        </div>
                                        <div className={`p-2 rounded border ${isDarkMode ? 'bg-slate-950/40 border-slate-900' : 'bg-slate-100/50 border-slate-200'}`}>
                                            <span className="block text-slate-500 text-[9px] uppercase font-bold">Active Sessions</span>
                                            <span className="font-mono text-slate-200 font-semibold">{monitoringData.stats.active_sessions} client</span>
                                        </div>
                                    </div>

                                    {/* Live Traffic Feed */}
                                    <div className="space-y-1.5">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Recent Access Activity Feed:</span>
                                        <div className="space-y-1.5 max-h-[85px] overflow-y-auto">
                                            {monitoringData.recent_visits && monitoringData.recent_visits.length > 0 ? (
                                                monitoringData.recent_visits.map((visit: any, index: number) => (
                                                    <div key={index} className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-900/40 pb-1 last:border-0 last:pb-0 font-mono">
                                                        <span className="text-cyan-400">{visit.ip}</span>
                                                        <span className="text-slate-500 text-[9px] truncate max-w-[120px]">{visit.os} • {visit.browser}</span>
                                                        <span className="text-slate-600 text-[9px]">{visit.time}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-[10px] text-slate-600">Waiting for connections...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Simulated Cybersecurity Console Log */}
                            <div className="border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-emerald-500/30">
                                <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-emerald-400" />
                                    <span className="text-[11px] font-mono font-bold text-slate-400">sentinel-defense-agent.log</span>
                                    <div className="flex gap-1.5 ml-auto">
                                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></span>
                                    </div>
                                </div>
                                <div 
                                    ref={logContainerRef} 
                                    className="p-4 h-[120px] font-mono text-[10px] text-emerald-400/90 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 bg-black/60"
                                >
                                    {logs.map((log, i) => (
                                        <div key={i} className="leading-5 whitespace-pre-wrap">
                                            {log.includes('[OK]') || log.includes('[SECURE]') ? (
                                                <span className="text-emerald-400 font-semibold">{log}</span>
                                            ) : log.includes('blocked') || log.includes('dropped') ? (
                                                <span className="text-rose-400">{log}</span>
                                            ) : (
                                                <span className="text-teal-400/80">{log}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* TENTANG KAMI */}
                    <section id="tentang" className="py-20 border-t border-slate-900/60">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Column 1: Anonymous Silhouette Graphic */}
                            <div className="relative group flex justify-center">
                                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-2xl opacity-50 transition-all group-hover:bg-blue-500/20"></div>
                                <img 
                                    src="/asset/img/anonymous-hacker.png" 
                                    alt="CSIRT Anonymous Representative" 
                                    className="w-full max-w-sm h-auto rounded-2xl relative z-10 border border-slate-800/80 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            </div>
                            
                            {/* Column 2: Information */}
                            <div className="space-y-6">
                                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Tentang CSIRT RSUI</span>
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                    Layanan Keamanan Reaktif & Proaktif yang Anda Butuhkan
                                </h2>
                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                                    CSIRT RSUI dibentuk khusus untuk memberikan jaminan rasa aman pada ekosistem IT Rumah Sakit Universitas Indonesia. Kami menyediakan layanan mitigasi ancaman secara reaktif (penanganan setelah kejadian) dan proaktif (pencegahan & audit keamanan secara berkala).
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                                        <h4 className="font-bold mb-1 flex items-center gap-1.5 text-xs text-rose-500">
                                            <ShieldAlert className="w-4 h-4" /> Respons Reaktif
                                        </h4>
                                        <p className="text-[11px] text-slate-450 leading-relaxed text-slate-400">Analisis insiden siber, forensik digital, penanganan kerentanan sistem, dan pemulihan operasional.</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                                        <h4 className="font-bold mb-1 flex items-center gap-1.5 text-xs text-emerald-500">
                                            <ShieldCheck className="w-4 h-4" /> Proteksi Proaktif
                                        </h4>
                                        <p className="text-[11px] text-slate-450 leading-relaxed text-slate-400">Pemindaian kerentanan rutin, pengujian penetrasi (pentest), dan sosialisasi awareness keamanan.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* LAYANAN UNGGULAN */}
                    <section id="layanan" className="py-20 border-t border-slate-900/60">
                        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Alur Penanganan</span>
                            <h2 className="text-3xl font-extrabold tracking-tight">Layanan Proteksi Siber</h2>
                            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Program proteksi siber terstruktur untuk menjaga kerahasiaan, integritas, dan ketersediaan sistem data kesehatan.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card 1 */}
                            <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/30 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/50' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'}`}>
                                <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-4 border border-blue-500/20">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Deteksi & Peringatan</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Pemberian peringatan dini dan saran teknis terkait kerentanan keamanan siber yang terdeteksi sebelum dieksploitasi peretas.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/30 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/50' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'}`}>
                                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-lg flex items-center justify-center mb-4 border border-indigo-500/20">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Penanggulangan</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Layanan respon cepat penanggulangan insiden siber aktif, isolasi ancaman, pembersihan sistem, dan restorasi backup.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/30 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/50' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'}`}>
                                <div className="w-10 h-10 bg-teal-500/10 text-teal-500 rounded-lg flex items-center justify-center mb-4 border border-teal-500/20">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Audit Keamanan</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Audit rutin pada konfigurasi server, database, API gateway, dan pengujian penetrasi (pentest) guna menjamin pertahanan sistem.
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-900/30 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/50' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'}`}>
                                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-4 border border-amber-500/20">
                                    <Info className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Sosialisasi Siber</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Pelatihan kesadaran (cybersecurity awareness) berkala bagi staf medis dan admin IT di lingkungan RSUI terhadap bahaya rekayasa sosial.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* BERITA & ACARA */}
                    <section id="berita" className="py-20 border-t border-slate-900/60">
                        <div className="grid lg:grid-cols-12 gap-12">
                            
                            {/* LEFT COLUMN: BERITA (2/3 width) */}
                            <div className="lg:col-span-8 space-y-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
                                    <div className="space-y-2">
                                        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Update Informasi</span>
                                        <h2 className="text-3xl font-extrabold tracking-tight">Berita & Peringatan Keamanan</h2>
                                    </div>
                                    {latestPosts.length > 0 && (
                                        <a 
                                            href="/blog" 
                                            className="text-sm font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1 group"
                                        >
                                            Lihat Semua Artikel 
                                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </a>
                                    )}
                                </div>

                                {latestPosts.length ? (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {latestPosts.map((post) => (
                                            <article
                                                key={post.id}
                                                className={`rounded-2xl overflow-hidden border flex flex-col group transition-all duration-300 hover:border-slate-800 ${isDarkMode ? 'bg-slate-900/30 border-slate-900 hover:bg-slate-900/60' : 'bg-white border-slate-200 shadow-sm'}`}
                                            >
                                                <div className="relative overflow-hidden h-40">
                                                    <img
                                                        src={post.thumbnail_url ?? newsPlaceholder}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                                                    <div className="space-y-1.5">
                                                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">
                                                            {post.published_at ?? 'Published'}
                                                        </span>
                                                        <h3 className="text-base font-bold leading-snug group-hover:text-blue-500 transition-colors line-clamp-2">
                                                            <a href={`/blog/${post.slug}`}>{post.title}</a>
                                                        </h3>
                                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                                            {post.excerpt}
                                                        </p>
                                                    </div>
                                                    <a
                                                        href={`/blog/${post.slug}`}
                                                        className="text-xs font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-1 pt-1"
                                                    >
                                                        Baca Detail <ArrowRight className="w-3.5 h-3.5" />
                                                    </a>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={`rounded-2xl p-12 text-center border font-medium ${isDarkMode ? 'text-slate-400 border-slate-900 bg-slate-900/10' : 'text-slate-650 border-slate-200 bg-white'}`}>
                                        <Info className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                                        Belum ada rilis berita atau peringatan siber saat ini.
                                    </div>
                                )}
                            </div>

                            {/* RIGHT COLUMN: EVENTS/ACARA (1/3 width) */}
                            <div className="lg:col-span-4 space-y-8 border-t lg:border-t-0 lg:border-l border-slate-900/30 lg:pl-8 pt-8 lg:pt-0">
                                <div className="space-y-2 mb-4">
                                    <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Agenda Kegiatan</span>
                                    <h2 className="text-3xl font-extrabold tracking-tight">Acara & Event</h2>
                                </div>

                                {latestEvents.length ? (
                                    <div className="space-y-6">
                                        {latestEvents.map((event) => (
                                            <div 
                                                key={event.id}
                                                className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group hover:border-teal-500/40 ${isDarkMode ? 'bg-slate-900/30 border-slate-900/60 hover:bg-slate-900/50' : 'bg-white border-slate-200 shadow-sm'}`}
                                            >
                                                {/* Left Accent Bar on Hover */}
                                                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                
                                                <div className="space-y-3">
                                                    <h3 className="font-bold text-sm leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                                                        {event.title}
                                                    </h3>
                                                    
                                                    <div className="space-y-1 text-[11px] text-slate-400">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                                                            <span>{event.event_date}</span>
                                                        </div>
                                                        {event.location && (
                                                            <div className="flex items-center gap-1.5">
                                                                <Building className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                                                                <span className="truncate">{event.location}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {event.excerpt && (
                                                        <p className="text-[11px] text-slate-400/90 line-clamp-2 leading-relaxed">
                                                            {event.excerpt}
                                                        </p>
                                                    )}

                                                    {event.registration_link && (
                                                        <Link 
                                                            href="/events" 
                                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-400 hover:text-teal-300 transition-colors mt-1"
                                                        >
                                                            Detail 
                                                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={`rounded-2xl p-8 text-center border font-medium text-xs ${isDarkMode ? 'text-slate-500 border-slate-900 bg-slate-900/10' : 'text-slate-650 border-slate-200 bg-white'}`}>
                                        <Calendar className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                                        Belum ada jadwal acara mendatang.
                                    </div>
                                )}
                            </div>

                        </div>
                    </section>

                    {/* CTA SECTION */}
                    <section className={`py-16 md:py-20 rounded-3xl text-center px-6 relative overflow-hidden border transition-all duration-300 my-16 ${
                        isDarkMode 
                            ? 'bg-slate-950/80 border-slate-800 shadow-2xl shadow-cyan-950/20' 
                            : 'bg-slate-900 border-slate-700 shadow-xl'
                    }`}>
                        {/* High-tech glow orbs inside the section */}
                        <div className="absolute top-[-50%] left-[-20%] w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[350px] h-[350px] rounded-full bg-blue-600/10 blur-[80px] pointer-events-none"></div>
                        
                        {/* High-tech grid background specifically for this card */}
                        <div 
                            className="absolute inset-0 opacity-15 pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
                                `,
                                backgroundSize: '24px 24px'
                            }}
                        ></div>

                        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                                Terjadi Indikasi{' '}
                                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                                    Kebocoran atau Serangan?
                                </span>
                            </h2>
                            <p className="text-sm md:text-base text-slate-300/90 leading-relaxed">
                                Jangan tunda pelaporan insiden keamanan siber. Pelaporan dini membantu tim CSIRT mengunci kerentanan dengan lebih sigap dan meminimalisir eksposur data.
                            </p>
                            <div className="flex justify-center gap-4 pt-2">
                                <button 
                                    onClick={() => { setShowReportModal(true); setReportStep(1); }} 
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3.5 px-8 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer border border-cyan-400/20"
                                >
                                    Buka Formulir Laporan
                                </button>
                            </div>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className={`border-t py-12 transition-colors duration-300 relative z-10 ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <img 
                                    src="/asset/img/logo-full.png" 
                                    alt="RSUI" 
                                    className="h-9 w-auto transition-all" 
                                    style={{ filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}
                                />
                                <span className="text-lg font-bold text-white tracking-tight">CSIRT RSUI</span>
                            </div>
                            <p className="text-xs max-w-sm leading-relaxed">
                                Tim Tanggap Insiden Keamanan Siber (CSIRT) Rumah Sakit Universitas Indonesia. Melayani dan melindungi sistem informasi serta privasi data pasien.
                            </p>
                        </div>
                        <div className="md:col-span-6 flex flex-wrap justify-end gap-x-8 gap-y-2 text-xs font-semibold">
                            <a href="#" className="hover:text-blue-500 transition-colors">Kebijakan Privasi</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Syarat Layanan</a>
                            <a href="#" className="hover:text-blue-500 transition-colors">Kontak Kami</a>
                            <span className="text-slate-600">|</span>
                            <span className="text-slate-500">&copy; {new Date().getFullYear()} CSIRT RSUI. All Rights Reserved.</span>
                        </div>
                    </div>
                </footer>

                {/* ======================================================== */}
                {/* WIZARD MODAL: LAPORKAN INSIDEN (MULTI-STEP) */}
                {/* ======================================================== */}
                {showReportModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-all">
                        <div className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                            {/* Modal Header */}
                            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800/40 bg-slate-950/20">
                                <h3 className="font-bold flex items-center gap-2">
                                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                                    <span>Formulir Laporan Insiden</span>
                                </h3>
                                <button 
                                    onClick={() => setShowReportModal(false)}
                                    className="p-1.5 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Progress Indicator */}
                            {reportStep < 3 && (
                                <div className="px-6 pt-4">
                                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                        <span>Langkah {reportStep} dari 2</span>
                                        <span>
                                            {reportStep === 1 && 'Identitas & Waktu'}
                                            {reportStep === 2 && 'Rincian & Lampiran'}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-600 transition-all duration-300"
                                            style={{ width: `${(reportStep / 2) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Modal Content / Form Fields */}
                            <div className="p-6 overflow-y-auto space-y-4 flex-grow">
                                {reportStep === 1 && (
                                    <div className="space-y-4">

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nama Pelapor *</label>
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    name="reporter_name"
                                                    value={formData.reporter_name}
                                                    onChange={handleInputChange}
                                                    placeholder="Nama lengkap Anda"
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm bg-transparent outline-none transition-all ${isDarkMode ? 'border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25' : 'border-slate-300 focus:border-blue-500'}`}
                                                />
                                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                            </div>
                                            {formErrors.reporter_name && <p className="text-[11px] text-rose-500">{formErrors.reporter_name}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Pelapor *</label>
                                            <div className="relative">
                                                <input 
                                                    type="email" 
                                                    name="reporter_email"
                                                    value={formData.reporter_email}
                                                    onChange={handleInputChange}
                                                    placeholder="alamat@email.com"
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm bg-transparent outline-none transition-all ${isDarkMode ? 'border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25' : 'border-slate-300 focus:border-blue-500'}`}
                                                />
                                                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                                            </div>
                                            {formErrors.reporter_email && <p className="text-[11px] text-rose-500">{formErrors.reporter_email}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal & Waktu Kejadian *</label>
                                            <div className="relative">
                                                <input 
                                                    type="datetime-local" 
                                                    name="incident_date"
                                                    value={formData.incident_date}
                                                    onChange={handleInputChange}
                                                    style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
                                                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm bg-transparent outline-none transition-all ${isDarkMode ? 'border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 text-white' : 'border-slate-300 focus:border-blue-500 text-slate-900'}`}
                                                />
                                                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                                            </div>
                                            {formErrors.incident_date && <p className="text-[11px] text-rose-500">{formErrors.incident_date}</p>}
                                        </div>
                                    </div>
                                )}

                                {reportStep === 2 && (
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tipe Insiden *</label>
                                            <select 
                                                name="incident_type"
                                                value={formData.incident_type}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2.5 border rounded-xl text-sm bg-transparent outline-none transition-all ${isDarkMode ? 'border-slate-800 bg-slate-900 text-white focus:border-blue-500' : 'border-slate-300 bg-white text-slate-900 focus:border-blue-500'}`}
                                            >
                                                <option value="phishing" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Phishing / Social Engineering</option>
                                                <option value="malware" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Malware Infection</option>
                                                <option value="ransomware" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Ransomware</option>
                                                <option value="ddos" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>DDoS Attack</option>
                                                <option value="unauthorized_access" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Unauthorized Access</option>
                                                <option value="web_defacement" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Web Defacement</option>
                                                <option value="data_leak" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Data Leak</option>
                                                <option value="vulnerability" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Kerentanan Keamanan / Vulnerability</option>
                                                <option value="others" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Lainnya</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tingkat Kerentanan *</label>
                                            <select 
                                                name="vulnerability_level"
                                                value={formData.vulnerability_level}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2.5 border rounded-xl text-sm bg-transparent outline-none transition-all ${isDarkMode ? 'border-slate-800 bg-slate-900 text-white focus:border-blue-500' : 'border-slate-300 bg-white text-slate-900 focus:border-blue-500'}`}
                                            >
                                                <option value="low" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Rendah (Low)</option>
                                                <option value="medium" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Sedang (Medium)</option>
                                                <option value="high" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Tinggi (High)</option>
                                                <option value="critical" className={isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>Kritis (Critical)</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deskripsi Kejadian / Kronologi *</label>
                                            <textarea 
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows={4}
                                                placeholder="Jelaskan detail serangan siber atau kegagalan keamanan yang terdeteksi..."
                                                className={`w-full px-3 py-2.5 border rounded-xl text-sm bg-transparent outline-none transition-all resize-none ${isDarkMode ? 'border-slate-800 focus:border-blue-500' : 'border-slate-300 focus:border-blue-500'}`}
                                            ></textarea>
                                            {formErrors.description && <p className="text-[11px] text-rose-500">{formErrors.description}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">File Lampiran (Opsional, Maks 2MB)</label>
                                            <div className={`border-2 border-dashed rounded-xl p-4 text-center relative hover:bg-slate-800/20 transition-all ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
                                                <input 
                                                    type="file" 
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                                                <span className="text-xs block text-slate-400 font-semibold mb-1">
                                                    {attachmentFile ? attachmentFile.name : 'Pilih Berkas atau Tarik ke Sini'}
                                                </span>
                                                <span className="text-[10px] text-slate-500">Mendukung Gambar (PNG, JPG), PDF, DOCX, ZIP</span>
                                            </div>
                                            {formErrors.attachment && <p className="text-[11px] text-rose-500">{formErrors.attachment}</p>}
                                        </div>

                                        {/* Google reCAPTCHA Verification */}
                                        <div className="space-y-2 pt-2 border-t border-slate-800/40">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Verifikasi Keamanan *</label>
                                            <div 
                                                ref={recaptchaRef} 
                                                className="flex justify-start overflow-hidden min-h-[78px]"
                                            >
                                                {/* reCAPTCHA widget will be rendered here dynamically */}
                                            </div>
                                            {formErrors.recaptcha_token && <p className="text-[11px] text-rose-500 font-semibold">{formErrors.recaptcha_token}</p>}
                                        </div>
                                    </div>
                                )}

                                {reportStep === 3 && (
                                    <div className="py-6 text-center space-y-4">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto animate-bounce">
                                            <ShieldCheck className="w-7 h-7" />
                                        </div>
                                        
                                        <div className="space-y-1.5">
                                            <h4 className="text-lg font-bold text-white">Laporan Berhasil Terkirim!</h4>
                                            <p className="text-xs text-slate-400 px-4 leading-relaxed">
                                                Terima kasih atas laporan Anda. Tim analis siber CSIRT RSUI telah menerima laporan ini dan akan segera melakukan investigasi mendalam.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer (Action Buttons) */}
                            <div className="px-6 py-4 border-t border-slate-800/40 bg-slate-950/20 flex justify-between">
                                {reportStep === 2 ? (
                                    <button 
                                        onClick={prevStep}
                                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 border border-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white"
                                    >
                                        Kembali
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {reportStep === 1 ? (
                                    <button 
                                        onClick={nextStep}
                                        className="px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
                                    >
                                        Lanjutkan
                                    </button>
                                ) : reportStep === 2 ? (
                                    <button 
                                        onClick={handleReportSubmit}
                                        disabled={isSubmittingReport}
                                        className="px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all flex items-center gap-1 disabled:opacity-60"
                                    >
                                        {isSubmittingReport && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Kirim Laporan
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            setShowReportModal(false);
                                            // Reset form fields after closure
                                            setFormData({
                                                reporter_name: '',
                                                reporter_email: '',
                                                incident_type: 'phishing',
                                                vulnerability_level: 'low',
                                                incident_date: '',
                                                description: '',
                                            });
                                            setAttachmentFile(null);
                                        }}
                                        className="w-full py-2.5 text-xs font-bold bg-slate-800 border border-slate-700/50 hover:bg-slate-750 text-white rounded-lg transition-all"
                                    >
                                        Tutup
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </>
    );
}
