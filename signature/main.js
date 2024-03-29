// Le fichier js qui génère la signature





var app = new Vue({
  el: '#app',
  data: {
    prenom:      '',
    nom:         '',
    fonction:    '',
    fix:         '',
    mobile:      '',
    adresses:    adresses, // la liste des adresses stockée dans adresses.js
    adr:         adresses[adr_defaut],
    avecImage:   true,
    logoDDTMpng: logoDDTMpng, // le logo PNG encode en base64 stockéedans base64.js
    signature:   null,
    copied:      false,
    debug:       false,
    code:        false,
    web:         false
  },
  methods: {
    br: function (txt) {
      return txt.split("\n").join("<br>\n");
    },
    title: function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    },
    toggleCode: function() {
      this.code = !this.code;
    },
    setSignature: function(){
      this.signature = this.$el.querySelector("#result").innerHTML;
      this.copied = false;
    }
  },
  ready: function () {
    // Initialisation de clipboard.js
    new ClipboardJS('.btn');
    // surveiller toutes les variantes pour mettre à jour la signature
    this.$watch(
      ()=>this.prenom+this.nom+this.fonction+this.fix+this.mobile+this.adr+this.avecImage,
      this.setSignature,
      { immediate: true }
    );
    // initialisation de la signature pour la première fois (probablement inutile)
    this.setSignature();
    // mettre le focus dans le premier champs à remplir (le Prénom)
    this.$el.querySelector("input").focus();
    // le debug (bouton afficher le code html) est activé si en local
    this.debug = (location.host == "" || location.host == "localhost" )
  }
})


