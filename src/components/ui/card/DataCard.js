import React from 'react'
import {useSelector} from 'react-redux'

export default function DataCard(props) {
    const{count,name} = props
    const isLight = useSelector((state) => state.ui.themeIsLight);
    return (
        <div
        style={{
          width: "300px",
          height: "120px",
          backgroundColor:isLight? "white":"#2A2E35",
          color:isLight?"#2A2E35":"#fff",
          boxShadow:isLight?"5px 5px 5px  #aaaaaa":"5px 5px 5px  #000",
          borderRadius: "10px",
          marginRight: "30px",
          transition: "background 500ms ease-in-out, color 1000ms ease-in-out",
        }}
      >
        <h1>{count}</h1>
        <h2>{name}</h2>
      </div>
    )
}
