import { useSelector } from 'react-redux'

const useRoles = () => {
  const {
    User: { roles, exp },
  } = useSelector((state) => state.user)

  const TokenIsValid = new Date().getTime() / 1000 < exp

  // const apelMembre = roles?.find((role) => role.entity.alias === 'apel')
  // const ogecMembre = roles?.find((role) => role.entity.alias === 'ogec')
  // const catechiste = roles?.find((role) => role.entity.alias === 'pastorale')

  const psEnseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'ps' && role.name === 'enseignant'
    ).length > 0
  const msEnseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'ms' && role.name === 'enseignant'
    ).length > 0
  const gsEnseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'gs' && role.name === 'enseignant'
    ).length > 0
  const cpEnseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'cp' && role.name === 'enseignant'
    ).length > 0
  const ce1Enseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'ce1' && role.name === 'enseignant'
    ).length > 0
  const ce2Enseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'ce2' && role.name === 'enseignant'
    ).length > 0
  const cm1Enseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'cm1' && role.name === 'enseignant'
    ).length > 0
  const cm2Enseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'cm2' && role.name === 'enseignant'
    ).length > 0
  const adaptationEnseignant =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter(
      (role) => role.entity.alias === 'adaptation' && role.name === 'enseignant'
    ).length > 0
  const apelMembre =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter((role) => role.entity.alias === 'apel').length > 0
  const ogecMembre =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter((role) => role.entity.alias === 'ogec').length > 0
  const catechiste =
    TokenIsValid &&
    Array.isArray(roles) &&
    roles.filter((role) => role.entity.alias === 'pastorale').length > 0

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
    adaptationEnseignant,
  }
}

export default useRoles
