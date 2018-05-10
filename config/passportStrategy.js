let bCrypt = require('bcrypt-nodejs');
let LocalStrategy = require('passport-local').Strategy;

let PassportStrategy = function (passport, Usuario) {
    passport.serializeUser((usuario, done)=>{
        done(null, usuario.idUsuario);
    });

    passport.deserializeUser((idUsuario, done)=>{
        Usuario.findById(idUsuario).then((usuario)=>{
            if(usuario){
                done(null, usuario.get());
            }
            else{
                done(usuario.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'emailUsuario',
            passwordField: 'claveUsuario',
            passReqToCallback: true
        },
        (req, emailUsuario, claveUsuario)=>{
            let generateHash=(claveUsuario)=>{
                return bCrypt.hashSync(claveUsuario, bCrypt.genSaltSync(8), null);
            }
            Usuario.findOne(
                {
                    "emailUsuario": emailUsuario
                }
            ).then((usuario)=>{
                    if(usuario){
                        return done(null, false, {message: "Este e-mail ya se encuentra registrado"});
                    } else{
                        var claveUsuario = generateHash(claveUsuario);
                        let infoUsuario = {
                            emailUsuario: emailUsuario,
                            claveUsuario: claveUsuario
                        };
                        Usuario.create(infoUsuario).then((nuevoUsuario, createUsuario)=>{
                            if(!nuevoUsuario){
                                return done(null, false);
                            } else{
                                return done(null, nuevoUsuario);
                            }
                        });
                    }
                }
            );
        }
    ));
};

module.exports = PassportStrategy;