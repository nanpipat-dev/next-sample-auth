import styles from './page-loading.module.scss'
import classNames from 'classnames'
function PageLoading(): JSX.Element {
  return (

    <div  className={styles['container-loading']}>
      <span className={classNames(styles['loader__ball'], styles['loader__ball--1'])}></span>
      <span className={classNames(styles['loader__ball'], styles['loader__ball--2'])}></span>
      <span className={classNames(styles['loader__ball'], styles['loader__ball--3'])}></span>
    </div>
  )
}

export default PageLoading
