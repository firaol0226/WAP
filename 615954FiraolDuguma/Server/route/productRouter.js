let express =require('express');
let productController=require('../controller/productController');

let router=express.Router();

router.get('/:id',productController.getById);
router.get('/',productController.getAll);
router.post('/',productController.save);
router.put('/:id',productController.edit);
router.delete('/:id',productController.delete);

module.exports=router;

