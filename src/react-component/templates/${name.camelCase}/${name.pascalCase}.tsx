import React from 'react';
<%_ if (withMobxReactObserver) { _%>
import { observer } from 'mobx-react-lite';
<%_ } _%>
import I<%= name.pascalCase %>Props from './I<%= name.pascalCase %>Props';

const <%= name.pascalCase %>: React.FC<I<%= name.pascalCase %>Props> = () => {
  return null;
};

<%_ if (withMobxReactObserver) { _%>
export default observer(<%= name.pascalCase %>);
<%_ } else { _%>
export default <%= name.pascalCase %>;
<%_ } _%>
