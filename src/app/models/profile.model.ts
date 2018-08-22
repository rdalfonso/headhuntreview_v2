export class Profile {
  constructor(
    public name: string,
    public email: string,
    public title: string,
    public password1: string,
    public password2: string,
    public adminLevel: number,
    public fireBaseId: string,
    public candidateId: string,
  ) {
  }
}
