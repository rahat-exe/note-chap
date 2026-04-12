import React from 'react'
import CreateGroupForm from './_components/CreateGroupForm'

const CreateGroup = () => {
  return (
    <div className="max-w-6xl mx-auto pt-2 ">
      <div className='flex flex-col gap-10'>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Create Group
        </h1>
      </div>
      <div>

      <CreateGroupForm />
      </div>
      </div>
    </div>
  );
}

export default CreateGroup