# jQuery Uniformify #

A jQuery plugin to make sibling elements that are arranged in rows the same height, so they line up in a nice, uniform grid. Works with responsive designs, even when the number of elements in each "row" changes via media queries.

    $('.foo').uniformify();

The elements to be lined up must be sibling elements in the DOM and must have the same top offset (i.e. be the same distance from the top of the page) to be considered part of the same row. By default, the elements will be re-aligned on page load and 100&nbsp;ms after each window resize. You can change this interval by setting the `timeout` option:

    $('.foo').uniformify({
        timeout: 50
    });

In the above example, the elements will be re-aligned 50&nbsp;ms after the window has been resized.
