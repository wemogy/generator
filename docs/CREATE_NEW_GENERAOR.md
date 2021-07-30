# Adding a new generator

1. Create a new folder for the generator under the `src/` folder. The folder name will be the name of the generator. Example: `src/my-generator`.
1. Create an `index.ts` file in the folder with the following empty structure

    ```typescript
    import * as Generator from 'yeoman-generator';

    class MyGenerator extends Generator {

      constructor(args: any, options: any) {
        super(args, options);
      }

      // Your initialization methods (checking current project state, getting configs, etc
      public initialize(): void {}

      // Where you prompt users for options (where you’d call this.prompt())
      public async prompting() {}

      // Saving configurations and configure the project (creating .editorconfig files and other metadata files
      public configuring(): void {}

      //  Where you write the generator specific files (routes, controllers, etc)
      public writing(): void {}

      // Where installation are run (npm, bower)
      public install(): void {}

      // Called last, cleanup, say good bye, etc
      public end(): void {}
    }

    export default MyGenerator;
    ```

1. Create a `template/` directory in the same folder as your new generator and put all template files in there.
1. In `app/index.ts`, add your generator to the `generators` array.

    ```typescript
    private generators = [
      // ...
      {
        name: 'My Generator',
        generator: 'wemogy:my-generator'
      }
    ];
    ```


