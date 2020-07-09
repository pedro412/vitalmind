'use strict';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBq0hP_C9flceWUJ3AB2OQtlf2AOuGA6w4',
  authDomain: 'vimind-3526e.firebaseapp.com',
  projectId: 'vimind-3526e',
});

const db = firebase.firestore();

console.log(db);

var app = new Vue({
  el: '#app',
  data: {
    currentQuestion: 1,
    questions: formArray,
    answers: [],
    isChecked: false,
    name: '',
    email: '',
    phone: '',
    success: false,
  },
  watch: {
    currentQuestion: function () {
      this.getCurrentQuestion();
    },
  },
  methods: {
    getCurrentQuestion() {
      const current = this.questions[this.currentQuestion - 1];
      if (current?.type === 'checkbox') {
        this.isChecked = true;
      } else {
        this.isChecked = false;
      }
    },
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
          }
        } else {
          question.answers.splice(index, 1);
        }
      }
    },
    handleSubmit() {
      const form = {
        displayName: this.name,
        email: this.email,
        answers: this.answers,
      };

      db.collection('forms')
        .add(form)
        .then((docRef) => {
          this.success = true;
        })
        .catch((err) => {
          console.error('Error adding document: ', error);
        });
    },
  },
});
