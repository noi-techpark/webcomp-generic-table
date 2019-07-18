import axios from 'axios'
import config from './config'

export function callGet(path, params) {
	console.log("call = " + config.API_BASE_URL + path)
	console.log("call params = ")
	console.log(params)
	return axios.get(config.API_BASE_URL + path, {
		params: params
	}).then(function(response) {
		console.log("call response = ");
		console.log(response.data)
		console.log(response.config)
        return response.data;
    }).catch(function(error) {
        console.log(error)
        throw error
    })
}
