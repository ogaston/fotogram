var page = require('page');
var template = require('./template');
var main = document.getElementById('main-container');

page('/signin', (ctx,next)=>{
	
	$('title').html('Fotogram - Signin');  
    $('#main-container').empty().append(template);
})

