/**
 * jQuery Uniformify v2.2
 * http://github.com/castlegateit/jquery-uniformify
 *
 * Copyright (c) 2016 Castlegate IT
 * http://www.castlegateit.co.uk/
 *
 * Released under the MIT License
 * http://www.opensource.org/licenses/MIT
 */
;(function($) {
    'use strict';

    // Name and default settings
    var pluginName = 'uniformify';
    var resizeName = pluginName + 'ResizeDone';
    var defaults = {
        selector: '> *'
    };

    // Resize timer
    var resizeTimer;

    // Map commands to methods
    var commands = {
        update: 'update',
        reset: 'reset'
    };

    // Constructor
    var Plugin = function(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        // Initialization
        this.init();
    };

    // Initialization
    Plugin.prototype.init = function() {
        var _this = this;

        this.select();

        // Align boxes when the complete page has loaded and when the window has
        // finished resizing. It's no good trying to align everything on
        // document ready because you might still be waiting for CSS that will
        // affect the height of the boxes.
        $(window).on('load ' + resizeName, function() {
            _this.align();
        });

        // Attempt to align the boxes immediately as well, in case we are
        // running on window load instead of on DOM content ready.
        _this.align();
    };

    // Select boxes to align
    Plugin.prototype.select = function() {
        this.boxes = $(this.element).find(this.settings.selector);
        this.save();
    };

    // Save initial styles
    Plugin.prototype.save = function() {
        this.boxes.each(function(i, boxElement) {
            var box = $(boxElement);

            if (box.attr('style') && !box.data('style')) {
                box.data('style', box.attr('style'));
            }
        });
    };

    // Reset boxes to their initial styles
    Plugin.prototype.reset = function() {
        this.naturalize();
        this.boxes.each(function(i, boxElement) {
            var box = $(boxElement);

            // Restore original style attribute
            if (box.data('style')) {
                return box.attr('style', box.data('style'));
            }

            // Remove style attribute added by this plugin
            box.removeAttr('style');
        });
    };

    // Set all boxes to their natural height
    Plugin.prototype.naturalize = function() {
        this.boxes.each(function(i, boxElement) {
            $(boxElement).height('auto');
        });
    };

    // Align boxes
    Plugin.prototype.align = function() {
        var boxes = this.boxes;
        var done = [];

        // Reset box heights
        this.naturalize();

        boxes.each(function(i, boxElement) {
            var box = $(boxElement);
            var max = 0;

            // Assemble collection of elements in the same row
            var row = box.add(boxes.not(box).filter(function() {
                return box.offset().top === $(this).offset().top;
            }));

            // If only box in row or already resized, do nothing
            if (row.length === 1 || $.inArray(boxElement, done) !== -1) {
                return;
            }

            // Find the tallest element in the row
            row.each(function(i, siblingElement) {
                var sibling = $(siblingElement);
                var height = sibling.outerHeight();

                if (height > max) {
                    max = height;
                }

                // We are finished with this element, so don't check it again
                done.push(siblingElement);
            });

            // Set all elements to same height as tallest element in row
            row.each(function(i, siblingElement) {
                return $(siblingElement).outerHeight(max);
            });
        });
    };

    // Update selection and re-align all boxes
    Plugin.prototype.update = function() {
        this.select();
        this.align();
    };

    // Add method to jQuery
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            var instance = $.data(this, pluginName);

            // Named commands
            if (typeof options === 'string') {
                if (
                    typeof instance === 'undefined' ||
                    typeof commands[options] === 'undefined'
                ) {
                    return false;
                }

                return instance[commands[options]]();
            }

            // Create instance
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };

    // Trigger window resize complete event
    $(window).on('resize', function() {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(function() {
            $(window).trigger(resizeName);
        }, 50);
    });
})(jQuery);
