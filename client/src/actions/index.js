import axios from 'axios';

export function getCountries(){ //aqui es donde sucede toda la conexion entre el front y el back
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/countries');//axios por default nos da un get
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}


export function filterCountriesByContinent(payload){
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function getActivities(){
    return async function (dispatch){
        const respuesta = await axios.get('http://localhost:3001/activities');
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: respuesta.data
        })
    }
}

export function postActivities(payload){
    return async function (dispatch){
        const datos = await axios.post('http://localhost:3001/activities', payload);
        return datos;
    }
}

export function filterActivityCreated(payload){
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}

export function orderPopulation(payload){
    return {
        type: 'ORDER_POPULATION',
        payload
    }
}

export function getNameCountry(nombre) {
    return async function(dispatch){
        try {
            const respuesta = await axios.get('http://localhost:3001/countries?name=' + nombre);
            return dispatch ({
                type: 'GET_NAME_COUNTRY',
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getDetail (id){
    return async function(dispatch){
        try {
            const respuesta = await axios.get('http://localhost:3001/countries/' + id);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error);
        }
    } 
}