/**
 * Created by usucuha on 3/13/14.
 */

var GenerateSubsector = (function () {
    "use strict";

// private members
    var width = 60;
    var height = 52;
    var quarterSize = width * 0.25
    var halfSize = height * 0.5

// private functions
    function drawHexAt(draw, x, y) {
        var topY = y * height
        var bottomY = (y + 1) * height
        var leftX = x * width
        var rightX = (x + 1) * width

        var xOffset = quarterSize * x
        var yOffset = 0
        if (x % 2) {
            yOffset = halfSize
        }

        draw.polygon([
            [leftX + quarterSize - xOffset, topY + yOffset],
            [rightX - quarterSize - xOffset, topY + yOffset],
            [rightX - xOffset, topY + halfSize + yOffset],
            [rightX - quarterSize - xOffset, bottomY + yOffset],
            [leftX + quarterSize - xOffset, bottomY + yOffset],
            [leftX - xOffset, topY + halfSize + yOffset]
        ]).stroke( {color: 'white', width: '2'})
    }

// constructor
    function GenerateSubsector() {
        this.privateVariable = "privateVariable";
    }

// public functions
    GenerateSubsector.prototype.generateNew = function (rootId) {
        var draw = SVG('subsector-map').size(width * 8.5, height * 10.5)
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 10; y++) {
                drawHexAt(draw, x, y)
            }
        }
    }

    return GenerateSubsector;
})();

function generateNew() {
    var generateSubsector = new GenerateSubsector();
    return  generateSubsector.generateNew("subsector-map");
}