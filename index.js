const express = require("express")
const path = require('path');
const ejsApp = express()

ejsApp.set('view engine', 'ejs')
ejsApp.set('views', path.join(__dirname, 'views'))
ejsApp.use(express.static(path.join(__dirname, 'public')));

const port = 3000

ejsApp.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

ejsApp.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

ejsApp.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup' });
});

ejsApp.get('/games', (req, res) => {
    res.render('games', { title: 'Games' });
});

ejsApp.get('/groups', (req, res) => {
    res.render('groups', { title: 'Groups' });
});

ejsApp.get('/shop', (req, res) => {
    res.render('shop', { title: 'Shop' });
});

ejsApp.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

ejsApp.get('/luna', (req, res) => {
    res.render('luna', { title: 'Luna' });
});

ejsApp.get('/tos', (req, res) => {
    res.render('tos', { title: 'ToS' });
});

ejsApp.get('/privacy', (req, res) => {
    res.render('privacypolicy', { title: 'Privacy Policy' });
});

ejsApp.get('/user', (req, res) => {
    res.render('user', { title: 'User' });
});

ejsApp.get('/group', (req, res) => {
    res.render('group', { title: 'Group' });
});

ejsApp.get('/game', (req, res) => {
    res.render('game', { title: 'Game' });
});

ejsApp.get('/asset', (req, res) => {
    res.render('asset', { title: 'Asset' });
});

ejsApp.get('/transactions', (req, res) => {
    res.render('transactions', { title: 'Transactions' });
});

//404 Error
ejsApp.use(function(req, res, next) {
    res.status(404);
    res.render('404', { title: '404' });
});

ejsApp.listen(port, () => {
  console.log(`Project is ready! Running on port: ${port}`)
});