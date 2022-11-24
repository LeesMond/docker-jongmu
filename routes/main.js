const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const app = express();

app.use(morgan('dev'));

var db;
var databaseUrl = "mongodb+srv://admin:1234@cluster0.5hijmxr.mongodb.net/?retryWrites=true&w=majority";

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
    });

    app.get('/smartphone', (req, res) => {
    console.log(mongoClient)
    mongoClient.connect(databaseUrl, function(err, database) {
    if (err != null) {
    res.json({'count' : 0});
    console.log(err);
    } else {
    db = database.db('test');
    db.collection('smartphone').find({}, {_id:0, name:1, title:1})
    .toArray(function(err, result) {
    if (err) throw err;
    console.log('result: ');
    console.log(result);
    //res.json(JSON.stringify(result));

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    var template = `
    <table border="1" margin: auto; text-align: center;>
    <tr>
    <th> 회사명 </th>
    <th> 스마트폰 이름 </th>
    </tr>
    `;

    result.forEach((item) => {
      	template += `
	     	<tr>
		    		<th>${item.name}</th>
				       		<th>${item.title}</th>
						       	</tr>`
							});

							template +=`</table>`;
							res.end(template);
							});
							}
							});
							});

							module.exports = app;
