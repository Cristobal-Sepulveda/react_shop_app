import NetInfo from "@react-native-community/netinfo";



export const obtenerTipoConexion = () => {
    let tipoConexion = ""
    let connectionDetails = ""
    return NetInfo.fetch()
                .then(state =>{
                    tipoConexion = state.type
                    connectionDetails= state.details.cellularGeneration
                    return ({tipoConexion, connectionDetails})
                })                
}