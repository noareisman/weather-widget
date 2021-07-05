// import { httpService } from './http.service'
import { storageService } from './async-storage.service'

export const itemService = {
  add,
  query,
  remove,
  getById,
  update,
  getEmptyGroup,
}

const KEY = 'item'

// _addItemToStorage()
// async function _addItemToStorage() {
// return await JSON.parse(localStorage.getItem(KEY)) || add(item)
// }

function query() {
  return storageService.query(KEY)
  // return httpService.get(`item`)
}

function remove(itemId) {
  return storageService.delete(KEY, itemId)
  // return httpService.delete(`item/${itemId}`)

}

function update(item) {
  return storageService.put(KEY, item)
  // return httpService.put(`item/${item._id}`, item)

}
async function add(item) {
  const addedItem = storageService.post(KEY, item)
  // const addedItem = await httpService.post(`item`, item)

  return addedItem
}

function getById(itemId) {
  return storageService.get(KEY, itemId)
  // return httpService.get(`item/${itemId}`)
}

function getEmptyGroup() {
  return {}
}
