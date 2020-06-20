const form = document.getElementById('cuestionario');
const nextButton = document.createElement('button');
const prevButton = document.createElement('button');
let currentQuestion = 1;

nextButton.innerText = 'Siguiente';
nextButton.addEventListener('click', () => nextQuestion('next'));

prevButton.innerText = 'Anterior';
prevButton.addEventListener('click', () => nextQuestion('prev'));

const nextQuestion = (action) => {
  if (action === 'next') {
    currentQuestion = currentQuestion + 1;
  } else {
    currentQuestion = currentQuestion - 1;
  }

  Array.from(form.children).forEach((element) => {
    const number = element.getAttribute('pregunta');

    if (!number) {
      return;
    }

    if (currentQuestion == number) {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  });
};

const createInputByType = ({ type, respuestas, name }) => {
  const inputNode = document.createElement('div');
  inputNode.classList.add('form-group');

  switch (type) {
    case 'checkbox':
    case 'radio':
      respuestas.forEach((e) => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-control');
        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('id', `${e}-${name}`);
        input.setAttribute('name', name);
        input.setAttribute('value', e);
        input.addEventListener('change', (e) => {
          console.log(e.target.value);
          nextQuestion('next');
        });
        formGroup.appendChild(input);

        const label = document.createElement('label');
        label.setAttribute('for', `${e}-${name}`);
        label.innerText = e;
        formGroup.appendChild(label);
        inputNode.appendChild(formGroup);
      });
      return inputNode;

    case 'select':
      const select = document.createElement('select');
      select.setAttribute('name', name);
      select.setAttribute('id', name);
      select.addEventListener('change', (e) => {
        console.log(e.target.value);
        nextQuestion('next');
      });
      respuestas.forEach((e) => {
        const option = document.createElement('option');
        option.setAttribute('value', e);
        option.innerText = e;
        select.appendChild(option);
      });
      inputNode.appendChild(select);
      return inputNode;

    default:
      break;
  }
};

const formBuilder = () => {
  formArray.forEach((pregunta, index) => {
    const { name } = pregunta;
    const node = document.createElement('div');
    node.classList.add('pregunta');
    node.setAttribute('pregunta', index + 1);
    if (currentQuestion === index + 1) {
      node.classList.add('show');
    } else {
      node.classList.remove('show');
    }
    const titleNode = document.createElement('h2');

    titleNode.innerHTML = name;
    node.appendChild(titleNode);

    const input = createInputByType(pregunta);

    node.appendChild(input);
    form.appendChild(node);
  });
  form.appendChild(prevButton);
  form.appendChild(nextButton);
};

formBuilder();
