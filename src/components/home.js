import { Form } from "./form"

export const Home = () => {
  
  const style1 = {
    fontSize:"18px",
    fontWeight: "ligther"
  }
  return (
    <div>
      <Form/>
      <div className="container card">
        <h3>#1번째 글</h3>
        <p>2022년 4월 10일</p>
        <h3 style={{color:"black"}}>제목</h3>
        <p style={style1}>
          제발 노래 틀 때 스피커로 틀지마세요. 학교 혼자 쓰나요;;
          왜 좋아하지도 않는 노래를 아침 시간마다 들어야 되는지 모르겠네요.
          주의해주시길 바랍니다.
        </p>
        <span>학교생활</span>
      </div>
      
    </div>
  )
}