/* eslint-disable import/named */
import { styled, Grid, useTheme, Collapse } from '@material-ui/core'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Title from '../elements/Title'
import { apiPostPaper } from '../../utils/api'
import { useUpdateMutationOptions } from '../../utils/hooks'
import CostumButton from '../elements/CustomButton'
import DatePickerControl from '../elements/DatePickerControl'
import InputFileControl from '../elements/InputFileControl'
import newsletterSchema from '../../schemas/newsletterSchema'
import menuSchema from '../../schemas/menuSchema'
import breveSchema from '../../schemas/breveSchema'
import fournitureSchema from '../../schemas/fournitureSchema'
import InputSelectControl from '../elements/InputSelectControl'
import { setPaperMutateAlert } from '../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../constants/alerts'
import InputRadio from '../elements/InputRadio'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
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
  formAction,
  paper,
  handleBack,
  isPrivateDatas,
}) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [addFile, setAddFile] = useState(false)

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

      case 'fourniture':
        return fournitureSchema

      default:
        return null
    }
  }
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema(paper.paperType)),
  })

  const onSubmit = async (datas) => {
    const { startdate, enddate, file, isPrivate } = datas

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
            isPrivate: isPrivate === 'oui',
            type: paper.paperType,
            // file: await convertBase64(file[0]),
            file: file ? file[0] : null,
            entityAlias: paper.entityAlias,
          }
        case 'fourniture':
          return {
            title: `Du ${moment(startdate).format(
              'dddd DD/MM/YYYY'
            )} au ${moment(enddate).format('dddd DD/MM/YYYY')}`,
            startdate: startdate.valueOf(),
            enddate: enddate.valueOf(),
            isPrivate: isPrivate === 'oui',
            type: paper.paperType,
            file: file ? file[0] : null,
            entityAlias: paper.entityAlias,
            clientEntityAlias: datas.clientEntityAlias.value,
          }
        case 'newsletter':
          return {
            title: `Newsletter de ${moment(startdate).format('MM/YYYY')} `,
            startdate: startdate.valueOf(),
            isPrivate: isPrivate === 'oui',
            type: paper.paperType,
            file: file ? file[0] : null,
            entityAlias: paper.entityAlias,
          }

        default:
          return null
      }
    }

    try {
      await mutateAsync({
        id: currentDocument ? currentDocument.id : null,
        action: formAction,
        body: await finalDatas(paper.paperType),
        Token: Token,
      }).then((response) => {
        dispatch(setPaperMutateAlert(successAlertCollapse(response.message)))
        handleBack()
        window.scrollTo(0, 0)
      })
    } catch (err) {
      setPaperMutateAlert(errorAlertCollapse(err.response.data.message))
      window.scrollTo(0, 0)
    }
  }

  if (!currentDocument && formAction === 'update') return null

  const selectOptions = [
    {
      label: 'petite section',
      value: 'ps',
    },
    {
      label: 'moyenne section',
      value: 'ms',
    },
    {
      label: 'grande section',
      value: 'gs',
    },
    {
      label: 'cp',
      value: 'cp',
    },
    {
      label: 'ce1',
      value: 'ce1',
    },
    {
      label: 'ce2',
      value: 'ce2',
    },
    {
      label: 'cm1',
      value: 'cm1',
    },
    {
      label: 'cm2',
      value: 'cm2',
    },
    {
      label: 'adaptation',
      value: 'adaptation',
    },
  ]
  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container className="form-fields-container">
        {paper.paperType === 'fourniture' && (
          <InputSelectControl
            control={control}
            options={selectOptions}
            name="classe_fourniture"
            label="Choisir la classe"
            helperText="Les fournitures sont pour quelle classe ?"
            initialValue={
              currentDocument
                ? selectOptions.find(
                    (option) =>
                      option.value === currentDocument.classe_fourniture
                  )
                : null
            }
          />
        )}
        <DatePickerControl
          control={control}
          name="startdate"
          label="Date de début"
          format="dddd Do MMMM yyyy"
          helperText="Les dates passées ne sont pas autorisées"
          initialDate={
            formAction === 'update'
              ? new Date(Number(currentDocument.startdate))
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
                ? new Date(Number(currentDocument.enddate))
                : new Date()
            }
          />
        )}

        <InputRadio
          question="Document privé ?"
          options={isPrivateDatas?.isPrivateOptions}
          name="isPrivate"
          defaultValue={isPrivateDatas?.isPrivateDefaultValue}
          control={control}
          radioGroupProps={{ row: true }}
          display="block"
        />

        <Collapse in={formAction === 'update'} style={{ width: '100%' }}>
          <InputRadio
            question="Modifier le fichier ?"
            options={[
              { labelOption: 'Oui', optionvalue: 'oui' },
              { labelOption: 'Non', optionvalue: 'non' },
            ]}
            name="addFile"
            defaultValue="oui"
            callback={setAddFile}
            control={control}
            radioGroupProps={{ row: true }}
          />
        </Collapse>

        {(formAction === 'create' || (formAction === 'update' && addFile)) && (
          <InputFileControl
            control={control}
            label="Pièce jointe"
            name="file"
            type="file"
            accept="application/pdf"
            helperText="Fichier PDF, maximum 5Mo"
          />
        )}
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
    fetcher: PropTypes.func.isRequired,
    poster: PropTypes.func.isRequired,
  }).isRequired,

  formAction: PropTypes.string.isRequired,
  currentDocument: PropTypes.shape({
    id: PropTypes.string,
    isPrivate: PropTypes.bool,
    text: PropTypes.string,
    title: PropTypes.string,
    classe_fourniture: PropTypes.string,
    entity: PropTypes.shape({
      id: PropTypes.string,
    }),
    createdat: PropTypes.number,
    date: PropTypes.number,
    startdate: PropTypes.number,
    enddate: PropTypes.number,
    // clientEntity: PropTypes.shape({
    //   name: PropTypes.string,
    //   alias: PropTypes.string,
    // }),
  }),
  handleBack: PropTypes.func.isRequired,
  isPrivateDatas: PropTypes.shape({
    isPrivateDefaultValue: PropTypes.string.isRequired,
    isPrivateOptions: PropTypes.arrayOf(
      PropTypes.shape({
        labelOption: PropTypes.string,
        optionvalue: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default React.memo(PaperFormPDF)
