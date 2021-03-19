// imports

const express = require("express");
const bodyParser = require("body-parser");
const libre = require('libreoffice-convert');
const fs = require("fs");
const path = require("path");
var outputFilePath;
const multer = require('multer')
const app = express() 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });




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


const docxtopdfdemo = function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== ".docx" &&
      ext !== ".doc"
    ) {
      return callback("This Extension is not supported");
    }
    callback(null, true);
  };

  const docxtopdfdemoupload = multer({storage:storage,fileFilter:docxtopdfdemo})

  app.post('/docxtopdfdemo',docxtopdfdemoupload.single('file'),(req,res) => {
    if(req.file){
      console.log(req.file.path)
  
      const file = fs.readFileSync(req.file.path);

      outputFilePath = Date.now() + "output.pdf" 
  
      libre.convert(file,".pdf",undefined,(err,done) => {
        if(err){
          fs.unlinkSync(req.file.path)
          fs.unlinkSync(outputFilePath)
  
          res.send("some error taken place in conversion process")
        }
  
        fs.writeFileSync(outputFilePath, done);
  
        res.download(outputFilePath,(err) => {
          if(err){
            fs.unlinkSync(req.file.path)
          fs.unlinkSync(outputFilePath)
  
          res.send("some error taken place in downloading the file")
          }
  
          fs.unlinkSync(req.file.path)
          fs.unlinkSync(outputFilePath)
        })
  
  
      })
    }
  })



app.get('/index', (req, res) => {
    res.render('index')
})
// app.get('/docxtopdfdemo',(req,res) => {
//     res.render('docxtopdfdemo',{title: "DOCX to PDF converter"})
// })

// listen on the port
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
  });