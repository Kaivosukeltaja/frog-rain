import Base from 'ppr.component.base_prototype';

export default Base.createComponent({
  build() {
    this.node.text('Text was replaced!');
  }
});
