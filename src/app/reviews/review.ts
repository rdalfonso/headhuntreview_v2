import { ICandidate } from '../candidates/candidate';

export interface IReview {
  id: number;
  uniqueId: string;
  title: string;
  body: string;
  stars: number;
  date: string;
  isapproved: number;
  reviews: Array<ICandidate>;
}
