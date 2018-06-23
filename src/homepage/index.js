var page = require('page');
var template = require('./template');
var request = require('superagent');
var header = require('../header');
var axios = require('axios')

page('/', header , asyncLoad, (ctx,next)=>{
	$('#main-container').empty().append(template(ctx.pictures)).addClass('loaded');

})

//REQUEST WITH CALLBACKS
function loadPictures(ctx,next) {
	request
		.get('api/pictures')
		.end((err,res)=>{
			if (err) return console.log(err);
			
			ctx.pictures = res.body;
			next();
		})
}

//REQUEST WITH PROMISE
function loadPicturesAxios(ctx,next) {
	axios
		.get('api/pictures')
		.then(res=>{
			ctx.pictures = res.data;
			next();
		})
		.catch(err=>{
			console.log(err)
		})
}

//REQUEST WITH NATIVE PROMISE FETCH - -  NOT WORKING
function loadPicturesFetch(ctx,next) {
	fetch('/api/pictures')
		.then(res=>ctx.pictures = res)
		.then(res=>next())
		.catch(err=>{
			console.log(err)
		})
}	

//ASYNC & AWAIT STOP THE EXCECUTION UNTIL ITS GET THE RESPONSE, SUPPORTED SINCE ECMASCRIPT 2016
async function asyncLoad(ctx,next) {
		try{
			ctx.pictures = await fetch('api/pictures').then(res=> {
				document.getElementById('loader').classList.toggle('loaded-spinner')
				return res.json()
			});
			next();
		} catch (err){
			return console.log(err)
		}
	}	