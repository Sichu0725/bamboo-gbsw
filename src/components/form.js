import { useRef, useState } from "react"
import useSWR from 'swr'
import fetcher from '../utils/fetcher'

export const Form = () => {
  const [values, setValues] = useState({ title: '', category: 'none', content: '', Question_Answer: '', password: '' })
  const { data, error } = useSWR('http://localhost/form', fetcher)
  const contentsRef = useRef()

  const autoSize = () => {
    contentsRef.current.style.height = "auto"
    contentsRef.current.style.height = contentsRef.current.scrollHeight + 'px'
  }

  const style1 = {
    width:"100px"
  }

  if (error) {
    return (
      <div className="form container">
        <input name="title" placeholder="제목을 입력하세요." disabled />
        <input name="auth" placeholder='Failed To Load' disabled />
        <select disabled>
          <option value="none" disabled selected>태그선택</option>
        </select>
        <textarea disabled
        ref={contentsRef}
        placeholder="타인에 대한 비속어는 제재대상 입니다." 
        onKeyUp={autoSize}
        onKeyDown={autoSize} />
        <br/>
        <input name="password" placeholder="비밀번호" disabled /><br/>
        <button className="post-btn" style={style1}>Failed to Load</button>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="form container">
        <input name="title" placeholder="제목을 입력하세요." disabled />
        <input name="auth" placeholder='Loading ...' disabled />
        <select disabled>
          <option value="none" selected>태그선택</option>
        </select>
        <textarea disabled
        ref={contentsRef}
        placeholder="타인에 대한 비속어는 제재대상 입니다." 
        onKeyUp={autoSize}
        onKeyDown={autoSize} />
        <br/>
        <input name="password" placeholder="비밀번호" disabled /><br/>
        <button className="post-btn" style={style1}>Loading ...</button>
      </div>
    )
  } else {
    const post = async () => {
      const res = await fetch('https://bamboo_server.gbsw.hs.kr/upload', {
        method: 'post',
        body: JSON.stringify({
          category: values.category,
          title: values.title,
          content: values.content,
          Question_id: data.Question.id,
          Question_Answer: values.Question_Answer,
          password: values.password
        })
      }).then((res) => res.json())
      if (res.Success === true) { 
        window.location.reload()
        return alert("성공적으로 업로드 되었습니다.") 
      }
      else { 
        window.location.reload()
        return alert("업로드 실패")
      }
    }
    console.log(data.Question)
    return (
      <div className="form container">
        <input name="title" placeholder="제목을 입력하세요." onChange={(e) => setValues({ title: e.target.value })} />
        <input name="auth" placeholder={data.Question.question} />
        <select onChange={(e) => setValues({ category: e.target.value })}>
          <option value="none" selected>태그선택</option>
          {Object.values(data.category).map((category) => (
            <option key={1} value={category.title}>{category.title}</option>
          ))}
        </select>
        <textarea onChange={(e) => setValues({ content: e.target.value })}
        ref={contentsRef}
        placeholder="타인에 대한 비속어는 제재대상 입니다." 
        onKeyUp={autoSize}
        onKeyDown={autoSize} />
        <br/>
        <input name="password" placeholder="비밀번호" onChange={(e) => setValues({ password: e.target.value})} /><br/>
        <button className="post-btn" onClick='' style={style1}>제보하기</button>
      </div>
    )
  }
}