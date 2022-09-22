function validateData(){
    let username = document.getElementById("username")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let usererror = document.getElementById("usererror")
    let emailerror = document.getElementById("emailerror")
    let emailFormat = /^([A-Za-z0-9_\.])+\@([A-Za-z0-9_\.])+\.([A-Za-z]{2,4})$/
    let buttonFun = document.getElementById("buttonFun")
    let buttonError = document.getElementById("buttonError")
    let buttonOut = document.getElementById("buttonOut")

    console.log("data",username)

    if(username.value == "" || email.value == "" || password.value == ""){
        error.textContent = "Please enter the above empty fields"
        error.style.color = "red"
    }
    else{
        error.textContent = "";
    }
    if(username.value.length < 5){
        usererror.textContent = "Username would consist more than 5 characters"
        usererror.style.color = "red"
    }
    else{
        usererror.textContent = ""
    }
    if(email.value.match(emailFormat)){
        emailerror.textContent = ""
    }
    else{
        emailerror.textContent = "Enter valid Email ID"
        emailerror.style.color = "red"
    }
    
    let data = {}
    data.username = username.value
    data.email = email.value
    data.password = password.value

    $.ajax({
        url:"http://localhost:8000/",
        type:"POST",
        headers: {
            'Content-Type': 'application/json'
            },
        data:JSON.stringify(data),
        success: (response) => {
            username.value = ""
            email.value = ""
            password.value = ""
            error.textContent = "Data Added Successfully"
            error.style.color = "green"
            console.log("Data Added Succcessfully")
            getData()
        }
    })
}

function getData(){
    output = ""
    $.ajax({
    url:"http://localhost:8000/",
    type:"GET",
    dataType:"json",
    headers: {
        'Content-Type': 'application/json'
        },
    success:function(data){
        console.log(data)
        if(data){
            console.log('done')
            data.data.map((data)=>{
                $('tbody').append(`<tr><td>  ${data.id} </td><td>${data.username}
                    </td><td>${data.email}</td><td> <button class='btn btn-warning btn-sm btn-edit' data-sid='${data.id}'>Edit</button> <button class='btn btn-danger btn-sm btn-del' data-sid='${data.id}'>Delete</button</td></tr>`)
            })
        }
        else{
            a = ""
        }
        console.log(output)
    
    }
})
}

$(document).ready(function () {

$("tbody").on("click", ".btn-del", function(){
    console.log("Delete button clicked")
    let id = $(this).attr("data-sid");
    $.ajax({
        url:"http://localhost:8000/getdata/" + id,
        type:"DELETE",
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            location.reload()
        },
    })
})

$("tbody").on("click", ".btn-edit", function(){
    console.log("Edit button clicked");
    let id = $(this).attr("data-sid");
    $.ajax({
        url:"http://localhost:8000/getdata/" + id,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success:function(data){
            console.log(data.data)
            $('#empid').val(data.data.id)
            $('#username').val(data.data.username)
            $('#email').val(data.data.email)
            $('#password').val(data.data.password)
            $("#updateDetails").show();
            $('#submit').hide();
        },
    });
});

$("#updateDetails").on("click", function(){
    console.log("Edit button clicked");
    let id = $('#empid').val()

    let data = {
        username : $('#username').val(),
        email : $('#email').val(),
        password: $('#password').val(),
    }
    $.ajax({
        url:"http://localhost:8000/getdata/" + id,
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data), 
        success:function(data){
            console.log(data.data)
            $("#updateDetails").hide();
            $('#submit').show();
            location.reload()
        },
    });
});
})

function doubleClick(){
    alert("Please click button once it will work by a single click, Don't Hurry!")
}
function buttonFun(){
    buttonError.innerHTML = 
    "<strong>This button is only to distract you please focus on the login form, Thanks :)</strong>"
    return false;
}
function buttonOut(){
    buttonError.innerHTML = ""
}
getData()