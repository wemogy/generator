import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class GitPrefixGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  public install(): void {
    try {
      // Make script executable
      this.spawnCommandSync('chmod', ['+x', 'script.sh'], { shell: true });

      // Execute script with parameters
      this.spawnCommandSync('./script.sh', [], {
        shell: true
      });
    } finally {
      // Delete script after execution
      this.spawnCommandSync('rm', ['script.sh'], { shell: true });
    }
  }
}

export default resolveGeneratorInheritance(GitPrefixGenerator);
