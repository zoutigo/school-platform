/* eslint-disable import/no-named-as-default */
import React from 'react'

const routes = [
  {
    path: '/ecole',
    exact: true,
    state: {
      name: "L'Ecole",
      alias: 'ecole',
      access: 'public',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
    routes: [
      {
        path: '/ecole/equipe-pedagogique',
        exact: true,
        state: {
          name: 'Equipe',
          alias: 'equipe-pedagogique',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
      },
      {
        path: '/ecole/histoire',
        exact: true,
        state: {
          name: 'Histoire',
          alias: 'histoire',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
      },
      {
        path: '/ecole/projets',
        exact: true,
        state: {
          name: 'Projets',
          alias: 'projets',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/ecole/projets/projet-educatif',
            exact: true,
            state: {
              name: 'Educatif',
              alias: 'projet-educatif',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/ecole/projets/projet-pedagogique',
            exact: true,
            state: {
              name: 'Pédagogique',
              alias: 'projetpedagogique',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/ecole/projets/projet-pastoral',
            exact: true,
            state: {
              name: 'Pastoral',
              alias: 'projet-pastoral',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/ecole/infrastructures',
        exact: true,
        state: {
          name: 'Infrastructures',
          alias: 'infrastructures',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
          routes: [
            {
              path: '/ecole/infrastructures/batiments',
              exact: true,
              state: {
                name: 'Les batiments',
                alias: 'batiments',
                access: 'public',
                type: 'chapter',
                filepath: null,
                description: null,
                icon: null,
              },
            },
            {
              path: '/ecole/infrastructures/visite-virtuelle',
              exact: true,
              state: {
                name: 'Visite virtuelle',
                alias: 'visite-virtuelle',
                access: 'public',
                type: 'chapter',
                filepath: null,
                description: null,
                icon: null,
              },
            },
          ],
        },
      },
    ],
  },
  {
    path: '/viescolaire',
    exact: true,
    state: {
      name: 'Vie Scolaire',
      alias: 'viescolaire',
      access: 'public',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
    routes: [
      {
        path: '/viescolaire/cantine',
        exact: true,
        state: {
          name: 'Cantine',
          alias: 'cantine',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/viescolaire/cantine/menus',
            exact: true,
            state: {
              name: 'Menus',
              alias: 'menus',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/viescolaire/cantine/breves',
            exact: true,
            state: {
              name: 'breves',
              alias: 'menus',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/viescolaire/cantine/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'viescolaire-cantine-activites',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/viescolaire/cantine/agenda',
            exact: true,
            state: {
              name: 'Agenda',
              alias: 'viescolaire-cantine-agenda',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/viescolaire/cantine/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-cantine',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/viescolaire/garderie',
        exact: true,
        state: {
          name: 'Garderie',
          alias: 'garderie',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/viescolaire/garderie/presentation',
            exact: true,
            state: {
              name: 'Presentation',
              alias: 'presentation-garderie',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/viescolaire/garderie/etude',
            exact: true,
            state: {
              name: 'Etude',
              alias: 'etude-garderie',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/viescolaire/pastorale',
        exact: true,
        state: {
          name: 'La pastorale',
          alias: 'pastorale',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/viescolaire/pastorale/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'pastorale-activités',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/viescolaire/pastorale/agenda',
            exact: true,
            state: {
              name: 'Agenda',
              alias: 'agenda-pastorale',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/viescolaire/horaires',
        exact: true,
        state: {
          name: 'Horaires',
          alias: 'horaires',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/viescolaire/horaires/feries',
            exact: true,
            state: {
              name: 'Feriés',
              alias: 'viescolaire-horaires-feries',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/classes',
    exact: true,
    state: {
      name: 'Les Classes',
      alias: 'classes',
      access: 'public',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
    routes: [
      {
        path: '/classes/petite-section',
        exact: true,
        state: {
          name: 'Petite section',
          alias: 'petite-section',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/petite-section/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-petite-section',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/petite-section/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-petite-section',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/moyenne-section',
        exact: true,
        state: {
          name: 'Moyenne section',
          alias: 'moyenne-section',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/moyenne-section/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-moyenne-section',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/moyenne-section/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-moyenne-section',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/grande-section',
        exact: true,
        state: {
          name: 'Grande section',
          alias: 'grande-section',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/grande-section/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-grande-section',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/grande-section/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-grande-section',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/cp',
        exact: true,
        state: {
          name: 'CP',
          alias: 'cp',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/cp/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-cp',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/cp/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-cp',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/ce1',
        exact: true,
        state: {
          name: 'Elementaire 1',
          alias: 'ce1',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/ce1/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-ce1',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/ce1/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-ce1',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/ce2',
        exact: true,
        state: {
          name: 'Elementaire 2',
          alias: 'ce2',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/ce2/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-ce2',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/ce2/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-ce2',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/cm1',
        exact: true,
        state: {
          name: 'Moyen 1',
          alias: 'cm1',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/cm1/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-cm1',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/cm1/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-cm1',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/cm2',
        exact: true,
        state: {
          name: 'Moyen 2',
          alias: 'cm2',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/cm2/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-cm2',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/cm2/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-cm2',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/classes/adaptation',
        exact: true,
        state: {
          name: 'Adaptation',
          alias: 'adaptation',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/classes/adaptation/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-adaptation',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/classes/adaptation/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-adaptation',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/informations',
    exact: true,
    state: {
      name: 'Informations',
      alias: 'informations',
      access: 'public',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
    routes: [
      {
        path: '/informations/inscriptions',
        exact: true,
        state: {
          name: 'Inscriptions',
          alias: 'inscriptions',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/informations/inscriptions/autresinfos',
            exact: true,
            state: {
              name: 'Autres Infos',
              alias: 'autresinfos',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/informations/inscriptions/formulaire',
            exact: true,
            state: {
              name: 'Formulaire',
              alias: 'formulaire',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/informations/fournitures',
        exact: true,
        state: {
          name: 'Fournitures',
          alias: 'fournitures',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
      },
      {
        path: '/informations/contacts',
        exact: true,
        state: {
          name: 'Nous contacter',
          alias: 'contacts',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/informations/contacts/localisation',
            exact: true,
            state: {
              name: 'Localisation',
              alias: 'localisation',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/informations/contacts/ecrire',
            exact: true,
            state: {
              name: 'Ecrire',
              alias: 'ecrire',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/informations/actualites',
        exact: true,
        state: {
          name: 'Actualités',
          alias: 'actualites',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/informations/actualites/infosparents',
            exact: true,
            state: {
              name: 'Infos-Parents',
              alias: 'infosparents',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/informations/actualites/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activites-actualites',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/informations/actualites/newsletter',
            exact: true,
            state: {
              name: 'Newsletter',
              alias: 'newsletter',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/informations/actualites/agenda',
            exact: true,
            state: {
              name: 'Agenda',
              alias: 'agenda',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/apelogec',
    exact: true,
    state: {
      name: 'APEL-OGEC',
      alias: 'apelogec',
      access: 'public',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
    routes: [
      {
        path: '/apelogec/apel',
        exact: true,
        state: {
          name: 'Apel',
          alias: 'apel',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/apelogec/apel/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activitesapel',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/apelogec/apel/agenda',
            exact: true,
            state: {
              name: 'agenda',
              alias: 'agendaapel',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/apelogec/apel/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-apel',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
      {
        path: '/apelogec/ogec',
        exact: true,
        state: {
          name: 'Ogec',
          alias: 'ogec',
          access: 'public',
          type: 'category',
          filepath: null,
          description: null,
          icon: null,
        },
        routes: [
          {
            path: '/apelogec/ogec/activites',
            exact: true,
            state: {
              name: 'Activités',
              alias: 'activitesogec',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/apelogec/ogec/agenda',
            exact: true,
            state: {
              name: 'agenda',
              alias: 'agendaogec',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
          {
            path: '/apelogec/ogec/albums',
            exact: true,
            state: {
              name: 'Albums',
              alias: 'albums-ogec',
              access: 'public',
              type: 'chapter',
              filepath: null,
              description: null,
              icon: null,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    exact: true,
    state: {
      name: 'login',
      alias: 'login',
      access: 'public',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
  },
  {
    path: '/register',
    exact: true,
    state: {
      name: "S'enregistrer",
      alias: 'register',
      access: 'public',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
  },
  {
    path: '/private',
    exact: true,
    state: {
      name: 'Espace-Privé',
      alias: 'private',
      access: 'user',
      type: 'rubric',
      filepath: null,
      description: null,
      icon: null,
    },
  },
]

export default routes
