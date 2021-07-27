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
  const { data: dialogs } = useQuery(dialogsQueryKey, () => apiFetchDialogs())

  useEffect(() => {
    if (dialogs && Array.isArray(dialogs) && dialogs.length > 0) {
      const today = new Date().getTime()
      const goodDatas = dialogs.filter(
        (dialog) => dialog.enddate > today && dialog.startdate < today
      )

      if (goodDatas.length > 0) {
        dispatch(setMainDialogDatas(goodDatas[0]))
      }
    }
    return () => {
      dispatch(setMainDialogCount(0))
    }
  }, [dialogs])
  return (
    <StyledFooter>
      <StyledFooterInfos container>
        <Grid item container xs={12} sm={6} md={4} justify="center">
          <Contact />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Suggestions />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Partners />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Timing />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
          <Share />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justify="center">
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
