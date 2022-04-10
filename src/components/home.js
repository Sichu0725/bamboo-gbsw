export const Home = () => {
  const authQuestion = ["df","df"]
  return (
    <div className="container">
      <div className="form">
        <input name="title" placeholder="제목을 입력하세요." />
        <input name="auth" placeholder="경소고 와이파이 SSID는?" />
        <select>
          <option>태그선택</option>
          <option>궁금증</option>
          <option>진로/진학</option>
          <option>잡담</option>
          <option>유머</option>
          <option>기타</option>
        </select>
        <br/>
        <textarea placeholder="타인에 대한 비속어"></textarea>
        {authQuestion}
      </div>
    </div>
  )
}