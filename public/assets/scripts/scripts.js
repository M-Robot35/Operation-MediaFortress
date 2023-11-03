import app from './componentes/components.js'

const darkmode = document.getElementById("modeDark")
const body = document.querySelector('body')
const writeDark = document.getElementById('write-bg')

if(localStorage.key('bg')){
    dark()
}

function dark(){
    body.classList.add('dark_mode')
    writeDark.innerText= 'Light Mode'
    writeDark.classList.add('btn-light')
    writeDark.classList.remove('btn-secondary')
    body.style.transition='1s background-color'
    localStorage.setItem('bg','dark_mode')
}

function ligth(){
    body.classList.remove('dark_mode')   
    writeDark.innerText= 'Dark Mode' 
    writeDark.classList.add('btn-secondary')
    writeDark.classList.remove('btn-light')
    body.style.transition='1s background-color'
    localStorage.removeItem('bg','dark_mode')
}

darkmode.addEventListener('change', (event)=>{
    console.log(localStorage.getItem('bg'))
    const claseBody = body.classList
    if(event.target.checked){
        if(!claseBody.contains('dark_mode')){
            dark()
        }  
        return    
    }    
    ligth()    
})