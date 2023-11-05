export default new Vue({
    el: "#footer",
    
    data:{
        name1:'Thiago Teles',
        linkedin1:'https://www.linkedin.com/in/thiago-teles-a454ab238/',
        github1: 'https://github.com/M-Robot35?tab=repositories',
        name2:'Elias Lopes',
        linkedin2:'https://www.linkedin.com/in/eliaslopes1/',
        github2: 'https://github.com/eliaszlsp'
    },

    template:`
    <footer   class="row container-fluid border-top border-bottom  mb-5">
        <div class="col d-flex flex-row gap-2 text-center justify-content-center">
            <div class="d-flex align-items-center">{{ name1 }}</div>
            <a class="btn btn-outline-primary" :href="linkedin1" target="_blank" rel="noopener noreferrer">Linkedin</a>
            <a class="btn btn-outline-primary" :href="github1" target="_blank" rel="noopener noreferrer">GitHub</a>

        </div>

        <div class="col d-flex flex-row gap-2 text-center justify-content-center">
            <div class="d-flex align-items-center">{{ name2 }}</div>
            <a class="btn btn-outline-primary" :href="linkedin2" target="_blank" rel="noopener noreferrer">Linkedin</a>
            <a class="btn btn-outline-primary" :href="github2" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

    </footer>
    
    `

    
})