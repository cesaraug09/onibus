const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('./config/db');

const PORT = process.env.PORT || 8081;
db(PORT);

const Onibus = require('./models/Onibus');
const Usuario = require('./models/Usuario');

require('./config/passport')(passport);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/bussapp',
    failureRedirect: '/', 
    failureFlash: false,
}));

app.get('/bussapp', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(__dirname + '/public/Onibus.html');
    } else {
        res.redirect('/');
    }
});

app.get('/registro', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/registra', async (req, res) => {
    const { name, email, password, cpf } = req.body;

    try {
        const existingUser = await Usuario.findOne({ cpf });
        if (existingUser) {
            return res.status(400).send('CPF já registrado.');
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        const newUser = new Usuario({
            nome: name,
            email: email,
            senha: hash,
            cpf: cpf
        });

        await newUser.save();
        res.status(201).send('Usuário registrado com sucesso');
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).send('Erro no servidor');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
