import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class TypeScriptGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);
    this.generators = [
      new GeneratorSelection('Empty', 'wemogy:typescript-empty'),
      new GeneratorSelection('React', 'wemogy:typescript-react')
    ];
  }
}

export default resolveGeneratorInheritance(TypeScriptGenerator);
