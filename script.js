const container=document.querySelector(".container")
const ids=document.querySelector(".ids")
const firstNames=document.querySelector(".firstNames")
const lastNames=document.querySelector(".lastNames")
const capsule=document.querySelector(".capsule")
const age=document.querySelector(".age")
const gender=document.querySelector(".gender")
const city=document.querySelector(".city")
const hobby=document.querySelector(".hobby")
const buttonDiv=document.querySelector(".btn-div")
let idFlag=false
let firstFlag=false
let lastFlag=false

let userArr=[]


const fetchData= async ()=>{
    let response=await fetch("https://capsules7.herokuapp.com/api/group/one")
    let groupOne=await response.json()
    response=await fetch("https://capsules7.herokuapp.com/api/group/two")
    let groupTwo=await response.json()

    await loopOverArr(groupOne)
    await loopOverArr(groupTwo,groupOne.length)
    
}

fetchData()


const loopOverArr= async (arr,pos=0)=>{
for(let i=0;i<arr.length;i++){
    let user=await arr[i]
    makeUserArr(user)
    await loopOverId(user.id,i+pos)
    printFunc(user)
}
}

const makeUserArr=async (user)=>{
    userArr.push(user)
    
}


const printFunc=async(user)=>{
    printHelper(0,ids,user) //! print id
    printHelper(1,firstNames,user) //! print first name
    printHelper(2,lastNames,user)
    printHelper(3,capsule,user)
    printHelper(4,age,user)
    printHelper(5,gender,user)
    printHelper(6,city,user)
    printHelper(7,hobby,user)
}

const printHelper=async(dataIndex,div,user)=>{
    let element=document.createElement("p")
    element.innerHTML=Object.values(user)[dataIndex]
    div.appendChild(element)
}


const loopOverId= async(id,i)=>{
let response= await fetch(`https://capsules7.herokuapp.com/api/user/${id}`)
let data=await response.json()

let userData= await userArr[i]

userData["capsule"]=data.capsule
userData["age"]=data.age
userData["gender"]=data.gender
userData["city"]=data.city
userData["hobby"]=data.hobby
}



buttonDiv.addEventListener("click",(e)=>{
    let paragraphs=document.querySelectorAll("p")
    paragraphs.forEach(x=>{
        x.remove()
    })
    idFlag= sortingBackAndForth("id-btn",sortId,e,idFlag)
    firstFlag=sortingBackAndForth("firstName-btn",sortFirst,e,firstFlag)
    lastFlag=sortingBackAndForth("lastName-btn",sortLast,e,lastFlag)
})

const sortingBackAndForth = (className,sortingFunc,e,flag) => {
    if(e.target.classList.contains(className)){
        if(!flag){
            userArr=userArr.sort(sortingFunc)
            flag=true;
        }
        else if(flag){
            userArr=(userArr.sort(sortingFunc)).reverse()
            flag=false;
        }
        
        
        userArr.forEach(x=>{
            printFunc(x)
        })
        return flag
    }
}

const sortId =(a,b) => a.id.localeCompare(b.id)
const sortFirst=(a,b)=>a.firstName.localeCompare(b.firstName)
const sortLast=(a,b)=>a.lastName.localeCompare(b.lastName)