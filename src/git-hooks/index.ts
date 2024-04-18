import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class GitHooksGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }
}

export default resolveGeneratorInheritance(GitHooksGenerator);
