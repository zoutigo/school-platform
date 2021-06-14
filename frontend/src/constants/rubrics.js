import React from 'react'

import SchoolIcon from '@material-ui/icons/School'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import EcoSharpIcon from '@material-ui/icons/EcoSharp'
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp'
import FakeScreen from '../screens/FakeScreen'
import EcoleScreen from '../screens/EcoleScreen'
import EquipeScreen from '../screens/EquipeScreen'
import VieScolaireScreen from '../screens/VieScolaireScreen'
import VieScolaireCantineScreen from '../screens/VieScolaireCantineScreen'
import VieScolaireCantineMenusScreen from '../screens/VieScolaireCantineMenusScreen'
import VieScolaireGarderieEtudeScreen from '../screens/VieScolaireGarderieEtudeScreen'
import VieScolaireGarderiePresentationScreen from '../screens/VieScolaireGarderiePresentationScreen'
import VieScolaireGarderieScreen from '../screens/VieScolaireGarderieScreen'
import VieScolaireCantineBrevesScreen from '../screens/VieScolaireCantineBrevesScreen'
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

const rubrics = [
  {
    rubname: "L'Ecole",
    icon: <SchoolIcon />,
    alias: 'ecole',
    route: {
      path: '/ecole',
      exact: true,
      component: EcoleScreen,
    },

    categories: [
      {
        catname: 'Equipe',
        alias: 'equipe-pedagogique',
        route: {
          path: '/ecole/equipe-pedagogique',
          exact: true,
          component: EquipeScreen,
        },
        chapters: [],
      },
      {
        catname: 'Histoire',
        alias: 'histoire',
        route: {
          path: '/ecole/histoire',
          exact: true,
          component: EcoleHistoireScreen,
        },
        chapters: [],
      },
      {
        catname: 'Projets',
        alias: 'projets',
        route: {
          path: '/ecole/projets',
          exact: true,
          component: EcoleProjetsScreen,
        },
        chapters: [
          {
            chapname: 'Educatif',
            alias: 'projet-educatif',
            route: {
              path: '/ecole/projets/projet-educatif',
              exact: true,
              component: EcoleProjetsEducatifScreen,
            },
          },
          {
            chapname: 'Pédagogique',
            alias: 'projetpedagogique',
            route: {
              path: '/ecole/projets/projet-pedagogique',
              exact: true,
              component: EcoleProjetsPedagogiqueScreen,
            },
          },
          {
            chapname: 'Pastoral',
            alias: 'projet-pastoral',
            route: {
              path: '/ecole/projets/projet-pastoral',
              exact: true,
              component: EcoleProjetsPastoralScreen,
            },
          },
        ],
      },
      {
        catname: 'Infrastructures',
        alias: 'infrastructures',
        route: {
          path: '/ecole/infrastructures',
          exact: true,
          component: EcoleInfrastructuresScreen,
        },
        chapters: [
          {
            chapname: 'Les batiments',
            alias: 'batiments',
            route: {
              path: '/ecole/infrastructures/batiments',
              exact: true,
              component: EcoleInfrasrtucturesBatiments,
            },
          },
          {
            chapname: 'Visite virtuelle',
            alias: 'visite-virtuelle',
            route: {
              path: '/ecole/infrastructures/visite-virtuelle',
              exact: true,
              component: EcoleInfrastructuresVisiteVirtuelleScreen,
            },
          },
        ],
      },
    ],
  },

  {
    rubname: 'Vie Scolaire',
    icon: <DirectionsRunIcon />,
    alias: 'viescolaire',
    route: {
      path: '/viescolaire',
      exact: true,
      component: VieScolaireScreen,
    },

    categories: [
      {
        catname: 'Cantine',
        alias: 'cantine',
        route: {
          path: '/viescolaire/cantine',
          exact: true,
          component: VieScolaireCantineScreen,
        },
        chapters: [
          {
            chapname: 'Menus',
            alias: 'menus',
            route: {
              path: '/viescolaire/cantine/menus',
              exact: true,
              component: VieScolaireCantineMenusScreen,
            },
          },
          {
            chapname: 'Brèves',
            alias: 'breves',
            route: {
              path: '/viescolaire/cantine/breves',
              exact: true,
              component: VieScolaireCantineBrevesScreen,
            },
          },
        ],
      },
      {
        catname: 'Garderie',
        alias: 'garderie',
        route: {
          path: '/viescolaire/garderie',
          exact: true,
          component: VieScolaireGarderieScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-garderie',
            route: {
              path: '/viescolaire/garderie/presentation',
              exact: true,
              component: VieScolaireGarderiePresentationScreen,
            },
          },
          {
            chapname: 'Etude',
            alias: 'etude-garderie',
            route: {
              path: '/viescolaire/garderie/etude',
              exact: true,
              component: VieScolaireGarderieEtudeScreen,
            },
          },
        ],
      },
      {
        catname: 'Horaires',
        alias: 'horaires',
        route: {
          path: '/viescolaire/horaires',
          exact: true,
          component: VieScolaireHorairesScreen,
        },
        chapters: [],
      },
    ],
  },

  {
    rubname: 'Les classes',
    icon: <MeetingRoomIcon />,
    alias: 'classes',
    route: {
      path: '/classes',
      exact: true,
      component: ClassesScreen,
    },
    categories: [
      {
        catname: 'Petite section',
        alias: 'petite-section',
        route: {
          path: '/classes/petite-section',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-petite-section',
            route: {
              path: '/classes/petite-section/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'Moyenne section',
        alias: 'moyenne-section',
        route: {
          path: '/classes/moyenne-section',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-moyenne-section',
            route: {
              path: '/classes/moyenne-section/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'Grande section',
        alias: 'grande-section',
        route: {
          path: '/classes/grande-section',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-grande-section',
            route: {
              path: '/classes/grande-section/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'CP',
        alias: 'cp',
        route: {
          path: '/classes/cp',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-cp',
            route: {
              path: '/classes/cp/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'Elementaire 1',
        alias: 'ce1',
        route: {
          path: '/classes/ce1',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-ce1',
            route: {
              path: '/classes/ce1/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'Elementaire 2',
        alias: 'ce2',
        route: {
          path: '/classes/ce2',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-ce2',
            route: {
              path: '/classes/ce2/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'Moyen 1',
        alias: 'cm1',
        route: {
          path: '/classes/cm1',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-cm1',
            route: {
              path: '/classes/cm1/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'Moyen 2',
        link: '/classes/cm2',
        alias: 'cm2',
        route: {
          path: '/classes/cm2',
          exact: true,
          component: ClassesPresentationScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activites-cm2',
            route: {
              path: '/classes/cm2/activites',
              exact: true,
              component: ClassesActivitesScreen,
            },
          },
        ],
      },
    ],
  },

  {
    rubname: 'Informations',
    icon: <MenuBookSharpIcon />,
    alias: 'informations',
    route: {
      path: '/informations',
      exact: true,
      component: InformationsScreen,
    },
    categories: [
      {
        catname: 'Inscriptions',
        alias: 'inscriptions',
        route: {
          path: '/informations/inscriptions',
          exact: true,
          component: InformationsInscriptionsScreen,
        },
        chapters: [
          {
            chapname: 'Infos ++',
            alias: 'informations-supplementaires',
            route: {
              path: '/informations/inscriptions/infossupplementaires',
              exact: true,
              component: InformationsInscriptionsInfosSupplementairesScreen,
            },
          },
          {
            chapname: 'Formulaires',
            alias: 'formulaires-inscription',
            route: {
              path: '/informations/inscriptions/formulaires',
              exact: true,
              component: InformationsInscriptionsFormulairesScreen,
            },
          },
        ],
      },
      {
        catname: 'Nous contacter',
        alias: 'contacts',
        route: {
          path: '/informations/contacts',
          exact: true,
          component: InformationsContactsScreen,
        },
        chapters: [
          {
            chapname: 'Localisation',
            alias: 'localisation',
            route: {
              path: '/informations/contacts/localisation',
              exact: true,
              component: InformationsContactsLocalisationScreen,
            },
          },
          {
            chapname: 'ecrire',
            alias: 'ecrire',
            route: {
              path: '/informations/contacts/ecrire',
              exact: true,
              component: InformationContactsEcrireScreen,
            },
          },
        ],
      },
      {
        catname: 'Actualités',
        alias: 'actualites',
        route: {
          path: '/informations/actualites',
          exact: true,
          component: InformationsActualitesScreen,
        },
        chapters: [
          {
            chapname: 'Infos-Parents',
            alias: 'infosparents',
            route: {
              path: '/informations/actualites/infosparents',
              exact: true,
              component: InformationsActualitesInfoParentsScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-actualites',
            route: {
              path: '/informations/actualites/activités',
              exact: true,
              component: InformationsActualitesActivitesScreen,
            },
          },
          {
            chapname: 'Newsletter',
            alias: 'newsletter',
            route: {
              path: '/informations/actualites/newsletter',
              exact: true,
              component: InformationsActualitesNewsletterScreen,
            },
          },
          {
            chapname: 'Evenements',
            alias: 'evenements',
            route: {
              path: '/informations/actualites/evenements',
              exact: true,
              component: InformationsActualitesAgendaScreen,
            },
          },
        ],
      },
    ],
  },

  {
    rubname: 'APEL-OGEC',
    icon: <EcoSharpIcon />,
    alias: 'apelogec',
    route: {
      path: '/apelogec',
      exact: true,
      component: ApelOgecScreen,
    },
    categories: [
      {
        catname: 'APEL',
        alias: 'apel',
        route: {
          path: '/apelogec/apel',
          exact: true,
          component: ApelOgecApelScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activitesapel',
            route: {
              path: '/apelogec/apel/activites',
              exact: true,
              component: ApelOgecApelActivitesScreen,
            },
          },
        ],
      },
      {
        catname: 'OGEC',
        alias: 'ogec',
        route: {
          path: '/apelogec/ogec',
          exact: true,
          component: ApelOgecOgecScreen,
        },
        chapters: [
          {
            chapname: 'Activités',
            alias: 'activitesogec',
            route: {
              path: '/apelogec/ogec/activites',
              exact: true,
              component: ApelOgecOgecActivitesScreen,
            },
          },
        ],
      },
    ],
  },
  {
    rubname: 'Login',
    icon: <AccountCircleIcon />,
    alias: 'login',
    route: {
      path: '/login',
      exact: true,
      component: LoginScreen,
    },
    categories: [],
  },
  {
    rubname: 'Inscription',
    icon: <AccountCircleIcon />,
    alias: 'register',
    route: {
      path: '/register',
      exact: true,
      component: RegisterScreen,
    },
    categories: [],
  },
]

const categoriesRoutes = []
const categoriesList = []
const chaptersRoutes = []
const chaptersList = []

for (let i = 0; i < rubrics.length; i += 1) {
  const { categories } = rubrics[i]
  if (categories && categories.length > 0) {
    for (let j = 0; j < categories.length; j += 1) {
      const { catname, alias, route, chapters } = categories[j]
      categoriesList.push({
        name: catname,
        alias: alias,
        path: route.path,
        type: 'category',
      })
      categoriesRoutes.push(route)
      if (chapters.length > 0) {
        for (let k = 0; k < chapters.length; k += 1) {
          const {
            chapname,
            alias: chapalias,
            route: chapterRoute,
          } = chapters[k]
          chaptersList.push({
            name: chapname,
            alias: chapalias,
            path: chapterRoute.path,
            type: 'chapter',
          })
          chaptersRoutes.push(chapterRoute)
        }
      }
    }
  }
}
const rubricsRoutes = rubrics.map((rubric) => rubric.route)
const rubricsList = rubrics.map((rubric) => {
  const { rubname, alias, route } = rubric
  return {
    name: rubname,
    alias: alias,
    path: route.path,
    type: 'rubric',
    active: false,
  }
})

export {
  categoriesRoutes,
  chaptersRoutes,
  rubricsRoutes,
  rubricsList,
  chaptersList,
  categoriesList,
}

export default rubrics
