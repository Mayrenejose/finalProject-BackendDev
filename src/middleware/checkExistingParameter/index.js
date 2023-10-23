const checkExistingParameter = (req, res, next) => {
    const id = Number(req.params.pid)
    console.log(id);
    if ( !isNaN(id) ) {
        next()
    } else {
        res.status(400).json({ error: 'invalid parameter' })
    }
}

export default checkExistingParameter