import { resolveGeneratorInheritance } from '../GeneratorResolver';
import BaseSelectionGenerator from '../BaseSelectionGenerator';
import GeneratorSelection from '../GeneratorSelection';

class GitSelectionGenerator extends BaseSelectionGenerator {
  constructor(args: any, options: any) {
    super(args, options);

    this.generators = this.generators = [
      new GeneratorSelection('Fix .gitignore', 'wemogy:git-prefix'),
      new GeneratorSelection('Add v prefix to branches and tags', 'wemogy:git-fix-gitignore')
    ];
  }
}

export default resolveGeneratorInheritance(GitSelectionGenerator);
