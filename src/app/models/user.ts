export interface SignInUser {
    $key:string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }
  export interface SignUpUser extends SignInUser
  {
    displayName:string;
  }