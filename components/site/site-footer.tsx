import React from 'react';
import { footerConfig } from '@/config/footer';

export default function SiteFooter() {
    return (
        <footer className="border-t border-gray-900/10 bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-5 lg:px-8">
                <nav className="flex justify-center space-x-4 sm:space-x-12" aria-label="Footer">
                    {footerConfig.menus.map((item) => (
                        <div key={item.name}>
                            <a
                                href={item.href}
                                className="text-md leading-6 text-gray-500 hover:text-gray-900 hover:underline"
                            >
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <div className="mt-5 flex justify-center space-x-10">
                    {footerConfig.socials.map((item) => (
                        <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                    ))}
                </div>
                <p className="text-md mt-5 text-center leading-5 text-gray-500">&copy; {footerConfig.copyright}</p>
            </div>
        </footer>
    );
}
