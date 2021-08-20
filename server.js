const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/earth', function(req, res) {
  res.sendFile(path.join(__dirname, './three.html'));
});
app.listen(3000, function(){
	console.log('listening!');
})