import React, { useEffect } from 'react'
import { Breadcrumb, Layout, Menu, theme, Image, Button } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom';
// import logo from '/img/logo.png'
const { Header, Content, Footer } = Layout;


const headerStyle = {
  width: '1000px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#f75148',
};



// useEffect(()=>{

// },[])

const items = ["Home", "note", "mall",'notes','live']

export default function Main() {
  let nav =useNavigate()

  let jump = (e) => {
    nav(e.key)
  }
  return (
    <div>
      <Layout>
        
        <Header style={{ backgroundColor: '#f75148'}}>
          <Layout style={headerStyle}>
              <div className="demo-logo">
                <Image src="assets/img/logo.png" width={100} preview={false}/> 
              </div>
              <Menu
                  style={{width: '70%',backgroundColor: '#f75148'}}
                  mode="horizontal"
                  items = {items.map((item, index) => {
                    const key = index + 1;
                    return {
                      key: '/'+ item,
                      label: item,
                    }
                  })
                }
                onClick ={jump}
                />
                <Button type='link'>Sign in</Button>
          </Layout>
            
            
          
        </Header>
        <Content style={{width:"1000px", margin: "0  auto"}}>
              
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Outlet />
        </Content>
        <Footer style={{width:"1000px", margin: "0  auto"}}>3333</Footer>
          
      </Layout> 
   
    </div>
  )
}
