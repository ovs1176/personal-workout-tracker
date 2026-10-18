import workoutDataV1 from './workoutData.json';
import workoutDataV2 from './workoutDataV2.json';

const existingExercises = [workoutDataV1, workoutDataV2].flatMap(plan =>
    Object.values(plan).flatMap(day => day.exercises ?? [])
);

const thumbnails = {
    'Barbell Squat': 'squat',
    'Narrow-Stance Front Squat': 'front-squat',
    'Leg Press': 'leg-press',
    'Leg Extension': 'leg-extension',
    'Lying Leg Curl': 'lying-leg-curl',
    'Standing Calf Raise': 'standing-calf-raises',
    'Flat Barbell Bench Press': 'bench-press',
    'Incline Barbell Bench Press': 'v3-incline-bench-press',
    'Decline Barbell Bench Press': 'decline-bench-press',
    'Chest Butterfly (Pec Deck)': 'chest-fly',
    'Chest Dips': 'chest-dips',
    'Lat Pulldown': 'lat-pulldown',
    'Seated Cable Row': 'seated-cable-row',
    'Single Arm Dumbbell Row': 'single-arm-row',
    'Barbell Row': 'bent-over-row',
    'Close-Grip Cable Row': 'seated-cable-row',
    'Plank': 'plank',
    'Crunches': 'crunches',
    'Lying Leg Raise': 'lying-leg-raise',
    'Straight-Bar Cable Pushdown': 'triceps-pushdown',
    'Rope Triceps Pushdown': 'triceps-rope-pushdown',
    'Overhead Rope Triceps Extension': 'overhead-rope-extension',
    'Skull Crusher': 'skull-crushers',
    'Standing Dumbbell Curl': 'standing-dumbbell-curl',
    'Seated Dumbbell Curl': 'seated-dumbbell-curl',
    'Cross-Body Dumbbell Curl': 'cross-body-curl',
    'Hammer Curl': 'hammer-curl',
    'Straight-Bar Cable Curl': 'v3-cable-curl',
    'Seated Wrist Curl': 'seated-wrist-curl',
    'Barbell Military Press': 'overhead-press',
    'Seated Dumbbell Shoulder Press': 'dumbbell-shoulder-press',
    'Dumbbell Front Raise': 'front-raise',
    'Shoulder Upright Row': 'upright-row',
    'Lateral Raises': 'v3-lateral-raises',
    'Behind-the-Neck Press': 'behind-neck-press',
    'Dumbbell Shrug': 'dumbbell-shrug',
};

function exercise(name, target, note = '', mediaName = name) {
    const media = existingExercises.find(item => item.name === mediaName);
    return {
        name,
        target,
        sets: 4,
        reps: '20',
        gif: thumbnails[name] ? `${import.meta.env.BASE_URL}assets/exercises/${thumbnails[name]}.jpg` : media?.gif ?? '',
        youtube: media?.youtube ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} proper form`)}`,
        note,
    };
}

const workoutDataV3 = {
    schedule: [
        { day: 1, weekday: 'Monday', type: 'legs', label: 'Legs' },
        { day: 2, weekday: 'Tuesday', type: 'chest', label: 'Chest' },
        { day: 3, weekday: 'Wednesday', type: 'back', label: 'Back' },
        { day: 4, weekday: 'Thursday', type: 'triceps', label: 'Triceps', sublabel: 'Abs + Core' },
        { day: 5, weekday: 'Friday', type: 'biceps', label: 'Biceps', sublabel: 'Forearms' },
        { day: 6, weekday: 'Saturday', type: 'shoulders', label: 'Shoulders' },
        { day: 7, weekday: 'Sunday', type: 'rest', label: 'Rest' },
    ],
    legs: {
        title: 'Monday - Legs',
        subtitle: 'Quads, hamstrings and calves',
        purpose: '24 working sets. Squats and front squats overlap; alternate them if recovery or the 60-minute lifting window is limiting. Allow longer rests for demanding sets.',
        exercises: [
            exercise('Barbell Squat', 'Quads / Glutes', 'Stop before technique breaks down; fewer than 20 reps is appropriate if needed.'),
            exercise('Narrow-Stance Front Squat', 'Quads / Glutes', 'Use a comfortably narrow stance, not feet touching. Keep heels down and knees tracking with toes.'),
            exercise('Leg Press', 'Quads / Glutes'),
            exercise('Leg Extension', 'Quads'),
            exercise('Lying Leg Curl', 'Hamstrings'),
            exercise('Standing Calf Raise', 'Calves'),
        ],
    },
    chest: {
        title: 'Tuesday - Chest',
        subtitle: 'Chest with pressing and dips',
        purpose: '20 working sets. Flat, incline and decline presses plus dips overlap; rotate decline press and dips if fatigue or time becomes limiting.',
        exercises: [
            exercise('Flat Barbell Bench Press', 'Chest / Triceps'),
            exercise('Incline Barbell Bench Press', 'Upper Chest / Triceps'),
            exercise('Decline Barbell Bench Press', 'Chest / Triceps'),
            exercise('Chest Butterfly (Pec Deck)', 'Chest / Pectorals'),
            exercise('Chest Dips', 'Chest / Triceps', 'Use assistance to keep reps controlled. Do not force depth or continue through shoulder pain.'),
        ],
    },
    back: {
        title: 'Wednesday - Back',
        subtitle: 'Lats and upper back',
        purpose: '20 working sets. Seated rows and close-grip rows are similar; use a wider comfortable grip for seated rows, or alternate these two exercises.',
        exercises: [
            exercise('Lat Pulldown', 'Lats / Upper Back'),
            exercise('Seated Cable Row', 'Mid Back', 'Use a comfortable medium or wide grip to distinguish this from the close-grip row.'),
            exercise('Single Arm Dumbbell Row', 'Lats / Mid Back', '20 reps per side per set; unilateral sets take additional time.'),
            exercise('Barbell Row', 'Upper Back / Lats', 'Keep the trunk controlled. Reduce reps or load when lower-back fatigue affects position.'),
            exercise('Close-Grip Cable Row', 'Lats / Mid Back'),
        ],
    },
    triceps: {
        title: 'Thursday - Triceps, Abs and Core',
        subtitle: 'Triceps extensions and trunk control',
        purpose: '28 working sets. This is unlikely to fit comfortably into 60 minutes with adequate rests. Alternate bar and rope pushdowns or reduce the number of exercises rather than rushing.',
        exercises: [
            { ...exercise('Plank', 'Core', 'Hold for 20-40 seconds per set while breathing normally. End the hold when trunk position changes.'), reps: '1', duration: '20-40 seconds' },
            exercise('Crunches', 'Abs'),
            exercise('Lying Leg Raise', 'Abs / Hip Flexors', 'Keep the lower back controlled; bend knees if needed.'),
            exercise('Straight-Bar Cable Pushdown', 'Triceps', 'Interprets barbell pushdown as a cable pushdown with a straight-bar attachment.', 'Triceps Pushdown'),
            exercise('Rope Triceps Pushdown', 'Triceps'),
            exercise('Overhead Rope Triceps Extension', 'Triceps / Long Head'),
            exercise('Skull Crusher', 'Triceps', 'Use a manageable load and a pain-free elbow range.'),
        ],
    },
    biceps: {
        title: 'Friday - Biceps and Forearms',
        subtitle: 'Curls and wrist flexion',
        purpose: '24 working sets. Standing and seated curls overlap, as do cross-body and hammer curls. Rotate similar curls if elbows, recovery or time become limiting.',
        exercises: [
            exercise('Standing Dumbbell Curl', 'Biceps'),
            exercise('Seated Dumbbell Curl', 'Biceps'),
            exercise('Cross-Body Dumbbell Curl', 'Brachialis / Brachioradialis', 'Interprets cross grip as a cross-body curl with a neutral grip. Perform 20 reps per side.'),
            exercise('Hammer Curl', 'Biceps / Brachialis'),
            exercise('Straight-Bar Cable Curl', 'Biceps'),
            exercise('Seated Wrist Curl', 'Forearm Flexors', 'Use a light load and a controlled, pain-free wrist range.'),
        ],
    },
    shoulders: {
        title: 'Saturday - Shoulders',
        subtitle: 'Deltoids and upper traps',
        purpose: '28 working sets. Military, dumbbell and behind-the-neck presses overlap. Prefer rear-delt flyes instead of behind-the-neck presses; rotate presses and front raises to manage volume.',
        exercises: [
            exercise('Barbell Military Press', 'Shoulders / Triceps', '', 'Barbell Overhead Press'),
            exercise('Seated Dumbbell Shoulder Press', 'Shoulders / Triceps'),
            exercise('Dumbbell Front Raise', 'Front Delts'),
            exercise('Shoulder Upright Row', 'Side Delts / Traps', 'Use a comfortable grip and range. Do not pull through pinching or shoulder pain.'),
            exercise('Lateral Raises', 'Side Delts'),
            exercise('Behind-the-Neck Press', 'Shoulders / Triceps', 'Not a default recommendation: this needs substantial shoulder mobility and offers no essential advantage over front pressing. Prefer a reverse pec deck or rear-delt fly.'),
            exercise('Dumbbell Shrug', 'Upper Traps'),
        ],
    },
};

export default workoutDataV3;