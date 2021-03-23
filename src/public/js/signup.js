const n = document.getElementById('name')
const emails = document.getElementById('email');
const p = document.getElementById('password')

const form = document.getElementById('form');

form.addEventListener('submit',registerUser);

async function registerUser(e){
    // console.log("ASDSD");
    e.preventDefault();
    let Name=n.value;
    let email=emails.value;
    let password=p.value;
    console.log(Name,email,password)
    const res = await fetch('/signup',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
           Name,
           email,
           password
        })
    }).then(resp=>resp.json())
    if(res.error)
        alert(JSON.stringify(res.error))
    if(res.message==="User created Successfully..!"){
        alert("User created Successfully..!")
    }else if(res.message==="Something went wrong")
        alert("wronggggg");
    else if(res.message==="User already registered")
        alert("User already registered please login")
}