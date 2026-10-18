import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLastWeight } from '../hooks/useLastWeight';
import { useCompletedExercises } from '../hooks/useCompletedExercises';

function ExerciseCard({ exercise, planVersion }) {
    const lastWeight = useLastWeight(exercise.name);
    const today = new Date().toISOString().slice(0, 10);
    const completedExercises = useCompletedExercises(today);
    const isCompleted = completedExercises.includes(exercise.name);
    const [imgError, setImgError] = useState(false);

    const isOptional = exercise.isOptional;

    return (
        <div style={{
            backgroundColor: isOptional ? '#161d2a' : '#1f2937',
            border: isCompleted ? '2px solid #10b981' : isOptional ? '1px dashed #4b5563' : '1px solid #374151',
            borderRadius: 12,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            position: 'relative',
            transition: 'transform 0.2s',
            opacity: isOptional ? 0.85 : 1,
        }}>
            {isCompleted && (
                <div style={{
                    position: 'absolute', top: 10, right: 10, zIndex: 1,
                    backgroundColor: '#10b981', color: '#fff',
                    padding: '3px 10px', borderRadius: 20,
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                }}>✓ Done</div>
            )}
            {isOptional && !isCompleted && (
                <div style={{
                    position: 'absolute', top: 10, right: 10, zIndex: 1,
                    backgroundColor: '#374151', color: '#9ca3af',
                    padding: '3px 10px', borderRadius: 20,
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                }}>Optional</div>
            )}
            {imgError || !exercise.gif ? (
                <div style={{
                    width: '100%', height: 160,
                    background: 'linear-gradient(135deg, #1e1b4b 0%, #1f2937 100%)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                    <div style={{ fontSize: 32 }}>🏋️</div>
                    <div style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', padding: '0 12px' }}>
                        {exercise.name}
                    </div>
                </div>
            ) : (
                <img
                    src={exercise.gif}
                    alt={exercise.name}
                    style={{ width: '100%', height: 160, objectFit: 'cover', backgroundColor: '#111827' }}
                    onError={() => setImgError(true)}
                />
            )}
            <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb' }}>{exercise.name}</div>
                <div style={{ fontSize: 13, color: '#a78bfa', fontWeight: 600 }}>🎯 {exercise.target}</div>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#9ca3af', marginTop: 2 }}>
                    <span>📋 {exercise.sets} sets</span>
                    <span>{exercise.duration || `${exercise.reps} reps`}</span>
                </div>
                {exercise.note && (
                    <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>
                        {exercise.note}
                    </div>
                )}
                {lastWeight !== null && (
                    <div style={{ fontSize: 13, color: '#34d399', fontWeight: 600 }}>Last: {lastWeight} kg</div>
                )}
                {isOptional && exercise.optionalNote && (
                    <div style={{
                        fontSize: 11, color: '#6b7280', fontStyle: 'italic',
                        backgroundColor: '#111827', borderRadius: 6,
                        padding: '5px 8px', marginTop: 2, lineHeight: 1.4,
                    }}>💡 {exercise.optionalNote}</div>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <a
                        href={exercise.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            flex: 1, textAlign: 'center',
                            padding: '8px 0', borderRadius: 8,
                            backgroundColor: '#dc2626', color: '#fff',
                            textDecoration: 'none', fontSize: 13, fontWeight: 600,
                        }}
                    >
                        ▶ YouTube
                    </a>
                    <Link
                        to={`/log/${encodeURIComponent(exercise.name)}${planVersion ? `?plan=${planVersion}` : ''}`}
                        style={{
                            flex: 1, textAlign: 'center',
                            padding: '8px 0', borderRadius: 8,
                            backgroundColor: '#7c3aed', color: '#fff',
                            textDecoration: 'none', fontSize: 13, fontWeight: 600,
                        }}
                    >
                        + Log Weight
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ExerciseCard;
