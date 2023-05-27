let express= require('express');
let shoppingCartController=require('../controller/shoppingCartController');
let router= express.Router();

router.post('/',shoppingCartController.addProduct);
router.put('/',shoppingCartController.updateProduct);

module.exports=router;
