$(document).ready(function(){
	const sessionExit = () => (window.location.href = '/?err=You%20have%20been%20logged%20out.');
	console.log("Space Is Cool")
	$('#spacePic').on('click', () =>{
		if(sessionStorage.getItem('spaceProjToken')) {
			window.location.href = '/spacePic?t=' + sessionStorage.getItem('spaceProjToken');
		}
		else sessionExit();
	});
	$('#earth').on('click', () =>{
		if(sessionStorage.getItem('spaceProjToken')) {
			window.location.href = '/earth?t=' + sessionStorage.getItem('spaceProjToken');
		}
		else sessionExit();
	});
	$('#logout').on('click', () =>{
		if(sessionStorage.getItem('spaceProjToken')) {
			sessionStorage.removeItem('spaceProjToken');
			window.location.href = '/?success=You%20have%20successfully%20logged%20out.'
		}
		else sessionExit();
	});
});
