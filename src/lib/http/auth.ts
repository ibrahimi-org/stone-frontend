import Parse from "@/configs/http";
import { useRouter } from "next/router";

interface ISignUp {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

interface ISignIn {
  username: string;
  password: string;
}

export async function SignUpAPI(params: ISignUp) {
  //:Promise<Parse.User<ISignUp>>
  // const user = new Parse.User<ISignUp>(params);
  // return user.signUp();

  const user = new Parse.User();
  user.set("username", params.username);
  user.set("password", params.password);
  user.set("email", params.email);

  // other fields can be set just like with Parse.Object
  user.set("phone", "415-392-0202");
  try {
    await user.signUp();
    // Hooray! Let them use the app now.
  } catch (error: any) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error?.code + " " + error?.message);
  }
}

export function SignInAPI(params: ISignIn) {
  //:Promise<Parse.User<ISignIn>>
  console.log(" user -  hii iii ii ii   ");

  // const user = new Parse.User<ISignIn>(params);
  // console.log(" mm 100 - - -  user - -  ", user);

  // return user.logIn();
}

export const isAuthenticated = () => {}; //Parse.User.current()?.authenticated;

export function LogOutAPI() {
  // const user = Parse.User.logOut();
  // return user;
}
