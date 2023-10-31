const users =[];

module.exports={
    create : (user)=>{
        users.push(user);
    },
    findByEmail : (email) => {
        return users.find((user) => user.email === email)
    }
}