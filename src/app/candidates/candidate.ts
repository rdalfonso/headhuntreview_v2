import { IReview } from '../reviews/review';

export interface ICandidate {
    uniqueId: string;
    name: string;
    title: string;
    email: string;
    adminLevel: number;
    fireBaseId: string;
    reviews: Array<IReview>;
}
