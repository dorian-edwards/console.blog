import styles from './Post.module.css'
import User from '../User/User'
import Display from '../Display/Display'

const data = {
  _id: '6147e070b7236b149a3fb774',
  title: 'I should probably limit the summary',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non iaculis massa, non ultricies leo. Nam ullamcorper sodales nulla quis sollicitudin. Nam lacinia vitae mauris eget faucibus. Sed elementum nunc tortor, ut blandit neque porta a. Maecenas in turpis vitae ante tempor tristique et at dui. Nam tincidunt erat est, vitae mollis lectus pharetra vitae. In hac habitasse platea dictumst. Nunc faucibus varius pulvinar. Pellentesque eros ipsum, accumsan sit amet risus vel, vehicula fringilla justo. Suspendisse commodo aliquet ipsum, a mattis lorem pharetra sed. Sed cursus cursus vehicula. Suspendisse sollicitudin enim ipsum, et mollis felis vulputate sed. Curabitur dui ipsum, sagittis id dolor ut, condimentum auctor libero. Donec tempus felis nec dolor convallis bibendum. Nullam nec fermentum lacus, id imperdiet nibh. Nulla malesuada lacus sit amet porttitor iaculis. Duis suscipit nibh vitae congue aliquet. Cras auctor pellentesque dolor non accumsan. Nulla mollis felis at erat facilisis, quis imperdiet mi tincidunt. Pellentesque dignissim egestas ipsum, vel lacinia leo egestas vestibulum. Etiam et vulputate massa. Morbi dignissim risus ac lorem iaculis sollicitudin. Mauris placerat nibh purus, congue pulvinar nisl imperdiet vitae. Suspendisse vehicula, mauris in finibus volutpat, augue dui auctor magna, eget rhoncus lectus ipsum id est. Proin ligula odio, lacinia nec sem vitae, mollis laoreet dolor. Quisque arcu dolor, auctor ut aliquet sed, facilisis in felis. Nullam nec ipsum augue. Duis vestibulum diam magna, eget tempor tellus malesuada id. Sed enim dui, convallis sollicitudin dui vel, venenatis volutpat lorem.',
  summary: 'Maybe I should limit this to like 20 characters or something...',
  img: 'assets/img/stock_img.webp',
  author: {
    img: 'assets/img/default.png',
    _id: '6147ccb5171c2110dc9d6f56',
    username: 'febleh',
  },
  createdAt: '2021-09-20T01:14:24.644Z',
  updatedAt: '2021-09-20T01:14:24.644Z',
  __v: 0,
}

function Post() {
  const { createdAt, updatedAt } = data

  const date = createdAt === updatedAt ? createdAt : updatedAt

  const stamp = new Date(date).toDateString()

  return (
    <div>
      <Display post={data} />
      <div className={styles.container}>
        <div id={styles.heading}>
          <User author={data.author} />
          <div id={styles.time_stmp}>{stamp}</div>
        </div>
        <div id={styles.pst_body}>{data.body}</div>
      </div>
    </div>
  )
}

export default Post
