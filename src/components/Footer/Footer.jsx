import { Link } from 'react-router-dom'
import {Logo} from '../index.js';

function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400 border-t-2 border-t-black text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap gap-y-8">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <div>
                <p className="text-sm text-gray-200">
                  &copy; {new Date().getFullYear()} MyJournal. All Rights Reserved.
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-300 transition-colors">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
                </a>
                <a href="mailto:support@myjournal.com" aria-label="Email" className="hover:text-gray-300 transition-colors">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 20v-9.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 10.01V20H4z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-200">Company</h3>
              <ul>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Features</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Pricing</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Affiliate Program</Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Press Kit</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-200">Support</h3>
              <ul>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Account</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Help</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Contact Us</Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Customer Support</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-200">Legals</h3>
              <ul>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Terms &amp; Conditions</Link>
                </li>
                <li className="mb-3">
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-100 hover:text-gray-300 transition-colors" to="/">Licensing</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-br from-gray-900/30 via-gray-700/20 to-gray-400/10 pointer-events-none" />
      </div>
    </footer>
  )
}

export default Footer