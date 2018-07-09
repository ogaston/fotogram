var page = require('page');
var template = require('./template');
var header = require('../header');

import { loadedPage } from '../service'


page( '/profile', header ,(ctx,next)=>{
	loadedPage($('#main-container').empty().append(template));
})
