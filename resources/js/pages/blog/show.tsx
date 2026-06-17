import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    Sun, 
    Moon, 
    ArrowLeft, 
    Calendar, 
    FileText, 
    Key, 
    Menu, 
    ShieldAlert, 
    Clock 
} from 'lucide-react';

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    thumbnail_url?: string | null;
    content: string;
    published_at?: string | null;
};

type BlogShowProps = {
    post: BlogPost;
};

export default function BlogShow({ post }: BlogShowProps) {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = typeof window !== 'undefined' ? localStorage.getItem('darkMode') : null;
        return savedMode !== null ? savedMode === 'true' : true;
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

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 relative overflow-x-hidden ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            <Head title={`${post.title} | Blog CSIRT RSUI`}>
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

            {/* CYBER BACKGROUND OVERLAYS */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
                <div className="laser-scanning-line"></div>
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
                <div 
                    className="absolute inset-0 opacity-40 dark:opacity-60"
                    style={{
                        backgroundImage: `radial-gradient(circle, ${isDarkMode ? 'rgba(20, 184, 166, 0.22)' : 'rgba(20, 184, 166, 0.12)'} 1.2px, transparent 0)`,
                        backgroundSize: '20px 20px'
                    }}
                ></div>
                {isDarkMode && (
                    <>
                        <div className="absolute top-[-5%] left-[5%] w-[450px] h-[450px] rounded-full bg-blue-600/15 blur-[130px] animate-pulse"></div>
                        <div className="absolute bottom-[5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-650/15 blur-[130px]"></div>
                    </>
                )}
            </div>

            {/* HEADER */}
            <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 border-b ${isDarkMode ? 'bg-slate-950/85 border-slate-900' : 'bg-white/90 border-slate-200'}`}>
                <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 select-none z-10">
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
                    </Link>
                    
                    <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium z-10">
                        <Link href="/#home" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>Home</Link>
                        <Link href="/#tentang" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Tentang</Link>
                        <Link href="/#layanan" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>Layanan</Link>
                        <Link href="/#berita" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>Berita</Link>
                        <Link href="/events" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Acara</Link>
                        <a href="/download/rfc-2350" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                            <FileText className="w-4 h-4" /> RFC 2350
                        </a>
                        <a href="/download/public-key" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-650'}`}>
                            <Key className="w-4 h-4" /> Public Key
                        </a>
                    </nav>
                    
                    <div className="flex items-center gap-3 z-10">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                            aria-label="Toggle Mode"
                        >
                            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                        
                        <Link 
                            href="/#lapor"
                            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all shadow-lg shadow-blue-500/20"
                        >
                            <ShieldAlert className="w-4 h-4" />
                            Laporkan Insiden
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className={`lg:hidden border-t py-4 px-6 ${isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
                        <div className="flex flex-col space-y-4 text-sm font-medium">
                            <Link href="/#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Home</Link>
                            <Link href="/#tentang" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Tentang</Link>
                            <Link href="/#layanan" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Layanan</Link>
                            <Link href="/#berita" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Berita</Link>
                            <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-500">Acara</Link>
                            <a href="/download/rfc-2350" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-500">
                                <FileText className="w-4 h-4" /> RFC 2350
                            </a>
                            <a href="/download/public-key" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-500">
                                <Key className="w-4 h-4" /> Public Key
                            </a>
                            <Link 
                                href="/#lapor"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all"
                            >
                                <ShieldAlert className="w-4 h-4" />
                                Laporkan Insiden
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO SECTION */}
            <div className={`relative py-16 border-b ${
                isDarkMode 
                    ? 'bg-slate-950/70 border-slate-900' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
            }`}>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-4">
                    <p className={`uppercase tracking-[0.25em] text-xs font-bold ${isDarkMode ? 'text-blue-450' : 'text-blue-200'}`}>Artikel &amp; Peringatan</p>
                    <h1 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{post.published_at ?? 'Published'}</span>
                    </div>
                </div>
            </div>

            {/* MAIN ARTICLE BODY */}
            <main className="max-w-4xl mx-auto px-6 py-12 relative z-10 w-full space-y-8">
                
                {/* Thumbnail */}
                {post.thumbnail_url && (
                    <div className={`rounded-3xl overflow-hidden border shadow-2xl h-80 md:h-[450px] relative ${isDarkMode ? 'border-slate-900' : 'border-slate-200'}`}>
                        <img 
                            src={post.thumbnail_url} 
                            alt={post.title} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                )}

                {/* Content Card */}
                <article className={`rounded-3xl border p-6 md:p-10 shadow-xl prose max-w-none transition-all ${
                    isDarkMode 
                        ? 'bg-slate-900/30 border-slate-900/80 backdrop-blur-sm prose-invert' 
                        : 'bg-white border-slate-200 prose-slate'
                }`}>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Navigation Back */}
                <div className="flex flex-wrap justify-between items-center text-xs text-slate-500 border-t pt-6 border-slate-900/30 gap-4">
                    <span>&copy; {new Date().getFullYear()} CSIRT RSUI</span>
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-1.5 font-bold text-blue-500 hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali ke semua artikel
                    </Link>
                </div>
            </main>

            {/* FOOTER */}
            <footer className={`border-t py-12 transition-colors duration-300 mt-20 relative z-10 ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-650'}`}>
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
        </div>
    );
}
