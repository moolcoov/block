interface User {
  name: string;
  sex: UserSex;
  weight: UserParameter;
  height: UserParameter;

  xp: number;
  coins: number;
}

type UserSex = "male" | "female";

interface UserParameter {
  value: number;
  date: Date;
}
