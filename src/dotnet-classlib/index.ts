import BaseTemplateGenerator from '../BaseTemplateGenerator';

class DotClasslibGenerator extends BaseTemplateGenerator {
  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'nuget',
        message: 'Packable via NuGet?',
        default: this.appname,
        followUpQuestions: [
          {
            type: 'input',
            name: 'nugetRepoUrl',
            message: 'GitHub Repository Url'
          },
          {
            type: 'input',
            name: 'nugetDescription',
            message: 'NuGet package description'
          }
        ]
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copyTpl(
      this.templatePath('Project.csproj'),
      this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`),
      this.answers
    );
    this.fs.copyTpl(this.templatePath('content'), this.destinationPath(this.answers.name), this.answers);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotClasslibGenerator;
