import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { Grid } from '@material-ui/core'
import CredentialDatas from './CredentialDatas'
import ChildrenDatas from './ChildrenDatas'
import RolesDatas from './RolesDatas'
import GradeDatas from './GradeDatas'
import PasswordDatas from './PasswordDatas'
import { StyledPersoDataCollapse } from './Style'
import { apiFecthUserDatas } from '../../../../../utils/api'
import useFetchDispatch from '../../../../elements/useFetchDispatch'
import { setPrivateAccountFetchAlert } from '../../../../../redux/alerts/AlertsActions'

function PersoDataList({ setForm, form, toggle, setToggle, setData }) {
  const {
    User: { id },
  } = useSelector((state) => state.user)
  const queryKey = [`data-${id}`]

  const { credentialsform, rolesform, passwordform, childrenform, gradeform } =
    form

  const { isLoading, isError, error, data } = useQuery(queryKey, () =>
    apiFecthUserDatas(id)
  )

  // hook to dispatch alerts
  useFetchDispatch(isLoading, isError, error, data, setPrivateAccountFetchAlert)

  useEffect(() => {
    if (data) {
      setData(data)
    }
  }, [data])

  const credentialdatas = {
    genre: data ? data.gender : null,
    prénom: data ? data.firstname : null,
    nom: data ? data.lastname : null,
    Téléphone: data ? data.phone : null,
    email: data ? data.email : null,
  }
  const grades = {
    moderateur: data ? data.isModerator : null,
    manager: data ? data.isManager : null,
    admin: data ? data.isAdmin : null,
  }

  return (
    <Grid item container>
      {data && (
        <>
          <StyledPersoDataCollapse in={toggle === 'list' || credentialsform}>
            <CredentialDatas
              credentialdatas={credentialdatas}
              toggle={toggle}
              setForm={setForm}
              setToggle={setToggle}
            />
          </StyledPersoDataCollapse>
          <StyledPersoDataCollapse in={toggle === 'list' || childrenform}>
            <ChildrenDatas
              childrenClasses={data ? data.entities : []}
              toggle={toggle}
              setForm={setForm}
              setToggle={setToggle}
            />
          </StyledPersoDataCollapse>
          <StyledPersoDataCollapse in={toggle === 'list' || rolesform}>
            <RolesDatas
              roles={data ? data.roles : null}
              toggle={toggle}
              setForm={setForm}
              setToggle={setToggle}
            />
          </StyledPersoDataCollapse>
          <StyledPersoDataCollapse in={toggle === 'list' || gradeform}>
            <GradeDatas
              grades={grades}
              toggle={toggle}
              setForm={setForm}
              setToggle={setToggle}
            />
          </StyledPersoDataCollapse>
          <StyledPersoDataCollapse in={toggle === 'list' || passwordform}>
            <PasswordDatas
              toggle={toggle}
              setForm={setForm}
              setToggle={setToggle}
            />
          </StyledPersoDataCollapse>
        </>
      )}
    </Grid>
  )
}

PersoDataList.propTypes = {
  setForm: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
  form: PropTypes.shape({
    credentialsform: PropTypes.bool,
    childrenform: PropTypes.bool,
    rolesform: PropTypes.bool,
    passwordform: PropTypes.bool,
    gradeform: PropTypes.bool,
  }).isRequired,
  toggle: PropTypes.string.isRequired,
}
export default PersoDataList
