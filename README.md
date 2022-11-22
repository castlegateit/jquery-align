# Align

**Support for flexbox in all major browsers means that this plugin is now obsolete. Please use [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) instead.**

---

A jQuery plugin to make child elements that are arranged in rows the same height, so they line up in a nice, uniform grid. Works with responsive designs, even when the number of elements in each "row" changes via media queries. For example, the following will align rows of elements that are children of `<div class="foo"></div>`:

~~~ javascript
$('.foo').align();
~~~

By default, the elements to be lined up must be sibling elements in the DOM and must have the same top offset (i.e. be the same distance from the top of the page) to be considered part of the same row. You can use a different jQuery selector to find elements within the parent element. For example, the following will only align elements with the `bar` class:

~~~ javascript
$('.foo').align({
    selector: '> .bar'
});
~~~

You can also choose to align elements along their bottom edges instead of along their top edges (i.e. top offset + height instead of just top offset):

~~~ javascript
$('.foo').align({
    bottom: true
});
~~~

You can reset the aligned elements to their original state:

~~~ javascript
$('.foo').align('reset');
~~~

If you have some change to the aligned elements, including adding or removing elements, you can re-align them:

~~~ javascript
$('.foo').align('update');
~~~

## Install

Install with npm:

    npm install --save-dev @castlegate/jquery-align

## Changes since version 2.0

In previous versions of the plugin, `align()` was applied to the sibling elements to be aligned. Since version 2.0, `align()` is applied to the parent element and the `selector` option can be used to refine the collection of sibling elements to align.

## License

Released under the [MIT License](https://opensource.org/licenses/MIT). See [LICENSE](LICENSE) for details.
