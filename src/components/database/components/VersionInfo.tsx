import type { DatabaseVersion } from '../../../api'


const VersionInfo = ({version}: {version: DatabaseVersion}) => {
  return (
    <div className="row">
        <div className='col-6 text-start'>
            <p className="form-text"> Description: { version ? version.description ? version.description : null : null } </p>
        </div>
        <div className='col-6 text-end' style={{lineHeight: "0.5em"}}>
            <p className="form-text"> Version: { version ? version.date ? version.date.replace('T', ' ') : null : null} </p>
            <p className="form-text"> Last Modified by: { version ? version.author ? version.author : null : null} </p>
        </div>
    </div>
  )
}

export default VersionInfo