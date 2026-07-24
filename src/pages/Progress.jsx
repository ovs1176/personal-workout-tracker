import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import workoutDataV1 from '../data/workoutData.json';
import workoutDataV2 from '../data/workoutDataV2.json';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, BarChart, Bar, ResponsiveContainer,
} from 'recharts';

// Combine exercises from both v1 and v2, deduplicate, exclude cardio items (no sets/reps)
const allExercises = [...new Set([
    ...['push1', 'pull1', 'legs1', 'push2', 'pull2', 'legs2']
        .flatMap(k => workoutDataV1[k]?.exercises ?? [])
        .map(e => e.name),
    ...['push1', 'pull1', 'push2', 'pull2', 'legs1']
        .flatMap(k => workoutDataV2[k]?.exercises ?? [])
        .filter(e => !e.duration) // exclude CardioItems from running day
        .map(e => e.name),
])];

const chartStyle = {
    backgroundColor: '#111827', border: '1px solid #374151',
    borderRadius: 12, padding: '20px 16px', marginBottom: 28,
};

const headingStyle = { fontSize: 16, fontWeight: 700, color: '#f9fafb', marginBottom: 16 };

const tooltipStyle = { backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: 8, color: '#f9fafb' };

function Progress() {
    const [logs] = useLocalStorage('workoutLogs', []);
    const [selectedExercise, setSelectedExercise] = useState(allExercises[0] ?? '');

    // Selected exercise weight progression
    const exerciseLogs = logs.filter((log) => log.exercise === selectedExercise);
    const progressionData = exerciseLogs.map((log) => ({
        date: log.date,
        weight: log.sets[0]?.weight ?? 0,
        volume: log.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    }));

    // Total volume per workout session (any exercise)
    const volumeData = logs.map((log) => ({
        name: `${log.exercise.slice(0, 12)}… (${log.date})`,
        volume: log.sets.reduce((s, set) => s + set.weight * set.reps, 0),
    }));

    // Weekly workout frequency
    const weekMap = {};
    logs.forEach((log) => {
        const week = log.date.slice(0, 7);
        if (!weekMap[week]) weekMap[week] = new Set();
        weekMap[week].add(log.date);
    });
    const freqData = Object.entries(weekMap)
        .sort()
        .map(([week, dates]) => ({ week, sessions: dates.size }));

    const hasData = logs.length > 0;

    return (
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px' }}>
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f9fafb', margin: 0 }}>📈 Progress Dashboard</h1>
                <p style={{ color: '#9ca3af', marginTop: 6, fontSize: 14 }}>
                    {hasData ? `${logs.length} total logged sets` : 'Log some workouts to see your progress here'}
                </p>
            </div>

            {!hasData && (
                <div style={{
                    textAlign: 'center', padding: '60px 20px',
                    backgroundColor: '#1f2937', borderRadius: 16,
                    border: '1px solid #374151', color: '#6b7280', fontSize: 15,
                }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🏋️</div>
                    No workout logs yet. Start logging to see your progress!
                </div>
            )}

            {hasData && (
                <>
                    {/* Exercise selector */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
                            Select exercise for progression chart:
                        </label>
                        <select
                            value={selectedExercise}
                            onChange={(e) => setSelectedExercise(e.target.value)}
                            style={{
                                backgroundColor: '#1f2937', border: '1px solid #374151',
                                color: '#f9fafb', borderRadius: 8, padding: '8px 12px',
                                fontSize: 14, cursor: 'pointer', outline: 'none',
                            }}
                        >
                            {allExercises.map((ex) => (
                                <option key={ex} value={ex}>{ex}</option>
                            ))}
                        </select>
                    </div>

                    {/* Weight progression */}
                    <div style={chartStyle}>
                        <div style={headingStyle}>🔺 {selectedExercise} – Weight Progression</div>
                        {progressionData.length < 2 ? (
                            <div style={{ color: '#6b7280', fontSize: 14 }}>Log at least 2 sessions to see progression</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={progressionData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} unit=" kg" />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Legend />
                                    <Line type="monotone" dataKey="weight" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4, fill: '#a78bfa' }} name="Weight (kg)" />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Total volume per session */}
                    <div style={chartStyle}>
                        <div style={headingStyle}>📊 Total Volume Per Session (weight × reps)</div>
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={volumeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Bar dataKey="volume" fill="#6366f1" radius={[4, 4, 0, 0]} name="Volume (kg×reps)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Weekly frequency */}
                    <div style={chartStyle}>
                        <div style={headingStyle}>📅 Weekly Workout Frequency</div>
                        {freqData.length === 0 ? (
                            <div style={{ color: '#6b7280', fontSize: 14 }}>No data yet</div>
                        ) : (
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={freqData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} allowDecimals={false} />
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Bar dataKey="sessions" fill="#10b981" radius={[4, 4, 0, 0]} name="Sessions" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Progress;

