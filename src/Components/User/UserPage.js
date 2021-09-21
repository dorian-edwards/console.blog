import styles from './UserPage.module.css'
import UserCard from './UserCard'
import PostList from '../Post/PostList'

const data = {
  _id: '612c478f7d99e8115c939cc5',
  firstName: 'dorian',
  lastName: 'edwards',
  email: 'dorian@gmail.com',
  username: 'breh',
  img: 'assets/img/profilePic.jpg',
}

function UserPage() {
  return (
    <div className={styles.container}>
      <div id={styles.usr}>
        <UserCard user={data} />
      </div>
      <div id={styles.posts}>
        <PostList />
      </div>
    </div>
  )
}

export default UserPage
