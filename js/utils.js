import dayjs from 'dayjs';

export function sanitize(input, invalidChar) {
  return input.replaceAll(invalidChar, '');
}

export function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD');
}
