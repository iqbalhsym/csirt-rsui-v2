<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="/rsui-con.ico" sizes="any">
        <link rel="icon" href="/rsui-con.ico" type="image/x-icon">
        <link rel="apple-touch-icon" href="/rsui-con.ico">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        {{-- Google reCAPTCHA Integration --}}
        <meta name="recaptcha-site-key" content="{{ env('RECAPTCHA_SITE_KEY', '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI') }}">
        <script src="https://www.google.com/recaptcha/api.js?render=explicit" async defer></script>
    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- Cookie & Cache Consent Banner -->
        <div id="cookie-consent-banner" class="cookie-banner-hidden" style="display: none;">
            <div class="cookie-content">
                <div class="cookie-body">
                    <div class="cookie-icon-wrapper">
                        <svg class="cookie-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div class="cookie-text-section">
                        <h4 class="cookie-title">Izinkan Cookies & Penyimpanan Cache?</h4>
                        <p class="cookie-desc">
                            Situs ini menggunakan cookie dan penyimpanan cache browser untuk meningkatkan kecepatan loading aset serta mengoptimalkan performa keamanan siber Sentinel.
                        </p>
                    </div>
                </div>
                <div class="cookie-buttons">
                    <button id="btn-reject-cookie" class="cookie-btn-reject">Tolak</button>
                    <button id="btn-accept-cookie" class="cookie-btn-accept">Izinkan & Simpan</button>
                </div>
            </div>
        </div>

        <style>
            #cookie-consent-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                width: 100%;
                padding: 18px 24px;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                background-color: rgba(10, 15, 30, 0.85);
                backdrop-filter: blur(16px);
                box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.3);
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
                opacity: 0;
                transform: translateY(100%);
                box-sizing: border-box;
            }
            @media (min-width: 768px) {
                #cookie-consent-banner {
                    padding: 20px 48px;
                }
            }
            
            /* Light mode styling */
            html:not(.dark) #cookie-consent-banner {
                background-color: rgba(255, 255, 255, 0.92);
                border-top: 1px solid rgba(0, 0, 0, 0.08);
                box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.05);
            }

            .cookie-content {
                display: flex;
                flex-direction: column;
                gap: 16px;
                width: 100%;
            }

            @media (min-width: 768px) {
                .cookie-content {
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    gap: 32px;
                }
            }

            .cookie-body {
                display: flex;
                align-items: flex-start;
                gap: 20px;
                flex: 1;
            }

            @media (min-width: 640px) {
                .cookie-body {
                    align-items: center;
                }
            }

            .cookie-icon-wrapper {
                padding: 10px;
                border-radius: 12px;
                background-color: rgba(59, 130, 246, 0.1);
                border: 1px solid rgba(59, 130, 246, 0.2);
                color: #3b82f6;
                height: fit-content;
                flex-shrink: 0;
            }

            .cookie-icon {
                width: 28px;
                height: 28px;
            }

            .cookie-text-section {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .cookie-title {
                margin: 0;
                font-size: 16px;
                font-weight: 700;
                color: #ffffff;
                font-family: inherit;
            }
            html:not(.dark) .cookie-title {
                color: #0f172a;
            }

            .cookie-desc {
                margin: 0;
                font-size: 14px;
                line-height: 1.5;
                color: #94a3b8;
                font-family: inherit;
            }
            html:not(.dark) .cookie-desc {
                color: #475569;
            }

            .cookie-buttons {
                display: flex;
                align-items: center;
                gap: 16px;
                flex-shrink: 0;
            }

            @media (max-width: 767px) {
                .cookie-buttons {
                    justify-content: flex-end;
                    width: 100%;
                }
            }

            .cookie-btn-accept {
                background-color: #2563eb;
                color: #ffffff;
                font-weight: 700;
                font-size: 13px;
                padding: 10px 24px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.1s;
                box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
            }
            .cookie-btn-accept:hover {
                background-color: #3b82f6;
            }
            .cookie-btn-accept:active {
                transform: scale(0.96);
            }

            .cookie-btn-reject {
                background: none;
                border: none;
                color: #64748b;
                font-weight: 600;
                font-size: 13px;
                cursor: pointer;
                transition: color 0.2s;
            }
            .cookie-btn-reject:hover {
                color: #94a3b8;
            }
            html:not(.dark) .cookie-btn-reject:hover {
                color: #0f172a;
            }

            /* Animations */
            #cookie-consent-banner.cookie-banner-show {
                opacity: 1;
                transform: translateY(0);
            }
        </style>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const consent = localStorage.getItem('cookieConsent');
                const banner = document.getElementById('cookie-consent-banner');
                
                if (!consent) {
                    banner.style.display = 'block';
                    // Trigger reflow to enable CSS transition
                    banner.offsetHeight;
                    banner.classList.add('cookie-banner-show');
                }

                document.getElementById('btn-accept-cookie').addEventListener('click', function() {
                    localStorage.setItem('cookieConsent', 'true');
                    banner.classList.remove('cookie-banner-show');
                    setTimeout(() => {
                        banner.style.display = 'none';
                    }, 400);
                });

                document.getElementById('btn-reject-cookie').addEventListener('click', function() {
                    banner.classList.remove('cookie-banner-show');
                    setTimeout(() => {
                        banner.style.display = 'none';
                    }, 400);
                });
            });
        </script>
    </body>
</html>
