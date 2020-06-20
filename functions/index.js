const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const sgMail = require('@sendgrid/mail');

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;

sgMail.setApiKey(API_KEY);

const getStartedConfirmation = functions.auth.user().onCreate((user) => {
  const msg = {
    to: user.email,
    from: 'hello@vitalmindps.com',
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      name: user.displayName,
    },
  };

  return sgMail.send(msg);
});

const newFormEmail = functions.firestore
  .document('forms/{formId}')
  .onCreate(async (change, context) => {
    const postSnap = await db
      .collection('forms')
      .doc(context.params.formId)
      .get();
    const post = postSnap.data();

    const msg = {
      to: post.email,
      from: 'hello@vitalmindps.com',
      templateId: TEMPLATE_ID,
      dynamic_template_data: {
        name: post.displayName,
      },
    };

    return sgMail.send(msg);
  });

module.exports = {
  getStartedConfirmation,
  newFormEmail,
};
