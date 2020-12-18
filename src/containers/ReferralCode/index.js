import React from 'react'
import connect from 'react-redux'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

const ReferralCode = (props) => {
    const rf = props.history.location.search ? qs.parse(props.history.location.search, { ignoreQueryPrefix: true }).referralCode : null
    if(!rf){
        props.history.push('/')
    }else{
        window.localStorage.setItem('referralCode', rf)
        props.history.push('/')
    }
    return (
        <div></div>
    )
}

export default ReferralCode