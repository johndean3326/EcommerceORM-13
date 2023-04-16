const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get("/test", (req, res) => {
  res.send("<h1>Tested Route at Level 3!</h1>")
});

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {

    const categories = await Category.findAll({
      include:[{model: Product}]
    });
    res.status(200).json(categories)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const categories = await Category.findOne({
    where: {
      id: req.params.id
    },
      include:[{model: Product}],
  });
  res.status(200).json(categories);
}catch(err) {
  res.status(400).json(err)
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
      const newCategory = await Category.create({
        category_id: req.body.category_id,
        category_name: req.body.category_name,
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData[0]) {
      res.status(400).json({ message: 'No category with this id'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
 });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {
      res.status(400).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
