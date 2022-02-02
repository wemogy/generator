import React from 'react';
import { observer } from 'mobx-react';
import I<%= name.pascalCase %>Props from './I<%= name.pascalCase %>Props';

const <%= name.pascalCase %>: React.FC<I<%= name.pascalCase %>Props> = () => {
  return null;
};

export default observer(<%= name.pascalCase %>);
