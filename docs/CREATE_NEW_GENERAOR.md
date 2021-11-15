# Adding a new generator

## Create the selector generator

1. Run `yo wemogy:yeoman`
1. Select `Selector Generator`
1. Enter the name of the selector generator in kebab case. (e.g. `wemogy-cli`)
1. Now the selector generator is created, add it to the `generators` array in the `app/index.ts` file

    ```<typescript>
    new GeneratorSelection('.NET', 'wemogy:dotnet'),
    ```

## Create the templac generator

1. Run `yo wemogy:yeoman`
1. Select the template generator type (e.g. `Template Generator (Generic)`)
1. Enter the name of the template generator. The name **must** start with the name of the selector generator (by convention). (e.g. `wemogy-cli-command`)
1. Add the created template generator to the belonging selection generator `generators` array: `new GeneratorSelection('Generator name', 'wemogy:wemogy-cli-command')`
