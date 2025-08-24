export class Logger {
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  private static logWithColor(level: string, message: string, colorCode: string): void {
    console.log(`\x1b[${colorCode}m${this.formatMessage(level, message)}\x1b[0m`);
  }

  static info(message: string): void {
    this.logWithColor("INFO", message, "36"); // Cyan
  }

  static debug(message: string): void {
    this.logWithColor("DEBUG", message, "32"); // Green
  }

  static error(message: string): void {
    this.logWithColor("ERROR", message, "31"); // Red
  }

  static warn(message: string): void {
    this.logWithColor("WARN", message, "33"); // Yellow
  }
}
