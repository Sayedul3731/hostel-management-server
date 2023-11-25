const meal = require("../../models/Meals")

const findAllMeals = async() => {
    const cursor = await meal.find();
    return cursor;
}

module.exports = findAllMeals