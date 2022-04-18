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
      const res = await fetch('http://localhost/upload', {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: values.content,
          category: values.category,
          title: values.title,
          Question_id: data.Question.id,
          Question_Answer: values.Question_Answer,
          password: values.password
        })
      }).then((res) => res.json())
      if (res.Success === true) { 
        document.querySelector('.Form_title').value = ''
        document.querySelector('.Form_auth').value = ''
        document.querySelector('select').value = 'none'
        document.querySelector('.Form_content').value = ''
        document.querySelector('.Form_password').value = ''
        setValues({ title: '', category: 'none', content: '', Question_Answer: '', password: '' })
        return alert("성공적으로 업로드 되었습니다.") 
      } else {
        return alert("업로드 실패\n사유: " + res.reason)
      }
    }
    
    return (
      <div className="form container">
        <input name="title" className="Form_title" placeholder="제목을 입력하세요." onChange={(e) => setValues({ title: e.target.value, content: values.content, category: values.category, password: values.password, Question_Answer: values.Question_Answer })} />
        <input name="auth" className="Form_auth" placeholder={data.Question.question} onChange={(e) => setValues({ Question_Answer: e.target.value, title: values.title, content: values.content, category: values.category, password: values.password })} />
        <select onChange={(e) => setValues({ category: e.target.value, title: values.title, content: values.content, password: values.password, Question_Answer: values.Question_Answer })}>
          <option value="none" selected>태그선택</option>
          {Object.values(data.category).map((category) => (
            <option key={1} value={category.title}>{category.title}</option>
          ))}
        </select>
        <textarea onChange={(e) => setValues({ content: e.target.value, title: values.title, category: values.category, password: values.password, Question_Answer: values.Question_Answer })}
        ref={contentsRef}
        placeholder="타인에 대한 비속어는 제재대상 입니다." 
        onKeyUp={autoSize}
        onKeyDown={autoSize}
        className="Form_content" />
        <br/>
        <input type="password" name="password" className="Form_password" placeholder="비밀번호" onChange={(e) => setValues({ password: e.target.value, title: values.title, content: values.content, category: values.category, Question_Answer: values.Question_Answer })} /><br/>
        <button className="post-btn" onClick={post} style={style1}>제보하기</button>
      </div>
    )
  }
}