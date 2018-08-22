import { IRecruiter } from '../recruiters/recruiter';

export interface ICompany {
    uniqueId: string;
    name: string;
    url: string;
    industry: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    isapproved: number;
    recruiters: Array<IRecruiter>;
}
