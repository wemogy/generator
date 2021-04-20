'use strict';

const Generator = require('yeoman-generator');
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.helperMethod = function () {
            this.log('won\'t be called automatically');
        };
        this.log('Initializing...');
    }
    async startFunction() {
       // this.log("g");
       let a = true;
        const answer = await this.prompt([
            {
                type: 'list',
                choices: ["typescript", "javascript"],
                name: 'name',
                message: 'Select lang: '
            }
        ]).then((answer) => {
            //this.destinationRoot(answer.name);
            this.fs.write("a.txt", "FIRST QUESTION::" + answer.name);
        });
        const answer2 = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Type name of the project: '
            }
        ]).then((answer2) => {
            this.fs.append("a.txt", "Second QUESTION::" + answer2.name);
        });
        
        await this.prompt([
            {
              type: 'list',
              choices: ["Opt1", "Opt2", "Opt3", "Opt4", "Opt5"],
              name    : 'name',
              message: 'Select the options: ',
              when: a
            }
          ]).then((answer3) => {
            this.fs.append("a.txt", "THIRD QUESTION::" + answer3.name);
        });
    };
    
    _secondFunction() {
        this.log("done");
    }

    async _thirdFunction() {
        await this.log(this.destinationRoot());
        await this.log(this.destinationPath('index.js'));
        await this.log(this.destinationPath('index.js'));
    }
};