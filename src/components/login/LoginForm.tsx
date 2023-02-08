import { Input, FormError} from "./components/Input";
import { useSession } from "./hooks/useSession";
import { REDIRECT_URL } from "./LoginIsland"
import { getUserDetails } from "./auth/user";
import { FormEvent, useState } from "react";

import type { LoginFormProps } from "./LoginIsland";

/** Form and validation for User Login */
const LoginForm = ({setForm, setPayload}: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<FormError | undefined>(undefined);
  const { setSession, getSession } = useSession();
  /** Use AWS congito to handle the login results. */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const {user, authDetails} = getUserDetails(username, password);
      user.authenticateUser(authDetails, {
          onSuccess: (data) => {
              setPassword('');
              setError({isInvalid: false, message: ''});
              setSession({
                token: data.getIdToken().getJwtToken(), 
                refresh: data.getRefreshToken().getToken()
              });
              window.location.href = REDIRECT_URL;
          },
          onFailure: (error) => {
              setPassword('');
              setError({isInvalid: true, message: error.message});
          },
          newPasswordRequired: (userAttributes, requiredAttributes) => {
              setPayload({user: user, attributes: userAttributes});
              setForm('newPass');
          }
      })
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={"container border p-5 rounded-1"}
      style={{width:"20em"}}
    >
      <h4 
        className={"mb-2 text-center"}
      >User Login
      </h4>
      <p className={"form-text text-center"}>Enter your User Information</p>
      <Input
        name="Username"
        type="text"
        value={username}
        setValue={setUsername}
        error={error}
        required
      />
      <Input
        name="Password"
        type="password"
        value={password}
        setValue={setPassword}
        error={error}
        required
      />
      <div className="mb-3">
        <div id="feedback-invalid" className="form-text text-danger">
          {error?.message}
        </div>
      </div>
      <div className={"d-flex justify-content-center pt-2"}>
        <button type="submit" className="btn btn-primary mx-1 rounded-0" style={{width: "5em", fontWeight: 500}}>
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm