import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongodb';

// fake data
// import Posts from '../../utils/data/Posts';

export default async (_req: NextApiRequest, res: NextApiResponse) => {

  // const product = _req.body.product
  if (_req.method === 'GET') {


    // let limit = typeof Number(_req.query.limit) === 'number' ? Number(_req.query.limit) : 50;
    let limit = 300;
    // maloma ma7sora
    // 5abera basera
    // kabera
    // Process a POST request
    // if (!product) return res.status(400).json({success:false})
       const PostsCollection = await client.db("Power").collection("Posts")
       const docs = await PostsCollection.find({}).limit(limit)
      //  console.log('docs: ', docs);
      //  console.log('docs: ', docs);
      const Posts : any[] = [];
       await docs.forEach((prod:any) =>{
        // console.log('prod: ', prod);
              Posts.push(prod);
        })
        if (Posts.length > 0) {
          // console.log('Posts: ', Posts);
          // console.log('Posts: ', Posts);
            return res.status(200).json(Posts);
          }
}
return res.status(404).json({success:false});
    // return res.status(200).send(Posts)
}
