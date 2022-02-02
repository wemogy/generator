import { ComponentThemeCollectionVariations } from "../../../../reactBaseComponentBuilder";
import { ComponentThemeCollectionVariationsKey } from "../../../../theme";
import <%= name.pascalCase %>ThemeDeclaration from "../theme/<%= name.pascalCase %>ThemeDeclaration";

type <%= name.pascalCase %>Variation = ComponentThemeCollectionVariationsKey<
  ComponentThemeCollectionVariations<typeof <%= name.pascalCase %>ThemeDeclaration>
>;

export default <%= name.pascalCase %>Variation;
