import { Add, ExploreOutlined, GroupsOutlined, Home, TocOutlined, TrendingUpOutlined ,BarChartTwoTone,CircleRounded,DiamondSharp,ReportProblem, Square } from "@mui/icons-material"
import React from 'react'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
  
}))

export const Icon = (props) => {
    const {name, style} = props 
    console.log("Name:", name)
    return (
        <>
        {
            name == 'Home' ? <Home sx = {style}/> 
            : 
            name == 'ExploreOutlined' ? <ExploreOutlined sx = {style}/>
            : 
            name == 'TocOutlined'? <TocOutlined sx = {style} />
            : 
            name == 'TrendingUpOutlined' ?  <TrendingUpOutlined sx = {style}/> 
            : 
            name == 'GroupsOutlined' ?  <GroupsOutlined sx = {style}/>
            :
            name == 'BarChartOutlined' ? <BarChartTwoTone sx = {style} />
            : 
            name == 'CircleRounded' ? <CircleRounded   sx = {style}/> 
            : 
            name == 'Triangle' ? <ReportProblem  sx = {style}/>
            :
            name == 'Square' ? <Square sx = {style} />
            : 
            name == 'Rhombus' ? <DiamondSharp  sx = {style} />
            : <Home/>
            
        }
        </>
    )
}

export default Icon
