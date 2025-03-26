import React from 'react';
import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import Logo from '../common/Logo';

// Get the current year for the copyright
const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  // Quick link groups for the footer
  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Properties', href: '/dashboard/properties' },
        { name: 'Tenants', href: '/dashboard/tenants' },
        { name: 'Payments', href: '/dashboard/payments' },
        { name: 'Maintenance', href: '/dashboard/maintenance' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/dashboard/help' },
        { name: 'Documentation', href: '/dashboard/help/documentation' },
        { name: 'Knowledge Base', href: '/dashboard/help/knowledge-base' },
        { name: 'Chat Support', href: '/dashboard/help/chat' },
        { name: 'Contact Us', href: '/dashboard/help/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Data Protection', href: '#' },
        { name: 'Compliance', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Zimbabwe flag-inspired divider */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-zim-green"></div>
        <div className="flex-1 bg-yellow-500"></div>
        <div className="flex-1 bg-red-600"></div>
        <div className="flex-1 bg-black"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Logo size="medium" />
            <p className="mt-4 text-sm text-gray-600">
              Your trusted property management solution in Zimbabwe and beyond.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="h-5 w-5 text-zim-green mr-2" />
                <span>123 Samora Machel Ave, Harare</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <PhoneIcon className="h-5 w-5 text-zim-green mr-2" />
                <span>+263 242 123 456</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <EnvelopeIcon className="h-5 w-5 text-zim-green mr-2" />
                <span>info@dzimbaproperty.co.zw</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              {/* Social media icons */}
              <a href="#" className="text-gray-400 hover:text-zim-green">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-zim-green">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-zim-green">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-zim-green">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-zim-green transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} Dzimba Property Management. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4">
            <Link to="/dashboard/help" className="text-sm text-gray-600 hover:text-zim-green">
              Help Center
            </Link>
            <Link to="/dashboard/settings" className="text-sm text-gray-600 hover:text-zim-green">
              Settings
            </Link>
            <Link to="/login" className="text-sm text-gray-600 hover:text-zim-green">
              Logout
            </Link>
            <a 
              href="https://tyga-sparta.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-sm text-gray-500 hover:text-zim-green transition-colors"
            >
              <CodeBracketIcon className="h-4 w-4 text-zim-green mr-1" />
              Developed by Tyga Sparta
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 