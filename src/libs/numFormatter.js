export default function numFormatter(num) {
  if (Math.abs(num) > 999999) {
    return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M";
  } else if (Math.abs(num) > 999) {
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K";
  }
  return num;
}
