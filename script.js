const container=document.querySelector(".container")
const ids=document.querySelector(".ids")
const firstNames=document.querySelector(".firstNames")
const lastNames=document.querySelector(".lastNames")
const capsule=document.querySelector(".capsule")
const age=document.querySelector(".age")
const gender=document.querySelector(".gender")
const city=document.querySelector(".city")
const hobby=document.querySelector(".hobby")


const fetchData= async ()=>{
    let response=await fetch("https://capsules7.herokuapp.com/api/group/one")
    let groupOne=await response.json()
    response=await fetch("https://capsules7.herokuapp.com/api/group/two")
    let groupTwo=await response.json()

    await loopOverArr(groupOne)
    await loopOverArr(groupTwo)
    
}

fetchData()


const loopOverArr= async (arr)=>{
for(let i=0;i<arr.length;i++){
    let user=await arr[i]
    printFunc(user.id,ids) //!print ids
    printFunc(user.firstName,firstNames) //!print firstNames
    printFunc(user.lastName,lastNames) //!print lastNames
    loopOverId(user.id)
    
}
}

const printFunc=async(element,div)=>{
    
    let printElement=document.createElement("p")
    printElement.innerHTML=element
    div.appendChild(printElement)
}


const loopOverId= async(id)=>{
let response= await fetch(`https://capsules7.herokuapp.com/api/user/${id}`)
let data=await response.json()
printFunc(data.capsule,capsule)
printFunc(data.age,age)
printFunc(data.gender,gender)
printFunc(data.city,city)
printFunc(data.hobby,hobby)
}



