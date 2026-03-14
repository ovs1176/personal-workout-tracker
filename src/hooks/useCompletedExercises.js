import { useLocalStorage } from './useLocalStorage';

export function useCompletedExercises(date) {
    const [logs] = useLocalStorage('workoutLogs', []);
    return logs
        .filter((log) => log.date === date)
        .map((log) => log.exercise);
}
