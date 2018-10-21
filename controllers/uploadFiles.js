const File = require('../models/uploadFiles')

exports.create = async (req, res) => {
  const file = new File({
    title: req.body.title,
    caption: req.body.caption,
    address: req.body.address,
    price: req.body.price,
    img: req.file.path
  })

  try {
    const fileDetails = await file.save()

    res.status(201).json({
      message: 'Request created',
      fileDetails
    })
  } catch (error) {
    res.status(400).json({
      message: 'could not save the request',
      error
    })
  }
}