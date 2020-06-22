'use strict';

var app = new Vue({
  el: '#app',
  data: {
    currentQuestion: 1,
    questions: formArray,
    answers: [],
    isChecked: false,
  },
  methods: {
    onChange(event, name, type) {
      if (type === 'checkbox') {
        this.handleCheckbox(event, name, type);
        return;
      }

      const question = this.answers.find((a) => a.question === name);

      if (!question) {
        this.answers.push({ question: name, answer: event.target.value });
      } else {
        this.answers.find((a) => a.question === name).answer =
          event.target.value;
      }

      this.currentQuestion += 1;
    },
    handleCheckbox(event, name, type) {
      const question = this.answers.find((a) => a.question === name);

      if (!question) {
        this.isChecked = true;
        // si no existe crea el objeto con un arreglo inicial con el primer value
        this.answers.push({
          question: name,
          type,
          answers: [event.target.value],
        });
      } else {
        // si ya existe hay que checkar si viene cheked para ver si se agrega o se quita
        const index = question.answers.indexOf(event.target.value);

        if (event.target.checked) {
          if (index < 0) {
            question.answers.push(event.target.value);
            console.log(question);
          }
        } else {
          question.answers.splice(index, 1);
          console.log('dele', question);
        }
      }
    },
  },
});
