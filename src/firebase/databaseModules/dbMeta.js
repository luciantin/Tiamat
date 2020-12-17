

const paths = {
    'users' : 'users',
    'username' : 'username',

    'dashboardModifier' : '+dsb+',
    'stuffspaceModifier' : '+stf+',
}



const createUserData = function(username,dashboardIDarray,nextDashboardID){
    return {
        username : username,
        dashboardID: dashboardIDarray,
        nextDashboardID: nextDashboardID,
    }
}


const baseDashboardElement = {
        type:'stuffspace',
        stuffspaceID:1,
        title: 'My Stuff',
        description:' b la bvl alasf la ssd f rg ',
        tags:['myStuff'],
        pos:{w:1,h:2,x:1,y:1},
        elements:[
            {type:'title',attributes:[],content:{},elements:[]}, // self title
            {type:'description',attributes:[],content:{},elements:[]}, // self descr
            {type:'stuffspace',attributes:[],content:{},elements:[]}, // button for itself
        ]
    }


const firstTimeUserData = function (username){
    return{
        user : createUserData(username,[1],2),
        dashboard : createDashboardData(1,baseDashboardElement,'My Dashboard',[1],'light',['testTag']),
        stuffspace: createStuffspaceData(),
    }
}


createDashboardData(
    1,
    baseDashboardElement,
    'My Dashboard',
    [1],
    'light',
    ['testTag']
);

const createStuffspaceData = function (){
    return {
        
    }
}

const createDashboardData = function(dashboardID,elements,title,stuffspaceIDarray,theme,tagsArray){
    return {
        title:title,
        stuffspaceID:stuffspaceIDarray,
        tags:tagsArray,
        theme: theme,
        elements: elements
    }
}

