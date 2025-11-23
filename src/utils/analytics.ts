declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export function trackPageView() {
  if (window.gtag) {
    window.gtag('config', 'G-THZK06R4YS', {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }
}

export function trackShareClick() {
  if (window.gtag) {
    window.gtag('event', 'share_scenario', {
      event_category: 'engagement',
      event_label: 'share_button_clicked',
    });
  }
}
