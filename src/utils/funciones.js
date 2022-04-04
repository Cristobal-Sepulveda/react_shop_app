import NetInfo from "@react-native-community/netinfo";


//Esta funcion retorna el tipo de conexion y, si es "cellular", la calidad de señal. Si es wifi, la calidad vuelve como undefined...
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