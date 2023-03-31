
const auth  =  require('./auth.controller');
const users =  require('./users.controller');
const access =  require('./accesscode.controller');
const projects = require('./projects.controller');
const development = require('./development.controller');

module.exports = {
    ...auth,
    ...users,
    ...access,
    ...projects,
    ...development
}