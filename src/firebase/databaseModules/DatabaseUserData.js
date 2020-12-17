import {QueryBase} from "@/firebase/databaseModules/queryBase";


export class DatabaseUserData extends QueryBase {
    constructor(database,DatabaseUser){
        super();
        this.DatabaseUser   = DatabaseUser;
        this.pathDashboard  = 'dashboard';
        this.pathStuffspace = 'stuffspace';



    }





}