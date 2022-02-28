# Adding a new generator

## Creating new generators

### Selector Generator

1. Run `yo wemogy:yeoman`
1. Select `Selector Generator`
1. Enter the name of the selector generator in kebab case. (e.g. `wemogy-cli`)
1. Now the selector generator is created, add it to the `generators` array in the `app/index.ts` file

    ```typescript
    new GeneratorSelection('.NET', 'wemogy:dotnet'),
    ```

### Template generator

1. Run `yo wemogy:yeoman`
1. Select the template generator type (e.g. `Template Generator (Generic)`)
1. Enter the name of the template generator. The name **must** start with the name of the selector generator (by convention). (e.g. `wemogy-cli-command`)
1. Add the created template generator to the belonging selection generator `generators` array: `new GeneratorSelection('Generator name', 'wemogy:wemogy-cli-command')`

## Tools and Tricks

### Copying`

The `copyTemplateToDestination` function is used to copy all files from the `/templates` folder to the destination path and process the case functions in the file names.

```typescript
public writing(): void {
  this.copyTemplateToDestination(this.answers.path);
}
```

### Case

#### File name

Assuming a parameter `name: myTest` exists:

- Template file name `hello${name}world` becomes `hellomyTestworld`
- Template file name `hello${name.snakeCase}world` becomes `hellomy_testworld`
- Template file name `hello${name.pascalCase}world` becomes `helloMyTestworld`

#### In-Template Variables

Assuming a parameter `name: myTest` exists:

- Template variable `<%= name.pascalCase %>` becomes `MyTest`
- Template variable `<%= name.camelCase %>` becomes `myTest`
- Template variable `<%= name.snakeCase %>` becomes `my_test`
- Template variable `<%= name.kebabCase %>` becomes `my-test`
