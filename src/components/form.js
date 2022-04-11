import { useRef } from "react"

export const Form = () => {

  const random =  Math.floor(Math.random() * (4 - 1)) + 1;
  const authQuestion = ["","경소고 와이파이 SSID는?","경소고 와이파이 비밀번호는?","PMH의 본명은?"]
  const contentsRef = useRef()

  const autoSize = () => {
    contentsRef.current.style.height = "auto"
    contentsRef.current.style.height = contentsRef.current.scrollHeight + 'px'
  }

  const style1 = {
    width:"100px"
  }

  return (
    <div className="form container">
        <input name="title" placeholder="제목을 입력하세요." />
        <input name="auth" placeholder={authQuestion[random]} />
        <select>
          <option>태그선택</option>
          <option>궁금증</option>
          <option>진로/진학</option>
          <option>잡담</option>
          <option>유머</option>
          <option>기타</option>
        </select>
        <textarea 
        ref={contentsRef}
        placeholder="타인에 대한 비속어는 제재대상 입니다." 
        onKeyUp={autoSize}
        onKeyDown={autoSize} />
        <br/>
        <button className="post-btn" style={style1}>제보하기</button>
      </div>
  )
}