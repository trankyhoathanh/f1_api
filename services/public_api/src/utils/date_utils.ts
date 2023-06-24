export class DateUtils {
    static getStartEndYear(year: string) {
        return {
            from: new Date(`${year}-01-01`),
            to: new Date(`${year}-12-31`)
        }
    }
}