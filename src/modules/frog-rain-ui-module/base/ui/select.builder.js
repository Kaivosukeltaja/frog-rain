import $ from 'jquery';
import BuilderPrototype from 'ppr.ui.builder_prototype';

export default $.extend(true, {}, BuilderPrototype, {

  /**
   * @inheritdoc
   */
  build: function(Select) {
    Select.build();
  },

  /**
   * @inheritdoc
   */
  getDependencies: function() {
    return ['ppr.ui.select'];
  },

  /**
   * @inheritdoc
   */
  shouldBuild: function() {
    return $('.ppr-select').length > 0;
  }
});

