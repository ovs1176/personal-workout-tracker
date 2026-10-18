import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import workoutDataV1 from '../data/workoutData.json';
import workoutDataV2 from '../data/workoutDataV2.json';
import workoutDataV3 from '../data/workoutDataV3';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLastWeight } from '../hooks/useLastWeight';

const V1_LIFTING_KEYS = ['push1', 'pull1', 'legs1', 'push2', 'pull2', 'legs2'];
const V2_LIFTING_KEYS = ['push1', 'pull1', 'push2', 'pull2', 'legs1'];
const exercisesByPlan = {
    v1: V1_LIFTING_KEYS.flatMap(key => workoutDataV1[key]?.exercises ?? []),
    v2: V2_LIFTING_KEYS.flatMap(key => workoutDataV2[key]?.exercises ?? []),
    v3: workoutDataV3.schedule.flatMap(day => workoutDataV3[day.type]?.exercises ?? []),
};

function LogWorkout() {
    const { exercise } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planVersion = searchParams.get('plan');
    const exerciseData = (
        Object.hasOwn(exercisesByPlan, planVersion) ? exercisesByPlan[planVersion] : Object.values(exercisesByPlan).flat()
    ).find(item => item.name === exercise);
    const [logs, setLogs] = useLocalStorage('workoutLogs', []);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [sets, setSets] = useState(() => planVersion === 'v3' && exerciseData
        ? Array.from({ length: exerciseData.sets }, () => ({ weight: '', reps: exerciseData.reps }))
        : [{ weight: '', reps: '' }]);
    const lastWeight = useLastWeight(exercise);

    const handleSetChange = (idx, field, value) => {
        setSets((prev) =>
            prev.map((set, i) => (i === idx ? { ...set, [field]: value } : set))
        );
    };

    const addSet = () => setSets([...sets, { weight: '', reps: '' }]);
    const removeSet = (idx) => setSets(sets.filter((_, i) => i !== idx));

    const handleSubmit = (e) => {
        e.preventDefault();
        const log = {
            exercise,
            date,
            sets: sets.map((s) => ({ weight: Number(s.weight), reps: Number(s.reps) })),
        };
        setLogs([...logs, log]);
        navigate('/history');
    };

    const inputStyle = {
        backgroundColor: '#111827',
        border: '1px solid #374151',
        color: '#f9fafb',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 14,
        outline: 'none',
        width: '100%',
    };

    return (
        <div style={{ maxWidth: 560, margin: '32px auto', padding: '0 16px' }}>
            <div style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: 16,
                padding: 28,
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
                {/* Header */}
                <button
                    onClick={() => navigate('/')}
                    style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', fontSize: 14, marginBottom: 16, padding: 0 }}
                >
                    ← Back to Dashboard
                </button>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f9fafb', marginBottom: 4 }}>
                    {exercise}
                </h2>
                {exerciseData && (
                    <div style={{ color: '#a78bfa', fontSize: 13, marginBottom: 16 }}>
                        {exerciseData.target} - {exerciseData.sets} sets x {exerciseData.duration || `${exerciseData.reps} reps`}
                    </div>
                )}
                {lastWeight !== null && (
                    <div style={{
                        backgroundColor: '#111827', border: '1px solid #374151',
                        borderRadius: 8, padding: '10px 14px',
                        color: '#34d399', fontSize: 14, fontWeight: 600, marginBottom: 20,
                    }}>
                        💚 Last logged weight: {lastWeight} kg
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Date */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    {/* Sets */}
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                            Sets
                        </div>
                        {sets.map((set, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                                    {idx + 1}
                                </div>
                                <input
                                    type="number"
                                    placeholder="Weight (kg)"
                                    value={set.weight}
                                    onChange={(e) => handleSetChange(idx, 'weight', e.target.value)}
                                    style={{ ...inputStyle, width: '45%' }}
                                    min={0}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Reps"
                                    value={set.reps}
                                    onChange={(e) => handleSetChange(idx, 'reps', e.target.value)}
                                    style={{ ...inputStyle, width: '35%' }}
                                    min={1}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeSet(idx)}
                                    disabled={sets.length === 1}
                                    style={{
                                        background: 'none', border: 'none', color: sets.length === 1 ? '#4b5563' : '#ef4444',
                                        cursor: sets.length === 1 ? 'not-allowed' : 'pointer', fontSize: 18, flexShrink: 0,
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add Set */}
                    <button
                        type="button"
                        onClick={addSet}
                        style={{
                            width: '100%', padding: '10px 0', borderRadius: 8,
                            backgroundColor: 'transparent', border: '1px dashed #374151',
                            color: '#6b7280', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                            marginBottom: 20,
                        }}
                    >
                        + Add Set
                    </button>

                    {/* Submit */}
                    <button
                        type="submit"
                        style={{
                            width: '100%', padding: '13px 0', borderRadius: 10,
                            backgroundColor: '#7c3aed', border: 'none',
                            color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                            boxShadow: '0 0 16px #7c3aed55',
                        }}
                    >
                        💾 Save Workout Log
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LogWorkout;

