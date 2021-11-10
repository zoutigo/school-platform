/* eslint-disable import/named */
import { List, ListItem, Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { apiPostPaper } from '../../utils/api'
import useMutate from '../hooks/useMutate'
import MutateCircularProgress from '../elements/MutateCircularProgress'
import getError from '../../utils/getError'
import getResponse from '../../utils/getResponse'
import StyledHookForm from '../styled-components/StyledHookForm'
import SelectSingleInput from '../elements/inputs/SelectSingleInput'
import DatePickerInput from '../elements/inputs/DatePickerInput'
import RadioInput from '../elements/inputs/RadioInput'
import FileInput from '../elements/inputs/FileInput'

function PaperFormPDF({
  currentDocument,
  formAction,
  paper,
  handleBack,
  isPrivateDatas,
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync, isMutating } = useMutate(paper.queryKey, apiPostPaper)

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const changeFile = watch('changeFile')

  const onSubmit = async (datas) => {
    const { startdate, enddate, file, isPrivate, classeFourniture } = datas

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
            classe_fourniture: classeFourniture.value,
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
    closeSnackbar()

    try {
      await mutateAsync({
        id: currentDocument ? currentDocument.id : null,
        action: formAction,
        body: await finalDatas(paper.paperType),
        Token: Token,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        handleBack()
        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
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
    <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
      {isMutating && <MutateCircularProgress />}
      <List className="form-fields-container">
        {paper.paperType === 'fourniture' && (
          <ListItem classname="field">
            <SelectSingleInput
              control={control}
              name="classeFourniture"
              label="Choisir la classe"
              example="Les fournitures sont pour quelle classe ?"
              variant="standard"
              options={selectOptions}
              defaultValue={
                currentDocument
                  ? selectOptions.find(
                      (option) =>
                        option.value === currentDocument.classe_fourniture
                    )
                  : null
              }
              rules={{
                required: 'le choix de la classe est obligatoire',
              }}
            />
          </ListItem>
        )}
        <ListItem className="field">
          <DatePickerInput
            control={control}
            name="startdate"
            label="Date de début"
            format="dddd Do MMMM yyyy"
            example="Attention, vous ne pourrez plus modifier cette date si elle est revolue."
            defaultValue={
              formAction === 'update'
                ? new Date(Number(currentDocument.startdate))
                : new Date()
            }
            rules={{
              required: 'indiquez la date de début de validité',
            }}
          />
        </ListItem>
        {paper.paperType !== 'newsletter' && (
          <ListItem className="field">
            <DatePickerInput
              control={control}
              name="enddate"
              label="Date de fin"
              format="dddd Do MMMM yyyy"
              example="Quelle est la date de fin de validité"
              defaultValue={
                formAction === 'update'
                  ? new Date(Number(currentDocument.enddate))
                  : new Date()
              }
              rules={{
                required: 'indiquez la date de fin de validité',
                validate: {
                  future: (value) => {
                    const { startdate: startingdate } = getValues()
                    return (
                      moment(value).diff(moment(startingdate)) >= 0 ||
                      'la date de fin doit etre supérieure à la date de début'
                    )
                  },
                },
              }}
            />
          </ListItem>
        )}

        <ListItem className="field">
          <RadioInput
            name="isPrivate"
            control={control}
            question="Document privé ?"
            options={isPrivateDatas?.isPrivateOptions}
            defaultValue={isPrivateDatas?.isPrivateDefaultValue}
            radioGroupProps={{ row: true }}
            variant="standard"
            rules={{
              required: 'veillez choisir une option',
            }}
          />
        </ListItem>
        {formAction === 'update' && (
          <ListItem className="field">
            <RadioInput
              name="changeFile"
              control={control}
              defaultValue={formAction === 'update' ? 'non' : 'oui'}
              question="Modifier le fichier ?"
              options={[
                { labelOption: 'Oui', optionvalue: 'oui' },
                { labelOption: 'Non', optionvalue: 'non' },
              ]}
              radioGroupProps={{ row: true }}
              variant="standard"
            />
          </ListItem>
        )}
        {(formAction === 'create' ||
          (formAction === 'update' && changeFile === 'oui')) && (
          <ListItem className="field">
            <FileInput
              control={control}
              multiple={false}
              label="Ajouter un fichier"
              example="Fichier PDF, maximum 10Mo"
              defaultValue=""
              accept="application/pdf"
            />
          </ListItem>
        )}
        <ListItem>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!isValid || isSubmitting}
          >
            {formAction === 'update'
              ? `Modifier ${paper.paperType}`
              : `Poster ${paper.paperType}`}
          </Button>
        </ListItem>
      </List>
    </StyledHookForm>
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
