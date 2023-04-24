const fs = require('fs')
const crypto = require('crypto')

class UserManager {
    constructor(archivo) {
        this.archivo = archivo
    }
    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.archivo, JSON.stringify(data, null, 2)
                )
            }catch(err) {
            console.log(err);
            }
        }
    // consultarUsuarios
    getUsers = async () => {
        try {
            if (fs.existsSync(this.archivo)) {
                const data = await fs.promises.readFile(this.archivo, 'utf-8');
                const users = JSON.parse(data);
                return users;
            }
            await this.writeFile( [] )
            return []
        } catch (error) {
            console.log(error)
        }
    }
    getUserById = async id => {
        try {
            let users = await this.getUsers()
            const user = users.find(obj => obj.id === id)
            return user ? user : console.log('No user found')
        } catch (error) {
            console.log(error);
        }
    }
    createUser  = async (user) => {
        try {
            const users = await this.getUsers()
            if(users.length===0){
                user.id=1;
            }else{
                user.id = users[users.length-1].id + 1
            }
            user.salt = crypto.randomBytes(128).toString('base64') // alfa númerico
            user.password = crypto.createHmac('sha256', user.salt).update(user.pass).digest('hex')
            users.push(user)
            await this.writeFile(users)
            return users
        } catch (error) {
            console.log(error)
        }
    }
    validateUser = async (name, pass) => {
        //leyendo el archivo
        const users = await this.getUsers();

        const userIndex = users.findIndex(u=>u.name===name)

        if(userIndex===-1) {
            console.log("error, usuario no encontrado");
            return;
        }
        const user = users[userIndex]
        const newHash = crypto.createHmac('sha256',user.salt).update(pass).digest('hex');
        //Ya que no podemos "descifrar" la contraseña original del usuario, tenemos que hashear el intento
        //de contraseña y compararla con la contraseña que tenga guardada el usuario.
        //Nota entonces que, validar una contraseña no es descifrar la contraseña guardada, sino comparar con la contraseña ingresada
        if(newHash===usuario.password){
            console.log("logged in");
        }else{
            console.log("Invalid password");
        }
    }
    deleteById = async id => {
        try {
            let users = await this.getUsers()
            const user = users.filter(obj => obj.id !== id)
            await this.writeFile(user);
            return console.log('removed user');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports =  UserManager