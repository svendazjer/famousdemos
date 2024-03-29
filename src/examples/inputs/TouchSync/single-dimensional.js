/**
 * Copyright (c) 2014 Famous Industries, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @license MIT
 */


/**
 * MouseSync
 * ------------
 *
 * Famo.us syncs default to track two-dimensional movement,
 * but can be passed as optional direction parameter to restrict
 * movement to a single axis.
 *
 * In this example, we create a TouchSync but only track the y-axis
 * changes on touchmove.
 *
 */
define(function(require, exports, module) {
    var Engine    = require("famous/core/Engine");
    var TouchSync = require("famous/inputs/TouchSync");
    var Surface   = require("famous/core/Surface");

    var mainContext = Engine.createContext();

    var start = 0;
    var update = 0;
    var end = 0;
    var delta = 0;

    var x = 0;
    var y = 0;
    var position = [x, y];

    var touchSync = new TouchSync({direction : TouchSync.DIRECTION_Y});

    Engine.pipe(touchSync);

    var contentTemplate = function() {
        return "<div>Start Count: " + start + "</div>" +
               "<div>End Count: " + end + "</div>" +
               "<div>Update Count: " + update + "</div>" +
               "<div>Delta: " + delta + "</div>" +
               "<div>Distance from start: " + position + "</div>";
    };

    var surface = new Surface({
        size: [undefined, undefined],
        classes: ["grey-bg"],
        content: contentTemplate()
    });

    touchSync.on("start", function() {
        start++;
        position = [x, y];
        surface.setContent(contentTemplate());
    });

    touchSync.on("update", function(data) {
        update++;
        position[1] = data.position;
        delta = data.delta;
        surface.setContent(contentTemplate());
    });

    touchSync.on("end", function() {
        end++;
        surface.setContent(contentTemplate());
    });

    mainContext.add(surface);
});
