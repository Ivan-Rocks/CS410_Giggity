import match from './match.js'
import lookaround from './lookaround.js'
import split from './split.js'

const methods = Object.assign({}, match, lookaround, split)
// aliases
methods.lookBehind = methods.before
methods.lookBefore = methods.before

methods.lookAhead = methods.after
methods.lookAfter = methods.after

methods.notIf = methods.ifNo
const matchAPI = function (View) {
  Object.assign(View.prototype, methods)
}
export default matchAPI
