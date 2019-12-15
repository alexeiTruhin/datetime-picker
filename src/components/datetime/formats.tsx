
const FORMAT_YYYY = 'YYYY';
const FORMAT_MM = 'MM';
const FORMAT_DD = 'DD';
const FORMAT_HH = 'HH';
const FORMAT_mm = 'mm';
const FORMAT_ss = 'ss';

const TYPE_YEAR = 'year';
const TYPE_MONTH = 'month';
const TYPE_DAY = 'day';
const TYPE_HOUR = 'hour';
const TYPE_MINUTE = 'minute';
const TYPE_SECOND = 'second';

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
    FORMAT_YYYY,
    FORMAT_MM,
    FORMAT_DD,
    FORMAT_HH,
    FORMAT_mm,
    FORMAT_ss
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

