$(document).ready(function () {
	console.log("charlotte is a bcoas");
})
$('#signInBtn').on('click', function(){
	let signInData = $('form').serializeArray();
	let missingData = false, signInObj = {};
	for (let i = 0; i < signInData.length; i++){
		if(!signInData[i].value.length){
			missingData = true;
			console.log(signInData)
		}
		signInObj[signInData[i].name] = signInData[i].value;
		console.log(signInObj);
	}
if (missingData) {
	  M.toast({html: 'Missing Data! Please Complete Form!', classes: 'rounded red'});
	  missingData = false;
}
else {
	$.ajax({
		url:"/signIn",
		method:"POST",
		contentType: 'application/json',
		data: JSON.stringify(signInObj),
		success: function(data){
			sessionStorage.setItem('spaceProjToken', data.token);
			console.log("dataBackFromServer")
			console.log(data);	
			window.location.href = "/earth?t=" + data.token
		},
		error: function(err){
			console.log(err);
			M.toast({html: err.responseJSON.message, classes: 'rounded red'});
		},
		
	})

}
})