import React, { useState } from 'react';

function RunCard({ exercise }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div style={{
            backgroundColor: '#1f2937',
            border: '1px solid #f97316',
            borderRadius: 12,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 12px rgba(249,115,22,0.15)',
        }}>
            {/* Image / Fallback */}
            {imgError || !exercise.gif ? (
                <div style={{
                    width: '100%', height: 120,
                    background: 'linear-gradient(135deg, #431407 0%, #1f2937 100%)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                    <div style={{ fontSize: 32 }}>{exercise.isCore ? '💪' : '🏃'}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', padding: '0 12px' }}>
                        {exercise.name}
                    </div>
                </div>
            ) : (
                <img
                    src={exercise.gif}
                    alt={exercise.name}
                    style={{ width: '100%', height: 120, objectFit: 'cover', backgroundColor: '#111827' }}
                    onError={() => setImgError(true)}
                />
            )}

            {/* Content */}
            <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {/* Name + badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb', flex: 1 }}>
                        {exercise.name}
                    </div>
                    {exercise.isCore && (
                        <span style={{
                            fontSize: 10, fontWeight: 700, color: '#f97316',
                            backgroundColor: '#f9731622', padding: '2px 8px', borderRadius: 20,
                            whiteSpace: 'nowrap', flexShrink: 0,
                        }}>Core</span>
                    )}
                </div>

                {/* Target */}
                <div style={{ fontSize: 12, color: '#f97316', fontWeight: 600 }}>🎯 {exercise.target}</div>

                {/* Duration badge (cardio) or Sets/Reps (core) */}
                {exercise.duration ? (
                    <div style={{
                        display: 'inline-flex', alignItems: 'center',
                        backgroundColor: '#f9731622', border: '1px solid #f9731644',
                        borderRadius: 8, padding: '5px 10px', fontSize: 12,
                        color: '#fb923c', fontWeight: 600, marginTop: 2,
                    }}>
                        ⏱ {exercise.duration}
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                        <span>📋 {exercise.sets} sets</span>
                        <span>🔁 {exercise.reps} reps</span>
                    </div>
                )}

                {/* Note */}
                {exercise.note && (
                    <div style={{
                        fontSize: 11, color: '#6b7280', fontStyle: 'italic',
                        lineHeight: 1.4, marginTop: 2,
                    }}>
                        💡 {exercise.note}
                    </div>
                )}

                {/* YouTube button only — no Log Weight */}
                {exercise.youtube && (
                    <div style={{ marginTop: 10 }}>
                        <a
                            href={exercise.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'block', textAlign: 'center',
                                padding: '8px 0', borderRadius: 8,
                                backgroundColor: '#dc2626', color: '#fff',
                                textDecoration: 'none', fontSize: 13, fontWeight: 600,
                            }}
                        >
                            ▶ YouTube
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RunCard;
