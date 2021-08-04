/* eslint-disable import/no-named-as-default */
import React from 'react'

import EcoleScreen from '../screens/EcoleScreen'
import EquipeScreen from '../screens/EquipeScreen'
import VieScolaireScreen from '../screens/VieScolaireScreen'
import VieScolaireCantineScreen from '../screens/VieScolaireCantineScreen'
import VieScolaireCantineMenusScreen from '../screens/VieScolaireCantineMenusScreen'
import VieScolaireCantineActivitesScreen from '../screens/VieScolaireCantineActivitesScreen'
import VieScolaireGarderieEtudeScreen from '../screens/VieScolaireGarderieEtudeScreen'
import VieScolaireGarderiePresentationScreen from '../screens/VieScolaireGarderiePresentationScreen'
import VieScolaireGarderieScreen from '../screens/VieScolaireGarderieScreen'
import VieScolaireCantineBrevesScreen from '../screens/VieScolaireCantineBrevesScreen'
import VieScolaireCantineAgendaScreen from '../screens/VieScolaireCantineAgendaScreen'
import VieScolaireHorairesScreen from '../screens/VieScolaireHorairesScreen'
import ClassesScreen from '../screens/ClassesScreen'
import InformationsScreen from '../screens/InformationsScreen'
import ApelOgecScreen from '../screens/ApelOgecScreen'
import EcoleHistoireScreen from '../screens/EcoleHistoireScreen'
import ApelOgecApelScreen from '../screens/ApelOgecApelScreen'
import ApelOgecApelActivitesScreen from '../screens/ApelOgecApelActivitesScreen'
import EcoleProjetsScreen from '../screens/EcoleProjetsScreen'
import EcoleProjetsEducatifScreen from '../screens/EcoleProjetsEducatifScreen'
import EcoleProjetsPedagogiqueScreen from '../screens/EcoleProjetsPedagogiqueScreen'
import EcoleProjetsPastoralScreen from '../screens/EcoleProjetsPastoralScreen'
import EcoleInfrastructuresScreen from '../screens/EcoleInfrastructuresScreen'
import EcoleInfrasrtucturesBatiments from '../screens/EcoleInfrasrtucturesBatiments'
import EcoleInfrastructuresVisiteVirtuelleScreen from '../screens/EcoleInfrastructuresVisiteVirtuelleScreen'
// eslint-disable-next-line import/no-named-as-default
// eslint-disable-next-line import/no-named-as-default-member
import ClassesPresentationScreen from '../screens/ClassesPresentationScreen'

import ClassesActivitesScreen from '../screens/ClassesActivitesScreen'
import InformationsActualitesAgendaScreen from '../screens/InformationsActualitesAgendaScreen'
import InformationsActualitesNewsletterScreen from '../screens/InformationsActualitesNewsletterScreen'
import InformationsActualitesActivitesScreen from '../screens/InformationsActualitesActivitesScreen'
import InformationsActualitesInfoParentsScreen from '../screens/InformationsActualitesInfoParentsScreen'
import InformationsActualitesScreen from '../screens/InformationsActualitesScreen'
import InformationContactsEcrireScreen from '../screens/InformationContactsEcrireScreen'
import InformationsContactsLocalisationScreen from '../screens/InformationsContactsLocalisationScreen'
import InformationsContactsScreen from '../screens/InformationsContactsScreen'
import InformationsInscriptionsFormulairesScreen from '../screens/InformationsInscriptionsFormulairesScreen'
import ApelOgecOgecScreen from '../screens/ApelOgecOgecScreen'
import ApelOgecOgecActivitesScreen from '../screens/ApelOgecOgecActivitesScreen'
import InformationsInscriptionsScreen from '../screens/InformationsInscriptionsScreen'
import InformationsInscriptionsInfosSupplementairesScreen from '../screens/InformationsInscriptionsInfosSupplementairesScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import PrivateScreen from '../screens/PrivateScreen'
import PrivateAccountScreen from '../screens/PrivateAccountScreen'
import PrivateAdminScreen from '../screens/PrivateAdminScreen'
import PrivateLoggoutScreen from '../screens/PrivateLoggoutScreen'
import ApelOgecOgecAgendaScreen from '../screens/ApelOgecOgecAgendaScreen'
import ApelOgecApelAgendaScreen from '../screens/ApelOgecApelAgendaScreen'
import VieScolairePastoraleScreen from '../screens/VieScolairePastoraleScreen'
import VieScolairePastoraleActivitesScreen from '../screens/VieScolairePastoraleActivitesScreen'
import VieScolairePastoraleAgendaScreen from '../screens/VieScolairePastoraleAgendaScreen'
import PrivateAdminCheminsScreen from '../screens/PrivateAdminCheminsScreen'
import InformationsFournituresScreen from '../screens/InformationsFournituresScreen'
import PrivateAccountDonneesScreen from '../screens/PrivateAccountDonneesScreen'
import Album from '../components/elements/album/Album'
import VieScolaireHorairesFeriesScreen from '../screens/VieScolaireHorairesFeriesScreen'
import PrivateAdminParametersScreen from '../screens/PrivateAdminParametersScreens'

const routesComponents = [
  {
    path: '/ecole',
    component: EcoleScreen,
  },
  {
    path: '/ecole/equipe-pedagogique',
    component: EquipeScreen,
  },
  {
    path: '/ecole/histoire',
    component: EcoleHistoireScreen,
  },
  {
    path: '/ecole/projets',
    component: EcoleProjetsScreen,
  },
  {
    path: '/ecole/projets/projet-educatif',
    component: EcoleProjetsEducatifScreen,
  },
  {
    path: '/ecole/projets/projet-pedagogique',
    component: EcoleProjetsPedagogiqueScreen,
  },
  {
    path: '/ecole/projets/projet-pastoral',
    component: EcoleProjetsPastoralScreen,
  },
  {
    path: '/ecole/infrastructures',
    component: EcoleInfrastructuresScreen,
  },
  {
    path: '/ecole/infrastructures/batiments',
    component: EcoleInfrasrtucturesBatiments,
  },
  {
    path: '/ecole/infrastructures/visite-virtuelle',
    component: EcoleInfrastructuresVisiteVirtuelleScreen,
  },
  {
    path: '/viescolaire',
    component: VieScolaireScreen,
  },
  {
    path: '/viescolaire/cantine',
    component: VieScolaireCantineScreen,
  },
  {
    path: '/viescolaire/cantine/menus',
    component: VieScolaireCantineMenusScreen,
  },
  {
    path: '/viescolaire/cantine/breves',
    component: VieScolaireCantineBrevesScreen,
  },
  {
    path: '/viescolaire/cantine/activites',
    component: VieScolaireCantineActivitesScreen,
  },
  {
    path: '/viescolaire/cantine/agenda',
    component: VieScolaireCantineAgendaScreen,
  },
  {
    path: '/viescolaire/cantine/albums',
    component: Album,
  },
  {
    path: '/viescolaire/garderie',
    component: VieScolaireGarderieScreen,
  },
  {
    path: '/viescolaire/garderie/presentation',
    component: VieScolaireGarderiePresentationScreen,
  },
  {
    path: '/viescolaire/garderie/etude',
    component: VieScolaireGarderieEtudeScreen,
  },
  {
    path: '/viescolaire/pastorale',
    component: VieScolairePastoraleScreen,
  },
  {
    path: '/viescolaire/pastorale/activites',
    component: VieScolairePastoraleActivitesScreen,
  },
  {
    path: '/viescolaire/pastorale/agenda',
    component: VieScolairePastoraleAgendaScreen,
  },
  {
    path: '/viescolaire/horaires',
    component: VieScolaireHorairesScreen,
  },
  {
    path: '/viescolaire/horaires/feries',
    component: VieScolaireHorairesFeriesScreen,
  },
  {
    path: '/classes',
    component: ClassesScreen,
  },
  {
    path: '/classes/petite-section',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/petite-section/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/petite-section/albums',
    component: Album,
  },
  {
    path: '/classes/moyenne-section',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/moyenne-section/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/moyenne-section/albums',
    component: Album,
  },
  {
    path: '/classes/grande-section',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/grande-section/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/grande-section/albums',
    component: Album,
  },
  {
    path: '/classes/cp',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/cp/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/cp/albums',
    component: Album,
  },
  {
    path: '/classes/ce1',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/ce1/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/ce1/albums',
    component: Album,
  },
  {
    path: '/classes/ce2',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/ce2/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/ce2/albums',
    component: Album,
  },
  {
    path: '/classes/cm1',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/cm1/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/cm1/albums',
    component: Album,
  },
  {
    path: '/classes/cm2',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/cm2/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/cm2/albums',
    component: Album,
  },
  {
    path: '/classes/adaptation',
    component: ClassesPresentationScreen,
  },
  {
    path: '/classes/adaptation/activites',
    component: ClassesActivitesScreen,
  },
  {
    path: '/classes/adaptation/albums',
    component: Album,
  },
  {
    path: '/informations',
    component: InformationsScreen,
  },
  {
    path: '/informations/inscriptions',
    component: InformationsInscriptionsScreen,
  },
  {
    path: '/informations/inscriptions/autresinfos',
    component: InformationsInscriptionsInfosSupplementairesScreen,
  },
  {
    path: '/informations/inscriptions/formulaire',
    component: InformationsInscriptionsFormulairesScreen,
  },
  {
    path: '/informations/fournitures',
    component: InformationsFournituresScreen,
  },
  {
    path: '/informations/contacts',
    component: InformationsContactsScreen,
  },
  {
    path: '/informations/contacts/localisation',
    component: InformationsContactsLocalisationScreen,
  },
  {
    path: '/informations/contacts/ecrire',
    component: InformationContactsEcrireScreen,
  },
  {
    path: '/informations/actualites',
    component: InformationsActualitesScreen,
  },
  {
    path: '/informations/actualites/infosparents',
    component: InformationsActualitesInfoParentsScreen,
  },
  {
    path: '/informations/actualites/activites',
    component: InformationsActualitesActivitesScreen,
  },
  {
    path: '/informations/actualites/newsletter',
    component: InformationsActualitesNewsletterScreen,
  },
  {
    path: '/informations/actualites/agenda',
    component: InformationsActualitesAgendaScreen,
  },
  {
    path: '/apelogec',
    component: ApelOgecScreen,
  },
  {
    path: '/apelogec/apel',
    component: ApelOgecApelScreen,
  },
  {
    path: '/apelogec/apel/activites',
    component: ApelOgecApelActivitesScreen,
  },
  {
    path: '/apelogec/apel/agenda',
    component: ApelOgecApelAgendaScreen,
  },
  {
    path: '/apelogec/apel/albums',
    component: Album,
  },
  {
    path: '/apelogec/ogec',
    component: ApelOgecOgecScreen,
  },
  {
    path: '/apelogec/ogec/activites',
    component: ApelOgecOgecActivitesScreen,
  },
  {
    path: '/apelogec/ogec/agenda',
    component: ApelOgecOgecAgendaScreen,
  },
  {
    path: '/apelogec/ogec/albums',
    component: Album,
  },
  {
    path: '/login',
    component: LoginScreen,
  },
  {
    path: '/register',
    component: RegisterScreen,
  },
  {
    path: '/private',
    component: PrivateScreen,
  },
  {
    path: '/private/account',
    component: PrivateAccountScreen,
  },
  {
    path: '/private/account/donnees-personelles',
    component: PrivateAccountDonneesScreen,
  },
  {
    path: '/private/admin',
    component: PrivateAdminScreen,
  },
  {
    path: '/private/admin/chemins',
    component: PrivateAdminCheminsScreen,
  },
  {
    path: '/private/admin/parametres',
    component: PrivateAdminParametersScreen,
  },
  {
    path: '/private/loggout',
    component: PrivateLoggoutScreen,
  },
]

export default routesComponents
