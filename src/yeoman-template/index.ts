import BaseTemplateGenerator from '../BaseTemplateGenerator';

class YeomanTemplateGenerator extends BaseTemplateGenerator {
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
        message: 'Generator Name'
      },
      {
        type: 'input',
        name: 'className',
        message: 'Class Name'
      }
    ]);
  }

  // Saving configurations and configure the project (creating .editorconfig files and other metadata files
  public configuring(): void {}

  //  Where you write the generator specific files (routes, controllers, etc)
  public writing(): void {
    this.fs.copyTpl(
      `${this.templatePath()}/index.ts`,
      `${this.destinationPath()}/${this.answers.name}/index.ts`,
      this.answers
    );
    this.fs.copy(`${this.templatePath()}/templates`, `${this.destinationPath()}/${this.answers.name}/templates`);
  }

  // Where installation are run (npm, bower)
  public install(): void {}

  // Called last, cleanup, say good bye, etc
  public end(): void {}
}

export default YeomanTemplateGenerator;
