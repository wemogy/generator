import ReactBaseComponentProps from "../../../../reactBaseComponentFactoryBuilder/types/ReactBaseComponentProps";
import <%= name.pascalCase %>Component from "../<%= name.pascalCase %>Component";

type Full<%= name.pascalCase %>Props = ReactBaseComponentProps<typeof <%= name.pascalCase %>Component>;

export default Full<%= name.pascalCase %>Props;
