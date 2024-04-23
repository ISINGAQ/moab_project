export class CreateAchievementDto{
  readonly title: string;
  readonly content: string;
  readonly userId: number;
  readonly achievementGradeId: number;
  readonly achievementTypeId: number;
  readonly dateOfObtained: string;
  readonly direction: string;
}