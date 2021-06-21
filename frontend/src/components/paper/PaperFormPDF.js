import { styled, Grid, useTheme } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Title from '../elements/Title'
import InputTextControl from '../elements/InputTextControl'
import { apiPostPaper } from '../../utils/api'
import { useUpdateMutationOptions } from '../../utils/hooks'
import CostumButton from '../elements/CustomButton'
import DatePickerControl from '../elements/DatePickerControl'
import InputFileControl from '../elements/InputFileControl'
import convertBase64 from '../../utils/convertBase64'
import newsletterSchema from '../../schemas/newsletterSchema'
import menuSchema from '../../schemas/menuSchema'
import breveSchema from '../../schemas/breveSchema'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  //   [theme.breakpoints.up('md')]: {
  //     width: '60%',
  //   },
  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))

function PaperFormPDF({
  currentDocument,
  setCurrentDocument,
  setTopAlert,
  setShowTooltip,
  setFormAction,
  formAction,
  setShowPaperList,
  setShowPaperForm,
  paper,
}) {
  const theme = useTheme()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync } = useMutation(
    apiPostPaper,
    useUpdateMutationOptions(paper.queryKey)
  )

  const schema = (mypapertype) => {
    switch (mypapertype) {
      case 'newsletter':
        return newsletterSchema

      case 'menu':
        return menuSchema

      case 'breve':
        return breveSchema

      default:
        return null
    }
  }
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema(paper.paperType)),
  })

  const onSubmit = async (datas) => {
    const { startdate, enddate, file } = datas
    const options = {
      headers: { 'x-access-token': Token },
    }

    const finalDatas = async (type) => {
      switch (type) {
        case 'menu':
        case 'breve':
          return {
            title: `Du ${moment(startdate).format(
              'dddd DD/MM/YYYY'
            )} au ${moment(enddate).format('dddd DD/MM/YYYY')}`,
            startdate: startdate.valueOf(),
            enddate: enddate.valueOf(),
            type: paper.paperType,
            file: await convertBase64(file[0]),
            entityAlias: paper.entityAlias,
          }
        case 'newsletter':
          return {
            title: `Newsletter de ${moment(startdate).format('MM/YYYY')} `,
            startdate: startdate.valueOf(),
            type: paper.paperType,
            file: await convertBase64(file[0]),
            entityAlias: paper.entityAlias,
          }

        default:
          return null
      }
    }

    try {
      await mutateAsync({
        id: currentDocument ? currentDocument._id : null,
        action: formAction,
        options: options,
        body: await finalDatas(paper.paperType),
      }).then((response) => {
        setTopAlert({
          severity: 'success',
          alertText: response.message,
          openAlert: true,
        })
        setCurrentDocument(null)
        setShowTooltip(true)
        setShowPaperList(true)
        setShowPaperForm(false)
      })
    } catch (err) {
      setTopAlert({
        severity: 'error',
        alertText: err.response.statusText,
        openAlert: true,
      })
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    setShowTooltip(false)
    return () => {
      setShowTooltip(true)
      setFormAction(null)
      setTopAlert({
        severity: 'error',
        alertText: '',
        openAlert: false,
      })
    }
  }, [currentDocument])

  const formTitle =
    formAction === 'update'
      ? `Modification ${paper.paperType}`
      : `Ajout ${paper.paperType}`

  if (!currentDocument && formAction === 'update') return null

  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container justify="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      <Grid container className="form-fields-container">
        <DatePickerControl
          control={control}
          name="startdate"
          label="Date de début"
          format="dddd Do MMMM yyyy"
          helperText="Les dates passées ne sont pas autorisées"
          initialDate={
            formAction === 'update'
              ? new Date(currentDocument.date)
              : new Date()
          }
        />
        {paper.paperType !== 'newsletter' && (
          <DatePickerControl
            control={control}
            name="enddate"
            label="Date de fin"
            format="dddd Do MMMM yyyy"
            helperText="Supérieure à la date de début"
            initialDate={
              formAction === 'update'
                ? new Date(currentDocument.date)
                : new Date()
            }
          />
        )}
        {/* <Grid
          item
          container
          style={{ margin: '1rem 0px', padding: '0px 1rem' }}
        >
          <input type="file" {...register('file')} accept="application/pdf" />
        </Grid> */}
        <InputFileControl
          control={control}
          name="file"
          type="file"
          accept="application/pdf"
          helperText="maximum 5Mo"
        />
      </Grid>
      <Grid item container alignItems="center" justify="flex-end">
        <CostumButton
          text={
            formAction === 'update'
              ? `Modifier ${paper.paperType}`
              : `Poster ${paper.paperType}`
          }
          bgcolor={theme.palette.success.main}
          action="post"
          width="300px"
          type="submit"
          disabled={!isValid || isSubmitting}
        />
      </Grid>
    </StyledPaperForm>
  )
}
PaperFormPDF.defaultProps = {
  currentDocument: null,
  paperItem: null,
}

PaperFormPDF.propTypes = {
  paper: PropTypes.shape({
    queryParams: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string),
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  setShowPaperForm: PropTypes.func.isRequired,
  setShowPaperList: PropTypes.func.isRequired,
  setCurrentDocument: PropTypes.func.isRequired,
  currentDocument: PropTypes.string,
  setTopAlert: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShowTooltip: PropTypes.func.isRequired,
  formAction: PropTypes.string.isRequired,
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.string,
    createdat: PropTypes.number,
  }),
}

export default PaperFormPDF
