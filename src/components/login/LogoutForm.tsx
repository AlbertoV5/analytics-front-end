import { Locked } from "./components/Locked"
import { useSession } from "./hooks/useSession";
import { FormEvent, useState } from "react";
import type { LoginFormProps } from "./LoginIsland";

/** Provide a logout button and current user information. */
const LogoutForm = ({setForm}: LoginFormProps) => {
  const { setSession, getUser } = useSession();
  const [ user, setUser ] = useState(getUser);
  /** Remove session data and set form to login */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setSession(undefined);
    setForm('login');
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={"container border p-5 rounded-1"}
      style={{width:"20em"}}
    >
      <h4 
        className={"mb-2 text-center"}
      >User Info
      </h4>
      <p className={"form-text text-center"}>Current user information</p>
      <Locked
        name="Username"
        value={(user && user.username !== 'undefined') ? user?.username : ''}
      />
      <Locked
        name="Organization"
        value={(user && user.client !== 'undefined') ? user?.client : ''}
      />
      <div className={"d-flex justify-content-center pt-2"}>
        <button type="submit" className="btn btn-primary mx-1 rounded-0" style={{width: "5em", fontWeight: 500}}>
          Logout
        </button>
      </div>
    </form>
  )
}

export default LogoutForm