import * as _ from 'lodash';
import BaseTemplateGenerator from './BaseTemplateGenerator';
import { getProjectFiles, getSlnFiles } from './DotnetHelpers';

class BaseDotnetTemplateGenerator extends BaseTemplateGenerator {
  private readonly solutionFiles: string[];
  private readonly solutionNames: string[];
  private readonly slnAvailable: boolean;
  private readonly multipleSlnAvailable: boolean;

  private readonly projectFiles: string[];
  private readonly projectNames: string[];
  private readonly projectAvailable: boolean;
  private readonly multipleProjectsAvailable: boolean;

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

  protected get projectPrompt() {
    return {
      when: () => !this.projectAvailable || this.multipleProjectsAvailable,
      type: this.multipleProjectsAvailable ? 'list' : 'input',
      name: 'projectName',
      message: this.multipleProjectsAvailable ? 'Which project?' : 'Project name',
      default: this.multipleProjectsAvailable ? undefined : this.projectNames[0],
      choices: this.multipleProjectsAvailable ? this.projectNames : undefined
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

    this.projectFiles = getProjectFiles();
    this.projectNames = this.projectFiles.map(sln => sln.split('/').pop().replace('.csproj', ''));
    this.projectAvailable = this.projectFiles.length > 0;
    this.multipleProjectsAvailable = this.projectFiles.length > 1;
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

  protected getProjectFilePath(): string {
    const index = this.projectNames.indexOf(this.answers.projectName);
    return this.projectFiles[index];
  }

  protected getProjectPath(): string {
    const projectFilePath = this.getProjectFilePath();
    return projectFilePath.substring(0, projectFilePath.lastIndexOf('/'));
  }
}

export default BaseDotnetTemplateGenerator;
