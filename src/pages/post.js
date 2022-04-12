import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import moment from 'moment'
import QueryString from 'qs'
import xss from 'xss'
export const Post = ({ location }) => {
	const query = QueryString.parse(location.search, {
		ignoreQueryPrefix: true
	})
	const { data, error } = useSWR('http://localhost/getPost?id=' + query.id, fetcher)
	const style1 = {
		fontSize:"18px",
		fontWeight: "ligther"
	}

	if (error) { 
		return (
			<div>
				<div className="container card">
					<h3>Failed To Load</h3>
				</div>
			</div>
		)
	}

	if (!data) {
		return (
			<div>
				<div className="container card">
					<h3>Loading ...</h3>
				</div>
			</div>
		)
	} else {
		if (data.Success === true) {
			return (
				<div>
					<div className="container card">
						<h3>#{data.post.id}번째 글</h3>
						<p>{moment(data.post.date).format('YYYY년 MM월 DD일')}</p>
						<h3 style={{color:"black"}}>{data.post.title}</h3>
						<div style={style1} dangerouslySetInnerHTML={{ __html: xss(data.post.content) }} />
						<span>{data.post.category}</span>
					</div>
				</div>
			)
		} else {
			return(
				<div>
					<div className="container card">
						<h3>#0번째 글</h3>
						<p>YYYY년 MM월 DD일</p>
						<h3 style={{color:"black"}}>없는 글 입니다.</h3>
					</div>
				</div>
			)
		}
	}
}
