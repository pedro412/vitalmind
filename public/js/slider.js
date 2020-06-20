'use strict';
const image = document.getElementById('pasosImage');
const pasosNode = document.getElementsByClassName('pasos');
const activeBall = document.createElement('div');
let currentStep = 1;

const createSteps = () => {
  Array.from(pasosNode[0].children).forEach((element, index) => {
    element.setAttribute('step', index + 1);
    element.addEventListener('mouseenter', () => {
      currentStep = element.getAttribute('step');
      setActiveToCurrentStep();
      getImageForStep();
    });
  });
};

const setActiveToCurrentStep = () => {
  Array.from(pasosNode[0].children).forEach((element, index) => {
    if (index + 1 == currentStep) {
      element.classList.add('active');
      element.appendChild(activeBall);
    } else {
      element.classList.remove('active');
    }
  });
};

const getImageForStep = () => {
  image.src = `./assets/step${currentStep}.png`;
};

createSteps();
setActiveToCurrentStep();
getImageForStep();
