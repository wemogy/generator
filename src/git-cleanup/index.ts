import BaseTemplateGenerator from '../BaseTemplateGenerator';
import { resolveGeneratorInheritance } from '../GeneratorResolver';

class GitCleanupGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  public writing(): void {
    // Overriding from base, to make sure, that no files are copied.
  }

  public install(): void {
    const scriptPath = `${__dirname}/templates/script.sh`;

    // Make script executable
    this.spawnCommandSync('chmod', ['+x', scriptPath], { shell: true });

    // Execute script with parameters
    this.spawnCommandSync(scriptPath, [], {
      shell: true
    });
  }
}

export default resolveGeneratorInheritance(GitCleanupGenerator);
