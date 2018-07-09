var page = require('page');
var template = require('./template');

import { loadedPage } from '../service'

page('/signin', (ctx,next)=>{
	
	$('title').html('Fotogram - Signin');  
    loadedPage($('#main-container').empty().append(template));
})

