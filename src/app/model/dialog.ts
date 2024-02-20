export class Dialog {
  id : string | undefined
  role : string = ""
  content:string = ""
  date = new Date()

  constructor(id: string, subject: string, message: string,date = new Date()) {
    this.id = id;
    this.role = subject;
    this.content = message;
    this.date = date

  }
}
