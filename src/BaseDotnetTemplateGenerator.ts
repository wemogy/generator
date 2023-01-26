import * as _ from 'lodash';
import BaseTemplateGenerator from './BaseTemplateGenerator';
import { getSlnFiles } from './DotnetHelpers';

class BaseDotnetTemplateGenerator extends BaseTemplateGenerator {
  private readonly solutionFiles: string[];
  private readonly solutionNames: string[];
  private readonly slnAvailable: boolean;
  private readonly multipleSlnAvailable: boolean;

  protected get slnPrompt() {
    return {
      when: () => !this.slnAvailable || this.multipleSlnAvailable,
      type: this.multipleSlnAvailable ? 'list' : 'input',
      name: 'solutionName',
      message: this.multipleSlnAvailable ? 'Which solution?' : 'Solution name',
      default: this.multipleSlnAvailable ? undefined : this.solutionNames[0],
      choices: this.multipleSlnAvailable ? this.solutionNames : undefined
    };
  }

  constructor(args: any, options: any) {
    super(args, options);
    this.solutionFiles = getSlnFiles();
    this.solutionNames = this.solutionFiles.map(sln => sln.split('/').pop().replace('.sln', ''));
    this.slnAvailable = this.solutionFiles.length > 0;
    this.multipleSlnAvailable = this.solutionFiles.length > 1;
    if (!this.slnAvailable) {
      this.log.info('No .NET Solution found. We will create one during the process.');
    }
  }

  protected composeSolutionIfNeeded() {
    if (!this.slnAvailable) {
      this.composeWith('wemogy:dotnet-solution', {
        name: this.answers.solutionName,
        styleCop: true
      });
    }
  }

  protected getSolutionPath(): string {
    const index = this.solutionNames.indexOf(this.answers.solutionName);
    return this.solutionFiles[index];
  }
}

export default BaseDotnetTemplateGenerator;
