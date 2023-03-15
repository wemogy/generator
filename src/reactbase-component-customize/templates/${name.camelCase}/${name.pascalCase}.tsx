import { <%= name.pascalCase %> as <%= name.pascalCase %>Base } from '@wemogy/reactbase';

const <%= name.pascalCase %> = <%= name.pascalCase %>Base.extendVariations({
  base: {
  }
});

export default <%= name.pascalCase %>;

declare global {
  interface <%= name.pascalCase %>Variations {
    <%= projectName.camelCase %>: typeof <%= name.pascalCase %>['variationKey'];
  }
}
