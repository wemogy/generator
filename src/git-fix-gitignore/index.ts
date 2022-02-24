import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class GitPrefixGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  public install(): void {
    this.spawnCommandSync('git', ['rm', '-r', '--cached', '.'], { shell: true });
    this.spawnCommandSync('git', ['add', '.'], { shell: true });
    this.spawnCommandSync('git', ['commit', '-m', '".gitignore is now working"'], { shell: true });
  }
}

export default resolveGeneratorInheritance(GitPrefixGenerator);
