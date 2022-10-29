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
const editBtns=document.querySelector(".editBtns")
const deleteBtns=document.querySelector(".deleteBtns")
let idFlag=false
let firstFlag=false
let lastFlag=false
let capsuleFlag=false
let ageFlag=false
let genderFlag=false
let cityFlag=false
let hobbyFlag=false

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
    printFunc(user,i+pos)

    let editBtn=document.createElement("button")
    editBtn.classList.add(`${i+pos}`)
    editBtn.innerHTML="edit"
    editBtns.appendChild(editBtn)

    let deleteBtn=document.createElement("button")
    deleteBtn.classList.add(`${i+pos}`)
    deleteBtn.innerHTML="delete"
    deleteBtns.appendChild(deleteBtn)
}
}

const makeUserArr=async (user)=>{
    userArr.push(user)
    
}


const printFunc=async(user,i)=>{
    printHelper(0,ids,user,i) //! print id
    printHelper(1,firstNames,user,i) //! print first name
    printHelper(2,lastNames,user,i)
    printHelper(3,capsule,user,i)
    printHelper(4,age,user,i)
    printHelper(5,gender,user,i)
    printHelper(6,city,user,i)
    printHelper(7,hobby,user,i)

}

const printHelper=async(dataIndex,div,user,i)=>{
    let element=document.createElement("p")
    element.classList.add(i)
    element.innerHTML=Object.values(user)[dataIndex]
    element.classList.add("element-padding")
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
    capsuleFlag=sortingBackAndForth("capsule-btn",sortCapsule,e,capsuleFlag)
    ageFlag=sortingBackAndForth("age-btn",sortAge,e,ageFlag)
    genderFlag=sortingBackAndForth("gender-btn",sortGender,e,genderFlag)
    cityFlag=sortingBackAndForth("city-btn",sortCity,e,cityFlag)
    hobbyFlag=sortingBackAndForth("hobby-btn",sortHobby,e,hobbyFlag)

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
        
        userArr.forEach((x,i)=>{
            printFunc(x,i)
        })
        return flag
    }
}

const sortId =(a,b) => a.id.localeCompare(b.id)
const sortFirst=(a,b)=>a.firstName.localeCompare(b.firstName)
const sortLast=(a,b)=>a.lastName.localeCompare(b.lastName)
const sortCapsule=(a,b)=>a.capsule>(b.capsule)?1:-1
const sortAge=(a,b)=>a.age>(b.age)?1:-1
const sortGender=(a,b)=>a.gender.localeCompare(b.gender)
const sortCity=(a,b)=>a.city.localeCompare(b.city)
const sortHobby=(a,b)=>a.hobby.localeCompare(b.hobby)



deleteBtns.addEventListener("click",x=>{

    userArr.splice(x.target.classList.value,1)
   
    let paragraphs=document.querySelectorAll("p")
    paragraphs.forEach(x=>{
        x.remove()
    })
    userArr.forEach((x,i)=>{
        printFunc(x,i)
    })
    
    
})

editBtns.addEventListener("click",x=>{
 let rowAtI=document.getElementsByClassName(`${x.target.classList.value}`)


    rowAtI[1].contentEditable="true"
    rowAtI[2].contentEditable="true"
    rowAtI[3].contentEditable="true"
    rowAtI[4].contentEditable="true"
    rowAtI[5].contentEditable="true"
    rowAtI[6].contentEditable="true"
    rowAtI[7].contentEditable="true"
 
    
    

})