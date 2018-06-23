
if (!window.Intl) {

  //this is for safary support
  window.Intl = require('intl');
  require('intl/locale-data/jsonp/en-US.js');
}

 //we need have the global object to put with the IRF
 window.IntlRelativeFormat = require('intl-relativeformat');
 var IntlRelativeFormat = window.IntlRelativeFormat;

 var IntlMessageFormat = require('intl-messageformat');

 require('intl-relativeformat/dist/locale-data/en.js');
 require('intl-relativeformat/dist/locale-data/es.js');
 
 var es = require('./es');
 var en = require('./en-US');

 var MESSAGES = {}
 MESSAGES.es = es;
 MESSAGES['en-US']= en;

var locale = localStorage.locale || 'es';

module.exports = { 
	message: function (mes, opts) {
				opts = opts || {}; //for safari
			 	var msg = new IntlMessageFormat(MESSAGES[locale][mes],locale,null);
			 	return msg.format(opts);

		 	},
	 date: new IntlRelativeFormat(locale)
}
