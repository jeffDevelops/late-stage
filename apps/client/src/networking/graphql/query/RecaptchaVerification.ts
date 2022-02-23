export const recaptchaVerification = `#graphql
  query RecaptchaVerification($recaptchaResultToken: String!) {
    recaptchaVerification(recaptchaResultToken: $recaptchaResultToken)
  }
`
