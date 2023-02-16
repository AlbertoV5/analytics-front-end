import { Input, FormError } from "./components/Input";
import { useSession } from "./hooks/useSession";
import { getUserDetails } from "./auth/user";
import { FormEvent, useState } from "react";

import type { AuthFlowFormProps } from "./AuthFlow";
import LoginButton from "./components/LoginButton";

/** Form and validation for User Login */
const LoginForm = ({setForm, setPayload, redirect_url}: AuthFlowFormProps) => {
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
              window.location.href = redirect_url;
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
        <LoginButton>Login</LoginButton>
      </div>
    </form>
  )
}

export default LoginForm