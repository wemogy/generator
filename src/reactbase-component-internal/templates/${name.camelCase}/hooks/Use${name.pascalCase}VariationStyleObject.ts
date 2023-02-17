import <%= name.pascalCase %>ThemeDeclaration from "../theme/<%= name.pascalCase %>ThemeDeclaration";
import { createUseComponentVariationStyleObjectHook } from "../../../../reactBaseComponentFactoryBuilder";

const use<%= name.pascalCase %>VariationStyleObject =
  createUseComponentVariationStyleObjectHook(<%= name.pascalCase %>ThemeDeclaration);

export default use<%= name.pascalCase %>VariationStyleObject;
