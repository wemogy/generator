import _ = require('lodash');

export function replaceAll(str: string, find: string, replace: string): string {
  // Escape regex characters
  find = find.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  return str.replace(new RegExp(find, 'g'), replace);
}

export function toPascalCase(text: string): string {
  return _.upperFirst(_.camelCase(text));
}

export function toCamelCase(text: string): string {
  return _.camelCase(text);
}

export function toNoWhitespaceLowerCase(text: string): string {
  return _.camelCase(text).toLowerCase();
}

export function toSnakeCase(text: string): string {
  return _.snakeCase(text);
}

export function toKebabCase(text: string): string {
  return _.kebabCase(text);
}
