const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT

app.get('/', (req, res) => {
    res.cookie('foo', 'bar')
    res.send('Hello World!')
})
app.get('/login', (req, res) => {
    const html = `
        <form action="/login?redirect=2" method="post">
            <label>用户名<input name="username" value=""/><label>
            <label>密码<input name="password"/><label>
            <button type="submit">登录</button>
        </form>
    `
    res.send(html)
})

app.post('/login', (req, res)=> {
    res.cookie('user-info', req.body)
    res.json({
        success: true
    })
})

app.get('/setCookie',(req, res ) => {
    res.cookie('user-info', '123')
    res.json({code:200})
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})