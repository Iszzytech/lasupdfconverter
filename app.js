// imports

const express = require('express');   
const libre = require('libreoffice-convert');
const fs = require("fs");
const path = require("path");
var outputFilePath;
const multer = require('multer');
const app = express(); 

const PORT = process.env.PORT || 5000;
    


//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


//Set views
app.set('views', './views')
app.set('view engine', 'ejs')

//storage
const storage = multer.diskStorage({
destination: './public/uploads/',
filename: function(req, file, cb){
  cb(null,file.fieldname + '-' + Date.now() +
  path.extname(file.originalname));
}
});

// Init Upload
const upload = multer({
storage: storage,
limits:{fileSize: 10}
}).single('myFile');




app.get('', (req, res) => {
    res.render('index')
})
app.get('/feature', (req, res) => {
    res.render('feature')
})
app.get('/exceltopdf', (req, res) => {
    res.render('exceltopdf')
})
app.get('/jpegtopdf', (req, res) => {
    res.render('jpegtopdf')
})
app.get('/ppttopdf', (req, res) => {
    res.render('ppttopdf')
})
app.get('/docxtopdfdemo', (req, res) => {
    res.render('docxtopdfdemo' ,{title: "DOCX to PDF converter"})
})




app.get('/index', (req, res) => {
    res.render('index')
})

app.post('/upload', (req, res) => {
upload(req, res, (err) => {
if (err){
  res.render ('docxtopdfdemo', {
    msg: err
  });
} else{
  console.log(req.file);
  res.send('test');
}
});
});

// listen on the port
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
  });