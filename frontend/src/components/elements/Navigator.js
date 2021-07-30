import { Grid, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useRouteDatas } from '../../utils/hooks'
import routeDatas from '../../utils/routeDatas'
import NavFieldset from './NavFieldset'

const StyledGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: '0.6rem 1rem',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

function Navigator() {
  const [datas, setDatas] = useState(null)
  const { pathname } = useLocation()
  const { Routes } = useSelector((state) => state.settings)

  useEffect(() => {
    const values = routeDatas(pathname, Routes)
    setDatas(values)
  }, [pathname])

  return (
    <StyledGrid container>
      {datas?.category?.type === 'category' && datas?.category?.name}
      {datas &&
        (datas.current?.type === 'category' ||
          datas.current?.type === 'chapter') &&
        datas.chapters &&
        datas.category.type === 'category' &&
        datas.chapters.length && (
          <NavFieldset
            legend={`Aussi dans ${datas.category.name}`}
            routes={datas.chapters}
            current={datas.chapter}
          />
        )}
      {datas && datas.rubricCategories && datas.rubricCategories.length && (
        <NavFieldset
          legend={`Dans la rubrique ${datas.rubric.name}`}
          routes={datas.rubricCategories}
          current={datas.category}
        />
      )}
      {datas && datas.rubrics && (
        <NavFieldset
          legend="Toutes les rubriques"
          routes={datas.rubrics}
          current={datas.rubric}
        />
      )}
    </StyledGrid>
  )
}

export default Navigator
