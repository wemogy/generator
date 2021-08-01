import * as chalk from 'chalk';
const yosay = require('yosay');
import * as Generator from 'yeoman-generator';

class AppGenerator extends Generator {
	private selectedGeneratorName?: string;
	private generators = [
		{
			name: '.NET',
			generator: 'wemogy:dotnet'
		},
		{
			name: 'GitHub Actions',
			generator: 'wemogy:github-actions'
		}
	];

	constructor(args: any, options: any) {
		super(args, options);
		this.log(yosay(`Welcome to the ${chalk.blue(`wemogy`)} code generator!`));
	}

	// Your initialization methods (checking current project state, getting configs, etc
	public initialize(): void {}

	// Where you prompt users for options (where you’d call this.prompt())
	public async prompting() {
		const { generator } = await this.prompt({
			type: 'list',
			name: 'generator',
			message: 'What do you want to generate?',
			choices: this.generators.map(x => x.name)
		});

		this.selectedGeneratorName = generator;
	}

	// Saving configurations and configure the project (creating .editorconfig files and other metadata files
	public configuring(): void {}

	//  Where you write the generator specific files (routes, controllers, etc)
	public writing(): void {
		const selection = this.generators.find(x => x.name === this.selectedGeneratorName);
		this.composeWith(selection.generator);
	}

	// Where installation are run (npm, bower)
	public install(): void {}

	// Called last, cleanup, say good bye, etc
	public end(): void {}
}

export default AppGenerator;
