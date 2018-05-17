// Converts a list of numbers in the range 0-2 into an object
// suitable for poly.assign
function toObj(nums) {
    var obj={};
    var colors=[Poly.colors.red, Poly.colors.blue, Poly.colors.yellow];
    for (var i=0; i<nums.length; i++){
        obj[i]=colors[nums[i]];
    }
    return obj;
}

// Recursively generates all possible combinations
// of an array of specified length using values in the range 0-2
function* _colorGen(colors, len){
    if (colors.length===len){
        yield toObj(colors);
    }
    else {
        for (var i=0; i<3; i++){
            var copy=colors.slice();
            copy.push(i);
            yield* _colorGen(copy, len);
        }
    }
}

// Generator for making length 11 color arrays.
// Used to test all color combinations in the polygon
function* colorGen(){
    yield* _colorGen([], 11);
}

// Making a new polygon with the given colors and connections from the question
var poly=new Poly([
    Poly.colors.red,
    Poly.colors.red,
    Poly.colors.yellow,
    Poly.colors.blue,
    Poly.colors.red,
    Poly.colors.yellow,
    Poly.colors.blue,
    Poly.colors.red,
    Poly.colors.red,
    Poly.colors.yellow,
    Poly.colors.blue,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank,
    Poly.colors.blank
], [
    [0, 1, 11],
    [1, 2, 12],
    [2, 3, 13],
    [3, 4, 13],
    [4, 5, 18],
    [5, 6, 21],
    [6, 7, 21],
    [7, 8, 20],
    [8, 9, 19],
    [9, 10, 14],
    [0, 10, 11],
    [1, 11, 12],
    [2, 12, 13],
    [10, 11, 14],
    [11, 12, 14],
    [12, 13, 16],
    [12, 14, 15],
    [12, 15, 16],
    [4, 13, 16],
    [9, 14, 17],
    [14, 15, 17],
    [15, 16, 20],
    [4, 16, 18],
    [9, 17, 19],
    [15, 17, 19],
    [15, 19, 20],
    [16, 20, 21],
    [16, 18, 21],
    [5, 18, 21],
    [8, 19, 20],
    [7, 20, 21]
]);
console.time('Check triangles');
var gen=colorGen();
var test=gen.next();
var possible=false;
// Either test all color combinations, or exit if one
// results in having only two complete triangles
while (!test.done){
    poly.assign(test.value);
    if (poly.numComplete()===2){
        possible=true;
        break;
    }
    test=gen.next();
}
console.timeEnd('Check triangles');

window.onload=()=>{
    var ans=document.getElementById('answer');
    ans.textContent=`It is ${possible?'':'not '}possible to color the polygon such that you only end up with two complete trianlges`;
};
