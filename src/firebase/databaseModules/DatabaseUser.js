import {database} from "@/firebase/firebase";
import {QueryBase} from "@/firebase/databaseModules/queryBase";

export class DatabaseUser extends QueryBase{
    constructor(database){
        super();
        this.database = database;
        this.path = 'users';

        this.UID = '';
        this.username = '';
        this.dashboardID = [];
        this.nextDashboardID = 0;
    }


    qUsername = {
        get: ()=>{ return this.qGetOnce(`/${this.path}/${this.UID}`,'username') },
        set: (val)=>{ this.qSet(`/${this.path}/${this.UID}`,'username',val) }
    }

    qDashboardID = {
        get: ()=>{ return this.qGetOnce(`/${this.path}/${this.UID}`,'dashboardID') },
        set: (val)=>{ this.qSet(`/${this.path}/${this.UID}`,'dashboardID',val) }
    }

    qNextDashboardID = {
        get: ()=>{ return this.qGetOnce(`/${this.path}/${this.UID}`,'nextDashboardID') },
        set: (val)=>{ this.qSet(`/${this.path}/${this.UID}`,'nextDashboardID',val) }
    }

    getUID(){ return this.UID; }
    setUID(val){ this.UID = val; }

    loadData(){
        this.username = this.qUsername.get();
        this.dashboardID = this.qDashboardID.get();
        this.nextDashboardID = this.qNextDashboardID.get();
    }

    doesUserWithUIDExist(uid){
        return new Promise((resolve, reject) => {
            this.qGetOnce(`/${this.path}`,uid).then(a => {
                resolve(a !== null )
            }).catch(()=>{
                reject(false);
            })
        })
    }
}


