import { Input, FormError} from "./components/Input";
import type { AuthFlowFormProps } from "./AuthFlow";
import { useSession } from "./hooks/useSession";
import { FormEvent, useState } from "react";
import LoginButton from "./components/LoginButton";

const passwordErrors = [
  {
    match: "uppercase characters", 
    message: "Password must have uppercase characters."
  },
  {
    match: "not long enough",
    message: "Password must be at least 8-characters long.",
  }
]

const NewPassForm = ({payload, redirect_url}: AuthFlowFormProps) => {
  const { setSession, getSession } = useSession();
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [error, setError] = useState<FormError | undefined>(undefined);
  /** Use AWS congito to handle the new pass results. */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (newPass !== confirmNewPass){
        setError({isInvalid: true, message: 'Passwords do not match.'})
        return;
      }
      payload?.user?.completeNewPasswordChallenge(newPass, {}, {
        onSuccess: (data) => {
          setError({isInvalid: false, message: ''});
          setSession({
            token: data.getIdToken().getJwtToken(), 
            refresh: data.getRefreshToken().getToken()
          });
          window.location.href = redirect_url;
        },
        onFailure: (error) => {
          const errors = passwordErrors.filter(e => error.message.includes(e.match));
          if (errors.length > 0)
            return setError({isInvalid: true, message: errors[0].message});
          setError({isInvalid: true, message: error.message});
        },
      });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={"container border p-5 rounded-1"}
      style={{width:"20em"}}
    >
        <h4 
          className={"mb-2 text-center"}
        >Set Password
        </h4>
        <p className={"form-text text-center text-success"}>Please include lowercase, uppercase, number, and symbol.</p>
        <Input
            name="New Password"
            type="password"
            value={newPass}
            setValue={setNewPass}
            error={error}
            required
        />
        <Input
            name="Confirm Password"
            type="password"
            value={confirmNewPass}
            setValue={setConfirmNewPass}
            error={error}
            required
        />
      <div className="mb-3">
        <div id="feedback-invalid" className="form-text text-danger">
          {error?.message}
        </div>
      </div>
      <div className={"d-flex justify-content-center pt-2"}>
        <LoginButton>Submit</LoginButton>
      </div>
    </form>
  )
}

export default NewPassForm