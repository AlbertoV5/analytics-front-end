import type { DatabaseVersion } from '../../../api'


const VersionInfo = ({version}: {version: DatabaseVersion}) => {
  return (
    <div className="d-flex justify-content-between mt-2 mb-0">
        <p className="form-text"> Description: { version ? version.description ? version.description : null : null } </p>
        <p className="form-text"> 
          Last Updated: { version ? version.date ? `${version.date.split('T').slice(0, 1) }` : null : null}
          , by: { version ? version.author ? version.author : null : null}
        </p>
    </div>
  )
}

export default VersionInfo