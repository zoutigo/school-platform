/* eslint-disable  */
import Equipe from './equipe'

const classroomsDefinition = [
  '++',
  'cm2',
  'cm1',
  'ce2',
  'ce1',
  'cp',
  'gs',
  'ms',
  'ps',
]

const classroomsPreEquiped = classroomsDefinition.map((name) => ({
  name,
  enseignants: [],
}))

const Classrooms = classroomsPreEquiped.map((classroom) => {
  let { name, enseignants } = classroom
  for (let i = 0; i < Equipe.length; i += 1) {
    let { classes } = Equipe[i]
    if (classes.length > 0) {
      for (let classroomName of classes) {
        if (classroomName === name) {
          enseignants.push(Equipe[i])
        }
      }
    }
  }
  return classroom
})

export default Classrooms
