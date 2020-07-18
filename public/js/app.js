'use strict';

'use strict';

var app = new Vue({
  el: '#app',
  data: {
    currentQuestion: 1,
    questions: formArray,
    answers: [],
    isChecked: false,
    isLoading: false,
    name: '',
    email: '',
    phone: '',
    success: false,
    edad: 0,
    genero: '',
    orientacionSexual: '',
    situacionSentimental: '',
    hasTomadoTerapia: false,
    saludFisica: '',
    sentimientos: '',
    ganasDeHacerCosas: '',
    vinculoEmocional: '',
    meCuestaDefinirme: '',
    heSentidoAnsiedad: '',
    meCuestaPonerLimites: '',
    problemasParaDormir: '',
    estado: '',
  },
  watch: {
    currentQuestion: function currentQuestion() {
      this.getCurrentQuestion();
    },
  },
  methods: {
    getCurrentQuestion: function getCurrentQuestion() {
      var current = this.questions[this.currentQuestion - 1];

      if (
        (current === null || current === void 0 ? void 0 : current.type) ===
        'checkbox'
      ) {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    },
    onChange: function onChange(event, name, type) {
      if (type === 'checkbox') {
        this.handleCheckbox(event, name, type);
        return;
      }

      this[name] = event.target.value;
      this.currentQuestion += 1;
    },
    handleCheckbox: function handleCheckbox(event, name, type) {
      var question = this.answers.find(function (a) {
        return a.question === name;
      });

      if (!question) {
        // si no existe crea el objeto con un arreglo inicial con el primer value
        this.answers.push({
          question: name,
          type: type,
          answers: [event.target.value],
        });
      } else {
        // si ya existe hay que checkar si viene cheked para ver si se agrega o se quita
        var index = question.answers.indexOf(event.target.value);

        if (event.target.checked) {
          if (index < 0) {
            question.answers.push(event.target.value);
            this[name] = question.answers.toString();
            console.log(this[name]);
          }
        } else {
          question.answers.splice(index, 1);
          this[name] = question.answers.toString();
        }
      }
    },
    handleSubmit: function handleSubmit() {
      var _this = this;
      this.isLoading = true;

      var form = {
        nombre: this.name,
        correo: this.email,
        telefono: this.phone,
        edad: this.edad,
        genero: this.genero,
        orientacionSexual: this.orientacionSexual,
        situacionSentimental: this.situacionSentimental,
        hasTomadoTerapia: this.hasTomadoTerapia,
        saludFisica: this.saludFisica,
        sentimientos: this.sentimientos,
        ganasDeHacerCosas: this.ganasDeHacerCosas,
        vinculoEmocional: this.vinculoEmocional,
        meCuestaDefinirme: this.meCuestaDefinirme,
        heSentidoAnsiedad: this.heSentidoAnsiedad,
        meCuestaPonerLimites: this.meCuestaPonerLimites,
        problemasParaDormir: this.problemasParaDormir,
        estado: this.estado,
      };
      window
        .fetch('https://vimind-3526e.uc.r.appspot.com/contactos', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(form),
        })
        .then(function (resp) {
          return resp.json();
        })
        .then(function (resp) {
          console.log(resp);
          _this.success = true;
          _this.isLoading = false;
        });
    },
  },
});
