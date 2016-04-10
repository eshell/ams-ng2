var express = require('express');
var app = express();
var faker = require('faker');
var _ = require('lodash');
var Sequelize = require('sequelize');
var mysql = new Sequelize('ams', 'root', 'shell', {
    host: 'localhost',
    dialect: 'mysql'

    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000
    // }

});

app.use(express.static(__dirname + '/'));

var memberTypes = ['Artists','Venues','Advertisers','Event Promoters','Fans'];

app.get('/mysql',function(req,res){
    "use strict";
    var Project = mysql.define('project',{
        title:Sequelize.STRING
    });
    Project.sync().then(function(){
        return Project.create({
            title:'testing'
        });
    });
    Project.findAll().then(function(result){
        res.send(result);
    })

});

app.get('/artistsGenerator.json',function(req,res){
    "use strict";
    var ret = [];
    var optional = ["mogulId","paypal","location.address","location.geo"]
    for(var i=1; i<3; i++){

        ret.push({
            "id":i,
            "mogulId":faker.random.number(),
            "type": 'Artist',
            "email":faker.internet.email(),
            "password":"password",
            "paypal": faker.internet.email(),
            "location":{
                "address":faker.address.streetAddress(),
                "city":faker.address.city(),
                "state":faker.address.stateAbbr(),
                "zip":faker.address.zipCode(),
                "geo":{
                    "lat":faker.address.latitude(),
                    "lng":faker.address.longitude()
                }
            },
            "categories":[1,2,3],
            "likes":faker.random.number(),
            "fans":faker.random.number(),
            "tracks":[
                {
                    "id":1,
                    "title":"track title",
                    "originalFileName":"originalFileName.mp3",
                    "src":"newFileName.mp3",
                    "path":"/some/path/some/server",
                    "url":"http://some/path/some/server"
                }
            ]

        });
    }

    res.json(ret);
});
// app.get('/events.json',function(req,res){
//     "use strict";
//     res.json()
// });
app.get('/eventsGenerator.json', function(req, res) {
    // var eventModel = {
    //     id:'',
    //     ownerId:'',
    //     title:'',
    //     address:'',
    //     city:'',
    //     state:'',
    //     zip:'',
    //     description:'',
    //     date:'',
    //     categories:'',
    //     who:''
    // };
    var ret = [];
    for(var i=0; i<50;i++){
        // var id=faker.random.number();
        ret.push({
            "id":faker.random.number(),
            "ownerId":faker.random.number(),
            "title":faker.random.word(),
            "location":{
                "address":faker.address.streetAddress(),
                "city":faker.address.city(),
                "state":faker.address.stateAbbr(),
                "zip":faker.address.zipCode(),
                "geo":{
                    "lat":faker.address.latitude(),
                    "lng":faker.address.longitude()
                }
            },
            description:faker.lorem.paragraph(),
            date:faker.date.future(),
            categories:[1,2,3],
            who:[1,2,3]
        });
    }
    res.json(ret);
});

app.get('/states.json',function(req,res){
    "use strict";
    var ret = [{"id":"AL","name":"Alabama"},{"id":"AK","name":"Alaska"},{"id":"AZ","name":"Arizona"},{"id":"AR","name":"Arkansas"},{"id":"CA","name":"California"},{"id":"CO","name":"Colorado"},{"id":"CT","name":"Connecticut"},{"id":"DE","name":"Delaware"},{"id":"FL","name":"Florida"},{"id":"GA","name":"Georgia"},{"id":"HI","name":"Hawaii"},{"id":"ID","name":"Idaho"},{"id":"IL","name":"Illinois"},{"id":"IN","name":"Indiana"},{"id":"IA","name":"Iowa"},{"id":"KS","name":"Kansas"},{"id":"KY","name":"Kentucky"},{"id":"LA","name":"Louisiana"},{"id":"ME","name":"Maine"},{"id":"MD","name":"Maryland"},{"id":"MA","name":"Massachusetts"},{"id":"MI","name":"Michigan"},{"id":"MN","name":"Minnesota"},{"id":"MS","name":"Mississippi"},{"id":"MO","name":"Missouri"},{"id":"MT","name":"Montana"},{"id":"NE","name":"Nebraska"},{"id":"NV","name":"Nevada"},{"id":"NH","name":"New Hampshire"},{"id":"NJ","name":"New Jersey"},{"id":"NM","name":"New Mexico"},{"id":"NY","name":"New York"},{"id":"NC","name":"North Carolina"},{"id":"ND","name":"North Dakota"},{"id":"OH","name":"Ohio"},{"id":"OK","name":"Oklahoma"},{"id":"OR","name":"Oregon"},{"id":"PA","name":"Pennsylvania"},{"id":"RI","name":"Rhode Island"},{"id":"SC","name":"South Carolina"},{"id":"SD","name":"South Dakota"},{"id":"TN","name":"Tennessee"},{"id":"TX","name":"Texas"},{"id":"UT","name":"Utah"},{"id":"VT","name":"Vermont"},{"id":"VA","name":"Virginia"},{"id":"WA","name":"Washington"},{"id":"WV","name":"West Virginia"},{"id":"WI","name":"Wisconsin"},{"id":"WY","name":"Wyoming"}];

    res.json(ret);
});
// app.get('/genres.json',function(req,res){
//     "use strict";
// });
app.get('/genresGenerator.json',function(req,res){
    "use strict";
    var ret = [
        "Alternative",
        "Blues",
        "Childrens",
        "Classical",
        "Comedy",
        "Country",
        "Electronic",
        "Folk",
        "Hip Hop",
        "Holiday",
        "Industrial",
        "Inspirational",
        "Jazz",
        "Karaoke",
        "Latin",
        "Opera",
        "Pop",
        "R&B",
        "Rap",
        "Reggae",
        "Rock",
        "Metal",
        "A Capella",
        "World"
    ];
    var ret2 = [];
    for(var i = 0; i < ret.length; i++){
        var t={};
        t[ret[i]] = [
            ret[i],
            faker.name.lastName(),
            faker.name.lastName(),
            faker.name.lastName()
        ];

        ret2.push(t);
    }


    res.json(ret2);
});
app.all('*',function(req,res){
    res.sendFile('index.html',{root:'./'});
});


var port=3000;
app.listen(port, function () {
    console.log('AMS API Server listening on port '+port);
});
