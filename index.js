const express = require('express')
const multer  = require('multer')

const port = 9000;
const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
  // console.log(JSON.stringify(req.file))
  let response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
})

app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
  let response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  for(var i=0;i<req.files.length;i++){
    response += `<img src="${req.files[i].path}" /><br>`
  }
  return res.send(response)
})

app.listen(port,() => console.log(`Server running on port ${port}!`))
