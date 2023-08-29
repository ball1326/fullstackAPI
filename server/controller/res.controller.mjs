import Restaurant from "../models/res.model.mjs";

const getAll = async (req, res) => {
  try {
    const restaurantList = await Restaurant.findAll();
    const result = restaurantList.map((restaurant) => {
      return restaurant.toJSON();
    });
    res.status(200).json(result);
  } catch (err) {
    if (err) console.log(err);
  }
};

const getOne = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.params.id },
    });
    const result = restaurant.toJSON()
    if (restaurant === null) {
      return res
      
        .status(404)
        .send(`Not found your restaurants with id : ${req.params.id}`);
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const addRes = async (req, res) => {
  const { name, type, img } = req.body;
  if (!name || !type || !img) {
    return res.status(400).send("Please provide all value !");
  }
  try {
    const result = await Restaurant.create({ name, type, img });
    console.log("Inserted 1 record !");
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

const updateRes = async (req, res) => {
  const id = req.params.id;
  const { name, type, img } = req.body;
  if (!name || !type || !img) {
    return res.status(400).send("Please provide all value!");
  }
  try {
    const result = await Restaurant.findOne({ where: { id: id } });
    if (!result) {
      return res.status(404).send("Your Restaurant is not exists !");
    }
    await Restaurant.update({ name, type, img }, { where: { id: id } });
    res.status(201).send(`Updated your restaurant with id : ${id}`);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const deleteRes = async (req, res) => {
  const id = req.params.id;
  try {
    const row = await Restaurant.findOne({ where: { id: id } });
    if (!row) {
      return res.status(404).send("Not found you Restaurant id !");
    }
    await row.destroy()
    res.status(200).send(`Deleted 1 record ! , with id ${id}`);
  } catch (err) {
    console.log(err);
  }
};

export { getAll, addRes, updateRes, deleteRes, getOne };
