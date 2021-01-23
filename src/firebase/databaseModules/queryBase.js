export class QueryBase {
    constructor(database) {
        this.database = database;
    }

    qGetOnce(path,key){
        // console.log(path,key)
       return this.database.ref(`${path}/${key}`).once('value').then((snapshot) => { return  snapshot.val() })
    }
    // qGetListen(path,key,boundVar){
    //     // TODO
    // }
    qSet(path,key,val){
        // console.log(`${path}/${key}`,val)
        this.database.ref(`${path}/${key}`).set(val);
    }
}