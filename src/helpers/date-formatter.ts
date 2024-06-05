export class DateFormatter {
  static formatter = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  static getDDMMMMYYYY(date: Date): string {
    return this.formatter.format(date);
  }
}
