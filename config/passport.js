const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

module.exports = function(passport) {

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: "password" }, (email, password, done) => {
        // Busca o usuário pelo email
        Usuario.findOne({ email: email }).then((usuario) => {
            console.log('Usuário encontrado:', usuario);

            if (!usuario) {
                return done(null, false, { message: "Usuário não encontrado" });
            }
            console.log(password)
            console.log(usuario.senha)
            // Compara a senha fornecida com a senha criptografada armazenada no banco
            bcrypt.compare(password, usuario.senha, (erro, res) => {
                if (erro) {
                    console.error("Erro ao comparar as senhas:", erro);
                    return done(erro);  // Retorna erro, caso ocorra
                }

                if (res) {
                    // Senha correta
                    return done(null, usuario);
                } else {
                    // Senha incorreta
                    return done(null, false, { message: "Senha incorreta" });
                }
            });
        }).catch((err) => {
            console.error("Erro ao buscar usuário:", err);
            return done(err);
        });
    }));

    // Serialização e desserialização do usuário
    passport.serializeUser((usuario, done) => {
        done(null, usuario._id);
    });

    passport.deserializeUser((id, done) => {
        Usuario.findById(id).then((usuario) => {
            done(null, usuario);
        }).catch((err) => {
            done(null, false, { message: "Algo deu errado" });
        });
    });
};
