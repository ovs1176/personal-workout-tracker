import React, { useState } from 'react';
import workoutData from '../data/workoutData.json';
import ExerciseCard from '../components/ExerciseCard';

function getTypeColor(type) {
    if (!type || type === 'rest') return '#374151';
    if (type.startsWith('push')) return '#7c3aed';
    if (type.startsWith('pull')) return '#2563eb';
    return '#059669';
}

function SectionItemImg({ src, name }) {
    const [err, setErr] = React.useState(false);
    if (err || !src) return (
        <div style={{
            width: 90, height: 60, borderRadius: 8, flexShrink: 0,
            background: '#1f2937',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>🏃</div>
    );
    return (
        <img
            src={src}
            alt={name}
            onError={() => setErr(true)}
            style={{ width: 90, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0, backgroundColor: '#1f2937' }}
        />
    );
}

function CollapsibleSection({ title, icon, color, bgColor, items, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div style={{ marginBottom: 20, borderRadius: 12, overflow: 'hidden', border: `1px solid ${color}44` }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px', backgroundColor: bgColor, border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: color }}>{title}</span>
                    <span style={{
                        fontSize: 11, fontWeight: 600, color: color,
                        backgroundColor: color + '22', padding: '2px 8px', borderRadius: 20,
                    }}>{items.length} items</span>
                </div>
                <span style={{ fontSize: 16, color: color, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </button>
            {open && (
                <div style={{ backgroundColor: '#111827' }}>
                    {items.map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 12,
                            padding: '12px 16px',
                            borderTop: '1px solid #1f2937',
                        }}>
                            <div style={{
                                minWidth: 26, height: 26, borderRadius: '50%',
                                backgroundColor: color + '22', color: color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
                            }}>{i + 1}</div>
                            <SectionItemImg src={item.gif} name={item.name} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#f9fafb' }}>{item.name}</span>
                                    <span style={{
                                        fontSize: 11, fontWeight: 600, color: color,
                                        backgroundColor: color + '18', padding: '1px 8px', borderRadius: 20, whiteSpace: 'nowrap',
                                    }}>{item.duration}</span>
                                </div>
                                {item.note && (
                                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3, lineHeight: 1.4 }}>💡 {item.note}</div>
                                )}
                                {item.youtube && (
                                    <a
                                        href={item.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 5,
                                            marginTop: 6, padding: '4px 10px',
                                            backgroundColor: '#dc2626', color: '#fff',
                                            borderRadius: 6, textDecoration: 'none',
                                            fontSize: 11, fontWeight: 600,
                                        }}
                                    >▶ Watch</a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function WorkoutDashboard() {
    const [activeTab, setActiveTab] = useState('push1');
    const schedule = workoutData.schedule;
    const dayData = workoutData[activeTab];

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f9fafb', margin: 0 }}>
                    Workout Dashboard
                </h1>
                <p style={{ color: '#9ca3af', marginTop: 6, fontSize: 14 }}>
                    Push Pull Legs • 6-day training plan
                </p>
            </div>

            {/* Weekly Schedule Bar */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 6,
                marginBottom: 32,
            }}>
                {schedule.map((d) => {
                    const isActive = d.type === activeTab;
                    const color = getTypeColor(d.type);
                    return (
                        <div
                            key={d.day}
                            onClick={() => d.type !== 'rest' && setActiveTab(d.type)}
                            style={{
                                backgroundColor: isActive ? color + '22' : d.type === 'rest' ? '#111827' : '#1f2937',
                                border: `1px solid ${isActive ? color : '#374151'}`,
                                borderRadius: 8,
                                padding: '8px 4px',
                                textAlign: 'center',
                                cursor: d.type !== 'rest' ? 'pointer' : 'default',
                                transition: 'all 0.2s',
                            }}
                        >
                            <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>
                                Day {d.day}
                            </div>
                            <div style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: d.type === 'rest' ? '#4b5563' : color,
                            }}>
                                {d.type === 'rest' ? '😴 Rest' : d.label}
                            </div>
                            {d.sublabel && d.type !== 'rest' && (
                                <div style={{ fontSize: 9, color: '#6b7280', marginTop: 2, lineHeight: 1.2 }}>
                                    {d.sublabel}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Active day info */}
            {dayData && (
                <div style={{
                    backgroundColor: '#1f2937',
                    border: `1px solid ${getTypeColor(activeTab)}44`,
                    borderRadius: 12,
                    padding: '16px 20px',
                    marginBottom: 28,
                }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f9fafb', margin: 0 }}>
                            {dayData.title}
                        </h2>
                        <span style={{ fontSize: 13, color: getTypeColor(activeTab), fontWeight: 600 }}>
                            {dayData.subtitle}
                        </span>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: 13, marginTop: 6, marginBottom: 0 }}>
                        {dayData.purpose}
                    </p>
                    <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>🔥 {dayData.warmup?.length ?? 0} warmup steps</span>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>⚡ {dayData.activation?.length ?? 0} activation drills</span>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>💪 {dayData.exercises.length} exercises</span>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>🧘 {dayData.cooldown?.length ?? 0} cooldown stretches</span>
                    </div>
                </div>
            )}

            {dayData && (
                <>
                    {/* Pre-Workout Warmup */}
                    {dayData.warmup?.length > 0 && (
                        <CollapsibleSection
                            title="Pre-Workout Warmup"
                            icon="🔥"
                            color="#f97316"
                            bgColor="#1c1107"
                            items={dayData.warmup}
                            defaultOpen={false}
                        />
                    )}

                    {/* Muscle Activation */}
                    {dayData.activation?.length > 0 && (
                        <CollapsibleSection
                            title="Muscle Activation"
                            icon="⚡"
                            color="#22c55e"
                            bgColor="#071a0f"
                            items={dayData.activation}
                            defaultOpen={false}
                        />
                    )}

                    {/* Main Workout */}
                    <div style={{ marginBottom: 24 }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            marginBottom: 16, padding: '12px 18px',
                            backgroundColor: '#1f2937',
                            borderRadius: 10,
                            border: `1px solid ${getTypeColor(activeTab)}44`,
                        }}>
                            <span style={{ fontSize: 18 }}>💪</span>
                            <span style={{ fontSize: 15, fontWeight: 700, color: getTypeColor(activeTab) }}>
                                Main Workout
                            </span>
                            <span style={{
                                fontSize: 11, fontWeight: 600, color: getTypeColor(activeTab),
                                backgroundColor: getTypeColor(activeTab) + '22', padding: '2px 8px', borderRadius: 20,
                            }}>{dayData.exercises.length} exercises</span>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: 20,
                        }}>
                            {dayData.exercises.map((exercise) => (
                                <ExerciseCard key={exercise.name} exercise={exercise} />
                            ))}
                        </div>
                    </div>

                    {/* Post-Workout Cooldown */}
                    {dayData.cooldown?.length > 0 && (
                        <CollapsibleSection
                            title="Post-Workout Cooldown & Stretching"
                            icon="🧘"
                            color="#38bdf8"
                            bgColor="#071318"
                            items={dayData.cooldown}
                            defaultOpen={false}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default WorkoutDashboard;
