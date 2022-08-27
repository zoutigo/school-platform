import { useCallback } from 'react'
import { useSelector } from 'react-redux'

const useRoles = () => {
  const { User } = useSelector((state) => state.user)
  const { roles, exp } = User

  // const apelMembre = roles?.find((role) => role.entity.alias === 'apel')
  // const ogecMembre = roles?.find((role) => role.entity.alias === 'ogec')
  // const catechiste = roles?.find((role) => role.entity.alias === 'pastorale')

  const defineRoles = useCallback(() => {
    const TokenIsValid = new Date().getTime() / 1000 < exp
    const psEnseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-ps').length > 0
    const msEnseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-ms').length > 0
    const gsEnseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-gs').length > 0
    const cpEnseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-cp').length > 0
    const ce1Enseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-ce1').length > 0
    const ce2Enseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-ce2').length > 0
    const cm1Enseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-cm1').length > 0
    const cm2Enseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-cm2').length > 0
    const adaptationEnseignant =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'enseignant-adaptation').length > 0
    const apelMembre =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'membre-apel').length > 0
    const ogecMembre =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'membre-ogec').length > 0
    const catechiste =
      TokenIsValid &&
      Array.isArray(roles) &&
      roles.filter((role) => role.slug === 'animateur-pastorale').length > 0

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
  }, [User])

  return defineRoles()
}

export default useRoles
