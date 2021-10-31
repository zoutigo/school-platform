import React from 'react'
import { render, screen, cleanup, fireEvent, waitFor } from 'test-utils'
import * as api from '../../../utils/api'
import PageForm from '../PageForm'

const mockEnqueue = jest.fn()
const mockClose = jest.fn()

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueue,
    closeSnackbar: mockClose,
  }),
}))

jest.mock('../../elements/reactpage/constants', () => ({
  cellSpacing: {
    x: 25, // horizontal cell spacing
    y: 20, // vertical cell spacing
  },
}))

jest.mock('../../elements/Title', () => ({
  __esModule: true,
  default: ({ title }) => <div>{title}</div>,
}))

const mockApiPostPage = jest.fn()
jest.spyOn(api, 'apiPostPage').mockImplementation(() => mockApiPostPage())

const mockApiPostEditorImage = jest.fn()
jest
  .spyOn(api, 'apiPostEditorImage')
  .mockImplementation(() => mockApiPostEditorImage())

jest.mock('../../hooks/useMutate', () =>
  jest.fn(() => ({
    useMutate: jest.fn(),
  }))
)

const mockGetError = jest.fn()
jest.mock('../../../utils/getError', () => ({
  getError: mockGetError,
}))

const mockGetResponse = jest.fn()
jest.mock('../../../utils/getResponse', () => ({
  getResponse: mockGetResponse,
}))

describe('PageForm', () => {
  beforeEach(jest.useFakeTimers)
  afterEach(jest.useRealTimers)
  const rawPage = {
    id: 1,
    title: 'Feriés',
    alias: 'viescolaire-horaires-feries',
    content: {
      id: 'bka115',
      version: 1,
      rows: [
        {
          id: 'ophqjm',
          cells: [
            {
              id: 'mgldy6',
              size: 12,
              plugin: { id: 'ory/editor/core/content/slate', version: 1 },
              dataI18n: {
                fr: {
                  slate: [
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [
                        {
                          text: 'Cette école, née de la volonté de quelques particuliers de voir s’installer une école chrétienne à Crémieu pour permettre l’éducation du plus grand nombre, a toujours bénéficié de la bienveillance de la commune de Crémieu au cours de son histoire.',
                        },
                      ],
                      data: { align: 'justify' },
                    },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '' }] },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '' }] },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '\r' }] },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [
                        {
                          text: "Dénommée  l'école de QUINSONNAS car propriété du comte du même nom, elle fut administrée et guidée par les frères des écoles chrétiennes jusqu’ en 1904.​",
                        },
                      ],
                      data: { align: 'justify' },
                    },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '' }] },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '\r' }] },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [
                        {
                          text: 'Elle a traversé et contribué à l’écriture de  l’histoire de la cité de Crémieu depuis 1833,  partageant ses heures de gloire et ses périodes difficiles. Aujourd’hui encore, de part sa localisation et son importance, elle est un acteur important de l’éducation et de la vie sociale de Crémieu mais aussi des communes avoisinantes, dépassant même les limites de la communauté de commune de par l’origine des ses élèves.',
                        },
                      ],
                      data: { align: 'justify' },
                    },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '' }] },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '\r' }] },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [
                        {
                          text: 'Son engagement pastoral en lien avec la paroisse Saint-Martin de l’Isle Crémieu, fait aussi de l’école Saint-Augustin un acteur important de la mission pastorale de l’Enseignement Catholique dans le Nord Isère. La tutelle actuelle de l’école est la direction diocésaine de l’Enseignement Catholique de l’Isère.',
                        },
                      ],
                      data: { align: 'justify' },
                    },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '' }] },
                    { type: 'PARAGRAPH/PARAGRAPH', children: [{ text: '\r' }] },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [
                        {
                          text: 'Le projet immobilier s’inscrit dans une démarche commune entre l’association propriétaire, l’OGEC de l’école dont les responsables successifs ont chacun porté la construction de ce projet à tour de rôle, l’équipe éducative  et enfin plusieurs générations de parents d’élèves qui ont soutenu volontairement le montage financier et apporté, pour certains, leur expertise technique.\r',
                        },
                      ],
                      data: { align: 'justify' },
                    },
                  ],
                },
              },
              rows: [],
              inline: null,
            },
          ],
        },
      ],
    },
  }
  const page = { id: rawPage.id, content: JSON.stringify(rawPage.content) }
  const pageParams = {
    alias: 'fake',
    pageName: 'fake',
    queryKey: ['fake'],
    queryParams: 'fake',
    isAllowedToChange: true,
    type: 'page',
  }
  const setShowPageForm = jest.fn()
  const setShowEditToolTip = jest.fn()
  it('should render without crashing', async () => {
    render(
      <PageForm
        page={page}
        pageParams={pageParams}
        setShowPageForm={setShowPageForm}
        setShowEditToolTip={setShowEditToolTip}
      />
    )

    await waitFor(() => {
      expect(screen.getByTestId('page-form')).toBeInTheDocument()
      expect(screen.getByText(/Modification de la page/i)).toBeInTheDocument()
      expect(
        screen.getByText(/Son engagement pastoral en lien avec la paroisse/i)
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Je modifie la page fake/i })
      ).toBeInTheDocument()
    })
  })
  it.todo('should render without crashing')
})
