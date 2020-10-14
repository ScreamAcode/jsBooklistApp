document.addEventListener("DOMContentLoaded" , displayBooks);
// constructor function for books
function books(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//Storage
 function getBooks(){
    let books ;
    if((localStorage.getItem("books")) === null){
        books =[];
    }else{
        books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
 }
 function addBook(book){
     const books = getBooks();

     books.push(book);

    localStorage.setItem("books" ,JSON.stringify(books));
 }

 function removeBook(isbn){
     const books = getBooks();
     books.forEach((book,index)=>{
         if(book.isbn === isbn){
             books.splice(index,1);
         }
     });

     localStorage.setItem("books",JSON.stringify(books));
 }
// displaybooks
function displayBooks(){
    const books = getBooks();
    books.forEach((book)=>{
        addBookToList(book);
    })
}
// addbooktolist
function addBookToList(book){

    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    ` ;
    list.appendChild(row);
}
// getting input values and validation
document.querySelector("#bookForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    
    if(title === '' || author === '' || isbn === ''){
        showAlert("Please fill all the fields","alert-danger");
    }else{
        var book = new books(title,author,isbn);

        addBookToList(book);

        addBook(book);

        showAlert("Book added successfully","alert-success");

        clearFields();
    }
})
// alert message
function showAlert(message,className){
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form  = document.querySelector("#bookForm");
    container.insertBefore(div,form);

    setTimeout(()=>{
        document.querySelector(".alert").remove()
    },3000)
}

// to clear fields after submitting
function clearFields(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}
// Remove book from storage
document.querySelector("#book-list").addEventListener("click",(e)=>{
    deleteBooks(e.target);
    removeBook(e.target.parentElement.previousElementSibling.textContent);
});
function deleteBooks(el){ 
    if(el.classList.contains("delete")){
        el.parentElement.parentElement.remove();
        showAlert("Book removed succesfully","alert-success");
    }
}