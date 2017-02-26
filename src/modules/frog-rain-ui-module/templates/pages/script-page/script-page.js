import BasePrototype from 'ppr.page.baseprototype';

export default class ScriptPage extends BasePrototype {
  build() {
    this.node.append('<p>Hello world from the page script!</p>');
    return true;
  }
}
