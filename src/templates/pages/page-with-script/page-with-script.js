import Base from 'ppr.page.base_prototype';

export default Base.createPage({
  build() {
    this.node.append('<p>Hello world from the page script!</p>');
  }
});
