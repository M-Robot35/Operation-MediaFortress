export default new Vue({
  el: "#header",

  data: {
    titulo: "< DesProgramadorBr />",
  },

  template: `
    <nav class="navbar bg-body-tertiary">
    
    <div class="container-fluid">
      <a class="navbar-brand">{{ titulo }}</a>
            
    </div>

  </nav>
    `,
});