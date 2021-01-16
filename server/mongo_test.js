const   express=require('express')
const cors=require('cors')
const   api=require('./api')
const   assert=require('assert')
const   app=express()
const port=3000
app.use('/api',api) 
app.use(cors())

app.listen(port,()=>{
    console.log(`connected to the express server`)
})