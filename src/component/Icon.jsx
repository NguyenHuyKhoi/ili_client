import { Add, BarChartTwoTone, Check, CircleRounded, CopyAll, DataUsage, Delete, DiamondSharp, Edit, ExploreOutlined, GroupsOutlined, Help, Home, Logout, MilitaryTech, Person, PlayArrow, QueryBuilder, ReportProblem, SnippetFolder, Square, TableRows, TocOutlined, TrendingUpOutlined, WatchLater } from "@mui/icons-material"
import React from 'react'

export const Icon = (props) => {
    const {name, style} = props 
    return (
        <>
        {
            name ==='Home' ? <Home sx = {style}/> 
            : 
            name ==='ExploreOutlined' ? <ExploreOutlined sx = {style}/>
            : 
            name ==='TocOutlined'? <TocOutlined sx = {style} />
            : 
            name ==='TrendingUpOutlined' ?  <TrendingUpOutlined sx = {style}/> 
            : 
            name ==='GroupsOutlined' ?  <GroupsOutlined sx = {style}/>
            :
            name ==='BarChartOutlined' ? <BarChartTwoTone sx = {style} />
            : 
            name ==='CircleRounded' ? <CircleRounded   sx = {style}/> 
            : 
            name ==='Triangle' ? <ReportProblem  sx = {style}/>
            :
            name ==='Square' ? <Square sx = {style} />
            : 
            name ==='Rhombus' ? <DiamondSharp  sx = {style} />
            : 
            name ==='TableRows' ? <TableRows sx = {style} /> 
            :
            name ==='SnippetFolder' ? <SnippetFolder sx = {style} />
            :
            name ==='MilitaryTech' ? <MilitaryTech sx = {style}/>
            :
            name ==='Help' ? <Help sx = {style}/>
            :
            name ==='QueryBuilder' ? <QueryBuilder sx = {style}/>
            :
            name ==='Check' ? <Check sx = {style}/>
            :
            name ==='WatchLater' ? <WatchLater sx = {style}/>
            :
            name ==='Person' ? <Person sx = {style}/>
            :
            name ==='DataUsage' ? <DataUsage sx = {style} />
            :
            name ==='Logout' ? <Logout sx = {style} />
            :
            name ==='Edit' ? <Edit sx = {style} />
            :
            name ==='Play' ? <PlayArrow sx = {style} />
            :
            name ==='Clone' ? <CopyAll sx = {style} />
            :
            name ==='Delete' ? <Delete sx = {style} />
            :
            name ==='Add' ? <Add sx = {style} />
            : <Home/>
            
        }
        </>
    )
}

export default Icon
