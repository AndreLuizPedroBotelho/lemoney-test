import isAfter from 'date-fns/isAfter'
import fs from 'fs'

const getState = ({ starts_at, ends_at, active }) => {
  if (active === false ||
    isAfter(starts_at, new Date()) ||
    (isAfter(new Date(), ends_at) && ends_at !== "")
  ) {
    return false
  }

  return true
}

const clearStorage = (storage) => {
  if (fs.existsSync(storage)) {
    fs.unlinkSync(storage);
  }
}

export { getState, clearStorage }