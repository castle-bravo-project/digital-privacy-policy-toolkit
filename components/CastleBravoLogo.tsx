
import React from 'react';

export const CastleBravoLogo: React.FC = () => (
    <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="githubAtomicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ef4444' }} />
                <stop offset="50%" style={{ stopColor: '#f97316' }} />
                <stop offset="100%" style={{ stopColor: '#eab308' }} />
            </linearGradient>
            <style>
                {`
                    .pulse {
                        animation: pulse 2s ease-in-out infinite;
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.6; }
                    }
                `}
            </style>
        </defs>
        
        <path d="M50 15 L70 25 L70 55 L50 75 L30 55 L30 25 Z" 
              fill="none" stroke="url(#githubAtomicGrad)" strokeWidth="2"/>
        
        <circle cx="50" cy="45" r="3" fill="#f97316"/>
        
        <ellipse cx="50" cy="45" rx="15" ry="6" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7"/>
        <ellipse cx="50" cy="45" rx="15" ry="6" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" transform="rotate(60 50 45)"/>
        <ellipse cx="50" cy="45" rx="15" ry="6" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" transform="rotate(-60 50 45)"/>
        
        <circle cx="65" cy="45" r="1.5" fill="#eab308" className="pulse"/>
        <circle cx="42" cy="38" r="1.5" fill="#eab308" className="pulse"/>
        <circle cx="58" cy="52" r="1.5" fill="#eab308" className="pulse"/>
        
        <text x="35" y="22" fontFamily="monospace" fontSize="6" fill="#60a5fa" opacity="0.6">&lt;/&gt;</text>
        <text x="58" y="22" fontFamily="monospace" fontSize="6" fill="#60a5fa" opacity="0.6">{`{}`}</text>
        
        <text x="95" y="35" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#ef4444">Castle Bravo Project</text>
        <text x="95" y="55" fontFamily="Arial, sans-serif" fontSize="12" fill="#f97316">Open Code. Open Defense. Open Future.</text>
    </svg>
);