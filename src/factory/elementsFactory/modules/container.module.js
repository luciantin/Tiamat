
export function createContainer({groupID, pos, innerGrid, groupPos, meta}){
    return{
        'groupID':groupID,
        'pos':pos,
        'groupPlaceholderPos':{w:1,h:1,x:1,y:1},
        'innerGrid':innerGrid,
        'groupPos':groupPos,
        'meta':meta
    }
}