import React from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

import useFetch from '../../../../../hooks/useFetch'
import { apiFecthParametres } from '../../../../../../utils/api'
import AlertMessage from '../../../../../elements/AlertMessage'
import FetchCircularProgress from '../../../../../elements/FetchCircularProgress'

// const data = {
//   id: 1,
//   addressNumber: '144B',
//   addressStreet: 'route de Cremieu',
//   addressZipcode: '38230',
//   addressCity: 'Tignieu Jameyzieu',
//   nbrStudents: 210,
//   nbrTeachers: 10,
//   nbrFamilies: 350,
//   nbrActivities: 600,
//   email: 'test@gmail.com',
//   phone: '0434512390',
//   secret: 'OGEPI-20890',
//   schoolYearStartdate: '01/09/2019',
//   schoolYearEnddate: '31/06/2020',
//   managerMessage: 'hello',
//   partner1Name: 'La paroisse Saint Martin',
//   partner1Link: 'www.st-martin.com',
//   partner2Name: 'La paroisse Saint Martin',
//   partner2Link: 'www.st-martin.com',
//   partner3Name: 'La paroisse Saint Martin',
//   partner3Link: 'www.st-martin.com',
// }

function ManageParamsList({ queryKey, queryParams }) {
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFecthParametres
  )
  const adressTitle = `Adresse de l'école`

  if (!data) return null
  return (
    <Grid container>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <FetchCircularProgress color="secondary" />}
      <Grid item container spacing={5}>
        <Grid item xs={12} md={6}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" colspan="2">
                  <Typography variant="h2">{adressTitle} </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell> Rue</TableCell>
                <TableCell> {data.addressStreet}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Numéro</TableCell>
                <TableCell> {data.addressNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Code Postal</TableCell>
                <TableCell> {data.addressZipcode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Ville</TableCell>
                <TableCell> {data.addressCity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Email</TableCell>
                <TableCell> {data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Telephone</TableCell>
                <TableCell> {data.phone}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md={6}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" colspan="2">
                  <Typography variant="h2">Indicateurs</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell> Nombre d élèves</TableCell>
                <TableCell> {data.nbrStudents}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Nombre d enseignants</TableCell>
                <TableCell> {data.nbrTeachers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Nombre de familles</TableCell>
                <TableCell> {data.nbrFamilies}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Nombre activites</TableCell>
                <TableCell> {data.nbrActivities}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md={6}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" colspan="2">
                  <Typography variant="h2">Partenaires</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell> {data.partner1Name}</TableCell>
                <TableCell> {data.partner1Link}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> {data.partner2Name}</TableCell>
                <TableCell> {data.partner2Link}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> {data.partner3Name}</TableCell>
                <TableCell> {data.partner3Link}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md={6}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head" colspan="2">
                  <Typography variant="h2">Definitions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell> Phrase secrète</TableCell>
                <TableCell> {data.secret}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Date de rentrée scolaire</TableCell>
                <TableCell> {data.schoolYearStartdate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Dat de fin année scolaire</TableCell>
                <TableCell> {data.schoolYearEnddate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        <Grid item container>
          <Grid item xs={12}>
            <Typography variant="h2"> Mot du directeur</Typography>
          </Grid>
          <Grid item xs={12}>
            {data.managerMessage}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

ManageParamsList.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
}

export default ManageParamsList
