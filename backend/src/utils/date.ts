export function addDays(base: Date, days: number, hours = 0, minutes = 0) {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    d.setHours(hours, minutes, 0, 0);
    return d;
}

export function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

export function getDayRangeUTC(dateStr: string) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;

    const y = date.getUTCFullYear();
    const m = date.getUTCMonth();
    const d = date.getUTCDate();

    return {
        start: new Date(Date.UTC(y, m, d, 0, 0, 0, 0)),
        end: new Date(Date.UTC(y, m, d, 23, 59, 59, 999))
    };
};


