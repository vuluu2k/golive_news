const parseBoolean = (value) => {
  if (value === "true") return true
  if (value === "false") return false
  return value
}

const parseNumber = (value) => {
  return !isNaN(value) && typeof value !== "boolean" ? parseFloat(value) : value
}

const queryParser = (obj = {}) => {
  Object.keys(obj).forEach(function (key) {
    const val = obj[key]
    obj[key] = parseNumber(parseBoolean(val))
  })
  return obj
}

module.exports = queryParser
