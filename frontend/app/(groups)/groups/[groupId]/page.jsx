
import React from 'react'
import GroupById from '../_components/GroupById';
import GoBack from '../_components/GoBack';

const SingleGroup =async ({params}) => {
   const { groupId } = await params;
   
  return (
    <div className='px-5 lg:px-20 mt-1 lg:mt-5'>
    <GoBack />
    <GroupById groupId={groupId}/>
    </div>
  )
}

export default SingleGroup