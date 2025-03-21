export interface Answer {
  id: number;
  content: string;
  isCorrect: boolean;
}

export interface Problem {
  id: number;
  title: string;
  image?: string;
  answerList: Answer[];
}

export interface CreateProblemDto {
  title: string;
  image?: string;
  answerList: Omit<Answer, "id">[];
}

export interface UpdateProblemDto {
  title?: string;
  image?: string;
  answerList?: Omit<Answer, "id">[];
}
