import * as chalk from 'chalk';
import { timeStamp } from 'node:console';
const yosay = require('yosay');
import * as Generator from 'yeoman-generator';

class GitHubGenerator extends Generator {
	answers: any; // Answers captured by prompt

	constructor(args: any, options: any) {
		super(args, options);
		this.argument('name', { type: String, required: false });
	}

	// Your initialization methods (checking current project state, getting configs, etc
	public initialize(): void {}

	// Where you prompt users for options (where you’d call this.prompt())
	public async prompting() {
		this.answers = await this.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Your project name',
				default: this.appname // Default to current folder name
			},
			{
				type: 'confirm',
				name: 'cool',
				message: 'Would you like to enable the Cool feature?'
			}
		]);
	}

	// Saving configurations and configure the project (creating .editorconfig files and other metadata files
	public configuring(): void {}

	//  Where you write the generator specific files (routes, controllers, etc)
	public writing(): void {
		this.fs.copyTpl(this.sourceRoot(), process.cwd(), {
			name: this.options.name,
			...this.answers
		});
	}

	// Where installation are run (npm, bower)
	public install(): void {}

	// Called last, cleanup, say good bye, etc
	public end(): void {}
}

export default GitHubGenerator;
