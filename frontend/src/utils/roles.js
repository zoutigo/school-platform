import { useSelector } from 'react-redux'

const useRoles = () => {
  const {
    User: { roles, exp },
  } = useSelector((state) => state.user)

  const TokenIsValid = new Date().getTime() / 1000 < exp

  const apelMembre = roles?.find((role) => role.entity.alias === 'apel')
  const ogecMembre = roles?.find((role) => role.entity.alias === 'ogec')
  const catechiste = roles?.find((role) => role.entity.alias === 'pastorale')
  const aesh = roles?.find((role) => role.entity.alias === 'aesh')

  const psEnseignant = roles?.find(
    (role) =>
      role.entity.alias === 'ps' && role.name === 'enseignant' && TokenIsValid
  )
  const msEnseignant = roles?.find(
    (role) =>
      role.entity.alias === 'ms' && role.name === 'enseignant' && TokenIsValid
  )
  const gsEnseignant = roles?.find(
    (role) =>
      role.entity.alias === 'gs' && role.name === 'enseignant' && TokenIsValid
  )
  const cpEnseignant = roles?.find(
    (role) =>
      role.entity.alias === 'cp' && role.name === 'enseignant' && TokenIsValid
  )
  const ce1Enseignant = roles?.find(
    (role) =>
      role.entity.alias === 'ce1' && role.name === 'enseignant' && TokenIsValid
  )
  const ce2Enseignant = roles?.find(
    (role) =>
      role.entity.alias === 'ce2' && role.name === 'enseignant' && TokenIsValid
  )
  const cm1Enseignant = roles?.find(
    (role) =>
      role.entity.alias === 'cm1' && role.name === 'enseignant' && TokenIsValid
  )
  const cm2Enseignant = roles?.find(
    (role) =>
      role.entity.alias === 'cm2' && role.name === 'enseignant' && TokenIsValid
  )

  return {
    apelMembre,
    ogecMembre,
    psEnseignant,
    msEnseignant,
    gsEnseignant,
    cpEnseignant,
    ce1Enseignant,
    ce2Enseignant,
    cm1Enseignant,
    cm2Enseignant,
  }
}

export default useRoles
