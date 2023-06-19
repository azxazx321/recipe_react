import React, { useEffect, useState } from 'react'
import { getProductLists } from '../service'
import { Card, Col, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';

export default function Mall() {
    let [products, setProducts] = useState([])
    let [page, setPage] = useState(1); 
    let [isLoading, setIsLoading] = useState(false)
    const [isBottom, setIsBottom] = useState(true);
    const [hasMore, setHasMore] = useState(true);
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


    const loadData = async() => {
        if(!hasMore) return;
        setIsLoading(true)
        let data = await getProductLists(1)
        console.log(data,'mmmm')
        setProducts([...products,...data.data])
        setIsLoading(false)
        if(page === data.pageCount){
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
   
    const productLists = products.map((product) => {
        return <Col span={6}>
            <Card
                bodyStyle={{padding: 0, }}
                cover={<img src={`./assets/img/mall/${product.pic}`}/>}
            >

            </Card>
            <Meta
             title={product.name}
             style={{padding: '10px',fontSize:'18px'}}
             description={
             <Row>
                <Col span={6} style={{color:'red'}}>{product.price}</Col>
                <Col span={6} offset={8} push={8}>{product.sale_count}</Col>
             </Row>
                }
             />
         
        </Col>
    })

    return (
        <>
            <Row gutter={10}>{productLists}</Row>
            {isLoading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Spin size="large" />
            </div>
            )}
            {!isLoading && hasMore && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <button onClick={loadData}>Loading More</button>
            </div>
    )}
        </>
    )
}
