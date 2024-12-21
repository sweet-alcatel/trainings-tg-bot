export class CreateUserDto {
  telegramID: number;
  name: string;
  username: string;
  height: string;
  weight: string;
  goals: string;
  injuries: string;
  comment: string;
  role: 'ADMIN' | 'USER';
}

export class UpdateUserDto {
  telegramID: number;
  name: string;
  height: string;
  weight: string;
  goals: string;
  injuries: string;
  comment: string;
  role: 'ADMIN' | 'USER';
}
