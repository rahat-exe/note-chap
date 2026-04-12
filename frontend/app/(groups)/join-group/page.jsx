import React from 'react'
import GoBack from './_components/GoBack'

import SearchBar from './_components/SearchBar'

const page = () => {
  return (
    <section className="mt-5 md:px-20">
      <GoBack />
      <SearchBar placeholder="Search for groups..." />
    </section>
  );
}

export default page