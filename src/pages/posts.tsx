import Head from 'next/head';
import { Box, Container,Button, Grid, Pagination ,Typography} from '@mui/material';
import { PostListToolbar } from '../components/post/post-list-toolbar';
import { PostCard } from '../components/post/post-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import {useEffect,useState} from 'react'


const Page = () => {
  const [isauthed,setIsauthed]= useState(false)
  const router = useRouter()
  const [data,setData] = useState([])
  const [q,setQ] = useState('')
  // console.log('data: ', data);
  const handleChange = (e:any) =>   {

    setQ(`${e.target.value}`)
    if (q.length > 0) {

    }
  }
  // const onSubmit = ()
  const fetchAll = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL }/api/getall1`)
    const res = await req.json()
    // console.log('res: ', res);
    setData(res)
  }
  useEffect(() => {

    const value = localStorage.getItem('tkn') !== undefined && localStorage.getItem('tkn') !== null ;
    if (value) {
      setIsauthed(true)
      fetchAll()
      return

    }
    router.push('/')

  }, [])
  const Delete= async (id:string) => {
    // console.log('id: ', id);
    let proceed = confirm("Delete Post?");
    if (proceed) {
      //proceed
      const jwt = localStorage.getItem('tkn')
      if (jwt) {
          const req = await fetch(`${process.env.NEXT_PUBLIC_API }/api/delete1`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({jwt, id})
          })
          const res = await req.json()
          // console.log('res: ', res);
          if (res?.success) {
            let a = data.filter((x:any) => `${x._id}` !== id)
            // console.log('a: ', a);
            setData(a)
            // window.reload()
          }
      }
    } else {
     alert('Failed To Delete Post!')
      //don't proceed
    }
  }
  return (

  <>
    <Head>
      <title>
        Posts
      </title>
    </Head>
   {isauthed && <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <PostListToolbar q={q} handleChange={handleChange} />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
          {data && data.length > 0  ? data.filter((item:any)=>item.title.includes(q)).reverse().map((Post:any) => {
            if (!Post?._id || !Post?.title) return;

            return(  <Grid
                item
                key={Post._id}
                lg={4}
                md={4}
                xs={6}
                sm={4}
              >
                  <Box sx={{width:'100%'}}>
                    <Box sx={{width:'100%',background:'white',height:'300px'}}>


<img src={Post?.images[0] || ''} className='img cover' alt=''/>                      
                    </Box>
                    <Box sx={{px:'.35em',py:'.5em',display:'flex',justifyContent:'space-between'}}>

                      <Typography sx={{fontWeight:'500'}}>
                                {Post?.title}
                      </Typography> 
                    </Box>
                      <Box className='flex gap-3' sx={{mt:'.35em'}}>
                        {/* <Button sx={{border:'1px solid',py:'.25em'}}>View</Button> */}
                        <Button sx={{border:'1px solid',py:'.25em'}}
                        onClick={()=>router.push(`/add1?id=${Post?._id}&mode=edit`)}
                        >Edit</Button>
                        <Button
                        onClick={()=>Delete(Post?._id)}
                        sx={{border:'1px solid red',py:'.25em',color:'red'}}>Delete</Button>
                      </Box>

                  </Box>
                {/* <PostCard Post={Post} /> */}
              </Grid>
            )}):
            <Typography sx={{textAlign:'center'}}>
              Loading...
            </Typography>
            }

          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={1}
            size="small"
          />
        </Box>
      </Container>
    </Box>}
  </>
  )

};

Page.getLayout = (page:any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
