/*  areRectanglesCollidedWithRectangle
        ** ----------------------------------
        **  dictA == { '<rect key>':{x:*, y:*, w:*, h:*},...}
        **  dictA[for key In Dict] used to access {x:*, y:*, w:*, h:*}
        **
        ** posB = {x:*, y:*, w:*, h:*}
        **
        ** listOfAllowedDictAKey is an array of rect keys that are allowed to collide
        */
function areRectanglesCollidedWithRectangle(dictA,posB,listOfAllowedDictAKey){
    let collidedKeys = [];
    let isCollided = false;
    for(const keyA in dictA){
        if(!listOfAllowedDictAKey.includes(keyA)){ // check if key is allowed to collide
            if(this.isRectangleACollidedWithRectangleB(posB, dictA[keyA])){
                collidedKeys.push(keyA);
                isCollided = true;
            }
        }
    }
    // console.log(isCollided)
    return { isCollided: isCollided, collidedKeys:collidedKeys };
};
/*  isRectangleACollidedWithRectangleB
**  check if rectA is inside rectB
** ----------------------------------
**  pos* = {x:*, y:*, w:*, h:*}
*
*/
function isRectangleACollidedWithRectangleB(posA,posB){
    if( (posA.x+posA.w -1) >= posB.x &&
        posA.x <= (posB.x + posB.w -1) &&
        (posA.y+posA.h -1) >= posB.y &&
        posA.y <= (posB.y + posB.h -1)
    ) return true;
    return false;
};

export {
    areRectanglesCollidedWithRectangle,
    isRectangleACollidedWithRectangleB
}




// <!--
// ///////////////////////////////////////////////////////////////////////////////////////////////////
// ///                             GRID SANITY CHECK                                               ///
// ///////////////////////////////////////////////////////////////////////////////////////////////////
//
// ROW (y)|COl (x)
// -→
// |   0----------0----------0----------0----------0----------0
// ↓   |          |
// |    1x1y  |
// |          |
// |          |
// 0----------0----------0----------0----------0----------0
// |          |
// |   1x2y   |
// |          |
// |          |
// 0----------0----------0----------0----------0----------0
// |          |          |
// |          |          |
// |          |          |
// |          |          |
// 0----------0----------0----------0----------0----------0
//
// -->

