import {database} from "@/firebase/firebase";
import {DatabaseUser} from "@/firebase/databaseModules/DatabaseUser";
import {DatabaseUserData} from "@/firebase/databaseModules/DatabaseUserData";

const tstUID = '4HtPwiDl2wVwXSjtXizvXfOLYVD2';

const dbUser = new DatabaseUser(database);



// prepare object
// dbUser.setUID(tstUID);
// dbUser.qNextDashboardID.set(10)
// dbUser.qNextDashboardID.get().then(a=> console.log(a))
// dbUser.qUsername.get().then(a=>console.log(a))


export  {
    dbUser
}






// dbUser.qUsername.set('test name');
// dbUser.qUsername.get().then((a)=>console.log(a))
// dbUser.doesUserWithUIDExist('4HtPwiDl2wVwXSjtXizvXfOLYVD2').then(a=>console.log(a))


//
// var ref = database.ref('/test').set({
//     test:'test'
// })
//
// let current = 0;
//
// function tstWriteDB(){
//     console.log('write',current+1)
//     let ref = database.ref('/test/val').set(current+=1);
// }
//
// function tstReadDB(){
//     // let ref = database.ref('/test');
//     // ref.on('value', (snapshot) =>{
//     //     const data = snapshot.val();
//     //
//     //     console.log("new val ",data.val)
//     // });
//
//     database.ref('/users/4HtPwiDl2wVwXSjtXizvXfOLYVD2/username').once('value').then((snapshot) => {
//         var username = snapshot.val() ;
//         console.log(username);
//     })
//
//     }
// tstReadDB()
// // setInterval(tstWriteDB,10000)