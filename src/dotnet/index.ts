import * as Generator from 'yeoman-generator';

class DotNetGenerator extends Generator {
  private answers: any; // Answers captured by prompt
  private generators = [
    {
      name: 'Solution',
      generator: 'wemogy:dotnet-solution'
    },
    {
      name: 'Class Library',
      generator: 'wemogy:dotnet-classlib'
    },
    {
      name: 'ASP.NET Web API',
      generator: 'wemogy:dotnet-aspnet'
    },
    {
      name: 'xUnit Tests',
      generator: 'wemogy:dotnet-xunit'
    }
  ];

  constructor(args: any, options: any) {
    super(args, options);
  }

  // Your initialization methods (checking current project state, getting configs, etc
  public initialize(): void {}

  // Where you prompt users for options (where you’d call this.prompt())
  public async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'projectType',
        message: 'What do you want to generate?',
        choices: this.generators.map(x => x.name)
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    const selection = this.generators.find(x => x.name === this.answers.projectType);
    this.composeWith(selection.generator);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default DotNetGenerator;
