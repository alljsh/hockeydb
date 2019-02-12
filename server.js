const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

require('dotenv').config();

const app = module.exports = express();
const port = process.env.PORT || 8010;

const version = 'v1';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const admin = require('./controllers/admin');
const blogs = require('./controllers/blogs');
const auth = require('./controllers/auth');

//Make sure to create a local postgreSQL db called hockeydb

// const connectionInfo = process.env.DATA_BASE_URL || "postgres://@localhost/hockeydb";
const connectionInfo = "postgres://@localhost/hockeydb";

let db = null;
massive(connectionInfo, { excludeMatViews: true }).then(instance => {
    app.set('db', instance); // add your connection to express
    db = app.get('db'); // declare a db object for requests
}).catch(err => {
    console.log(err, 'massive err');
});

// return errors -  
// {
//     status: number,
//     error: boolean,
//     message: string
// }

// return res.status(400).send({status: 400, error: true, message: 'Passwords must match'})

// return success - 
// {
//     status: number,
//     data: array/object
//     message: string
// }

// return res.status(200).send({status: 200, data: user, message: 'You have successfully logged in'})

// ROUTES //

// Blog
app.get(`/api/blog`, blogs.getBlogs);
app.get(`/api/blog/:id`, blogs.getBlogbyId)

// Schedule
app.get(`/api/schedule`)

// Games
app.get(`/api/scoresheets/:id`)

// Teams
app.get(`/api/teams/`)
app.get(`/api/teams/:id`)

// Players
app.get(`/api/players`)
app.get(`/api/players/:id`)


// Standings 
app.get(`/api/standings`)

// Leaders 
app.get(`/api/leaders`)

// Suspensions
app.get(`/api/suspensions`)

// About
app.get(`/api/about`)


// ⭐ ️ ADMIN  ⭐️

// Create seasons
app.post(`/api/admin/seasons`)
app.put(`/api/admin/seasons/:id`)

// Create division
app.post(`/api/admin/divisions`)
app.put(`/api/admin/divisions/:id`)

// Create team
app.post(`/api/admin/teams`)
app.put(`/api/admin/teams/:id`)

// Create player
app.post(`/api/admin/players`, admin.createPlayer);
app.put(`/api/admin/players/:id`, admin.updatePlayer)

// Create blog post
app.post(`/api/admin/blog`, admin.createBlog)
app.put(`/api/admin/blog/:id`, admin.updateBlog)
app.delete(`/api/admin/blog/:id`, admin.deleteBlog)

// Update about 
app.post(`/api/admin/about`)



// AUTH //

// Log in
app.post(`/api/auth/login`, auth.login)

// Log out
app.post(`/api/auth/:id/logout`)

// Get logged in user
app.get(`/api/auth`)

// Create new user
app.post(`/api/auth`);

// Edit user
app.put(`/api/auth/:id`)







app.listen(port, () => console.log(`Server running on port ${port}`))