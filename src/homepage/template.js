var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../picture-card');
var translate = require('../translate');
var request = require('superagent');





module.exports = function (pictures) {

	var el = yo`<div class="container timeline">
	<div class="row no-bottom-margin">
		<div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
			<form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit=${onsubmit}>
				<div id="fileName" class="fileUpload btn btn-flat cyan waves">
					<span><i class="fa fa-camera" aria-hidden="true"></i> ${translate.message('upload-picture')}</span>
					<input name="picture" id="file" type="file" class="upload" onchange="${onchange}"/>
				</div>
				<div id="img-preview" class="card img-preview hide">
					<img id="show" src="#" class="show-img" alt="your image" />
				</div>
				<button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${translate.message('upload')}</button>
				<button id="btnCancel" class="btn btn-flat red hide" onclick="${cancel}"><i class="fa fa-times" aria-hidden="true"></i></button>
			</form>
		</div>
	</div>
	  <div class="row">
	    <div class="col s12 m10 offset-m1 l6 offset-l3">

	      ${pictures.map(pic=>picture(pic))}
	    </div>
	  </div>
	  <a class="btn-floating btn-large waves-effect waves-light cyan fixed-add" id="fixed-add"><i class="fa fa-camera"></i></a>
	</div>`;


	function cancel(argument) {
		toggleButton();
		document.getElementById('formUpload').reset();
		return false;
	}



	function onchange(argument) {
		toggleButton();
		readURL(this);
	}


	function toggleButton() {
		document.getElementById('fileName').classList.toggle('hide');
		document.getElementById('btnUpload').classList.toggle('hide');
		document.getElementById('btnCancel').classList.toggle('hide');
		document.getElementById('img-preview').classList.toggle('hide');
		

	}

	function onsubmit(ev) {
		ev.preventDefault();

		var data = new FormData(this);
		request
			.post('api/pictures')
			.send(data)
			.end((err,res)=>{
				console.log(arguments)
				console.log(res)
			})
	}

	function readURL(input) {

		if (input.files && input.files[0]) {
		  var reader = new FileReader();

		  reader.onload = function(e) {
				$('#show').attr({
					src: e.target.result,
					class:'show-img'
				});
				console.log(e)
		  }
		  reader.readAsDataURL(input.files[0]);
		}
	  }
	

	return layout(el);
} 

function canActivateButtonFixed(){
	if (window.scrollY > 100) {
		document.getElementById('fixed-add').style.transform = 'scale(1.1)';
	} else {
		document.getElementById('fixed-add').style.transform = 'scale(0)';
	}
}



window.addEventListener('scroll', canActivateButtonFixed)
