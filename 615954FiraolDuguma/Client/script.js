var productsAdded=[];
var obj={};
var idQty={};
var idQtyCollector=[]
var cartProducts=[];
window.load= getProducts();
// window.load=addProducts(1);
// let pathModule =require('path');

let user={
    id:'1',
    name:'fira',
    passWord:'111'
}
let arr=[];


async function getProducts(){
    let data= await fetch('http://localhost:4000/products/');
    let json =await data.json();
    console.log(json);
    for(let product of json){

        addRow(product.id,product.name,product.price,product.imageUrl,product.quantity,product.cartUrl);
    }
    for(let product of json){
        document.getElementById(parseInt(product.id)).addEventListener('click',function(){addProducts(product.id)});//,{ once: true }
    }

   

}


function addRow(id,name,price,imageUrl,quantity,cartUrl){
    let row =document.createElement('tr');
    row.setAttribute('id',id);
    for(let i=1;i<arguments.length;i++){
        if(i!==3&&i!==5){
            let e=arguments[i];
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(e));
            row.appendChild(cell);
        }
        else if(i==3){
            let imgSrc=arguments[i];
            let image=document.createElement('img');
            image.setAttribute('id','iconId');
            let imageCell = document.createElement('td');
            // image.src=`../ServerSide/public/${imgSrc}`;
            image.src=`http://localhost:4000/${imgSrc}`;

            image.alt='Product Image';
            imageCell.appendChild(image);
            row.appendChild(imageCell);
        }
        else{
            let imgSrc=arguments[i];
            let button=document.createElement('button');
            button.setAttribute('id',id);
            button.style.backgroundImage = `url('http://localhost:4000/${imgSrc}')`;
            button.style.backgroundSize = 'cover';
            button.style.width = '30px';
            button.style.height = '30px';
            button.style.border = 'none';
            let buttonCell = document.createElement('td');
            buttonCell.appendChild(button);
            row.appendChild(buttonCell);
        }
    }
    document.getElementById('proudctTableBody').appendChild(row);
}


async function addProducts(prodId){
    let response = await fetch('http://localhost:4000/shoppingCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({prodId})
  });
  
  let products = await response.json();
  let product=products[0];
  addRowCart(product.id,product.name,product.price,product.price*product.quantity,product.quantity);

}



function addRowCart(id,name,price,total,quantity){
    document.getElementById("tableCart").style.display='table';
    document.getElementById("cartEmpty").style.display='none';
    document.getElementById("orderButton").style.display='unset';
    

    console.log(productsAdded)
    if(!productsAdded.includes(parseInt(id))){

        productsAdded.push(parseInt(id));

        let row =document.createElement('tr');
        row.setAttribute('id',id+'cart');
        for(let i=1;i<arguments.length;i++){
            if (i!==4){//&&i!==3){
                let e = arguments[i];
                let cell = document.createElement('td');
                cell.appendChild(document.createTextNode(e));
                row.appendChild(cell);

                if(i==3){
                    cell.setAttribute('id',id+'change');
                    
                }
            }

            else{
                // let e = arguments[i];
                let e=1;
                let cell = document.createElement('td');

                var quantityControl = document.createElement('div');
                    quantityControl.classList.add('quantity-control');

                    const minusBtn = document.createElement('button');
                    minusBtn.classList.add('quantity-btn', 'minus-btn');
                    minusBtn.textContent = '-';
                    minusBtn.addEventListener('click', minusEvent);
                    //link button with quantity

                    

                    function minusEvent(){
                        let value = parseInt(input.value);
                        if (value==1){//and total price = 0
                            document.getElementById(id+'cart').remove();
                            // document.getElementById(id+'change').innerText=0;
                            productsAdded=productsAdded.filter(prod=>prod!==parseInt(id));
                            calculateTotalPrice();

                        }
                        else if (value > 1) {
                            value--;
                            input.value = value;
                        }
                        if(document.getElementById(id+'change')){
                        document.getElementById(id+'change').innerText=document.getElementById(id+'in').value*parseInt(price);
                        
                        }// updateQuantityMinus(id);
                        calculateTotalPrice();
                        collectorMinus();
                    }

                    function plusEvent(){
                        let value = parseInt(input.value);
                        if(value<quantity){
                            value++;
                        }
                        input.value = value;
                        if(document.getElementById(id+'change')){
                        document.getElementById(id+'change').innerText=document.getElementById(id+'in').value*parseInt(price);
                        }
                        calculateTotalPrice();
                        collector();
                        // updateQuantityPlus(id);
                    }

                    var input = document.createElement('input');
                    input.classList.add('quantity-input');
                    input.setAttribute('id',id+'in');
                    input.type = 'number';
                    input.value = `${e}`;
                    input.min = '0';
                    // obj.id=input.value;

                    // input.addEventListener("input",updateTotalPrice);

                    const plusBtn = document.createElement('button');
                    plusBtn.classList.add('quantity-btn', 'plus-btn');
                    plusBtn.textContent = '+';
                    plusBtn.addEventListener('click', plusEvent);

                    quantityControl.appendChild(minusBtn);
                    quantityControl.appendChild(input);
                    quantityControl.appendChild(plusBtn);

                cell.appendChild(quantityControl);
                // cell.appendChild(document.createTextNode(e));
                row.appendChild(cell);
            }
            
        }
        document.getElementById('cartTableBody').appendChild(row);
    }
    else{ 
        console.log(quantity)
        console.log( document.getElementById(id+'in').value<quantity);
        if(document.getElementById(id+'in').value<quantity){
        //just increase the quntity
        console.log('else if')
        console.log( document.getElementById(id+'in').value);
        document.getElementById(id+'in').value++;
      }
    }

    document.getElementById(id+'change').innerText=document.getElementById(id+'in').value*parseInt(price);
    calculateTotalPrice();
    collector();


    function calculateTotalPrice() {
        let tableBody = document.getElementById('cartTableBody');
        let rows = tableBody.getElementsByTagName('tr');
        let totalPrice = 0;
    
        for (let i = 0; i < rows.length; i++) {
        let priceCell = rows[i].getElementsByTagName('td')[2]; 
        let price = parseFloat(priceCell.innerText);
        totalPrice += price;
        }
    
        // Update the total price display
        document.getElementById('totPrice').innerText = totalPrice.toFixed(2);
    }

    function collector(){
        if(idQtyCollector.length==0){
            idQtyCollector.push([id,1]);
        }
        else{
            idQtyCollector.forEach(arr=>{
                if(arr[0]==parseInt(id)){
                    arr[1]++;
                }
                else{
                    idQtyCollector.push([id,1]);
                }
            })
        }
         console.log(idQtyCollector);
    }

    function collectorMinus(){
        if(idQtyCollector.length==0){
            return;
        }
        for(let i =0;i<idQtyCollector.length;i++){
        if( idQtyCollector[i][0]==parseInt(id)){
                if(idQtyCollector[i][1]==1){
                    idQtyCollector.splice(i,1);
                }
                else idQtyCollector[i][1]--;
        }
        else{
            return;
            }   
        }
        console.log(idQtyCollector);
    }
    async function placingEvent(){
        console.log(idQtyCollector)
        let response = await fetch('http://localhost:4000/shoppingCart/', {
                            method: 'PUT',
                            headers: {
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(idQtyCollector)
                        });
                        // let data = await response.json();

        document.getElementById("tableCart").style.display='none';
        document.getElementById("orderButton").style.display='none';
        document.getElementById("cartEmpty").style.display='unset';
        location.reload();
    }

        let placeOrder=document.getElementById('orderButton');
        placeOrder.addEventListener('click', placingEvent);   
    
}

document.getElementById('logoutBtn').addEventListener('click',logoutEvent)

function logoutEvent(event){
    console.log('inside logout')
    event.preventDefault();
    window.location.href = './index.html';
}

document.getElementById('uname').innerText=sessionStorage.getItem('accessToken').split('-')[1];

















  
// var idQty=[];
// var idQtyCollector=[]







  


// async function updateQuantityPlus(prodId){
//     let response = await fetch('http://localhost:4000/shoppingCart', {
//     method: 'PUT',
//     headers: {
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({prodId:prodId,plus:true})
// });

// }
// async function updateQuantityMinus(prodId){
//     let response = await fetch('http://localhost:4000/shoppingCart', {
//     method: 'PUT',
//     headers: {
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({prodId:prodId,plus:false})
// });

// }


