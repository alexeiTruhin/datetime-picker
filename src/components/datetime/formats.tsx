
const FORMAT_YYYY = 'YYYY';
const FORMAT_MM = 'MM';
const FORMAT_DD = 'DD';
const FORMAT_HH = 'HH';
const FORMAT_mm = 'mm';
const FORMAT_ss = 'ss';

export function splitFormatString(format: string) {
  const formatArr = [];
  const formatKeys = getAllFormatKeys();

  while (format.length) {
    let startsWithFormatKey = false;
    for (const key of formatKeys) {
      if (format.startsWith(key)) {
        formatArr.push(key);
        format = format.slice(key.length, format.length);
        startsWithFormatKey = true;
        break;
      }
    }

    if (!startsWithFormatKey) {
      formatArr.push(format[0]);
      format = format.slice(1, format.length);
    }
  }
  return formatArr;
}

export function getAllFormatKeys() {
  return [
    FORMAT_YYYY,
    FORMAT_MM,
    FORMAT_DD,
    FORMAT_HH,
    FORMAT_mm,
    FORMAT_ss
  ]
}