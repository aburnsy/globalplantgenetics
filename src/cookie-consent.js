// Cookie Consent Banner
// GDPR-compliant cookie consent management

(function() {
    'use strict';

    const COOKIE_NAME = 'gpg_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;

    // Check if consent has already been given
    function hasConsent() {
        return localStorage.getItem(COOKIE_NAME) !== null;
    }

    // Get consent preferences
    function getConsentPreferences() {
        const saved = localStorage.getItem(COOKIE_NAME);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Save consent preferences
    function saveConsent(preferences) {
        localStorage.setItem(COOKIE_NAME, JSON.stringify({
            ...preferences,
            timestamp: new Date().toISOString()
        }));
    }

    // Create and show banner
    function showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3>🍪 We Value Your Privacy</h3>
                    <p>We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our <a href="/privacy-policy.html">Privacy Policy</a>.</p>
                </div>
                <div class="cookie-consent-actions">
                    <button id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Accept All</button>
                    <button id="cookie-reject-all" class="cookie-btn cookie-btn-secondary">Reject Non-Essential</button>
                    <button id="cookie-customize" class="cookie-btn cookie-btn-text">Customize</button>
                </div>
            </div>
            <div id="cookie-preferences" class="cookie-preferences" style="display: none;">
                <h4>Cookie Preferences</h4>
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <input type="checkbox" id="cookie-essential" checked disabled>
                        <label for="cookie-essential">
                            <strong>Essential Cookies</strong>
                            <span>Required for website functionality and security</span>
                        </label>
                    </div>
                </div>
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <input type="checkbox" id="cookie-analytics">
                        <label for="cookie-analytics">
                            <strong>Analytics Cookies</strong>
                            <span>Help us understand how visitors use our site</span>
                        </label>
                    </div>
                </div>
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <input type="checkbox" id="cookie-marketing">
                        <label for="cookie-marketing">
                            <strong>Marketing Cookies</strong>
                            <span>Used to deliver relevant advertisements</span>
                        </label>
                    </div>
                </div>
                <div class="cookie-preference-actions">
                    <button id="cookie-save-preferences" class="cookie-btn cookie-btn-primary">Save Preferences</button>
                    <button id="cookie-back" class="cookie-btn cookie-btn-secondary">Back</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Event listeners
        document.getElementById('cookie-accept-all').addEventListener('click', function() {
            saveConsent({ essential: true, analytics: true, marketing: true });
            hideBanner();
            loadAnalytics();
        });

        document.getElementById('cookie-reject-all').addEventListener('click', function() {
            saveConsent({ essential: true, analytics: false, marketing: false });
            hideBanner();
        });

        document.getElementById('cookie-customize').addEventListener('click', function() {
            document.querySelector('.cookie-consent-content').style.display = 'none';
            document.getElementById('cookie-preferences').style.display = 'block';
        });

        document.getElementById('cookie-back').addEventListener('click', function() {
            document.querySelector('.cookie-consent-content').style.display = 'block';
            document.getElementById('cookie-preferences').style.display = 'none';
        });

        document.getElementById('cookie-save-preferences').addEventListener('click', function() {
            const preferences = {
                essential: true,
                analytics: document.getElementById('cookie-analytics').checked,
                marketing: document.getElementById('cookie-marketing').checked
            };
            saveConsent(preferences);
            hideBanner();
            if (preferences.analytics) {
                loadAnalytics();
            }
        });

        // Animate in
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }

    // Hide banner
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Load analytics if consented
    function loadAnalytics() {
        const preferences = getConsentPreferences();
        if (preferences && preferences.analytics) {
            // Load Google Analytics or other analytics here
            console.log('Analytics loaded (placeholder)');
            // Example:
            // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            // })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            // ga('create', 'UA-XXXXX-Y', 'auto');
            // ga('send', 'pageview');
        }
    }

    // Initialize
    function init() {
        if (!hasConsent()) {
            // Wait for page load before showing banner
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', showBanner);
            } else {
                showBanner();
            }
        } else {
            // Load analytics if previously consented
            loadAnalytics();
        }
    }

    init();
})();
