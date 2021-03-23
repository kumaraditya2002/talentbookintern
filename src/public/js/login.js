const emails = document.getElementById('email');
const p = document.getElementById('password')

const form = document.getElementById('form');

form.addEventListener('submit',registerUser);

async function registerUser(e){
    e.preventDefault();
    let email=emails.value;
    let password=p.value;
    // console.log(email,password)
    const res = await fetch('/signin',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
           email,
           password
        })
    }).then(resp=>resp.json())
    
    if(res.error)
        alert(JSON.stringify(res.error))
    if(res.message==="Invalid Password")
        alert("Invalid Password")
    else if(res.message==="User not found please signup")
        alert("User not found please signup");
    if(res.token)
        location.assign('/feedbackform')
}