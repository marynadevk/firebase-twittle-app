import LeftSide from '@/components/LeftSide'
import React from 'react'

const UserProfilePage = () => {
  return (
    <LeftSide>
      <>
      <div className="avatar">
          <div className="w-8 rounded">
            <img
              // src={author.photoUrl}
              alt="author image"
            />
          </div>
        </div>
        <div className="badge badge-accent badge-outline">NAME</div>
      </>
    </LeftSide>
  )
}

export default UserProfilePage