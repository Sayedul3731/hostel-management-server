const findAllMeals = require("../../../lib/meals/findAllMeals")

const findAll = async(req, res, next) => {
    try{
        const filter = req.query;
        const meals = await findAllMeals(filter);
        res.send(meals)
    }catch(err){
        next()
    }
}

module.exports = findAll