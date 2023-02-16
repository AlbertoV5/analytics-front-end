
interface LoginButtonProps extends React.PropsWithChildren {
}

const LoginButton = ({children}: LoginButtonProps) => {
  return (
    <button type="submit" className="btn btn-success mx-1" style={{width: "5em", fontWeight: 500}}>
        {children}
    </button>
  )
}

export default LoginButton