import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class ScriptSelectionGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [new GeneratorSelection('Secrets', 'wemogy:script-secrets')];
  }
}

export default resolveGeneratorInheritance(ScriptSelectionGenerator);
