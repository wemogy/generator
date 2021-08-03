# Yeoman Code Generator

## Get it running

```bash
npm install -g @wemogy/generator-wemogy
```

```bash
yo wemogy
```

When running the `yo` command from your command line, you should now see `Wemogy` in the list of available yeoman generators.

## Development

```bash
yarn install
```

```bash
yarn link
```

Start the development using the following command in the root directory

```bash
yarn develop
```

To test the generator, run the following command in any directory

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
