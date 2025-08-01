import React, { useEffect, useState } from 'react';
import { SettingsIcon } from './icons';

const Settings: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem('geminiApiKey') || '';
        setApiKey(storedKey);
    }, []);

    const handleSave = () => {
        localStorage.setItem('geminiApiKey', apiKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <SettingsIcon className="text-sky-400" />
                Settings
            </h2>
            <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50 text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Gemini API Key</h3>
                <input
                    type="password"
                    className="w-full p-2 rounded bg-slate-700 text-white mb-2"
                    placeholder="Enter your Gemini API key"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                />
                <button
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
                    onClick={handleSave}
                >
                    Save API Key
                </button>
                {saved && <div className="text-green-400 mt-2">API Key saved!</div>}
                <p className="text-slate-500 mt-4 text-sm">Your API key is stored locally in your browser and never sent anywhere else.</p>
            </div>
        </div>
    );
};

export default Settings;
