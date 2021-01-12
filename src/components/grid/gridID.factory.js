/////////////////////////////////////////////////////////////////////////////////////////////
////  ID FACTORY
/*  id prefix :

    Container :   <container key>+
    Group :       <container key>+<group key>+
    Item :        <container key>+<group key>+<item key>+
    ----------------------------------------------------------------------------------------------------
    |              |   container                    ||        group                                    |
    ----------------------------------------------------------------------------------------------------
    | Drag         |   drag+<container key>+         ||     drag+<container key>+<group key>+          |
    | Placeholder  |   placeholder+<container key>+  ||     placeholder+<container key>+<group key>+   |
    ----------------------------------------------------------------------------------------------------
    za pronaci parent id samo se treba id.split('+') itd...
 */
function makeDragId(lst){
    // console.trace()
    // console.log(lst)
    return 'drag'+'+'+ wrapId(lst);
};
function makeResizeId(lst){
    return 'rsiz'+'+'+ wrapId(lst);
};
function makePlaceholderId(lst){
    return 'placeholder' + '+' + wrapId(lst);
};
function wrapId(lst){ // make id from a list
    let res = '', e;
    for(e of lst){
        res += e + '+';
    }
    return res
};
function unwrapId(id){ // splits the id
    return id.split('+');
};
// makeContentClassByType(tskType){ // TODO, used later
//   return 'dashboardTask'+'-'+tskType;
// },


export {
    makeDragId,
    makePlaceholderId,
    wrapId,
    unwrapId,
    makeResizeId
}