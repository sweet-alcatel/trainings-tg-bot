export class CreateUserDto {
  telegramID: string;
  name: string;
  username: string;
  height: string;
  weight: string;
  goals: string;
  injuries: string;
  comment: string;
}

export class UpdateUserDto {
  name: string;
  username: string;
  height: string;
  weight: string;
  goals: string;
  injuries: string;
  comment: string;
}
