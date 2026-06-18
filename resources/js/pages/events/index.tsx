import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    Sun, 
    Moon, 
    ChevronRight, 
    Info, 
    ArrowRight, 
    Calendar, 
    FileText, 
    Key, 
    Menu, 
    ShieldAlert, 
    Clock, 
    Building,
    Folder 
} from 'lucide-react';

type EventPost = {
    id: number;
    title: string;
    slug: string;
    thumbnail_url?: string | null;
    excerpt: string;
    event_date: string;
    event_year: string;
    location?: string | null;
    registration_link?: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedEvents = {
    data: EventPost[];
    links: PaginationLink[];
};

type YearArchive = {
    year: string;
    count: number;
    param: string;
};

type EventYearSection = {
    year: string;
    events: EventPost[];
};

type EventIndexProps = {
    events: PaginatedEvents;
    yearSections: EventYearSection[];
    archives: YearArchive[];
    activeYear?: string | null;
};

const placeholderImage = '/asset/img/blog-placeholder.png';

const getYearAnchor = (year: string) => (year === 'Tidak diketahui' ? 'year-unknown' : `year-${year}`);

const normalizeUrl = (url: string | null) => {
    if (!url) {
        return null;
    }

    try {
        const parsed = new URL(url);
        return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
        return url;
    }
};

const Pagination = ({ links, isDarkMode }: { links: PaginationLink[]; isDarkMode: boolean }) => {
    if (!links.length) {
        return null;
    }

    return (
        <nav className="flex flex-wrap justify-center gap-2 mt-12" aria-label="Navigasi halaman event">
            {links.map((link, index) => (
                <span key={`${link.label}-${index}`}>
                    {link.url ? (
                        <Link
                            href={normalizeUrl(link.url) ?? '#top'}
                            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                                link.active
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : isDarkMode 
                                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                                        : 'bg-white border-gray-200 text-gray-650 hover:border-blue-500 hover:text-blue-600'
                             }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <span
                            className={`px-4 py-2 rounded-lg border text-sm ${
                                isDarkMode 
                                    ? 'border-slate-900 bg-slate-950 text-slate-600' 
                                    : 'border-gray-100 bg-gray-50 text-gray-400'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )}
                </span>
            ))}
        </nav>
    );
};

export default function EventIndex({ events, yearSections, archives, activeYear }: EventIndexProps) {
    const hasEvents = events.data.length > 0;
    
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
            <Head title="Agenda Kegiatan & Acara | CSIRT RSUI">
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
                        <div className="absolute top-[35%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[150px]"></div>
                    </>
                )}
            </div>

            {/* HEADER */}
            <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 border-b ${isDarkMode ? 'bg-slate-950/85 border-slate-900' : 'bg-white/90 border-slate-200'}`}>
                <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-2.5 flex items-center justify-between">
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
                        <Link href="/#home" className={`transition-colors hover:text-blue-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-655'}`}>Home</Link>
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
            <div id="top" className={`relative py-20 text-center border-b ${
                isDarkMode 
                    ? 'bg-slate-950/70 border-slate-900' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'
            }`}>
                <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
                    <p className={`uppercase tracking-[0.25em] text-xs font-bold ${isDarkMode ? 'text-teal-400' : 'text-blue-200'}`}>Agenda &amp; Kegiatan</p>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Acara & Event Mendatang
                    </h1>
                    <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDarkMode ? 'text-slate-350' : 'text-blue-100'}`}>
                        Daftar dan ikuti berbagai kegiatan seminar, webinar, pelatihan, dan audit keamanan informasi yang diselenggarakan oleh CSIRT RSUI.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT SECTION */}
            <main className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-16 relative z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* LEFT LIST SECTION */}
                    <section className="lg:col-span-8 space-y-12">
                        {hasEvents ? (
                            yearSections.map((section) => (
                                <div key={section.year} id={getYearAnchor(section.year)} className="space-y-6">
                                    <div className="flex items-center justify-between border-b pb-3 border-slate-900/40">
                                        <div className="flex items-center gap-2">
                                            <Folder className="w-5 h-5 text-teal-400 shrink-0" />
                                            <h2 className="text-xl font-bold">Kegiatan Tahun {section.year}</h2>
                                        </div>
                                        <span className="text-xs text-slate-500 font-mono">{section.events.length} kegiatan</span>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {section.events.map((event) => (
                                            <article 
                                                key={event.id} 
                                                className={`rounded-2xl border flex flex-col group overflow-hidden transition-all duration-300 hover:border-teal-500/40 ${
                                                    isDarkMode 
                                                        ? 'bg-slate-900/30 border-slate-900 hover:bg-slate-900/60' 
                                                        : 'bg-white border-slate-200 shadow-sm'
                                                }`}
                                            >
                                                <Link href={`/events/${event.slug}`} className="block overflow-hidden relative h-48 bg-slate-950/20">
                                                    <img
                                                        src={event.thumbnail_url ?? placeholderImage}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </Link>
                                                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                                                    <div className="space-y-2.5">
                                                        <div className="space-y-1 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                                                                <span>{event.event_date}</span>
                                                            </div>
                                                            {event.location && (
                                                                <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px]">
                                                                    <Building className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                                                                    <span className="truncate">{event.location}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h3 className="text-base font-bold leading-snug group-hover:text-teal-400 transition-colors line-clamp-2">
                                                            <Link href={`/events/${event.slug}`}>
                                                                {event.title}
                                                            </Link>
                                                        </h3>
                                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{event.excerpt}</p>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between pt-1">
                                                        <Link 
                                                            href={`/events/${event.slug}`} 
                                                            className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors group/btn"
                                                        >
                                                            Lihat Detail
                                                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={`rounded-2xl p-12 text-center border font-medium ${
                                isDarkMode 
                                    ? 'text-slate-400 border-slate-900 bg-slate-900/10' 
                                    : 'text-slate-650 border-slate-200 bg-white'
                            }`}>
                                <Info className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                                Belum ada jadwal acara atau kegiatan saat ini.
                            </div>
                        )}

                        <Pagination links={events.links} isDarkMode={isDarkMode} />
                    </section>

                    {/* RIGHT ASIDE DIRECTORY */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 h-max space-y-6">
                        <div className={`rounded-2xl border p-6 ${
                            isDarkMode 
                                ? 'bg-slate-900/30 border-slate-900/80 backdrop-blur-sm' 
                                : 'bg-white border-slate-200 shadow-sm'
                        }`}>
                            <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block mb-2">Arsip Kegiatan</span>
                            <h2 className="text-lg font-bold mb-6">Filter Berdasarkan Tahun</h2>
                            {archives.length ? (
                                <ul className="space-y-2.5">
                                    <li>
                                        <Link
                                            href="/events#top"
                                            className={`flex items-center justify-between px-4 py-2 rounded-xl border transition-colors text-xs font-bold ${
                                                !activeYear
                                                    ? 'border-teal-500/50 bg-teal-500/10 text-teal-405'
                                                    : isDarkMode 
                                                        ? 'border-slate-800 bg-slate-950/40 text-slate-350 hover:border-slate-700 hover:text-slate-200'
                                                        : 'border-slate-200 bg-slate-50 text-slate-605 hover:border-slate-300 hover:text-slate-900'
                                            }`}
                                        >
                                            <span>Semua Tahun</span>
                                            <span className="font-mono text-slate-500">&mdash;</span>
                                        </Link>
                                    </li>
                                    {archives.map((archive) => {
                                        const isActive = activeYear === archive.year;
                                        return (
                                            <li key={archive.year}>
                                                <Link
                                                    href={`/events?year=${archive.param}#${getYearAnchor(archive.year)}`}
                                                    className={`flex items-center justify-between px-4 py-2 rounded-xl border transition-colors text-xs font-bold ${
                                                        isActive
                                                            ? 'border-teal-500/50 bg-teal-500/10 text-teal-450'
                                                            : isDarkMode
                                                                ? 'border-slate-800 bg-slate-950/40 text-slate-350 hover:border-slate-700 hover:text-slate-200'
                                                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                                                    }`}
                                                >
                                                    <span>Tahun {archive.year}</span>
                                                    <span className="font-mono px-2 py-0.5 rounded bg-slate-950/30 text-[10px] text-slate-450 border border-slate-900">{archive.count}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-sm text-slate-505">Belum ada arsip tahun yang tersedia.</p>
                            )}
                        </div>
                    </aside>
                </div>
            </main>

            {/* FOOTER */}
            <footer className={`border-t py-12 transition-colors duration-300 mt-20 relative z-10 ${isDarkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-650'}`}>
                <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 grid md:grid-cols-12 gap-8 items-center">
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
                        <span className="text-slate-505">&copy; {new Date().getFullYear()} CSIRT RSUI. All Rights Reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
