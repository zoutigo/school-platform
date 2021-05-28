import React from 'react'

import SchoolIcon from '@material-ui/icons/School'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import EcoSharpIcon from '@material-ui/icons/EcoSharp'
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp'
import FakeScreen from '../screens/FakeScreen'
import EcoleScreen from '../screens/EcoleScreen'
import EquipeScreen from '../screens/EquipeScreen'

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
          component: FakeScreen,
        },
        chapters: [],
      },
      {
        catname: 'Projets',
        alias: 'projets',
        route: {
          path: '/ecole/projets',
          exact: true,
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Educatif',
            alias: 'projet-educatif',
            route: {
              path: '/ecole/projets/projet-educatif',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Pédagogique',
            alias: 'projet-pedagogique',
            route: {
              path: '/ecole/projets/projet-pedagogique',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Pastoral',
            alias: 'projet-pastoral',
            route: {
              path: '/ecole/projets/projet-pastoral',
              exact: true,
              component: FakeScreen,
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
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Les batiments',
            alias: 'batiments',
            route: {
              path: '/ecole/infrastructures/batiments',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Visite virtuelle',
            alias: 'visite-virtuelle',
            route: {
              path: '/ecole/infrastructures/visite-virtuelle',
              exact: true,
              component: FakeScreen,
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
      path: '/vie-scolaire',
      exact: true,
      component: FakeScreen,
    },

    categories: [
      {
        catname: 'Cantine',
        alias: 'cantine',
        route: {
          path: '/vie-scolaire/cantine',
          exact: true,
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Menus',
            alias: 'menus',
            route: {
              path: '/vie-scolaire/cantine/menus',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Brèves',
            alias: 'breves',
            route: {
              path: '/vie-scolaire/cantine/breves',
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
          path: '/vie-scolaire/garderie',
          exact: true,
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'presentation-garderie',
            route: {
              path: '/vie-scolaire/garderie/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Etude',
            alias: 'etude-garderie',
            route: {
              path: '/vie-scolaire/garderie/etude',
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
          path: '/vie-scolaire/horaires',
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
      component: FakeScreen,
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
      component: FakeScreen,
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
      path: '/apel-ogec',
      exact: true,
      component: FakeScreen,
    },
    categories: [
      {
        catname: 'APEL',

        alias: 'ap',
        route: {
          path: '/apel-ogec/apel',
          exact: false,
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'apel',
            route: {
              path: '/apel-ogec/apel/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-apel',
            route: {
              path: '/apel-ogec/apel/activites',
              exact: true,
              component: FakeScreen,
            },
          },
        ],
      },
      {
        catname: 'OGEC',
        link: '/apel-ogec/ogec',
        alias: 'ogec',
        route: {
          path: '/apel-ogec/ogec',
          exact: true,
          component: FakeScreen,
        },
        chapters: [
          {
            chapname: 'Presentation',
            alias: 'ogec',
            route: {
              path: '/apel-ogec/ogec/presentation',
              exact: true,
              component: FakeScreen,
            },
          },
          {
            chapname: 'Activités',
            alias: 'activites-ogec',
            route: {
              path: '/apel-ogec/ogec/activites',
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
const chaptersRoutes = []
for (let i = 0; i < rubrics.length; i += 1) {
  const { categories } = rubrics[i]
  if (categories.length > 0) {
    for (let j = 0; j < categories.length; j += 1) {
      const { route, chapters } = categories[j]
      categoriesRoutes.push(route)
      if (chapters.length > 0) {
        for (let k = 0; k < chapters.length; k += 1) {
          const { route: chapterRoute } = chapters[k]
          chaptersRoutes.push(chapterRoute)
        }
      }
    }
  }
}
const rubricsRoutes = rubrics.map((rubric) => rubric.route)

export { categoriesRoutes, chaptersRoutes, rubricsRoutes }

export default rubrics
