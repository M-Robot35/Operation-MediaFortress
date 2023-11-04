export default {
    btn_download: document.getElementById("loading"),
    btn_write : document.getElementById("load_write"),

    load_on: function(){
        this.btn_download.style.display='block'
        this.btn_write.style.display='block'
    },

    load_off: function(){
        this.btn_download.style.display='none'
        this.btn_write.style.display='none'
    }

}