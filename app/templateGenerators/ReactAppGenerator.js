const BaseTemplateGenerator = require('./BaseTemplateGenerator');

module.exports = class ReactAppGenerator extends BaseTemplateGenerator{
	constructor(args, opts) {
		super(args, opts);
		this.test();
	}
}
