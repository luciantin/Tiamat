
export class UserFactory{
    constructor() {
    }
    createUser(username,dashboardID){
        return {
            'username':username,
            'dashboardID':dashboardID,
            counters:{
                nextDsbID : 0,
                nextStfID : 0,
                nextCntID : 0,
                nextGrpID : 0,
                nextSecID : 0,
                nextItemID: 0,
            }
        }
    }
}