import React from 'react'
import { styled } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '1rem auto',
  maxWidth: 345,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '& .area': {
    '& .media': {
      height: 180,
    },
    '& .title': {
      color: theme.palette.secondary.dark,
    },
  },
}))

function AlbumCard({ album, setCurrentAlbum, setShow, entityAlias }) {
  const history = useHistory()
  const { URL_PREFIX } = useSelector((state) => state.settings)
  const { description, coverpath, name } = album
  const image = `${URL_PREFIX}/${coverpath}`

  const handleClick = () => {
    setCurrentAlbum(album)
    setShow({
      form: false,
      page: true,
      list: false,
    })
    window.scrollTo(0, 0)
  }

  return (
    <StyledCard>
      <CardActionArea className="area" onClick={handleClick}>
        <CardMedia className="media" image={image} title={name} />
        <CardContent className="title">
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ReactHtmlParser(description)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {'EN SAVOIR PLUS >>>'}
        </Button>
        <Button size="small" color="primary">
          .
        </Button>
      </CardActions>
    </StyledCard>
  )
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    alias: PropTypes.string.isRequired,
    coverpath: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setCurrentAlbum: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  entityAlias: PropTypes.string.isRequired,
}

export default AlbumCard
