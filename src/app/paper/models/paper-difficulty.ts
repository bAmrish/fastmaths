// export enum Difficulty { EASY = 1, MEDIUM, HARD}
export const DifficultyValues: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];
export type Difficulty = typeof DifficultyValues[number];
