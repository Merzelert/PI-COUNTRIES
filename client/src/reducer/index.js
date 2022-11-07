const initialState = { //estados iniciales
    countries: [],
    detail:[],
    allCountries: [], //copia del estado con todos los paises para tenerlo de reserva durante los filtrados
    activities: [],
    allActivities: []
}
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case 'GET_NAME_COUNTRY':
            return {
                ...state,
                countries: action.payload
            }

        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const continentFilter = action.payload === 'todos' ? allCountries : allCountries.filter(e => e.continente === action.payload)
            return {
                ...state,
                countries: continentFilter
            }

        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload,
            }

        case 'POST_ACTIVITY':
            return {
                ...state,
            }

        case 'FILTER_BY_CREATED':
            const allCountriesActivities = state.countries;
            const filteredActivities = action.payload === "todas" ? allCountriesActivities.filter((e) => e.activities[0]?.nombre ? e.activities[0] : false) :
                allCountriesActivities.filter((e) => e.activities.some(({ nombre }) => nombre === action.payload))
            return {
                ...state,
                countries: filteredActivities
            }

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                        return 1;
                    }
                    if (b.nombre > a.nombre) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                        return -1;
                    }
                    if(b.nombre > a.nombre){
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sortedArr
            }

            case 'ORDER_POPULATION':
            let sortedArrP = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.poblacion > b.poblacion) {
                        return 1;
                    }
                    if (b.poblacion > a.poblacion) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.poblacion > b.poblacion) {
                        return -1;
                    }
                    if(b.poblacion > a.poblacion){
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sortedArrP
            }

            case 'GET_DETAIL':
                return {
                    ...state,
                    detail: action.payload
                }
                
        default:
            return state
    }
}

export default reducer;