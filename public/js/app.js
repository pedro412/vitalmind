'use strict';

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    questions: formArray,
    answers: [],
  },
  methods: {
    onChange(event, name) {
      const question = this.answers.find((a) => a.question === name);
      if (!question) {
        this.answers.push({ question: name, answer: event.target.value });
      } else {
        this.answers.find((a) => a.question === name).answer =
          event.target.value;
      }
      console.log(this.answers);
    },
  },
});
