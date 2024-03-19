export interface UserProfile {
    _id:          string;
    idFirebase:   string;
    favorites:    string[];
    transactions: string[];
    token:        string;
    statusCode?:  number;
}
