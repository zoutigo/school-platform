import React from 'react'

import SchoolIcon from '@material-ui/icons/School'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import EcoSharpIcon from '@material-ui/icons/EcoSharp'
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp'
import FakeScreen from '../screens/FakeScreen'
import EcoleScreen from '../screens/EcoleScreen'
import EquipeScreen from '../screens/EquipeScreen'
import VieScolaireScreen from '../screens/VieScolaireScreen'
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Menus',
            alias: 'menus',
            route: {
              path: '/viescolaire/cantine/menus',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Brèves',
            alias: 'breves',
            route: {
              path: '/viescolaire/cantine/breves',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-garderie',
            route: {
              path: '/viescolaire/garderie/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Etude',
            alias: 'etude-garderie',
            route: {
              path: '/viescolaire/garderie/etude',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-petite-section',
            route: {
              path: '/classes/petite-section/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-petite-section',
            route: {
              path: '/classes/petite-section/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-moyenne-section',
            route: {
              path: '/classes/moyenne-section/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-moyenne-section',
            route: {
              path: '/classes/moyenne-section/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-grande-section',
            route: {
              path: '/classes/grande-section/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-grande-section',
            route: {
              path: '/classes/grande-section/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-cp',
            route: {
              path: '/classes/cp/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-cp',
            route: {
              path: '/classes/cp/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-ce1',
            route: {
              path: '/classes/ce1/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-ce1',
            route: {
              path: '/classes/ce1/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-ce2',
            route: {
              path: '/classes/ce2/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-ce2',
            route: {
              path: '/classes/ce2/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-cm1',
            route: {
              path: '/classes/cm1/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-cm1',
            route: {
              path: '/classes/cm1/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-cm2',
            route: {
              path: '/classes/cm2/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-cm2',
            route: {
              path: '/classes/cm2/activites',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Modalites',
            alias: 'modalites',
            route: {
              path: '/informations/inscriptions/modalites',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Formulaires',
            alias: 'formulaires-inscription',
            route: {
              path: '/informations/inscriptions/formulaires',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Coordonnées',
            alias: 'coordonnées',
            route: {
              path: '/informations/contacts/coordonnées',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Localisation',
            alias: 'localisation',
            route: {
              path: '/informations/contacts/localisation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'ecrire',
            alias: 'ecrire',
            route: {
              path: '/informations/contacts/ecrire',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Infos',
            alias: 'infos',
            route: {
              path: '/informations/actualites/infos',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-actualites',
            route: {
              path: '/informations/actualites/activités',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Newsletter',
            alias: 'newsletter',
            route: {
              path: '/informations/actualites/newsletter',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Evenements',
            alias: 'evenements',
            route: {
              path: '/informations/actualites/evenements',
              exact: true,
              component: FakeScreen,
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
            chapname: 'Presentation',
            alias: 'presentationapel',
            route: {
              path: '/apelogec/apel/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentationogec',
            route: {
              path: '/apelogec/ogec/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activitesogec',
            route: {
              path: '/apelogec/ogec/activites',
              exact: true,
              component: FakeScreen,
            },
          },
        ],
      },
    ],
  },
]

const categoriesRoutes = []
const categoriesList = []
const chaptersRoutes = []
const chaptersList = []

for (let i = 0; i < rubrics.length; i += 1) {
  const { categories } = rubrics[i]
  if (categories.length > 0) {
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
