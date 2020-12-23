export function createDashboard({stuffspaceID, containerID, meta, gridData}){
    return{
        'stuffspaceID':stuffspaceID,
        'containerID':containerID,
        'gridData':gridData,
        'meta':meta
    }
}