// Generated by CoffeeScript 1.9.2

/*
jQuery Growl
Copyright 2015 Kevin Sylvestre
1.2.7
 */

(function() {
  "use strict";
  var $, Animation, Growl,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = jQuery;

  Animation = (function() {
    function Animation() {}

    Animation.transitions = {
      "webkitTransition": "webkitTransitionEnd",
      "mozTransition": "mozTransitionEnd",
      "oTransition": "oTransitionEnd",
      "transition": "transitionend"
    };

    Animation.transition = function($el) {
      var el, ref, result, type;
      el = $el[0];
      ref = this.transitions;
      for (type in ref) {
        result = ref[type];
        if (el.style[type] != null) {
          return result;
        }
      }
    };

    return Animation;

  })();

  Growl = (function() {
    Growl.settings = {
      namespace: 'growl',
      duration: 3200,
      close: "&#215;",
      location: "default",
      style: "default",
      size: "medium"
    };

    Growl.growl = function(settings) {
      if (settings == null) {
        settings = {};
      }
      this.initialize();
      return new Growl(settings);
    };

    Growl.initialize = function() {
      return $("body:not(:has(#growls))").append('<div id="growls" />');
    };

    function Growl(settings) {
      if (settings == null) {
        settings = {};
      }
      this.html = bind(this.html, this);
      this.$growl = bind(this.$growl, this);
      this.$growls = bind(this.$growls, this);
      this.animate = bind(this.animate, this);
      this.remove = bind(this.remove, this);
      this.dismiss = bind(this.dismiss, this);
      this.present = bind(this.present, this);
      this.cycle = bind(this.cycle, this);
      this.close = bind(this.close, this);
      this.unbind = bind(this.unbind, this);
      this.bind = bind(this.bind, this);
      this.render = bind(this.render, this);
      this.settings = $.extend({}, Growl.settings, settings);
      this.$growls().attr('class', this.settings.location);
      this.render();
    }

    Growl.prototype.render = function() {
      var $growl;
      $growl = this.$growl();
      this.$growls().append($growl);
      if (this.settings['static'] != null) {
        if (typeof console !== "undefined" && console !== null) {
          if (typeof console.debug === "function") {
            console.debug('jquery.growl DEPRECATION: "static" has been renamed to "fixed" and will be removed in the next release');
          }
        }
        this.settings['fixed'] = this.settings['static'];
      }
      if (this.settings.fixed) {
        this.present();
      } else {
        this.cycle();
      }
    };

    Growl.prototype.bind = function($growl) {
      if ($growl == null) {
        $growl = this.$growl();
      }
      return $growl.on("contextmenu", this.close).find("." + this.settings.namespace + "-close").on("click", this.close);
    };

    Growl.prototype.unbind = function($growl) {
      if ($growl == null) {
        $growl = this.$growl();
      }
      return $growl.off("contextmenu", this.close).find("." + this.settings.namespace + "-close").off("click", this.close);
    };

    Growl.prototype.close = function(event) {
      var $growl;
      event.preventDefault();
      event.stopPropagation();
      $growl = this.$growl();
      return $growl.stop().queue(this.dismiss).queue(this.remove);
    };

    Growl.prototype.cycle = function() {
      var $growl;
      $growl = this.$growl();
      return $growl.queue(this.present).delay(this.settings.duration).queue(this.dismiss).queue(this.remove);
    };

    Growl.prototype.present = function(callback) {
      var $growl;
      $growl = this.$growl();
      this.bind($growl);
      return this.animate($growl, this.settings.namespace + "-incoming", 'out', callback);
    };

    Growl.prototype.dismiss = function(callback) {
      var $growl;
      $growl = this.$growl();
      this.unbind($growl);
      return this.animate($growl, this.settings.namespace + "-outgoing", 'in', callback);
    };

    Growl.prototype.remove = function(callback) {
      this.$growl().remove();
      return callback();
    };

    Growl.prototype.animate = function($element, name, direction, callback) {
      var transition;
      if (direction == null) {
        direction = 'in';
      }
      transition = Animation.transition($element);
      $element[direction === 'in' ? 'removeClass' : 'addClass'](name);
      $element.offset().position;
      $element[direction === 'in' ? 'addClass' : 'removeClass'](name);
      if (callback == null) {
        return;
      }
      if (transition != null) {
        $element.one(transition, callback);
      } else {
        callback();
      }
    };

    Growl.prototype.$growls = function() {
      return this.$_growls != null ? this.$_growls : this.$_growls = $('#growls');
    };

    Growl.prototype.$growl = function() {
      return this.$_growl != null ? this.$_growl : this.$_growl = $(this.html());
    };

    Growl.prototype.html = function() {
      return "<div class='" + this.settings.namespace + " " + this.settings.namespace + "-" + this.settings.style + " " + this.settings.namespace + "-" + this.settings.size + "'>\n  <div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div>\n  <div class='" + this.settings.namespace + "-title'>" + this.settings.title + "</div>\n  <div class='" + this.settings.namespace + "-message'>" + this.settings.message + "</div>\n</div>";
    };

    return Growl;

  })();

  $.growl = function(options) {
    if (options == null) {
      options = {};
    }
    return Growl.growl(options);
  };

  $.growl.error = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Error!",
      style: "error"
    };
    return $.growl($.extend(settings, options));
  };

  $.growl.notice = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Notice!",
      style: "notice"
    };
    return $.growl($.extend(settings, options));
  };

  $.growl.warning = function(options) {
    var settings;
    if (options == null) {
      options = {};
    }
    settings = {
      title: "Warning!",
      style: "warning"
    };
    return $.growl($.extend(settings, options));
  };

}).call(this);

/*
 *  jquery-loading - v1.0.3
 *  Easily add and manipulate loading states of any element on the page
 *  http://github.com/CarlosBonetti/jquery-loading
 *
 *  Made by Carlos Bonetti
 *  Under MIT License
 */
;(function($, window, undefined) {

  var Loading = function(element, options) {
    this.element = element;
    this.settings = $.extend({}, Loading.defaults, options);
    this.settings.fullPage = this.element.is('body');

    this.init();

    if (this.settings.start) {
      this.start();
    }
  };

  Loading.defaults = {

    /**
     * jQuery element to be used as overlay
     * If not defined, a default overlay will be created
     */
    overlay: undefined,

    /**
     * Message to be rendered on the overlay content
     * Has no effect if a custom overlay is defined
     */
    message: 'Loading...',

    /**
     * Theme to be applied on the loading element
     *
     * Some default themes are implemented on `jquery.loading.css`, but you can
     *  define your own. Just add a `.loading-theme-my_awesome_theme` selector
     *  somewhere with your custom styles and change this option
     *  to 'my_awesome_theme'. The class is applied to the parent overlay div
     * Has no effect if a custom overlay is defined
     */
    theme: 'light',

    /**
     * Set to true to stop the loading state if the overlay is clicked
     * This options does NOT override the onClick event
     */
    stoppable: false,

    /**
     * Set to false to not start the loading state when initialized
     */
    start: true,

    /**
     * Function to be executed when the loading state is started
     * Receives the loading object as parameter
     */
    onStart: function(loading) {
      loading.overlay.fadeIn(150);
    },

    /**
     * Function to be executed when the loading state is stopped
     * Receives the loading object as parameter
     */
    onStop: function(loading) {
      loading.overlay.fadeOut(150);
    },

    /**
     * Function to be executed when the overlay is clicked
     * Receives the loading object as parameter
     */
    onClick: function() {}
  };

  /**
   * Extend the Loading plugin default settings with the user options
   */
  Loading.setDefaults = function(options) {
    Loading.defaults = $.extend({}, Loading.defaults, options);
  };

  $.extend(Loading.prototype, {

    /**
     * Initializes the overlay and attach handlers to the appropriate events
     */
    init: function() {
      this.isActive = false;
      this.overlay = this.settings.overlay || this.createOverlay();
      this.resize();
      this.attachMethodsToExternalEvents();
      this.attachOptionsHandlers();
    },

    /**
     * Return a new default overlay (jQuery object)
     */
    createOverlay: function() {
      var overlay = $('<div class="loading-overlay loading-theme-' + this.settings.theme + '"><div class="loading-overlay-content">' + this.settings.message + '</div></div>')
        .hide()
        .appendTo('body');

      var elementID = this.element.attr('id');
      if (elementID) {
        overlay.attr('id', elementID + '_loading-overlay');
      }

      return overlay;
    },

    /**
     * Attach some methods to external events
     * e.g. overlay click, window resize etc
     */
    attachMethodsToExternalEvents: function() {
      var self = this;

      // Stop loading if the `stoppable` option is set
      if (self.settings.stoppable) {
        self.overlay.on('click', function() {
          self.stop();
        });
      }

      // Trigger the `loading.click` event if the overlay is clicked
      self.overlay.on('click', function() {
        self.element.trigger('loading.click', self);
      });

      // Bind the `resize` method to `window.resize`
      $(window).on('resize', function() {
        self.resize();
      });

      // Bind the `resize` method to `document.ready` to guarantee right
      // positioning and dimensions
      $(document).on('ready', function() {
        self.resize();
      });
    },

    /**
     * Attach the handlers defined on `options` for the respective events
     */
    attachOptionsHandlers: function() {
      var self = this;

      self.element.on('loading.start', function(event, loading) {
        self.settings.onStart(loading);
      });

      self.element.on('loading.stop', function(event, loading) {
        self.settings.onStop(loading);
      });

      self.element.on('loading.click', function(event, loading) {
        self.settings.onClick(loading);
      });
    },

    /**
     * Reposition the overlay on the top of the target element
     * This method needs to be called if the target element changes position
     *  or dimension
     */
    resize: function() {
      var self = this;

      var element = self.element,
          totalWidth = element.outerWidth(),
          totalHeight = element.outerHeight();

      if (this.settings.fullPage) {
        totalHeight = '100%';
        totalWidth = '100%';
      }

      this.overlay.css({
        position: self.settings.fullPage ? 'fixed' : 'absolute',
        zIndex: 9 + self.settings.fullPage,
        top: element.offset().top,
        left: element.offset().left,
        width: totalWidth,
        height: totalHeight
      });
    },

    /**
     * Trigger the `loading.start` event and turn on the loading state
     */
    start: function() {
      this.isActive = true;
      this.element.trigger('loading.start', this);
    },

    /**
     * Trigger the `loading.stop` event and turn off the loading state
     */
    stop: function() {
      this.isActive = false;
      this.element.trigger('loading.stop', this);
    },

    /**
     * Check whether the loading state is active or not
     */
    active: function() {
      return this.isActive;
    },

    /**
     * Toggle the state of the loading overlay
     */
    toggle: function() {
      if (this.active()) {
        this.stop();
      } else {
        this.start();
      }
    }
  });

  /**
   * Name of the data attribute where the plugin object will be stored
   */
  var dataAttr = 'jquery-loading';

  /**
   * Create the `loading` jQuery chainable method
   */
  $.fn.loading = function (options) {
    // Get the other arguments if the plugin was called
    //  as e.g. `$(...).loading('method', arg1, arg2, ...)`
    var otherArgs = (arguments.length > 1) ? Array.prototype.slice.call(arguments, 1) : [];

    return this.each(function() {
      var loading = $.data(this, dataAttr);

      if (!loading) { // First call
        $.data(this, dataAttr, (loading = new Loading($(this), options)));
      } else { // Already initialized
        if (typeof options === 'string') {
          loading[options].apply(loading, otherArgs);
        } else {
          loading.start();
        }
      }
    });
  };

  /**
   * Return the loading object associated to the element
   * This method is interesting if you need the plugin object to access the
   * internal API
   */
  $.fn.Loading = function() {
    return $(this).data(dataAttr);
  };

  /**
   * Create the `:loading` jQuery selector
   * Return all the jQuery elements with the loading state active
   *
   * Using the `:not(:loading)` will return all jQuery elements that are not
   *  loading, event the ones with the plugin not attached.
   *
   * Examples of use:
   *  `$(':loading')` to get all the elements with the loading state active
   *  `$('#my-element').is(':loading')` to check if the element is loading
   */
  $.expr[':'].loading = function(element) {
    var loadingObj = $.data(element, dataAttr);

    if (!loadingObj) {
      return false;
    }

    return loadingObj.active();
  };

  $.Loading = Loading;

})(jQuery, window);

$(function() {

  var addDivs = function(n) {
    var arr = [];
    for (i = 1; i <= n; i++) {
      arr.push('<div></div>');
    }
    return arr;
  };

  $('.loader-inner.ball-pulse').html(addDivs(3));
  $('.loader-inner.ball-grid-pulse').html(addDivs(9));
  $('.loader-inner.ball-clip-rotate').html(addDivs(1));
  $('.loader-inner.ball-clip-rotate-pulse').html(addDivs(2));
  $('.loader-inner.square-spin').html(addDivs(1));
  $('.loader-inner.ball-clip-rotate-multiple').html(addDivs(2));
  $('.loader-inner.ball-pulse-rise').html(addDivs(5));
  $('.loader-inner.ball-rotate').html(addDivs(1));
  $('.loader-inner.cube-transition').html(addDivs(2));
  $('.loader-inner.ball-zig-zag').html(addDivs(2));
  $('.loader-inner.ball-zig-zag-deflect').html(addDivs(2));
  $('.loader-inner.ball-triangle-path').html(addDivs(3));
  $('.loader-inner.ball-scale').html(addDivs(1));
  $('.loader-inner.line-scale').html(addDivs(5));
  $('.loader-inner.line-scale-party').html(addDivs(4));
  $('.loader-inner.ball-scale-multiple').html(addDivs(3));
  $('.loader-inner.ball-pulse-sync').html(addDivs(3));
  $('.loader-inner.ball-beat').html(addDivs(3));
  $('.loader-inner.line-scale-pulse-out').html(addDivs(5));
  $('.loader-inner.line-scale-pulse-out-rapid').html(addDivs(5));
  $('.loader-inner.ball-scale-ripple').html(addDivs(1));
  $('.loader-inner.ball-scale-ripple-multiple').html(addDivs(3));
  $('.loader-inner.ball-spin-fade-loader').html(addDivs(8));
  $('.loader-inner.line-spin-fade-loader').html(addDivs(8));
  $('.loader-inner.triangle-skew-spin').html(addDivs(1));
  $('.loader-inner.pacman').html(addDivs(5));
  $('.loader-inner.ball-grid-beat').html(addDivs(9));
  $('.loader-inner.semi-circle-spin').html(addDivs(1));

});

(function () {
    "use strict";
    var Ajaxui = function () {

        var settings = {
            formClass: 'xhr-form',
            loaderClass: 'single-circle-spin',
            overlayLoadingColor: '#bfbdbb',
            enableNotifications: true,
            enableUpdates: true,
            enableActions: true
        };

        var actionCallbacks = {};

        this.settings = function(options){

            settings.formClass = options.formClass ? options.formClass : settings.formClass;
            settings.loaderClass = options.loaderClass ? options.loaderClass : settings.loaderClass;
            settings.overlayLoadingColor = options.overlayLoadingColor ? options.overlayLoadingColor : settings.overlayLoadingColor;
        };

        this.actionCallbacks = function(callbacks){

        };

        this.startService = function () {

            $('body').prepend('<div class="loading-overlay" style="background-color: '+settings.overlayLoadingColor+'"><div class="loader-wrap"><div class="loader-inner '+settings.loaderClass+'"></div></div></div>');

            return $('.'+settings.formClass).on('submit', function (event) {

                $('body').loading({
                    overlay: $(".loading-overlay")
                });

                $.ajax({
                    url: $(this).attr('action'),
                    type: $(this).attr('method'),
                    data: $(this).serialize(),

                    success: function (response) {
                        processResponse(response);
                    },
                    error: function (response) {
                        processResponse(response);
                    },
                    complete: function () {
                        $('body').loading('stop');
                    }
                });

                return false;
            });
        };
    };

    function processResponse(response) {

        var notifications = response.notifications;
        var updates = response.updates;
        var actions = response.actions;

        if (notifications !== undefined) {
            processNotifications(notifications);
        }
        if (updates !== undefined) {
            processUpdates(updates);
        }
        if (actions !== undefined) {
            processActions(actions);
        }
    }

    function processNotifications(notifications) {

        var duration = 5000;

        $.each(notifications, function (index, notification) {

            var type = notification.type;

            if (type === 'info') {
                type = 'default';
            }
            else if (type === 'success') {
                type = 'notice';
            }
            else if (type === 'danger') {
                type = 'error';
            }

            $.growl({
                style: type,
                fixed: notification.fixed,
                title: notification.title,
                message: notification.message,
                duration: duration
            });
        });
    }

    function processUpdates(updates) {

        $.each(updates, function (index, update) {

            var form_id = update.form_id;
            var fields = update.fields;

            $.each(fields, function (field, value) {

                if (form_id === 'none') {
                    $('#' + field + '').val(value);
                }
                else {
                    $('#' + form_id + '').find('[name="' + field + '"]').val(value);
                }
            });
        });
    }

    function processActions(actions) {

    }

    if (!window.Ajaxui) {
        window.Ajaxui = Ajaxui;
    }

})();