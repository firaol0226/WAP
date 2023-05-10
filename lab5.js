"use strict"
//1
function max(num1, num2){
    if(num1>num2) return num1;
    else return num2;

}
console.log(max(3,4));
//2
function maxOfThree(num1, num2, num3){
    if(num1>=num2&&num1>=num3) return num1;
    else if(num2>=num1&&num1>=num3) return num2;
    else return num3;
}
console.log(maxOfThree(4,4,3));
//3
function  isVowel(char){
    return char=="a"||char=="e"||char=="o"||char=="u"||char=="i"?true:false;
}
console.log(isVowel('a'));
//4
function sum(arr){
    let sum=0;
    for(let element of arr){
        sum+=element;
    }
    return sum;

}
console.log(sum([1,2,3,4]));
function multiply(arr){
    let product=1;
    for(let element of arr){
        product*=element;
    }
    return product;

}
console.log(multiply([1,2,3,4]));
//5
function reverse(string){
    return string.split("").reverse().join(""); 
}
console.log(reverse("hello fira"));

//6
function findLongestWord(array){
    let max=-Infinity;
    let maxWord="";
    for(let element of array){
        if(element.length>max) maxWord=element;
    }
    return maxWord;
}
console.log(findLongestWord(["Fira","Firaol","Duguma"]));
//7
function filterLongWords(array,int) {
    return array.filter(item=>item.length>int);
}
console.log(filterLongWords(["Fira","Firaol","Duguma"],4));
//8
function computeSumOfSquares(array){
   let arr=array.map(item=>item*item);
   return arr.reduce((a,b)=>a+b);
}
console.log(computeSumOfSquares([1,2,3,4]));
//9
function  printOddNumbersOnly(array){
    let arr=array.filter(item=>item%2!=0);
    console.log(arr);
}
printOddNumbersOnly([1,25,6,7]);
//10 Error
function computeSumOfSquaresOfEvensOnly(array){
    return array.filter(a=>a%2==0)  .map(b=>b*b).reduce((a,b)=>a+b,0);
}
console.log(computeSumOfSquaresOfEvensOnly([1,2,3,4]));
//11
function sum2(arr){
    return arr.reduce((a,b)=>a+b,0);
}
console.log(sum2([1,2,3,4]));
function multiply2(arr){
    return arr.reduce((a,b)=>a*b,1);
}
console.log(multiply2([1,2,3,4]));

//12
function printFibo(n, a, b){
    var arr=[a,b];
    for(let i=0;i<n-2;i++){
        arr.push(arr[i]+arr[i+1]);
    }
    return arr;
}
console.log(printFibo(10,0,1));

console.log("=================");
function sayHi() {
    console.log(this);
    }
    sayHi(); // undefined
    
 






    
    





