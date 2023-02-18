const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
Tag.findAll({
  include: [
    {
      model: Product,
      through: ProductTag,
    },
  ],
}).then((userTags)=> {
  res.status(200).json(userTags)
}).catch((err)=> {
  res.status(400).json(err)
})
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }).then((userTags)=> {
    res.status(200).json(userTags)
  }).catch((err)=> {
    res.status(400).json(err)
  })
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((dataFromTheCreate) => {
    res.status(200).json(dataFromTheCreate)
  }).catch((err) => {
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update({
       tag_name: req.body.tag_name},
       { where: {id: req.params.id}},
  ).then((dataFromTheUpdate) => {
    res.status(200).json(dataFromTheUpdate)
  }).catch((err) => {
    res.status(400).json(err)
  })
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
