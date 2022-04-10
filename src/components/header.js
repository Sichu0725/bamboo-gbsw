import React from "react";
import img1 from "../assets/bamboo-spear-dog.gif"

export const Header = (props) => {

  const headerStyle1 = {
    width:"100px",
    verticalAlign:"middle"
  }

  return (
    <div className="header">
      <img src={img1} alt="bamboo" style={headerStyle1} />
      <strong className="title"><span>경</span>소고 <span>대</span>나무 <span>숲</span><p>(부제 : 죽창의 숲)</p></strong>
      
    </div>
  )
}