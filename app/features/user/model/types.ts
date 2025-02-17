interface User {
  name: string;
  sex: UserSex;
  weight: UserParameter;
  height: UserParameter;
}

type UserSex = "male" | "female";

interface UserParameter {
  value: number;
  date: Date;
}
