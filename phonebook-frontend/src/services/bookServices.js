import axios from 'axios'

const defaultURL = '/api/persons'

function getAll() {
    const request = axios.get(defaultURL)
    return request.then(response => response.data)
}

function postPerson(note) {
    const request = axios.post(defaultURL, note)
    return request.then(response => response.data)
}

function deletePerson(id) {
    return axios.delete(`${defaultURL}/${id}`)
}

function updatePerson(note) {
    const request = axios.put(`${defaultURL}/${note.id}`, note)
    return request.then(response => response.data)
}

export default {getAll, postPerson, deletePerson, updatePerson}