export function replaceAll(str: string, find: string, replace: string): string {
  // Escape regex characters
  find = find.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  return str.replace(new RegExp(find, 'g'), replace);
}
