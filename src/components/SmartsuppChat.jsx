// src/components/SmartsuppChat.jsx
import { useEffect } from 'react';

const SmartsuppChat = () => {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById('smartsupp-script')) return;

    console.log('SmartsuppChat component mounted'); // optional debug

    // Your exact key (same as before)
    const smartsuppKey = '4c60dd1f7ded53c0807cbb0e685bc474bf2a8887';

    // Set the key before loading the script (as per Smartsupp instructions)
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = smartsuppKey;

    // Create the script element exactly as Smartsupp provides
    const script = document.createElement('script');
    script.id = 'smartsupp-script';
    script.type = 'text/javascript';
    script.async = true;
    script.charset = 'utf-8';
    script.src = 'https://www.smartsuppchat.com/loader.js?';

    // Ensure the smartsupp function is defined before the script loads
    if (!window.smartsupp) {
      window.smartsupp = function() {
        window.smartsupp._.push(arguments);
      };
      window.smartsupp._ = [];
    }

    script.onload = () => {
      console.log('Smartsupp script loaded successfully');
    };
    script.onerror = (err) => {
      console.error('Failed to load Smartsupp script:', err);
    };

    document.body.appendChild(script);
  }, []);

  return null;
};

export default SmartsuppChat;