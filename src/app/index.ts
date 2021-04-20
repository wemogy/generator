import * as chalk from 'chalk';
const yosay = require("yosay");
import * as Generator from "yeoman-generator";
import BaseTemplateGenerator from './templateGenerators/BaseTemplateGenerator';
import ReactAppGenerator from './templateGenerators/ReactAppGenerator';
import ReactLibGenerator from './templateGenerators/ReactLibGenerator';

class SimpleGenerator extends Generator {
	answers: any;					// Answers captured by prompt

	private readonly templates: BaseTemplateGenerator[];

	private selectedTemplate?: BaseTemplateGenerator;

	constructor(args: any, options: any) {
		super(args, options);
		this.log(yosay(`Welcome to the ${chalk.red(`wemogy`)}!`));

		this.templates = [
			new ReactAppGenerator(args, options),
			new ReactLibGenerator(args, options)
		]
	}

	// Your initialization methods (checking current project state, getting configs, etc
	public initialize(): void { }

	public async prompting() {
		const {selectedTemplateName} = await this.prompt({
				type: 'list',
				name: 'selectedTemplateName',
				message: 'Which template do you want to use?',
				choices: this.templates.map(x => x.name),
				default: 'Dont need'
		});

		this.selectedTemplate = this.templates.find(x => x.name === selectedTemplateName);

		if (!this.selectedTemplate) {
			return;
		}

	 	this.answers =	await this.prompt(this.selectedTemplate.getQuestions());
	}

	// Saving configurations and configure the project (creating .editorconfig files and other metadata files
	public configuring(): void { }

	//  Where you write the generator specific files (routes, controllers, etc)
	public writing(): void {
		this.log('WRITE')
		const outputDirectory = process.cwd();

		if (!this.selectedTemplate) {
			return;
		}

		// Root directory of generator project
		const sourceRoot = `${__dirname.substring(0, __dirname.indexOf('generators'))}`;

		// Write files from tes template
		this.fs.copyTpl(
			`${sourceRoot}templates/${this.selectedTemplate.templateFolderName}`,
			outputDirectory,
			{
				title: 'xy',
				...this.answers
			}
		);
	}

	// Where installation are run (npm, bower)
	public install(): void { }

	// Called last, cleanup, say good bye, etc
	public end(): void { }
}

export default SimpleGenerator;
