export class CreateEventDto{
  readonly title: string;
  readonly content: string;
  readonly userId: number;
  readonly dateOfEvent: string;
  readonly organization: string;
  readonly address: string;
  readonly gradeStart: number;
  readonly gradeEnd: number;
  readonly length: string;
}