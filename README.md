# Workout Tracker App

A React workout tracker with a default six-day body-part split and the original Push Pull Legs and Push Pull Run plans. All data is stored locally using localStorage. Responsive, dark-themed, and PWA-ready.

## Default Plan: V3 Body-Part Split

| Day | Focus | Exercises |
| --- | --- | --- |
| Monday | Legs | Squat, narrow-stance front squat, leg press, leg extension, lying leg curl, calf raise |
| Tuesday | Chest | Flat, incline and decline barbell bench press, butterfly, dips |
| Wednesday | Back | Lat pulldown, seated cable row, single-arm dumbbell row, barbell row, close-grip cable row |
| Thursday | Triceps, abs and core | Plank, crunches, lying leg raise, straight-bar pushdown, rope pushdown, overhead rope extension, skull crusher |
| Friday | Biceps and forearms | Standing dumbbell curl, seated dumbbell curl, cross-body dumbbell curl, hammer curl, straight-bar cable curl, wrist curl |
| Saturday | Shoulders | Barbell military press, dumbbell press, front raise, upright row, lateral raise, behind-the-neck press, shrugs |
| Sunday | Rest | Recovery |

Targets are 4 sets of 20 reps, except planks: 4 holds of 20-40 seconds. The lifting budget is 60 minutes, with a separate 20 minutes for warm-up and cooldown. With 20-28 working sets per day, the full list may exceed that budget. Rotate overlapping exercises or reduce volume rather than rushing rest periods. Use fewer reps when needed to maintain technique, particularly on squats, rows and presses.

Behind-the-neck presses are retained as requested, but rear-delt flyes or a reverse pec deck are recommended instead. Pressing and curl variations overlap substantially. Use a comfortable front-squat stance rather than forcing feet together. "Cross grip" is interpreted as a cross-body dumbbell curl; "barbell pushdown" as a straight-bar cable pushdown.

V3 opens by default until another plan is selected; that selection is remembered locally. V1 and V2 remain available, and existing workout history is unchanged. New-plan logging starts with four sets and the prescribed rep targets. Planks display timed targets; the existing logger records completed holds as repetitions, not elapsed seconds. All V3 exercises have bundled local thumbnails; where no existing video matches, cards link to a YouTube form search.

Additional V3 exercise photos come from [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), released under [The Unlicense](https://github.com/yuhonas/free-exercise-db/blob/main/LICENSE.md). Images are bundled locally rather than hotlinked. The front-squat photo illustrates a standard front squat; stance guidance is provided separately on the card.

## Features
- Push/Pull/Legs workout split
- Exercise cards with GIFs, YouTube links, log weight button
- Log sets, reps, weight per exercise
- Progress dashboard with charts (Recharts)
- Workout history
- Export logs as JSON
- Mark exercises as completed
- Responsive, modern UI (TailwindCSS)
- Dark theme

## Folder Structure
- src/components
- src/pages
- src/data
- src/hooks
- src/utils
- src/charts 

## Getting Started
1. Install dependencies:
	```bash
	npm install
	```
2. Start the app:
	```bash
	npm run dev
	```

## PWA Support
Add manifest and service worker for full PWA support (optional).

## Replace GIFs
Exercise GIFs are placeholders. Replace with your own for best experience.
