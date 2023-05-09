export type ElectionCardProps = {
  electionName: string;
  electionLocation: string;
  electionDate: string;
  electionTotal: number;
  onClick?: () => void;
};

// export type RegisterFormTypes = {
//   currentPage: number;
//   currentIsValid: boolean;
//   enroll: {
//     valid: boolean;
//     value: {
//       identitification_number: string;
//       fullname: string;
//       register_id: string;
//     };
//   };
//   create_password: {
//     valid: boolean;
//     value: {
//       password: string;
//       password_confirmation?: string;
//     };
//   };
// };

export type WalletEnrollTypes = {
  identificationNumber: string | null;
  fullName: string | null;
  registerId: string | null;
};

export type InAppPasswordTypes = {
  password: string;
  passwordConfirmation:string;
}