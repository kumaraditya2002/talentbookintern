const email = document.getElementById('email');
const name = document.getElementById('name')
const age = document.getElementById('age')
const s1 = document.getElementById('s1')
const s2 = document.getElementById('s2')
const rb=document.getElementsByClassName('r1')
const cb = document.getElementsByClassName('cb1')


const form = document.getElementById('form');

form.addEventListener('submit',registerUser);
// console.log(rb)
async function registerUser(event){
    event.preventDefault();
    let n = name.value;
    let e=email.value;
    let a=age.value;
    let select1=s1.value;
    let select2=s2.value;
    let rbvalue;
    let cbvalue=[];
    
    Array.from(rb).forEach(element=>{
        if(element.checked)
            rbvalue=element.value;
    })
    Array.from(cb).forEach(element=>{
        if(element.checked)
            cbvalue.push(element.value);
    })
    // console.log(n,e,a,select1,select2,rbvalue,cbvalue);
    const res = await fetch('/fillform',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
           n,
           e,
           a,
           select1,
           select2,
           rbvalue,
           cbvalue
        })
    }).then(resp=>resp.json())
    if(res.error){
        alert(JSON.stringify(res.error))
        console.log(res.error)
    }else if(res.form)
        alert("your form has been submitted successfully")
}