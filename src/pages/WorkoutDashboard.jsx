import React, { useState } from 'react';
import workoutDataV1 from '../data/workoutData.json';
import workoutDataV2 from '../data/workoutDataV2.json';
import workoutDataV3 from '../data/workoutDataV3';
import ExerciseCard from '../components/ExerciseCard';
import RunCard from '../components/RunCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

const plans = {
    v3: { data: workoutDataV3, label: 'V3 - Body Part', description: 'Body-part split - Monday to Saturday', summary: 'Legs / Chest / Back / Triceps + Core / Biceps + Forearms / Shoulders / Rest' },
    v1: { data: workoutDataV1, label: 'V1 - PPL', description: 'Push Pull Legs - 6-day training plan', summary: 'Push / Pull / Legs x 2 / Rest' },
    v2: { data: workoutDataV2, label: 'V2 - PPR', description: 'Push Pull Run - 7-day training plan', summary: 'Push / Pull / Run / Push / Pull / Legs / Rest' },
};

function getTypeColor(type) {
    if (!type || type === 'rest') return '#374151';
    if (type.startsWith('push')) return '#7c3aed';
    if (type.startsWith('pull')) return '#2563eb';
    if (type.startsWith('running')) return '#f97316';
    if (type.startsWith('legs')) return '#059669';
    if (type === 'chest') return '#f472b6';
    if (type === 'back') return '#38bdf8';
    if (type === 'triceps') return '#fb923c';
    if (type === 'biceps') return '#facc15';
    if (type === 'shoulders') return '#2dd4bf';
    return '#374151';
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

function SectionCard({ item, color }) {
    const [imgError, setImgError] = React.useState(false);
    return (
        <div style={{
            backgroundColor: '#1f2937',
            border: `1px solid ${color}33`,
            borderRadius: 14,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        }}>
            {imgError || !item.gif ? (
                <div style={{
                    width: '100%',
                    height: 170,
                    background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: 16,
                    textAlign: 'center',
                    color: '#9ca3af',
                }}>
                    <div style={{ fontSize: 32 }}>🏋️</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{item.name}</div>
                </div>
            ) : (
                <img
                    src={item.gif}
                    alt={item.name}
                    onError={() => setImgError(true)}
                    style={{ width: '100%', height: 170, objectFit: 'cover', backgroundColor: '#111827' }}
                />
            )}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#f9fafb', flex: 1, minWidth: 0 }}>{item.name}</div>
                    {item.duration && (
                        <span style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: color,
                            backgroundColor: color + '22',
                            padding: '5px 10px',
                            borderRadius: 999,
                            whiteSpace: 'nowrap',
                        }}>
                            ⏱ {item.duration}
                        </span>
                    )}
                </div>
                {item.note && (
                    <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.5 }}>{item.note}</div>
                )}
                {item.youtube && (
                    <a
                        href={item.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 0',
                            borderRadius: 10,
                            backgroundColor: '#dc2626',
                            color: '#fff',
                            textDecoration: 'none',
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        ▶ Watch
                    </a>
                )}
            </div>
        </div>
    );
}

function CollapsibleSection({ title, icon, color, bgColor, items, defaultOpen = false, useCardLayout = false }) {
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
                <div style={{ backgroundColor: '#111827', padding: useCardLayout ? '16px' : '0' }}>
                    {useCardLayout ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: 18,
                        }}>
                            {items.map((item, i) => (
                                <SectionCard key={i} item={item} color={color} />
                            ))}
                        </div>
                    ) : (
                        items.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'flex-start', gap: 12,
                                padding: '12px 16px',
                                borderTop: i > 0 ? '1px solid #1f2937' : 'none',
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
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

function WorkoutDashboard() {
    const [savedPlanVersion, setPlanVersion] = useLocalStorage('workoutPlanVersion', 'v3');
    const planVersion = Object.hasOwn(plans, savedPlanVersion) ? savedPlanVersion : 'v3';
    const [activeTabs, setActiveTabs] = useState({ v1: 'push1', v2: 'push1', v3: 'legs' });
    const plan = plans[planVersion];
    const workoutData = plan.data;
    const activeTab = activeTabs[planVersion];
    const setActiveTab = (tab) => setActiveTabs(previous => ({ ...previous, [planVersion]: tab }));

    const schedule = workoutData.schedule;
    const dayData = workoutData[activeTab];
    const isRunningDay = activeTab.startsWith('running');

    const cardioCount = isRunningDay ? (dayData?.exercises?.filter(e => !e.isCore).length ?? 0) : 0;
    const coreCount = isRunningDay ? (dayData?.exercises?.filter(e => e.isCore).length ?? 0) : 0;

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
            {/* Header */}
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f9fafb', margin: 0 }}>
                        Workout Dashboard
                    </h1>
                    <p style={{ color: '#9ca3af', marginTop: 6, fontSize: 14, margin: '6px 0 0' }}>
                        {plan.description}
                    </p>
                </div>

                {/* V1 / V2 Toggle */}
                <div style={{
                    display: 'flex', gap: 4, flexWrap: 'wrap', maxWidth: '100%',
                    backgroundColor: '#111827', border: '1px solid #374151',
                    borderRadius: 10, padding: 4,
                }}>
                    {Object.keys(plans).map((version) => (
                        <button
                            key={version}
                            onClick={() => setPlanVersion(version)}
                            aria-pressed={planVersion === version}
                            style={{
                                padding: '8px 12px', borderRadius: 8, border: 'none',
                                cursor: 'pointer', fontWeight: 700, fontSize: 13,
                                transition: 'all 0.2s',
                                backgroundColor: planVersion === version ? '#7c3aed' : 'transparent',
                                color: planVersion === version ? '#fff' : '#9ca3af',
                                boxShadow: planVersion === version ? '0 0 12px #7c3aed55' : 'none',
                            }}
                        >
                            {plans[version].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Plan badge */}
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: planVersion === 'v1' ? '#7c3aed22' : '#f9731622',
                border: `1px solid ${planVersion === 'v1' ? '#7c3aed44' : '#f9731644'}`,
                borderRadius: 8, padding: '6px 14px', marginBottom: 24, fontSize: 12,
                color: planVersion === 'v1' ? '#a78bfa' : '#fb923c', fontWeight: 600,
            }}>
                {plan.summary}
            </div>

            {planVersion === 'v3' && (
                <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.6, margin: '0 0 24px' }}>
                    60 minutes lifting + 20 minutes warm-up and cooldown. Target 4 sets of 20 reps;
                    planks use timed holds. These days contain 20-28 working sets and may exceed
                    60 minutes. Reduce volume rather than rushing rests or sacrificing technique.
                </p>
            )}

            {/* Weekly Schedule Bar */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${schedule.length}, minmax(0, 1fr))`,
                gap: 6,
                marginBottom: 32,
            }}>
                {schedule.map((d) => {
                    const isActive = d.type === activeTab;
                    const color = getTypeColor(d.type);
                    return (
                        <button
                            key={d.day}
                            type="button"
                            title={d.weekday || `Day ${d.day}`}
                            aria-pressed={isActive}
                            disabled={d.type === 'rest'}
                            onClick={() => d.type !== 'rest' && setActiveTab(d.type)}
                            style={{
                                backgroundColor: isActive ? color + '22' : d.type === 'rest' ? '#111827' : '#1f2937',
                                border: `1px solid ${isActive ? color : '#374151'}`,
                                borderRadius: 8,
                                padding: '8px 4px',
                                minWidth: 0,
                                overflowWrap: 'anywhere',
                                fontFamily: 'inherit',
                                textAlign: 'center',
                                cursor: d.type !== 'rest' ? 'pointer' : 'default',
                                transition: 'all 0.2s',
                            }}
                        >
                            <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: 2 }}>
                                {d.weekday ? d.weekday.slice(0, 3) : `Day ${d.day}`}
                            </div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: d.type === 'rest' ? '#4b5563' : color }}>
                                {d.type === 'rest' ? '😴 Rest' : d.label}
                            </div>
                            {d.sublabel && d.type !== 'rest' && (
                                <div style={{ fontSize: 9, color: '#6b7280', marginTop: 2, lineHeight: 1.2 }}>
                                    {d.sublabel}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Active day info banner */}
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
                            {isRunningDay ? '🏃 ' : ''}{dayData.title}
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
                        {isRunningDay ? (
                            <>
                                <span style={{ fontSize: 12, color: '#6b7280' }}>🏃 {cardioCount} run segments</span>
                                <span style={{ fontSize: 12, color: '#6b7280' }}>💪 {coreCount} core exercises</span>
                            </>
                        ) : (
                            <span style={{ fontSize: 12, color: '#6b7280' }}>💪 {dayData.exercises.length} exercises</span>
                        )}
                        <span style={{ fontSize: 12, color: '#6b7280' }}>🧘 {dayData.cooldown?.length ?? 0} cooldown stretches</span>
                    </div>
                </div>
            )}

            {dayData && (
                <>
                    {/* Pre-Workout Warmup */}
                    {dayData.warmup?.length > 0 && (
                        <CollapsibleSection
                            title={isRunningDay ? 'Pre-Run Warmup' : 'Pre-Workout Warmup'}
                            icon="🔥"
                            color="#f97316"
                            bgColor="#1c1107"
                            items={dayData.warmup}
                            defaultOpen={false}
                            useCardLayout={true}
                        />
                    )}

                    {/* Muscle / Movement Activation */}
                    {dayData.activation?.length > 0 && (
                        <CollapsibleSection
                            title={isRunningDay ? 'Movement Activation' : 'Muscle Activation'}
                            icon="⚡"
                            color="#22c55e"
                            bgColor="#071a0f"
                            items={dayData.activation}
                            defaultOpen={false}
                            useCardLayout={true}
                        />
                    )}

                    {/* Main Workout / Run */}
                    <div style={{ marginBottom: 24 }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            marginBottom: 16, padding: '12px 18px',
                            backgroundColor: '#1f2937',
                            borderRadius: 10,
                            border: `1px solid ${getTypeColor(activeTab)}44`,
                        }}>
                            <span style={{ fontSize: 18 }}>{isRunningDay ? '🏃' : '💪'}</span>
                            <span style={{ fontSize: 15, fontWeight: 700, color: getTypeColor(activeTab) }}>
                                {isRunningDay ? 'Run + Core Circuit' : 'Main Workout'}
                            </span>
                            <span style={{
                                fontSize: 11, fontWeight: 600, color: getTypeColor(activeTab),
                                backgroundColor: getTypeColor(activeTab) + '22', padding: '2px 8px', borderRadius: 20,
                            }}>
                                {isRunningDay
                                    ? `${cardioCount} run · ${coreCount} core`
                                    : `${dayData.exercises.length} exercises`}
                            </span>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: 20,
                        }}>
                            {dayData.exercises.map((exercise) => (
                                isRunningDay
                                    ? <RunCard key={exercise.name} exercise={exercise} />
                                    : <ExerciseCard key={`${planVersion}-${exercise.name}`} exercise={exercise} planVersion={planVersion} />
                            ))}
                        </div>
                    </div>

                    {/* Post-Workout Cooldown */}
                    {dayData.cooldown?.length > 0 && (
                        <CollapsibleSection
                            title={isRunningDay ? 'Post-Run Cooldown & Stretching' : 'Post-Workout Cooldown & Stretching'}
                            icon="🧘"
                            color="#38bdf8"
                            bgColor="#071318"
                            items={dayData.cooldown}
                            defaultOpen={false}
                            useCardLayout={true}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default WorkoutDashboard;
