import React from 'react'
import ApelAside from './ApelAside'
import ClassroomAside from './ClassroomAside'
import OgecAside from './OgecAside'

const asidesList = [
  {
    categorypath: '/apelogec/apel',
    component: <ApelAside />,
  },
  {
    categorypath: '/apelogec/ogec',
    component: <OgecAside />,
  },
  {
    categorypath: '/classes/petite-section',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/moyenne-section',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/grande-section',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/cp',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/ce1',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/ce2',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/cm1',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/cm2',
    component: <ClassroomAside />,
  },
  {
    categorypath: '/classes/adaptation',
    component: <ClassroomAside />,
  },
]

export default asidesList
