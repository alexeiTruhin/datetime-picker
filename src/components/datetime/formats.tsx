
const enum FormatKey {
  Year = 'YYYY',
  Month = 'MM',
  Day = 'DD',
  Hour = 'HH',
  Minute = 'mm',
  Second = 'ss'
}

const enum FormatType {
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
  Second = 'second'
}

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
    FormatKey.Year,
    FormatKey.Month,
    FormatKey.Day,
    FormatKey.Hour,
    FormatKey.Minute,
    FormatKey.Second
  ]
}

export function convertFormatKeyToType(key: FormatKey) {
    switch (key) {
      case FormatKey.Year:
        return FormatType.Year;
      case FormatKey.Month:
        return FormatType.Month;
      case FormatKey.Day:
        return FormatType.Day;
      case FormatKey.Hour:
        return FormatType.Hour;
      case FormatKey.Minute:
        return FormatType.Minute;
      case FormatKey.Second:
        return FormatType.Second;
      default:
        return null
    }
}

export { FormatType };

export { FormatKey };

