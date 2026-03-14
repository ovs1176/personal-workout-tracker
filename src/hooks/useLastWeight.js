import { useLocalStorage } from './useLocalStorage';

export function useLastWeight(exerciseName) {
    const [logs] = useLocalStorage('workoutLogs', []);
    const relevantLogs = logs.filter((log) => log.exercise === exerciseName);
    const lastLog = relevantLogs[relevantLogs.length - 1];
    return lastLog ? lastLog.sets[0]?.weight ?? null : null;
}
