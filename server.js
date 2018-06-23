var express = require('express');
var multer = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null,'IMG' + Date.now() +'.'+ ext(file.originalname))
  }
})

var upload = multer({storage: storage}).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));


app.get('/', (req, res) => {
	res.render('index')
})

app.get(['/','/signup', '/signin'], (req, res) => {
  res.render('index')
})

app.post('/api/pictures', (req,res)=>{
	upload(req,res,err=>{
		if (err) {
			return res.status(500).send("Error uploading file")
		}
		res.send('File uploaded successful')
	})
})

app.get('/api/pictures', (req, res) => {
	var pictures = [
		{
			user:{
				username: 'omarjay',
				avatar:'https://pickaface.net/assets/images/slides/slide2.png'
			},
			url:'office.jpg',
			likes: 0,
			liked: false,
			createdAt: new Date().setDate(new Date().getDate()-6)
		},
		{
			user:{
				username: 'juancito',
				avatar:'https://pickaface.net/assets/images/slides/slide2.png'
			},
			url:'office.jpg',
			likes: 8,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate()-10)
		},
		{
			user:{
				username: 'Pedrito',
				avatar:'https://pickaface.net/assets/images/slides/slide2.png'
			},
			url:'office.jpg',
			likes: 8,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate()-10)
		}
	];

	setTimeout(()=>{
		res.send(pictures);
	},2000);

})


app.listen(3000, function (err) {
	if (err) return console.log("hubo un error"), process.exit(1);
	console.log("Fotogram is listening in 3000 port");	
});