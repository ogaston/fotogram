var yo = require('yo-yo');
var layout = require('../layout');
var translate = require('../translate');
var request = require('superagent');





module.exports = function () {

	var el = yo`<div class="container">
	<div class="row margin-top-and-down profile">
		<div class="img-container">
			<img src="http://geedmo.com/codecanyon/bskins/plan/assets/img/avatar.png" class="profile-avatar"/>
		</div>
		<h2 class="username">Omar Gaston</h2>
		<div class="row">
			<div class="col s6">Seguidos: <span class="follow">500</span></div>
			<div class="col s6">Seguidores: <span class="followers">5000</span></div>
		</div>
		<div class="card">
			<div class="card-content">
				<p>Vive en Republica Dominicana</p>
				<p>Hombre</p>
				<p>25 años</p>
			</div>
		</div>
	</div>`;


	function uploadFloat() {
		window.scrollTo(0,0);
		document.getElementById('file').click()
	}

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
