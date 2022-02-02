import CommandBase from '<%= relativePath %>../base/CommandBase';
import CommandParameters from '<%= relativePath %>../base/types/CommandParameters';

export default class <%= name.pascalCase %><%= namespace.pascalCase %>Command extends CommandBase {
  public description: string = '';

  public arguments = {};
  public options = {};

  public constructor(namespace: string) {
    super(namespace);
  }

  public async runAsync(
    args: CommandParameters<typeof this.arguments>,
    options: CommandParameters<typeof this.options>
  ): Promise<void> {
    this.error('Not implemented');
  }
}
