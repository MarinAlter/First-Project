$(document).ready(function () {
	console.log("charlotte is a bcoas");
})
$('#signUpBtn').on('click', function(){
	let signUpData = $('form').serializeArray();
	let missingData = false, signUpObj = {};
	for (let i = 0; i < signUpData.length; i++){
		if(!signUpData[i].value.length){
			missingData = true;
			console.log(signUpData)
		}
		signUpObj[signUpData[i].name] = signUpData[i].value;
		console.log(signUpObj);
	}
if (missingData) {
	  M.toast({html: 'Missing Data! Please Complete Form!', classes: 'rounded red'});
	  missingData = false;
}
else {
	$.ajax({
		url:"/signUp",
		method:"POST",
		contentType: 'application/json',
		data: JSON.stringify(signUpObj),
		success: function(data){
			sessionStorage.setItem('spaceProjToken', data.token);
			console.log("dataBackFromServer")
			console.log(data);	
			window.location.href = "/earth?t=" + data.token;
		},
		error: function(err){
			console.log(err)
		},
		
	})

}
})