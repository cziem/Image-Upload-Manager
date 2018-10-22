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

exports.get_all = async (req, res) => {
  const files = await File.find().select('-__v')

  if (!files) return res.status(400).send('an error occurred')

  res.json(files)
}

exports.add_images = async (req, res) => {
  const id = req.params.id

  let filepath = req.files.map(file => file.path)

  console.log(filepath)

  let updatedFile

  // Add more pictures to the photos array
  try {
    for (let i = 0; i <= filepath.length; i++) {
      updatedFile = await File.findOneAndUpdate(id, {
        $push: {
          photos: filepath[i]
        }
      })
    }
  
    res.status(200).json(updatedFile)
    
  } catch (error) {
    res.status(400).json('could not add images')
  }
}

