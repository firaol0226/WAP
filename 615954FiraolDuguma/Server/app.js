const express=require('express');
const productRouter=require('./route/productRouter');
const shoppingCartRouter=require('./route/shoppingCartRouter')
const path=require('path');

const cors=require('cors');
let app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
let db = [
    {id: 1, username: 'John', password: '111'},
    {id: 2, username: 'Fira', password: '222'}
];

app.use(express.static(path.join(__dirname,'public')));
app.use('/products',productRouter);
app.use('/shoppingCart',shoppingCartRouter);

//place inside router
app.post('/login', (req, res, next)=> {
    console.log(req.body)
    const user = db.find(user => user.username === req.body.username && user.password === req.body.password);
    if(user){
        res.json({accessToken: `${user.id}-${user.username}-${Date.now().toString()}`})
    } else {
        res.json({error: 'Invalid username or password!'});
    
    }
});
app.listen(4000,()=>{
    console.log('Server is started');
})