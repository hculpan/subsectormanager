/**
 * Created by harry on 2/9/14.
 */

/**
 * This takes an array of maps
 * The only requirement is that this
 * map have a member, range, or  min/max
 * members.  If it doesn't have min/max,
 * this will be added to mpa upon insert
 * into the WeightedTable.
 *
 * The lowest range or min value will determine
 * the minimum for the roll, and the
 * highest range or max value will
 * determine the max for roll
 *
 * Example:
 * [ { range: "01-03", text: "item 1" },
 *   { range: "04-06", text: "item 2  } ]
 *
 * So the min/max for this table is 1 and 6,
 * respectively.
 */
var WeightedTable = (function() {
    "use strict";

    var _name;
    var _sides;
    var _offset;
    var _items;

    // constructor
    function WeightedTable(tableArray){
        var globalMin = undefined
        var globalMax = undefined
        for (var i = 0; i < tableArray.length; i++) {
            var itemMap = tableArray[i]
            var itemMin = undefined
            var itemMax = undefined
            if ("min" in itemMap) {
                itemMin = itemMap["min"]
            }
            if ("max" in itemMap) {
                itemMax = itemMap["max"]
            }
            if ((itemMin == undefined || itemMax == undefined) && "range" in itemMap) {
                var pos = itemMap["range"].indexOf("-");
                if (pos >= 0) {
                    itemMin = parseInt(itemMap["range"].substr(0, pos))
                    itemMax = parseInt(itemMap["range"].substr(pos + 1))
                } else {
                    itemMin = parseInt(itemMap["range"])
                    itemMax = itemMin
                }
                itemMap["min"] = itemMin
                itemMap["max"] = itemMax
            }
            if (itemMin == undefined || itemMax == undefined) {
                throw "min or max undefined"
            } else {
                if (itemMin < globalMin || globalMin == undefined) {
                    globalMin = itemMin
                }
                if (itemMax > globalMax || globalMax == undefined) {
                    globalMax = itemMax
                }
            }
        }

        if (globalMin != undefined) {
            this._offset = globalMin;
        }

        if (globalMax != undefined) {
            this._sides =globalMax;
        }

        this._items = tableArray;
    };

    // add the methods to the prototype so that all of the
    // instances can access the private static
    WeightedTable.prototype.getSides = function() {
        return this._sides;
    };

    WeightedTable.prototype.setSides = function(sides) {
        this._sides = sides;
    };

    WeightedTable.prototype.getName = function() {
        return this._name;
    };

    WeightedTable.prototype.setName = function(name) {
        this._name = name;
    };

    WeightedTable.prototype.getOffset = function() {
        return this._offset;
    };

    WeightedTable.prototype.setOffset = function(offset) {
        this._offset = offset;
    };

    WeightedTable.prototype.addItem = function(itemMap) {
        var itemMin = itemMap['min'];
        var itemMax = itemMap['max'];
        if ((itemMin == undefined || itemMax == undefined) && "range" in itemMap) {
            var pos = itemMap["range"].indexOf("-");
            if (pos >= 0) {
                itemMin = parseInt(itemMap["range"].substr(0, pos))
                itemMax = parseInt(itemMap["range"].substr(pos + 1))
            } else {
                itemMin = parseInt(itemMap["range"])
                itemMax = itemMin
            }
            itemMap["min"] = itemMin
            itemMap["max"] = itemMax
        }
        this._items.push(itemMap);
    }

    WeightedTable.prototype.roll = function() {
        return Math.floor((Math.random() * this._sides) + this._offset);
    }

    WeightedTable.prototype.getValue = function() {
        var num = this.roll();
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            if (num >= item['min'] && num <= item['max']) {
                return item;
            }
        }
        return undefined;
    }

    return WeightedTable;
})();

