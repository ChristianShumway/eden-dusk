export interface RequestNewsLetter {
  email: string;
}

export interface ResponseNewsLetter {
  message: string;
  token: string;
  email: string;
  unsubscribeUrl: string;
}
