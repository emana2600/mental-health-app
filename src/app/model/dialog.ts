export class Dialog {
  id : number = 0
  role : string = ""
  content:string = ""

  constructor(id: number, subject: string, message: string) {
    this.id = id;
    this.role = subject;
    this.content = message;
  }
}
