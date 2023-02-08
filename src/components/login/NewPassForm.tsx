import { Input, FormError} from "./components/Input";
import { LoginFormProps, REDIRECT_URL } from "./LoginIsland";
import { useSession } from "./hooks/useSession";
import { FormEvent, useState } from "react";

const passwordErrors = [
  {
    match: "uppercase characters", 
    message: "Password must have uppercase characters."
  },
  {
    match: "not long enough",
    message: "Password must be at least 16-characters long.",
  }
]

const NewPassForm = ({payload}: LoginFormProps) => {
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
          window.location.href = REDIRECT_URL;
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
        >User Login
        </h4>
        <p className={"form-text text-center text-success"}>Please set a new password</p>
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
        <button type="submit" className="btn btn-primary mx-1 rounded-0" style={{width: "5em", fontWeight: 500}}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default NewPassForm