
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 p-6 text-center sticky top-0 z-20">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                Digital Privacy Policy Toolkit
            </h1>
            <p className="mt-2 text-md md:text-lg text-slate-400 max-w-3xl mx-auto">
                An AI-powered dashboard for analyzing the technical and constitutional implications of modern privacy legislation.
            </p>
        </header>
    );
};

export default Header;
