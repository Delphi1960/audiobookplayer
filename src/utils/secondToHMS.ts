export function secondToHMS(seconds: number) {
  let sHours: string = '0';
  let fullHours = '0';
  let nMinutes = 0;
  let sMinutes = '0';
  let fullMinutes = '0';
  let nSeconds = 0;
  let sSeconds = '0';
  let result = '';

  sHours = String(seconds / 3600);
  if (sHours.indexOf('.') > 0) {
    fullHours = sHours.slice(0, sHours.indexOf('.'));
    nMinutes = Number('0.' + sHours.slice(sHours.indexOf('.') + 1)) * 60;
    // целое число часов
  } else if (Number(sHours) > 0) {
    fullHours = sHours;
    nMinutes = 0;
  } else {
    fullHours = '0';
    nMinutes = Number(sHours) * 60;
  }

  sMinutes = String(nMinutes);
  if (sMinutes.indexOf('.') > 0) {
    fullMinutes = sMinutes.slice(0, sMinutes.indexOf('.'));
    nSeconds = Number('0.' + sMinutes.slice(sMinutes.indexOf('.') + 1)) * 60;
    // целое число минут
  } else if (Number(sMinutes) > 0) {
    fullMinutes = sMinutes;
    nMinutes = 0;
  } else {
    fullMinutes = '0';
    nSeconds = Number(sMinutes) * 60;
  }
  sSeconds = nSeconds.toFixed(0);
  fullHours.length === 1 ? (fullHours = '0' + fullHours) : fullHours;
  fullMinutes.length === 1 ? (fullMinutes = '0' + fullMinutes) : fullMinutes;
  sSeconds.length === 1 ? (sSeconds = '0' + sSeconds) : sSeconds;
  result = fullHours + ':' + fullMinutes + ':' + sSeconds;
  // console.log(result);
  return result;
}
