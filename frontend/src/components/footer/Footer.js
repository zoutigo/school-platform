import React, { useEffect } from 'react'
import { Grid, styled } from '@material-ui/core'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import Contact from './Contact'
import Timing from './Timing'

import Partners from './Partners'
import FooterLogo from './FooterLogo'
import Copyrights from './Copyrights'
import Suggestions from './Suggestions'
import FooterCard from './card/FooterCard'
import Share from './Share'
import {
  setMainDialogCount,
  setMainDialogDatas,
} from '../../redux/settings/SettingsActions'
import { apiFetchDialogs } from '../../utils/api'
import useFetch from '../hooks/useFetch'

const StyledFooterInfos = styled(Grid)(({ theme }) => ({
  background: theme.palette.secondary.main,
  minHeight: '5vh',
  overflow: 'hidden',
  padding: '2rem 4rem !important',
  color: 'white',
}))

const StyledFooter = styled('footer')(() => ({
  width: '100%',
  overflow: 'hidden',
}))

function Footer() {
  const dispatch = useDispatch()
  // load modal datas in redux
  const dialogsQueryKey = ['main-dialog']
  const { isLoading, isError, data, errorMessage } = useFetch(
    dialogsQueryKey,
    '',
    apiFetchDialogs
  )

  const dialogs = data ? data.datas : []

  useEffect(() => {
    if (dialogs && Array.isArray(dialogs) && dialogs.length > 0) {
      const today = new Date().getTime()
      const goodDatas = dialogs
        ? dialogs.filter(
            (dialog) => dialog.enddate > today && dialog.startdate < today
          )
        : null

      if (goodDatas && goodDatas.length > 0) {
        dispatch(setMainDialogDatas(goodDatas[0]))
      }
    }
    return () => {
      dispatch(setMainDialogCount(0))
      dispatch(setMainDialogDatas(null))
    }
  }, [dialogs])
  return (
    <StyledFooter>
      <StyledFooterInfos container>
        <Grid item container xs={12} sm={6} md={4} justifyContent="center">
          <Contact />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justifyContent="center">
          <Suggestions />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justifyContent="center">
          <Partners />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justifyContent="center">
          <Timing />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justifyContent="center">
          <Share />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justifyContent="center">
          <FooterCard items={[<FooterLogo key="footerlogo" />]} title="" />
        </Grid>
      </StyledFooterInfos>
      <Grid item container>
        <Copyrights />
      </Grid>
    </StyledFooter>
  )
}

export default Footer
