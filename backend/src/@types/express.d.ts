// override type declaration from Express
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
