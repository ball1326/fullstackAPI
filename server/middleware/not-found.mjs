
const notFound = (req,res,next) =>{
    res.status(404).send('Route does not exist!')
    next()
}

export default notFound

// module.exports = notFound;