import React from 'react'
import { Typography } from '@material-ui/core'

const PerformanceItem = props => {

    console.log('props in performanceItem',props)
    
    return(
        <>
            <div style={{margin:'15px 5px',backgroundColor:'#fff',padding:'15px'}}>
                <div style={{marginBottom:'10px'}}>
                    <Typography variant="subtitle" style={{color:'#212121'}}>
                        {props.heading}
                    </Typography>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'50% 50%'}}>
                    <div>
                        <Typography variant="subtitle2" style={{color:'#212121',marginBottom:'10px'}}>
                            {props.subheading1}
                        </Typography>
                        <Typography variant="subtitle2" style={{color:'#2962ff'}}>
                            {props.value1}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="subtitle2" style={{color:'#212121',marginBottom:'10px'}}>
                            {props.subheading2}
                        </Typography>
                        <Typography variant="subtitle2" style={{color:'#2962ff'}}>
                            {props.value2}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PerformanceItem