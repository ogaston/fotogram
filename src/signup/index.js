var page = require('page');
var template = require('./template');
var main = document.getElementById('main-container');

page('/signup', (ctx,next)=>{  
    
    $('title').html('Fotogram - Signup');
    $('#main-container').empty().append(template);
})