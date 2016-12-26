import ObjectUtils from 'ppr.library.utils.object';
import $ from 'jquery';
import _ from 'lodash';
import select2 from 'select2';

var defaultOptions = {
  tags: false,
  allowClear: false,
  minimumResultsForSearch: Infinity,
  containerCssClass: 'ppr-select__container',
  dropdownCssClass: 'ppr-select__dropdown'
};

export default {

  /**
   * Build select lists
   */
  build: function() {
    var _this = this;

    _.each($('body').find('.ppr-select'), function(elem) {

      var $elem = $(elem);

      // Already built
      if ($elem.hasClass('ppr-select--built')) {
        return;
      }

      $elem
        .css('width', '100%')
        .select2(_this.getOptionsByElement($elem))
        .addClass('ppr-select--built');

      // Move label inside select2. We need to check when it exists since it won't be there
      // by the time we run this code.
      const labelMoveInterval = setInterval(() => {
        if($elem.parent().find('.select2-container').length > 0) {
          $elem.parent().find('.ppr-select__label').prependTo($elem.parent().find('.select2-container'));
          clearInterval(labelMoveInterval);
        }
      }, 500);

      // Animate close and open of the options. Needs some trickery because select2
      // just destroys the whole element when closing.
      // TODO: animations postponed until a good solution is found to make multiple select
      // boxes work simultaneously without issues.
      /*
      $elem.on('select2:closing', function(event, alreadyClosed) {
        console.log('closing');
        if ($elem.data('closing') !== true) {
          console.log('closing and hiding');
          // TODO: This
          $('.select2-container--open').removeClass('select2-container--visible');
          setTimeout(() => {
            $elem.select2("close");
          }, 200);
          $elem.data('closing', true);
          event.preventDefault();
        } else {
          $elem.data('closing', false);
        }
      });

      $elem.on('select2:open', event => {
        debugger;
        $('.select2-container--open:not(.select2)').addClass('select2-container--visible');
      });
      */
    });

  },

  /**
   * Get options by element
   * @param {Object} element jQuery node
   */
  getOptionsByElement: function(element) {

    var options = element.attr('data-options');

    // No custom options present
    if (typeof options === 'undefined' || options.length === 0) {
      return defaultOptions;
    }

    return $.extend({}, defaultOptions, ObjectUtils.parseJSON(options));
  }
};

