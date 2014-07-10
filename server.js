var config = require("./config.js");
var elasticsearch = require("elasticsearch");
var restify = require("restify");


/** Setup Elasticsearch **/
console.log("Elasticsearch: Usings host(s) " + config.esHosts);
var esClient = elasticsearch.Client({hosts: config.esHosts});

/** Setup Restify Server **/
var server = restify.createServer({ name: 'recipie-king'});
server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.pre(function(req, res, next) {
    console.log("Request url: " + req.url);
    next();
});

/** API Calls **/

function searchRecipies(req, res, next) {
    esClient.search({
        index: 'recipe-king',
        type: 'recipe',
        q: req.params.query
    }, function(error, response) {
        var results = response.hits.hits;
        var output = [];
        for (var i = 0; i < results.length; i++){
            output[i] = results[i]._source;
            output[i].id = results[i]._id;
        }
        res.send({recipies: output});
    });
    return next();
};
server.get('/search/:query', searchRecipies);

function getRecipe(req, res, next) {
    // get the recipe
    esClient.get({
        index: 'recipe-king',
        type: 'recipe',
        id: req.params.id
    }, function (error, response) {
        res.send(response._source);
    });
    return next();
};
server.get('/recipe/:id', getRecipe);

function saveRecipe(req, res, next) {
    console.log("Saving recipe: " + JSON.stringify(req.params));
    // Index the recipe
    esClient.index({
        index: 'recipe-king',
        type: 'recipe',
        body: {
            name: req.params.name,
            description: req.params.description,
            steps: req.params.steps,
            ingredients: req.params.ingredients
        }
    }, function(error, response) {
        if (error == undefined) {
            // Return the id of the new recipe
            res.send({id: response._id});
        } else {
            res.send(500);
        }
    });
    return next();
};
server.post('/recipe', saveRecipe);


/** Statics **/
server.get(/.*/, restify.serveStatic({
    'directory': './statics',
    'default': 'index.html'
}));

/** Start Server **/
server.listen(config.port, function(){
    console.log('%s listening at %s', server.name, server.url);
});