import { FC } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import IUser from "../../main/interfaces/IUser";
import "./register.css";

const Register: FC = () => {
  const { register, handleSubmit } = useForm<IUser>();

  const onSubmit = handleSubmit((data) => {
    axios
      .post("https://localhost:5001/api/authentication/register", data)
      .then((res) => {
        console.log(res);
      });
  });

  return (
    <div className="singup">
      <div className="signup__container">
        <h1>Sign-Up</h1>
        <form onSubmit={onSubmit}>
          <label>First Name</label>
          {/* <input name="firstName" {...register("firstName")} /> */}
          <input
            name="firstName"
            {...register("firstName", { required: true, maxLength: 20 })}
          />

          <label>Last Name</label>
          <input name="lastName" {...register("lastName")} />

          <label>Email</label>
          <input type="email" name="email" {...register("email")} />

          <label>Birthdate</label>
          <input type="date" name="birthdate" {...register("birthdate")} />

          <label>Phone</label>
          <input name="phone" {...register("phone")} />

          <label>Username</label>
          <input name="username" {...register("username")} />

          <label>Password</label>
          <input type="password" name="password" {...register("password")} />

          <button
            type="submit"
            value={"signup"}
            className="signup__signUpButton"
          >
            Sign-up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
