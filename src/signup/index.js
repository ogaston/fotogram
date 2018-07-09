var page = require('page');
var template = require('./template');
var main = document.getElementById('main-container');

import { loadedPage } from '../service'

page('/signup', (ctx,next)=>{  
    
    $('title').html('Fotogram - Signup');
    loadedPage($('#main-container').empty().append(template));
})