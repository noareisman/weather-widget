import { storageService } from './async-storage-service'
import { httpService } from './http.service'

const KEY = 'users'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
}

window.userService = userService

function getUsers() {
    return storageService.query(KEY)
    // return httpService.get(`user`)
}

function getById(userId) {
    return storageService.get(KEY, userId)
    // return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return storageService.remove(KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    return storageService.put(KEY, user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}



async function login(userCred) {
    // const users = await storageService.query(KEY)
    const user = users.find(user => user.username === userCred.username)
    return _saveLocalUser(user)

    // const user = await httpService.post('auth/login', userCred)
    // if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    const user = await storageService.post(KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

