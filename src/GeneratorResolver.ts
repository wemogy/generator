import BaseSelectionGenerator from './BaseSelectionGenerator';

export function resolveGeneratorInheritance<T extends typeof BaseSelectionGenerator>(generator: T): T {
  // Yeoman only looks at functions in the root prototype. This is why we need to propagate the functions using this
  // trick. https://stackoverflow.com/questions/27427094/why-are-my-generator-methods-not-inherited
  generator.prototype.initialize = generator.prototype.initialize;
  generator.prototype.prompting = generator.prototype.prompting;
  generator.prototype.configuring = generator.prototype.configuring;
  generator.prototype.writing = generator.prototype.writing;
  generator.prototype.install = generator.prototype.install;
  generator.prototype.end = generator.prototype.end;
  return generator;
}
