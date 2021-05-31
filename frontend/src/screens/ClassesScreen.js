import React from 'react'
import { useSelector } from 'react-redux'
import Wrapper from '../components/wrapper/Wrapper'

function ClassesScreen() {
  const { ActiveRubric: rubric } = useSelector((state) => state.settings)

  const Body = () => <div>Je appelle {rubric.rubname}</div>

  return <Wrapper main={<Body />} />
}

export default ClassesScreen
