import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { exportLogs } from '../utils/exportLogs';

const dayTypeColors = {
    push: '#7c3aed',
    pull: '#2563eb',
    legs: '#059669',
};

function getExerciseType(exerciseName) {
    // Simple heuristic — not critical
    const pushNames = ['Bench', 'Press', 'Tricep', 'Lateral'];
    const legNames = ['Squat', 'Deadlift', 'Leg', 'Calf', 'Bulgarian'];
    if (legNames.some((n) => exerciseName.includes(n))) return 'legs';
    if (pushNames.some((n) => exerciseName.includes(n))) return 'push';
    return 'pull';
}

function History() {
    const [logs, setLogs] = useLocalStorage('workoutLogs', []);
    const [filter, setFilter] = useState('');
    const [confirmClear, setConfirmClear] = useState(false);

    const filtered = logs
        .slice()
        .reverse()
        .filter((log) =>
            !filter || log.exercise.toLowerCase().includes(filter.toLowerCase()) || log.date.includes(filter)
        );

    const totalVolume = logs.reduce(
        (sum, log) => sum + (log.sets ?? []).reduce((s, set) => s + (set.weight ?? 0) * (set.reps ?? 0), 0),
        0
    );

    return (
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f9fafb', margin: 0 }}>📋 Workout History</h1>
                    <p style={{ color: '#9ca3af', marginTop: 6, fontSize: 14 }}>
                        {logs.length} sessions logged • Total volume: {totalVolume.toLocaleString()} kg·reps
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={() => exportLogs(logs)}
                        disabled={logs.length === 0}
                        style={{
                            padding: '9px 16px', borderRadius: 8, border: 'none',
                            backgroundColor: logs.length === 0 ? '#374151' : '#059669',
                            color: '#fff', fontWeight: 700, fontSize: 13, cursor: logs.length === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        ⬇️ Export JSON
                    </button>
                    {!confirmClear ? (
                        <button
                            onClick={() => setConfirmClear(true)}
                            disabled={logs.length === 0}
                            style={{
                                padding: '9px 16px', borderRadius: 8, border: '1px solid #374151',
                                backgroundColor: 'transparent',
                                color: logs.length === 0 ? '#4b5563' : '#ef4444', fontWeight: 700, fontSize: 13, cursor: logs.length === 0 ? 'not-allowed' : 'pointer',
                            }}
                        >
                            🗑 Clear All
                        </button>
                    ) : (
                        <button
                            onClick={() => { setLogs([]); setConfirmClear(false); }}
                            style={{
                                padding: '9px 16px', borderRadius: 8, border: 'none',
                                backgroundColor: '#dc2626', color: '#fff',
                                fontWeight: 700, fontSize: 13, cursor: 'pointer',
                            }}
                        >
                            Confirm Clear?
                        </button>
                    )}
                </div>
            </div>

            {/* Search filter */}
            {logs.length > 0 && (
                <input
                    type="text"
                    placeholder="🔍 Filter by exercise or date..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        width: '100%', padding: '10px 14px',
                        backgroundColor: '#1f2937', border: '1px solid #374151',
                        borderRadius: 10, color: '#f9fafb', fontSize: 14,
                        marginBottom: 20, outline: 'none',
                    }}
                />
            )}

            {/* Empty state */}
            {logs.length === 0 && (
                <div style={{
                    textAlign: 'center', padding: '60px 20px',
                    backgroundColor: '#1f2937', borderRadius: 16,
                    border: '1px solid #374151', color: '#6b7280', fontSize: 15,
                }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                    No workouts logged yet. Hit the Dashboard to get started!
                </div>
            )}

            {/* Log entries */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filtered.map((log, idx) => {
                    const type = getExerciseType(log.exercise);
                    const color = dayTypeColors[type];
                    const vol = (log.sets ?? []).reduce((s, set) => s + (set.weight ?? 0) * (set.reps ?? 0), 0);
                    return (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: '#1f2937',
                                border: `1px solid #374151`,
                                borderLeft: `4px solid ${color}`,
                                borderRadius: 12,
                                padding: '16px 18px',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
                                <div style={{ fontSize: 16, fontWeight: 700, color: '#f9fafb' }}>{log.exercise}</div>
                                <div style={{ fontSize: 12, color: '#6b7280' }}>{log.date}</div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                                {(log.sets ?? []).map((set, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            backgroundColor: '#111827', border: '1px solid #374151',
                                            borderRadius: 6, padding: '4px 10px',
                                            fontSize: 13, color: '#d1d5db',
                                        }}
                                    >
                                        Set {i + 1}: {set.weight ?? 0}kg × {set.reps ?? 0}
                                    </span>
                                ))}
                            </div>
                            <div style={{ fontSize: 12, color: '#9ca3af' }}>
                                Volume: <span style={{ color: '#a78bfa', fontWeight: 600 }}>{vol} kg·reps</span>
                                <span style={{ marginLeft: 12 }}>{(log.sets ?? []).length} sets</span>
                            </div>
                        </div>
                    );
                })}
                {filtered.length === 0 && logs.length > 0 && (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: 24 }}>No results for "{filter}"</div>
                )}
            </div>
        </div>
    );
}

export default History;

