// public/surface_analytics.js

(function () {

  // Function to send event data to the backend
  function sendEvent(eventType, metadata = {}) {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        metadata
      }),
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error('Error sending analytics event:', error);
    });
  }

  // Track script initialization
  sendEvent('script_initialized');

  // Track page view
  sendEvent('page_view', {
    url: window.location.href,
    title: document.title,
    referrer: document.referrer,
  });

  // Track email entered
  document.addEventListener('input', function (e) {
    const target = e.target;
    if (target.type === 'email') {
      const email = target.value;
      if (email) {
        sendEvent('email_entered', {
          elementId: target.id || null,
          email: email, // Consider hashing for privacy
        });
      }
    }
  });

  // Track clicks on page elements
  document.addEventListener('click', function (e) {
    const target = e.target;
    sendEvent('element_clicked', {
      elementId: target.id || null,
      elementClasses: target.className || null,
      elementTag: target.tagName,
      textContent: target.textContent.trim().substring(0, 100), // Limit for brevity
    });
  });

  // Optional: Track route changes in Single Page Applications (SPAs)
  if (typeof window !== 'undefined') {
    let lastPath = window.location.pathname;

    const observer = new MutationObserver(() => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        lastPath = currentPath;
        sendEvent('page_view', {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer,
        });
      }
    });

    observer.observe(document, { subtree: true, childList: true });
  }
})();
