export class Review {
  constructor(
    public title: string,
    public body: string,
    public stars: number,
    public recruiterId: string,
    public candidateFbId: string,
    public isTooAggressive: number,
    public isDishonestJob: number,
    public isPersonalInfo: number,
    public isFakeProfile: number
  ) {
  }
}
