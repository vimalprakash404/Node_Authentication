const  express = require('express')
const app = express()
const authRoutes = require("./routes/auth")
const { authenticateToken , datacheck } = require("./middleware/auth")
const port = 3000
app.use('/auth', authRoutes)
app.get('/verify', authenticateToken ,datacheck , (req , res)=>
{
    res.json({message :  "This route is protected"})
});
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))