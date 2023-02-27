export type Operator = 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE';

export interface Question {
  id: string;
  operator: Operator;
  firstNumber: number;
  secondNumber: number;
  answer: null | number;
  solution: number;
  answered: boolean;
  isCorrect: boolean;
}
