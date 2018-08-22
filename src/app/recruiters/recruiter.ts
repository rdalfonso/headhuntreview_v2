import { IReview } from '../reviews/review';

export interface IRecruiter {
    id: number;
    uniqueId: string;
    name: string;
    title: string;
    linkedIn: string;
    email: string;
    level: string;
    isapproved: number;
    reviews: Array<IReview>;
}
