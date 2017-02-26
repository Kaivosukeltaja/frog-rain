import BasePrototype from 'ppr.component.baseprototype';

export default class SimpleExample extends BasePrototype {
  build() {
    this.node.text('Text was replaced!');
    return true;
  }
}
