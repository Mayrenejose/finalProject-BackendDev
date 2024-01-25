// const authorizationSystem = (role) => {
//     return (req, res, next) => {
//         console.log(req);
//     if (role === 'admin') {
//         next();
//     } else {
//         res.status(403).json({ error: 'no access' })
//     }}
// }
function authorizationSystem(req, res, next) {
    console.log(req.session, 666666666666666666666666);
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    } else {
      res.status(403).json({ error: 'Acceso no autorizado' });
    }
  }

export default authorizationSystem 