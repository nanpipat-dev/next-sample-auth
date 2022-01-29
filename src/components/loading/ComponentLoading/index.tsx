import styles from './component-loading.module.scss'
// libs
import classNames from 'classnames'

function ComponentLoading(): JSX.Element {
  return (
    <div className={styles['loading']}>
      Loading
    </div>
  )
}

export default ComponentLoading