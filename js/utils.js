export const sanitize = function(input, invalidChar) {
  return input.replaceAll(invalidChar, '');
}
