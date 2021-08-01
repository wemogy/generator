const yosay = require('yosay');
import * as Generator from 'yeoman-generator';

class DotNetGenerator extends Generator {
	private answers: any; // Answers captured by prompt
	private types = ['Solution', 'Class Library', 'ASP.NET Web API', 'xUnit Tests']; // TODO: Use Types or Enums, not strings

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
				name: 'type',
				message: 'What do you want to generate?',
				choices: this.types
			},
			{
				type: 'input',
				name: 'name',
				message: 'Your project or solution name',
				default: this.appname
			}
		]);
	}

	// Saving configurations and configure the project (creating .editorconfig files and other metadata files
	public configuring(): void {}

	//  Where you write the generator specific files (routes, controllers, etc)
	public writing(): void {
		switch (this.answers.type) {
			case 'Solution':
				this.fs.copy(this.templatePath('solution/Solution.sln'), this.destinationPath(`${this.answers.name}.sln`));
				this.fs.copy(this.templatePath('stylecop'), this.destinationPath());
				break;
			case 'Class Library':
				this.fs.copy(
					this.templatePath('classlib/Project.csproj'),
					this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`)
				);
				this.fs.copyTpl(this.templatePath('classlib/content'), this.destinationPath(this.answers.name), {
					...this.answers
				});
				break;
			case 'ASP.NET Web API':
				this.fs.copy(
					this.templatePath('aspnet/Project.csproj'),
					this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`)
				);
				this.fs.copyTpl(this.templatePath('aspnet/content'), this.destinationPath(this.answers.name), {
					...this.answers
				});
				break;
			case 'xUnit Tests':
				this.fs.copy(
					this.templatePath('xunit/Project.csproj'),
					this.destinationPath(`${this.answers.name}/${this.answers.name}.csproj`)
				);
				this.fs.copyTpl(this.templatePath('xunit/content'), this.destinationPath(this.answers.name), {
					...this.answers
				});
				break;
		}
	}

	// Where installation are run (npm, bower)
	public install(): void {}

	// Called last, cleanup, say good bye, etc
	public end(): void {}
}

export default DotNetGenerator;
