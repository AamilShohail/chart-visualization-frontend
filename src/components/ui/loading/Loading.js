import React from 'react'
import styles from './Loading.module.css'
const loading = () => (
    <div className={styles.Loading} style={{background:'#000',width:'100vw',height:"100vh"}}>
    <ul  style={{background:'#000'}}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
)
export default loading