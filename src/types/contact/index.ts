export type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type ContactField = keyof ContactFormState;
