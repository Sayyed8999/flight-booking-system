import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
    standalone: true
})
export class DurationPipe implements PipeTransform {
    transform(totalMinutes: number | null | undefined): string {
        if (!totalMinutes && totalMinutes !== 0) return '--';

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const hh = hours.toString().padStart(2, '0');
        const mm = minutes.toString().padStart(2, '0');

        return `${hh}h ${mm}m`;
    }
}
