const Generator = require('yeoman-generator');

module.exports = class BaseTemplateGenerator extends Generator{

	get testGetter() {
		return 'Bla';
	}

	constructor(args, opts) {
		super(args, opts);
		this.log('Working :)');
	}

	test() {
		this.log('TEST!!!')
	}
}
