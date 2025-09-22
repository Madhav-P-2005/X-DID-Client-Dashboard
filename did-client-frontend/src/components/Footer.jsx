import React from 'react';
import { useTheme } from '../context/ThemeContext';
import SecureDAppLogo from '../assets/SecureDApp.png';

const Footer = () => {
  const { isDark } = useTheme();
  const bg = isDark ? 'bg-[#081B33]' : 'bg-slate-50';
  const border = isDark ? 'border-white/10' : 'border-gray-200';
  const heading = isDark ? 'text-white' : 'text-slate-900';
  const muted = isDark ? 'text-white/80' : 'text-slate-600';
  const link = isDark ? 'text-white/80 hover:text-emerald-300' : 'text-slate-600 hover:text-emerald-600';

  return (
    <footer className={`mt-12 ${bg} border-t ${border}`}>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-12">
        {/* Top section: Logo + Columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand and Socials */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <img src={SecureDAppLogo} alt="SecureDApp logo" className="h-7 w-7 object-contain" />
              <span className={`text-lg font-semibold ${heading}`}>SecureDApp</span>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xl">
              <a className={`${muted} hover:text-emerald-400`} href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord">
                <IconDiscord />
              </a>
              <a className={`${muted} hover:text-emerald-400`} href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                <IconX />
              </a>
              <a className={`${muted} hover:text-emerald-400`} href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <IconLinkedIn />
              </a>
              <a className={`${muted} hover:text-emerald-400`} href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram">
                <IconTelegram />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h4 className={`mb-3 text-sm font-semibold ${heading}`}>Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a className={link} href="#">Solidity Shield Scan</a></li>
                <li><a className={link} href="#">Secure Watch</a></li>
                <li><a className={link} href="#">Audit Express</a></li>
                <li><a className={link} href="#">Secure Trace</a></li>
                <li><a className={link} href="#">Secure Pad</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`mb-3 text-sm font-semibold ${heading}`}>Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a className={link} href="#">Audit</a></li>
                <li><a className={link} href="#">Security</a></li>
                <li><a className={link} href="#">Regulatory Solutions</a></li>
                <li><a className={link} href="#">Training & Education</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`mb-3 text-sm font-semibold ${heading}`}>Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a className={link} href="#">About Us</a></li>
                <li><a className={link} href="#">Authors</a></li>
                <li><a className={link} href="#">Media</a></li>
                <li><a className={link} href="#">Career</a></li>
                <li><a className={link} href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`mb-3 text-sm font-semibold ${heading}`}>Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a className={link} href="#">Blogs</a></li>
                <li><a className={link} href="#">Audits</a></li>
                <li><a className={link} href="#">Vulnerabilities</a></li>
                <li><a className={link} href="#">Github</a></li>
                <li><a className={link} href="#">Workplace Policy</a></li>
                <li><a className={link} href="#">Shipping & Delivery Policy</a></li>
                <li><a className={link} href="#">Pricing Policy</a></li>
                <li><a className={link} href="#">Cancellation & Refunds</a></li>
                <li><a className={link} href="#">Whitepaper</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`my-8 border-t ${border}`}></div>

        {/* Bottom bar */}
        <div className={`flex flex-col items-center justify-between gap-4 text-sm md:flex-row ${muted}`}>
          <div className="flex items-center gap-4">
            <a href="#" className={`hover:text-emerald-400`}>Privacy Policy</a>
            <span className="h-1 w-1 rounded-full bg-current inline-block" aria-hidden="true"></span>
            <a href="#" className={`hover:text-emerald-400`}>Terms & Conditions</a>
          </div>
          <div className="text-center md:text-right">
            © {new Date().getFullYear()} SecureDApp. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

// Inline Icon components
const IconDiscord = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.356-.43.83-.589 1.205a18.27 18.27 0 0 0-3.939 0A11.44 11.44 0 0 0 11.441 3c-1.466.27-3.6 1.01-3.6 1.01C5.347 6.343 4.73 8.6 4.73 10.804c0 3.463 2.043 5.38 2.043 5.38 2.043 1.532 3.983 1.484 3.983 1.484l.2-.239c-2.108-.6-3.075-1.94-3.075-1.94s.159.12.447.279c.016.01.033.017.05.026.008.004.012.006.015.008.494.273.988.468 1.433.608.807.257 1.764.356 2.844.356s2.037-.099 2.844-.356c.445-.14.939-.335 1.433-.608.003-.002.007-.004.015-.008.017-.009.034-.016.05-.026.288-.159.447-.279.447-.279s-.967 1.34-3.075 1.94l.2.239s1.94.048 3.983-1.484c0 0 2.043-1.917 2.043-5.38 0-2.204-.616-4.461-3.111-6.435zM9.275 12.635c-.564 0-1.017-.523-1.017-1.167 0-.645.453-1.168 1.017-1.168.572 0 1.025.523 1.017 1.168 0 .644-.445 1.167-1.017 1.167zm5.45 0c-.564 0-1.017-.523-1.017-1.167 0-.645.453-1.168 1.017-1.168.572 0 1.025.523 1.017 1.168 0 .644-.445 1.167-1.017 1.167z"/>
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M18.244 3H21l-6.47 7.39L22 21h-5.656l-4.42-5.52L6.8 21H4.043l6.93-7.91L2 3h5.773l4.028 5.06L18.244 3zm-1.984 16.2h1.479L7.805 4.71H6.24l10.02 14.49z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7.5 0h3.84v1.98h.06c.54-1.02 1.86-2.1 3.84-2.1 4.1 0 4.86 2.7 4.86 6.2V23h-4v-6.5c0-1.56-.02-3.56-2.17-3.56-2.17 0-2.5 1.7-2.5 3.45V23H8V8.5z"/>
  </svg>
);

const IconTelegram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M9.04 15.32 8.9 19.4c.4 0 .58-.17.79-.37l1.9-1.83 3.94 2.89c.72.4 1.24.19 1.44-.66l2.62-12.3c.26-1.2-.43-1.67-1.22-1.38L3.23 9.65c-1.17.45-1.15 1.1-.2 1.39l4.47 1.4 10.39-6.55c.49-.3.94-.14.57.16L9.04 15.32z"/>
  </svg>
);

export default Footer;
