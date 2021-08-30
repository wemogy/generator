# Yeoman Code Generator

![npm](https://img.shields.io/npm/v/generator-wemogy)

## Get it running

```bash
npm install -g generator-wemogy
```

```bash
yo wemogy
```

When running the `yo` command from your command line, you should now see `Wemogy` in the list of available yeoman generators.

## Development

Open a Terminal at the repository root and run the following commands.

```bash
yarn install
```

```bash
yarn link
yarn link generator-wemogy
```

Start the development using the following command in the root directory.

```bash
yarn develop
```

To test the generator, run the following commands from the repository's root or a sub folder.

```bash
yo wemogy
```

To remove the linked generator, run the following command

```bash
yarn unlink

# Check, if removal was successful
npm list -g --depth=0
```

## Sources

- <https://github.com/alexbatis/generator-typescript-yo-generator>
