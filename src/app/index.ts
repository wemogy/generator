import * as chalk from 'chalk';
import * as Generator from 'yeoman-generator';
const yosay = require('yosay');
import { UpdateInfo, UpdateNotifier } from 'update-notifier';

class AppGenerator extends Generator {
  private answers: any;
  private updateInfo: UpdateInfo;

  constructor(args: any, options: any) {
    super(args, options);
  }

  public async initialize() {
    // Check for updates
    const packageJson = require('../../package.json');
    var notifier = new UpdateNotifier({
      pkg: packageJson
    });

    this.updateInfo = await notifier.fetchInfo();

    if (this.updateInfo.type == 'latest') {
      // Generator is on the latest version
      this.log(yosay(`Welcome to the ${chalk.blue(`wemogy`)} code generator!`));
    } else {
      // Generator is NOT on the latest version
      this.log(
        yosay(`Update available!\n ${chalk.blue(this.updateInfo.current)} -> ${chalk.green(this.updateInfo.latest)}`)
      );
      this.answers = await this.prompt([
        {
          type: 'confirm',
          name: 'update',
          message: 'What do you want to update now?',
          default: true
        }
      ]);
    }
  }

  public writing(): void {
    if (this.answers?.update) {
      this.log('Installing update...');
      this.spawnCommandSync('npm', ['upgrade', '-g', 'generator-wemogy']);
      this.log('Update installed.');
      this.composeWith('wemogy:app');
    } else {
      this.composeWith('wemogy:app-selection');
    }
  }
}

export default AppGenerator;
