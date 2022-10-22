var bookName = document.getElementById('bookName');
var bookCategory = document.getElementById('bookCategory');
var bookPrice = document.getElementById('bookPrice')
var bookAbout = document.getElementById('aboutBook');
var addBtn = document.getElementById('addBtn');
var inputs = document.getElementsByClassName('form-control');
var nameAlert= document.querySelector('.error1');
var categAlert= document.querySelector('.error2');
var priceAlert= document.querySelector('.error3');

var currentIndex=0;
var books=[];

if(JSON.parse(localStorage.getItem('books list')!=null))
{
    books = JSON.parse(localStorage.getItem('books list'));
    displayBook();

}

addBtn.onclick= function () {
    if(addBtn.innerHTML=="Add to the shelve"){
        addBook();
        
    }
    else{
        update();
        addBtn.innerHTML="Add to the shelve";
    }


displayBook();
reset()

}
function addBook(){
    var book={
        name:bookName.value,
        category:bookCategory.value,
        price:bookPrice.value,
        about:bookAbout.value,
    }
    books.push(book);
    localStorage.setItem("books list", JSON.stringify(books));
}

function displayBook(){
    var Cartone='';
    for(var i=0;i<books.length;i++){
        Cartone+=`<tr>
        <td>${books[i].name}</td>
        <td>${books[i].category}</td>
        <td>${books[i].price}</td>
        <td>${books[i].about} </td> 
        <td>
        <i onclick="setBook(${i})" class="fa-regular fa-pen-to-square"></i>
        </td>
        <td>
        <i onclick="deleteBook(${i})" class="fa-regular fa-trash-can " ></i>
        </td>
        </tr>`
    }
    document.getElementById("content").innerHTML= Cartone;

}
function reset (){
    for(var i=0;i<inputs.length;i++)
    {
       inputs[i].value="";
    }
}

function deleteBook(index){
books.splice(index,1);
localStorage.setItem("books list", JSON.stringify(books));

displayBook();
}

function search(searchItem){
    var Cartone='';
    for(var i=0;i<books.length;i++){
    if(books[i].name.toLowerCase().includes(searchItem.toLowerCase())){
        Cartone+=`<tr>
        <td>${books[i].name}</td>
        <td>${books[i].category}</td>
        <td>${books[i].price}</td>
        <td>${books[i].about} </td> 
        <td>
        <i class="fa-regular fa-pen-to-square"></i>
        </td>
        <td>
        <i onclick="deleteBook(${i})" class="fa-regular fa-trash-can " ></i>
        </td>
        </tr>`

    }
   
}
    document.getElementById("content").innerHTML= Cartone;
   

}

function setBook(index){
    currentIndex=index;
    bookName.value=books[index].name;
    bookCategory.value=books[index].category;
    bookPrice.value=books[index].price;
    bookAbout.value=books[index].about;
    addBtn.innerHTML= "Add your change";
}
 function update(){
    var newBook={
        name:bookName.value,
        category:bookCategory.value,
        price:bookPrice.value,
        about:bookAbout.value,
    }
    books[currentIndex]=newBook;
    localStorage.setItem("books list", JSON.stringify(books));
    
 }
 bookName.addEventListener('keyup',function(){
    var nameRegex=/^[A-Z][a-z]{2,20}$/
    if(nameRegex.test(bookName.value)){
        addBtn.removeAttribute('disabled'); 
        nameAlert.classList.add('d-none')

    }
    else{
        addBtn.disabled="true";
        nameAlert.classList.remove('d-none')
    }
 })



 bookCategory.addEventListener('keyup',function(){
    var categRegex=/^[A-Z][a-z]{2,8}$/
    if(categRegex.test(bookCategory.value)){
        addBtn.removeAttribute('disabled'); 
        categAlert.classList.add('d-none')

    }
    else{
        addBtn.disabled="true";
        categAlert.classList.remove('d-none')
    }
 })


 bookPrice.addEventListener('keyup',function(){
    var priceRegex=/^([1-9][0-9]|100)$/
    if(priceRegex.test(bookPrice.value)){
        addBtn.removeAttribute('disabled'); 
        priceAlert.classList.add('d-none')

    }
    else{
        addBtn.disabled="true";
        priceAlert.classList.remove('d-none')
    }
 })

