import { useSelector } from 'react-redux'

const useRoles = () => {
  const {
    User: { roles },
  } = useSelector((state) => state.user)

  const apelMembre = roles?.find((role) => role.entity.alias === 'apel')
  const ogecMembre = roles?.find((role) => role.entity.alias === 'ogec')
  const psEnseignant = roles?.find(
    (role) => role.entity.alias === 'ps' && role.name === 'enseignant'
  )
  const msEnseignant = roles?.find(
    (role) => role.entity.alias === 'ms' && role.name === 'enseignant'
  )
  const gsEnseignant = roles?.find(
    (role) => role.entity.alias === 'gs' && role.name === 'enseignant'
  )
  const cpEnseignant = roles?.find(
    (role) => role.entity.alias === 'cp' && role.name === 'enseignant'
  )
  const ce1Enseignant = roles?.find(
    (role) => role.entity.alias === 'ce1' && role.name === 'enseignant'
  )
  const ce2Enseignant = roles?.find(
    (role) => role.entity.alias === 'ce2' && role.name === 'enseignant'
  )
  const cm1Enseignant = roles?.find(
    (role) => role.entity.alias === 'cm1' && role.name === 'enseignant'
  )
  const cm2Enseignant = roles?.find(
    (role) => role.entity.alias === 'cm2' && role.name === 'enseignant'
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
