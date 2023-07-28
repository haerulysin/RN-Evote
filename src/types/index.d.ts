export type RootStackParamList = {
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  SettingShowCertificate: undefined;
  LandingPage: undefined;
  Login: undefined;
  LoginLanding: undefined;
}

export type ElectionStackParamList = {
  ElectionVoting: { electionID: string };
  Election: undefined;
  ElectionDetail: undefined;
  ElectionVotingConfirmation: { selectedCandidateID: string; };
  ElectionVotingFinalize: { selectedCandidateID: string; };

}
export type Election = {
  electionID?: string;
  electionName: string;
  electionLocation: string;
  electionDate: { from: string; to: string; };
  electionShowResult: boolean;
  totalVotes?: number;
  docType: string;
};

export type Participant = {
  participantID?: number;
  participantRegisterID: number;
  participantName: string;
  electionID?: string;
  docType: string;
};

export type Ballot = {
  ballotID?: string;
  electionID: string;
  ballotVotableItem: string;
  pick?: string;
  isCasted: boolean;
  isDeleted: boolean;
  docType: string;
};

export type Candidate = {
  candidateID?: string;
  candidateName: string;
  candidateDescription: string;
  candidatePhotoURL?: string;
  docType: string;
};

export const enum HLDocType {
  Election = "Election",
  Participant = "Participant",
  Ballot = "Ballot",
  Candidates = "Candidate",
}

export type JobData = {
  uid: string;
  txName: string;
  txArgs: string[];
  txState?: Buffer;
  txIds: string[];
};

export type JobResult = {
  txPayload?: Buffer;
  txError?: string;
};

export type JobSummary = {
  jobId: string;
  txIds: string[];
  txPayload?: string;
  txError?: string;
};

export type ElectionCardProps = {
  electionID?: string;
  electionName: string;
  electionLocation: string;
  electionDate: { from: string; to: string; };
  electionShowResult: boolean;
  totalVotes?: number;
  docType: string;
  onClick?: () => void;
};

export type EnrollFormTypes = {
  voterID: string | null;
  voterRegisterID: string | null;
  voterName: string | null;
};

export type InAppPasswordTypes = {
  password: string;
  passwordConfirmation: string;
}

export type EnrollResponse = {
  certificate: string;
  privateKey: string;
}

export type EnrollProcessResponse = EnrollResponse & {
  uid: string
}

export type APIResponseType = {
  status: number
  data: object
}