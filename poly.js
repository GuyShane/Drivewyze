class Dot {
    constructor(color){
        this.color=color;
    }
}

/**
 * This class represents a triangular connection between
 * three dots.
 */
class Tri {
    /**
     * Initializes the triangle, and ensures the passed value is usable.
     * @param {number[]} dots - The list of dots belonging to the triangle. The numbers passed
     *                          represent the index of the dot in a list.
     */
    constructor(dots){
        if (!Array.isArray(dots) || dots.length!==3){
            throw new TypeError('Dots needs to be an array of length 3');
        }
        else if (this.hasDup(dots)){
            throw new TypeError('A triangle must be made of three different vertices');
        }
        this.dots=dots;
    }

    /**
     * @param {number[]} arr - An array of numbers
     * @return {boolean} Whether or not the array contains duplicate numbers
     */
    hasDup(arr){
        return arr.length!==Array.from(new Set(arr)).length;
    }
}

/**
 * A class representing a polygon made up of dots with connections between them.
 */
class Poly {
    /**
     * Initalizes the polygon with a list of colored dots and the triangular connections
     * between them. Ensures the connections all reference valid dots.
     * @param {number[]} colors - A list of colors to be assigned to the dots. Can be one of
     *                            blank, red, blue, or yellow.
     * @param {number[][]} connections - A list of connections between the dots in the polygon.
     *                                   Each connection is a list of three indices. As such, they
     *                                   should be in the range 0 - dots.length-1
     */
    constructor(colors, connections){
        var self=this;

        this.dots=[];
        this.tris=[];
        colors.forEach((c)=>{
            self.dots.push(new Dot(c));
        });
        connections.forEach((conn)=>{
            if (this.testArray(conn, this.dots.length, (num, val)=>{return val>=num;}) ||
                this.testArray(conn, 0, (num, val)=>{return val<num;})){
                throw new TypeError(`Connection values must be in the range 0-${this.dots.length-1}`);
            }
            self.tris.push(new Tri(conn));
        });
    }

    /**
     * The possible colors for dots in the polygon
     */
    static get colors() {
        return {
            blank: 0,
            red: 1,
            blue: 2,
            yellow: 4
        };
    }

    /**
     * Assigns colors to dots in the polygon.
     * @param {object} colors - An object specifying which dots to color,
     *                          and what colors to use.
     * @example
     * poly.assign({1: Poly.blue, 5: Poly.red});
     */
    assign(colors){
        Object.keys(colors).forEach((idx)=>{
            this.dots[idx].color=colors[idx];
        });
    }

    /**
     * @return {number} The number of complete triangles in the polygon.
     */
    numComplete(){
        var num=0;
        for (var i=0; i<this.tris.length; i++){
            if (this.complete(this.tris[i])){
                num+=1;
            }
        }
        return num;
    }

    /**
     * Checks if a given triangle is complete. This happens when all three of
     * its vertices are different colors. Since the possible colors are powers of 2,
     * a complete triangle will have the property v1|v2|v3=7.
     * @param {number[]} tri - The triangle to check for completeness
     * @return {boolean} Whether or not the triangle is complete
     */
    complete(tri){
        var self=this;
        return tri.dots.reduce((accum, dot)=>{return accum|self.dots[dot].color;}, 0)===7;
    }

    /**
     * An array reduction test to see if any values satisfy a given criteria.
     * @param {number[]} arr - The array of numbers to be tested
     * @param {number} num - The number to be tested against
     * @param {function} op - The operation to be tested for
     * @example <caption>Checks if the array has any negative numbers</caption>
     * // returns true
     * poly.testArray([1, 5, -2, 7], 0, (num, val)=>{return val<num;});
     * @return {boolean} Whether or not the condition is true for any of the values in the array
     */
    testArray(arr, num, op){
        return arr.reduce((accum, val)=>{return accum|op(num, val);}, false);
    }
}
