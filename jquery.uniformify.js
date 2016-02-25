/**
 * jQuery Uniformify v1.0
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

    // Resize timer
    var resizeDone;

    // Identify rows of adjacent elements and make all the elements in each row
    // the same height as the tallest element in that row.
    var uniformify = function(collection) {
        var done = [];

        collection.each(function(i, element) {
            var box = $(element);
            var max = 0;

            // Assemble collection of elements in the same row
            var boxes = box.add(box.siblings().filter(function() {
                return box.offset().top === $(this).offset().top;
            }));

            // If element already resized, do nothing
            if ($.inArray(element, done) !== -1) {
                return;
            }

            // Set each element in row to its natural height and find the
            // tallest element in that row.
            boxes.each(function(i, domBox) {
                var box = $(domBox);
                var height;

                box.height('auto');
                height = box.height();

                if (height > max) {
                    max = height;
                }

                done.push(domBox);
            });

            // If no other elements in row, do nothing
            if (boxes.length === 1) {
                return;
            }

            // Set all elements to same height as tallest elements
            boxes.each(function(i, domBox) {
                $(domBox).height(max);
            });
        });
    };

    // Add method to jQuery
    $.fn.uniformify = function(options) {
        var object = this;
        var settings = $.extend({
            timeout: 100,
        });

        // If there are less than two elements, do nothing
        if (object.length < 2) {
            return object;
        }

        // Trigger resize complete event when finished resizing
        $(window).on('resize', function() {
            clearTimeout(resizeDone);

            resizeDone = setTimeout(function() {
                $(window).trigger('resizeDone');
            }, settings.timeout);
        });

        // Resize elements on load and resize complete
        $(window).on('load resizeDone', function() {
            uniformify(object);
        });

        return object;
    };
})(jQuery);
