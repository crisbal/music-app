var express    = require('express');
var app        = express();                 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port



// ROUTES FOR OUR API
// =============================================================================
var api = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
api.get('/', function(req, res) {
    res.json({ message: 'This is the API!' });   
});


app.use('/api/v1/', api);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('App listening on http://localhost:' + port);