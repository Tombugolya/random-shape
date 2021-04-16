export default class MathUtils {
  public static generateRandomHexadecimal(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
