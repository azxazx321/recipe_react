import { Card, Col, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { getLiveLists } from '../service';

const { Meta } = Card;


const spanTopStyle = {
  position: 'absolute',
  color: 'white',
  width: '100%',
  padding: '0 5px',
  top: '0px',
  right: '0px',
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
  textAlign: 'right',
};
const spanBottomStyle = {
  position: 'absolute',
  color: 'white',
  fontZise: '20px',
  width: '100%',
  padding: '0 5px',
  top: '164px',
  right: '0px',
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
};


export default function Live() {
  let [rooms,setRooms] = useState([])
  const [loading, setLoading] = useState(false); // 是否正在加载
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据可加载
  const [page, setPage] = useState(1); // 当前页数
  const [isBottom, setIsBottom] = useState(true);

  useEffect(()=>{
    if(isBottom){
      (async () => {
        await loadData()
      })()
    }
 
  },[isBottom])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const loadData = async () => {
    if(!hasMore) {
      return
    }

    setLoading(true)
    let data = await getLiveLists(page)
    setRooms([...rooms,...data.data.list])
    setLoading(false)
    if(page === data.data.pageCount) {
      setHasMore(false)
    } else {
      setPage(page + 1)
    }
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 150;
    setIsBottom(isAtBottom);
  };
  
  const listItems = rooms.map((item,index) => {
    return <Col  key={index} span={8}> 
          <Card
          hoverable
          style={{
            width: 330,
            position: 'relative',
    
          }}
          bodyStyle = {{
            padding: 0
          }}
          cover={<img alt="" src={item.roomSrc} />}
        >
          <Meta style={{ padding: 0}} title={item.roomName} />
          {/* <span style={{ padding: 0}}>{item.roomName}</span> */}
          <span style={spanTopStyle}>{item.hn}</span>
          <span style={spanBottomStyle}>{item.nickname}</span>
    
        </Card>
  </Col>
  })


  return (
    <div>
      <Row gutter={16}>
        {listItems}  
      </Row>

      {loading && (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin size="large" />
      </div>
    )}
    {!loading && hasMore && (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <button onClick={loadData}>Loading More</button>
      </div>
    )}
    </div>
  )
}
