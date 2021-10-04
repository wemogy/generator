import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';

class TypeScriptGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = [
      {
        name: 'React.js',
        generator: 'wemogy:typescript-react'
      }
    ];
  }
}

export default resolveGeneratorInheritance(TypeScriptGenerator);
