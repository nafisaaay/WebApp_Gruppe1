
// Interface for logg-inn skjemaet
export interface LoginInput {
    email: string;
    password: string;
}

// Interface for profilsiden:
export interface UserProfile {
    studentNr: string; //bruker studentnr som ID også.
    name: string;
    birthDate: Date;
    studiested: string;
    rolle: string;
}