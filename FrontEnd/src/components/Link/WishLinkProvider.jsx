import React from 'react'
import WishLink from './WishLink';
import { useParams } from 'react-router-dom';

function WishLinkProvider() {
    const { id } = useParams(); 
  return (
    <WishLink id={id}/>
  )
}

export default WishLinkProvider