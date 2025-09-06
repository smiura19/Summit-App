'use client';

import { useEffect, useState } from 'react';


declare global {
    interface Window {
        MSStream: any;
    }
}
// ====================
// Utility Functions
// ====================
function detectBrowser() {
  const { userAgent } = navigator;
  return userAgent.match(/edg/i) ? 'edge' :
    userAgent.match(/chrome|chromium|crios/i) ? 'chrome' :
    userAgent.match(/firefox|fxios/i) ? 'firefox' :
    userAgent.match(/safari/i) ? 'safari' :
    userAgent.match(/opr\//i) ? 'opera' :
    userAgent.match(/android/i) ? 'android' :
    userAgent.match(/iphone/i) ? 'iphone' : 'unknown';
}

function detectPlatform() {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !window.MSStream ? 'ios' :
    /android/i.test(ua) ? 'android' :
    /Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(ua) ? 'macos' :
    /CrOS/gi.test(ua) ? 'chromeos' :
    /Win32|Win64|Windows|Windows NT|WinCE/gi.test(ua) ? 'windows' :
    /Linux/gi.test(ua) ? 'linux' : 'unknown';
}


// Detect platform + browser (example)
function getPlatformBrowserKey() {
  const ua = navigator.userAgent.toLowerCase();
  if (/windows/.test(ua)) {
    if (/chrome/.test(ua)) return 'windows-chrome';
    if (/firefox/.test(ua)) return 'windows-firefox';
  }
  if (/macintosh/.test(ua)) {
    if (/safari/.test(ua)) return 'macos-safari';
    if (/firefox/.test(ua)) return 'macos-firefox';
  }
  if (/iphone|ipad/.test(ua)) {
    if (/safari/.test(ua)) return 'ios-safari';
    if (/crios/.test(ua)) return 'ios-chrome';
    if (/fxios/.test(ua)) return 'ios-firefox';
    if (/edgios/.test(ua)) return 'ios-edge';
  }
  if (/android/.test(ua)) {
    if (/chrome/.test(ua)) return 'android-chrome';
    if (/firefox/.test(ua)) return 'android-firefox';
    if (/edg/.test(ua)) return 'android-edge';
  }
  return null;
}

const templates: Record<string,string> = {
    'windows-chrome': `
    <div className="body">
      <p>
        To install the app from Chrome on Windows:
      </p>
      <ul>
        <li>
          <img src="/images/Ios-Share--Streamline-Outlined-Material-Symbols.png">
          1. Tap Share
        </li>
        <li>
          <img src="/images/Add-Box--Streamline-Outlined-Material-Symbols.png">
          2. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
    'ios-safari': `
    <div className="body">
      <p>
        To install the app from Safari on iOS:
      </p>
      <ul>
        <li>
          <img src="/images/Ios-Share--Streamline-Outlined-Material-Symbols.png">
          1. Tap Share
        </li>
        <li>
          <img src="/images/Add-Box--Streamline-Outlined-Material-Symbols.png">
          2. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
  'ios-chrome': `
    <div className="body">
      <p>
        To install the app from Chrome on iOS:
      </p>
      <ul>
        <li>
          <img src="/images/Ios-Share--Streamline-Outlined-Material-Symbols.png">
          <img src="/src/img/install/ios-share.svg">
          1. Tap Share in the address bar
        </li>
        <li>
          <img src="/images/Add-Box--Streamline-Outlined-Material-Symbols.png">
          <img src="/src/img/install/add-to-home-screen.svg">
          2. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
  'ios-edge': `
    <div className="body">
      <p>
        To install the app from Edge on iOS:
      </p>
      <ul>
        <li>
          <img src="/images/Density-Small--Streamline-Outlined-Material-Symbols.png">
          1. Tap menu in the bottom-right corner
        </li>
        <li>
          <img src="/images/Ios-Share--Streamline-Outlined-Material-Symbols.png">
          2. Swipe up and tap Share
        </li>
        <li>
          <img src="/images/Add-Box--Streamline-Outlined-Material-Symbols.png">
          3. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
  'ios-firefox': `
    <div className="body">
      <p>
        To install the app from Firefox on iOS:
      </p>
      <ul>
        <li>
          <img src="/images/Density-Small--Streamline-Outlined-Material-Symbols.png">
          1. Tap menu in the bottom-right corner
        </li>
        <li>
          <img src="/images/Ios-Share--Streamline-Outlined-Material-Symbols.png">
          2. Swipe up and tap Share
        </li>
        <li>
          <img src="/images/Add-Box--Streamline-Outlined-Material-Symbols.png">
          3. Swipe up and tap Add to Home Screen
        </li>
      </ul>
    </div>
  `,
    'android-chrome': `
    <div className="body">
      <p>
        To install the app from Edge on Android:
      </p>
      <ul>
        <li>
          <img src="/images/Density-Small--Streamline-Outlined-Material-Symbols.png">
          1. Tap menu in the bottom-right corner
        </li>
        <li>
          <img src="/src/img/install/add-to-phone.svg">
          2. Swipe left and tap Add to Phone
        </li>
      </ul>
    </div>
  `,
  'android-edge': `
    <div className="body">
      <p>
        To install the app from Edge on Android:
      </p>
      <ul>
        <li>
          <img src="/images/Density-Small--Streamline-Outlined-Material-Symbols.png">
          1. Tap menu in the bottom-right corner
        </li>
        <li>
          <img src="/src/img/install/add-to-phone.svg">
          2. Swipe left and tap Add to Phone
        </li>
      </ul>
    </div>
  `,
  'android-firefox': `
    <div className="body">
      <p>
        To install the app from Firefox on Android:
      </p>
      <ul>
        <li>
          <img src="/src/img/install/menu-vert.svg">
          1. Tap menu in the top-right corner
        </li>
        <li>
          <img src="/src/img/install/install-phone.svg">
          2. Swipe up and tap Install
        </li>
      </ul>
    </div>
  `,
  'macos-safari': `
    <div className="body">
      <p>
        To install the app from Safari on MacOS:
      </p>
      <ul>
        <li>
          <img src="/images/Ios-Share--Streamline-Outlined-Material-Symbols.png"
          1. Click Share
        </li>
        <li>
          <img src="/src/img/install/add-to-dock.svg">
          2. Click Add to Dock
        </li>
      </ul>
    </div>
  `,
  'macos-firefox': `
    <div className="body">
      <p>
        Currently, this web app cannot be installed in Firefox. Please choose another browser like Safari, Chrome or Edge.
      </p>
    </div>
  `,
  'windows-firefox': `
    <div className="body">
      <p>
        Currently, this web app cannot be installed in Firefox. Please choose another browser like Chrome or Edge.
      </p>
    </div>
  `,
  'linux-firefox': `
    <div className="body">
      <p>
        Currently, this web app cannot be installed in Firefox. Please choose another browser like Chrome or Edge.
      </p>
    </div>
  `
};

export default function InstallModal({
  onClose,
}: {
  onClose: () => void;
}) {

  const [installHTML, setInstallHTML] = useState('');

  useEffect(() => {
    const platform = detectPlatform();
    const browser = detectBrowser();
    const key = `${platform}-${browser}`;
    setInstallHTML(templates[key] || templates['other']);
  }, []);

  return (
    <div 
    id="session-details-modal"
    style={{
      position: 'fixed',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      padding: '2rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      zIndex: 1000,
      width: '90%',
      maxWidth: '500px',
      borderRadius: '10px'
    }}>
      <div
        className="modal-body mt-4 p-3 border rounded bg-gray-50"
        dangerouslySetInnerHTML={{ __html: installHTML }}
      />

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        Close
      </button>
    </div>
  );
}
