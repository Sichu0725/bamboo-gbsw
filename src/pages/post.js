import useSWR from 'swr'
import fetcher from '../utils/fetcher'
import moment from 'moment'
export const Post = () => {
	const { data, error } = useSWR('bamboo_server.gbsw.hs.kr/get?', fetcher)

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
		return (
			<div>
				<div className="container card">
					<h3>#{data.id}번째 글</h3>
					<p>{moment(data.date).format('YYYY년 MM월 DD일')}</p>
					<h3 style={{color:"black"}}>{data.title}</h3>
					<p style={style1}>
						{data.content}
					</p>
					<span>{data.category}</span>
				</div>
			</div>
		)
	}
}
