import { <%= name.pascalCase %>ThemeDeclaration } from "..";
import { createUseComponentVariationStyleObjectHook } from "../../../..";

const use<%= name.pascalCase %>VariationStyleObject = createUseComponentVariationStyleObjectHook(
  <%= name.pascalCase %>ThemeDeclaration
);

export default use<%= name.pascalCase %>VariationStyleObject;
