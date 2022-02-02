import <%= name.pascalCase %>Implementation from "./implementation/<%= name.pascalCase %>Implementation";
import { createReactBaseComponent } from "../../../reactBaseComponentBuilder";
import <%= name.pascalCase %>ThemeDeclaration from "./theme/<%= name.pascalCase %>ThemeDeclaration";
import use<%= name.pascalCase %>Variation from "./hooks/Use<%= name.pascalCase %>Variation";
import use<%= name.pascalCase %>VariationRaw from "./hooks/Use<%= name.pascalCase %>VariationRaw";
import use<%= name.pascalCase %>VariationStyleObject from "./hooks/Use<%= name.pascalCase %>VariationStyleObject";

const <%= name.pascalCase %>Component = createReactBaseComponent(
  <%= name.pascalCase %>Implementation,
  <%= name.pascalCase %>ThemeDeclaration
);

export default <%= name.pascalCase %>Component;

use<%= name.pascalCase %>Variation.hookReference = <%= name.pascalCase %>Component.useComponentVariation;
use<%= name.pascalCase %>VariationRaw.hookReference =
  <%= name.pascalCase %>Component.useComponentVariationRaw;
use<%= name.pascalCase %>VariationStyleObject.hookReference =
  <%= name.pascalCase %>Component.useComponentThemeStyleObject;
