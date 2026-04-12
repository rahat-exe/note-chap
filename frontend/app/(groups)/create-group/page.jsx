import React from 'react'
import CreateGroupForm from './_components/CreateGroupForm'
import GoBack from './_components/GoBack';

const CreateGroup = () => {
  return (
    <div className="max-w-6xl mx-auto pt-2 ">
      
      <GoBack/>
      <CreateGroupForm />
      </div>
      
  );
}

export default CreateGroup