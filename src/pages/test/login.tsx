import { useEffect } from "react";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../main/store/stores/navigation/navigation.store";
import { useForm } from "react-hook-form";
import "./login.css";
import axios from "axios";
import ILoginRequest from "../../main/interfaces/ILoginRequest";
import { setUser } from "../../main/store/stores/user/user.store";

const TestPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginRequest>();

  const onSubmit = handleSubmit((data) => {
    axios
      .post("https://localhost:5001/api/authentication/login", data)
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    console.log(token);
    if (!token || token === "") return;
    axios
      .get("https://localhost:5001/api/authentication/validate-token", {
        headers: {
          token,
        },
      })
      .then((res) => {
        dispatch(setUser({ ...res.data, token }));
        dispatch(navigateTo("/"));
      })
      .catch((err) => console.log(err));
  }, [token]);

  const handleButtonClick = () => {
    navigate("/register");
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>Log-In</h1>
        <form onSubmit={onSubmit}>
          <label>Username</label>
          <input
            name="userName"
            defaultValue="uendi"
            {...register("userName", { required: true })}
          />
          <p style={{ color: "red" }}>
            {" "}
            {errors.userName?.type === "required" && "Username is required"}
          </p>

          <label>Password</label>
          <input
            name="password"
            defaultValue="Uendi17."
            type={"password"}
            {...register("password", { required: true })}
          />
          <p style={{ color: "red" }}>
            {" "}
            {errors.password?.type === "required" && "Password is required"}
          </p>

          <button type="submit" value={"login"} className="login__signInButton">
            Log-in
          </button>
          <p>Not have an account?</p>
          <button
            type="button"
            onClick={handleButtonClick}
            className="login__registerButton"
          >
            Register here
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestPage;
