import { ContactNumber } from './entities';
import { GENDER_TYPE } from './enums';

export interface Pagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type SignUpRequest = {
  email?: string;
  contactNumber?: ContactNumber;
};

export type LoginRequest = {
  email?: string;
  contactNumber?: ContactNumber;
  password: string;
};

export type UserRegisterRequest = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender: GENDER_TYPE;
  language: string;
  contactNumber: ContactNumber;
  email: string;
  registrationReferralCode?: string;
};

export type UserUpdateRequest = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  language?: string;
  profilePicture?: string;
};
