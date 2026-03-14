import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Progress', path: '/progress' },
    { name: 'History', path: '/history' },
];

function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav style={{ backgroundColor: '#1f2937', borderBottom: '1px solid #374151' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: '#a78bfa' }}>💪</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#f9fafb' }}>PPL Tracker</span>
                </div>
                {/* Desktop nav */}
                <div style={{ display: 'flex', gap: 8 }} className="hidden-mobile">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            style={{
                                padding: '8px 16px',
                                borderRadius: 8,
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: 14,
                                transition: 'background 0.2s',
                                backgroundColor: location.pathname === item.path ? '#7c3aed' : 'transparent',
                                color: location.pathname === item.path ? '#fff' : '#d1d5db',
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{ background: 'none', border: 'none', color: '#f9fafb', fontSize: 24, cursor: 'pointer', display: 'none' }}
                    className="show-mobile"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>
            {/* Mobile dropdown */}
            {menuOpen && (
                <div style={{ backgroundColor: '#1f2937', borderTop: '1px solid #374151', padding: '8px 16px' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                display: 'block',
                                padding: '10px 12px',
                                borderRadius: 8,
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: 15,
                                marginBottom: 4,
                                backgroundColor: location.pathname === item.path ? '#7c3aed' : 'transparent',
                                color: location.pathname === item.path ? '#fff' : '#d1d5db',
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
            <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
        </nav>
    );
}

export default Navbar;

