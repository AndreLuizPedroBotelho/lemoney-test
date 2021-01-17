import fs from 'fs'

const clearStorage = (storage) => {
  if (fs.existsSync(storage)) {
    fs.unlinkSync(storage);
  }
}

export { clearStorage }