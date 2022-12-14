// setting the variables
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
const search=document.querySelector("input")
const values=document.querySelector("#values")
let idFlag=false
let firstFlag=false
let lastFlag=false
let capsuleFlag=false
let ageFlag=false
let genderFlag=false
let cityFlag=false
let hobbyFlag=false

let userArr=[]


const fetchData= async ()=>{ //getting the data from the two groups 
    let response=await fetch("https://capsules7.herokuapp.com/api/group/one")
    let groupOne=await response.json()
    response=await fetch("https://capsules7.herokuapp.com/api/group/two")
    let groupTwo=await response.json()

    await loopOverArr(groupOne)
    await loopOverArr(groupTwo,groupOne.length)
    
}

fetchData()


search.addEventListener("keyup",e=>{ 
    let userArrTemp=userArr; //use temporary arr to keep the userarr not changed
    if (e.key==="Enter"){
        let paragraphs=document.querySelectorAll("p") 
        paragraphs.forEach(x=>{ //remove all data from the page
            x.remove()
        })
        let buttons = document.querySelectorAll("button");
        buttons.forEach(x=>x.remove()) //remove all buttons from the page
        userArrTemp= userArrTemp.filter(x=>x[values.value]==search.value) //if arr at chosen option=search=>filter
        if(!search.value){
            userArrTemp=userArr //if search is empty, will print all the users
        }
        userArrTemp.forEach((x,i)=>{ //for ech user at the new arr
            printFunc(x,i)
        })

    }
    

    })

const loopOverArr= async (arr,pos=0)=>{
for(let i=0;i<arr.length;i++){
    let user=await arr[i]
    makeUserArr(user)
    await loopOverId(user.id,i+pos)
    printFunc(user,i+pos)

 
}
}

const makeUserArr=async (user)=>{ //push the data from two user groups into one arr
    userArr.push(user)
    
}


const printFunc=async(user,i)=>{ //prints data and buttons to page with helper functions
    printHelper(0,ids,user,i) 
    printHelper(1,firstNames,user,i) 
    printHelper(2,lastNames,user,i)
    printHelper(3,capsule,user,i)
    printHelper(4,age,user,i)
    printHelper(5,gender,user,i)
    printHelper(6,city,user,i)
    printHelper(7,hobby,user,i)
    addButtons(i)

}

const printHelper=async(dataIndex,div,user,i)=>{ //runs over each element and prints the data for every user+add index class
    let element=document.createElement("p")
    element.classList.add(i)
    element.innerHTML=Object.values(user)[dataIndex]
    element.classList.add("element-padding")
    div.appendChild(element)
}

const addButtons=(i)=>{ //gets the i and makes as many buttons as needed
    let editBtn=document.createElement("button")
    editBtn.classList.add(`${i}`)
    editBtn.innerHTML="edit"
    editBtns.appendChild(editBtn)

    let deleteBtn=document.createElement("button")
    deleteBtn.classList.add(`${i}`)
    deleteBtn.innerHTML="delete"
    deleteBtns.appendChild(deleteBtn)
}

const loopOverId= async(id,i)=>{ //add the additional data about each id to the arr
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
    let paragraphs=document.querySelectorAll("p")//remove everything from the page
    paragraphs.forEach(x=>{
        x.remove()
    })
    let buttons = document.querySelectorAll("button"); //remove the buttons
    buttons.forEach(x=>x.remove()) 

    //flag if for us to know if we are sorting normally or reverse
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
    if(e.target.classList.contains(className)){ //if the click target is a specific column sort this column
        if(!flag){
            userArr=userArr.sort(sortingFunc) //every column has it own sorting func
            flag=true;
        }
        else if(flag){
            userArr=(userArr.sort(sortingFunc)).reverse() //reverse if sorting from the end first
            flag=false;
        }
        
        userArr.forEach((x,i)=>{ //print for each item of the new arr
            printFunc(x,i)
        })
        return flag //return the flag, so the next time you click it will be changed
    }
}

//the sorting func gets each object from the array and compares between them
//locale compare is used because it's a string
const sortId =(a,b) => a.id.localeCompare(b.id)
const sortFirst=(a,b)=>a.firstName.localeCompare(b.firstName)
const sortLast=(a,b)=>a.lastName.localeCompare(b.lastName)
const sortCapsule=(a,b)=>a.capsule>(b.capsule)?1:-1
const sortAge=(a,b)=>a.age>(b.age)?1:-1
const sortGender=(a,b)=>a.gender.localeCompare(b.gender)
const sortCity=(a,b)=>a.city.localeCompare(b.city)
const sortHobby=(a,b)=>a.hobby.localeCompare(b.hobby)



deleteBtns.addEventListener("click",x=>{

    userArr.splice(x.target.classList.value,1)//remove the object from the arr at the row we want to delete
    let paragraphs=document.querySelectorAll("p") //delete all the text from the page
    paragraphs.forEach(x=>{
        x.remove()
    })
    let buttons = document.querySelectorAll("button");//delete all the buttons from the page
    buttons.forEach(x=>x.remove())
    userArr.forEach((x,i)=>{
        
        printFunc(x,i) //print the new arr without the deleted object
    })

    
})

editBtns.addEventListener("click",x=>{ //make the specific eow editable
 let rowAtI=document.getElementsByClassName(`${x.target.classList.value}`)


    rowAtI[1].contentEditable="true"
    rowAtI[2].contentEditable="true"
    rowAtI[3].contentEditable="true"
    rowAtI[4].contentEditable="true"
    rowAtI[5].contentEditable="true"
    rowAtI[6].contentEditable="true"
    rowAtI[7].contentEditable="true"


})