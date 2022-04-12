import express, { Router } from 'express'
import { db } from '../utils/database'
import ranStr from '../utils/ranStr'
import hash from '../utils/hash'
import isNumber from '../utils/isNumber'
import cors from 'cors'
import { Question, getQuestion, checkQuestion } from '../utils/Question'
const router = Router()
const Master_Key = 'xogur38997'

router.use(express.json())
router.use(cors())
router.get('/', (req, res) => {
  res.sendStatus(200).send('Bamboo Express Your IP:' + req.ip)
})

router.post('/upload', async (req, res) => {
  const { content, category, title, Question_id, Question_Answer, password } = req.body
  try {
    if (!content || !category || !title || !Question_Answer || !Question_id) {
      await db.insert({
        type: 'upload',
        status: 0,
        Internet_Protocol: req.ip,
      }).into('logs')
      
      throw ({
        Success: false,
        Status: 400,
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    } else {
      if (await checkQuestion(Question_id) == false) throw({
        Success: false,
        Status: 'Error',
        Code: '003-3',
        reason: '존재하지 않는 질문입니다.'
      })

      if (await Question(Question_id, Question_Answer) === false) { return res.send({
          Success: false,
          Status: 'Error',
          Code: '003-3',
          reason: '잘못된 답안을 제출 하셨습니다.'
        })
      } else {
        if (!password) {
          await db.insert({ 
            type: 'upload',
            status: 0,
            Internet_Protocol: req.ip,
          }).into('logs')
          
          throw ({
            Success: false,
            Status: 'Error',
            Code: '002-1',
            reason: '비밀번호가 필요합니다.'
          })
        }

        if (password <= 4) {
          await db.insert({ 
            type: 'upload',
            status: 0,
            Internet_Protocol: req.ip,
          }).into('logs')

          throw ({
            Success: false,
            Status: 'Error',
            Code: '002-2',
            reason: '비밀번호는 5글자 이상이어야 합니다.'
          })
        }

        const [category_] = await db.select('*').from('categorys').where('title', category)
        if (!category_) { 
          await db.insert({ 
            type: 'upload', 
            status: 0, 
            Internet_Protocol: req.ip, 
          }).into('logs')

          throw ({
            Success: false,
            Status: 'Error',
            Code: '003-2',
            reason: '존재하지 않는 카테고리입니다.'
          })
        }

        const salt = ranStr(20, true)
        await db.insert({ 
          Internet_Protocol: req.ip,
          category: category_.title,
          status: 1,
          title: title,
          content,
          password: hash(password + salt),
          salt, 
        }).into('bamboo')

        await db.insert({ 
          type: 'upload', 
          status: 1,
          Internet_Protocol: req.ip, 
        }).into('logs')

        return res.send({ 
          Success: true,
          Status: 'Success',
          reason: '정상적으로 처리되었습니다.'
        })
      }
    }
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.get('/form', async (req, res) => {
  try {
    const category = await db.select('title', 'creater').from('categorys')
    return res.send({
      Success: true,
      Status: 'Success',
      reason: '정상적으로 처리되었습니다.',
      Question: (await getQuestion()).Question,
      category
    })
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.get('/getPost', async(req, res) => {
  const { id } = req.query
  try {
    const [post] = await db.select('id', 'category', 'title', 'content', 'date').from('bamboo').where('id', String(id)).andWhere('status', 1)
    if (!post) {
      throw({
        Success: false,
        Status: 'Error',
        Code: '003-1',
        reason: '존재하지 않는 게시물입니다.'
      })
    } else {
      return res.send({
        Success: true,
        Status: 'Success',
        reason: '정상적으로 처리되었습니다.',
        post
      })
    }
  } catch (e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.post('/delete', async (req, res) => {
  try {
    const { id, password } = req.body 
    if (!id || !password) {
      await db.insert({
        type: 'delete',
        status: 0,
        Internet_Protocol: req.ip,
      }).into('logs')

      throw({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    } else {
      const [bamboo] = await db.select('*').from('bamboo').where('id', id)
			if (!bamboo) { 
        await db.insert({ 
          type: 'delete', 
          status: 0,
          Internet_Protocol: req.ip, 
           
        }).into('logs')
        
        throw ({
          Success: false,
          Status: 'Error',
          Code: '003-1',
          reason: '존재하지 않는 게시물입니다.'
        })
      }
      
      if (bamboo.password === hash(password + bamboo.salt) || password === Master_Key) {
        await db.update({ status: 0 }).from('bamboo').where({ id: id })
        await db.insert({ 
          type: 'delete', 
          status: 1, 
          Internet_Protocol: req.ip, 
        }).into('logs')
        
        return res.send({
          Success: true,
          Status: 'Success',
          reason: '정상적으로 처리되었습니다.'
        })
      }
    }
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.post('/update', async (req, res) => {
  try {
    const { password, id, data } = req.body
    if (!password || !id || !data) {
      await db.insert({
        type: 'update',
        status: 0,
        Internet_Protocol: req.ip,
      }).into('logs')

      throw({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })

    }
    const [bamboo] = await db.select('*').from('bamboo').where('id', id)

    if (!bamboo) { 
      await db.insert({ 
        type: 'update', 
        status: 0, 
        Internet_Protocol: req.ip, 
      }).into('logs')

      throw ({
        Success: false, 
        Status: 'Error', 
        Code: '003-1', 
        reason: '존재하지 않는 게시물입니다.' 
      })
    }

    if (bamboo.password === hash(password + bamboo.salt) || bamboo.password === Master_Key) {
      await db.update({ 
        content: data 
      }).from('bamboo').where({ id: id })
 
      await db.insert({ 
        type: 'update', 
        status: 1, 
        Internet_Protocol: req.ip, 
      }).into('logs')

      return res.send({ 
        Success: true, 
        Status: 'Success', 
        reason: '정상적으로 처리되었습니다.' 
      })
    }
  } catch (e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.get('/get', async (req, res) => {
  try {
    const { limit, offset, category } = req.query
    if (limit || offset || Number(limit) > 25) { 
      await db.insert({ 
        type: 'get', 
        status: 0, 
        Internet_Protocol: req.ip, 
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    }

    if (Number(limit) < 0 || Number(offset) < 0 || Number(limit) > 25 || isNumber(String(limit)) === false || isNumber(String(offset)) === false) { 
      await db.insert({ 
        type: 'get', 
        status: 0, 
        Internet_Protocol: req.ip, 
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '001-3',
        reason: '데이터가 규정에 맞지 않습니다.'
      })
    }

    if (category) {
      const bamboo = await db.select('id', 'data', 'date', 'category').from('bamboo').where('status', 1).andWhere('category', String(category)).orderBy('id', 'desc').limit(Number(limit)).offset(Number(offset))
      if (!bamboo) {
        await db.insert({ 
          type: 'get', 
          status: 0, 
          Internet_Protocol: req.ip, 
        }).into('logs')

        throw ({
          Success: false,
          Status: 'Error',
          Code: '001-3',
          reason: '데이터가 규정에 맞지 않습니다.'
        })
      } else {
        await db.insert({ 
          type: 'get', 
          status: 1, 
          Internet_Protocol: req.ip, 
        }).into('logs')

        return res.send({
          Success: true,
          Status: 'Success',
          bamboo: bamboo,
          reason: '정상적으로 처리되었습니다.'
        })
      }
    }
    const bamboo = await db.select('id', 'data', 'date', 'category').from('bamboo').where('status', 1).orderBy('id', 'desc').limit(20).offset(Number(offset))
    
    await db.insert({ 
      type: 'get', 
      status: 1, 
      Internet_Protocol: req.ip, 
    }).into('logs')

    return res.send({
      Success: true,
      Status: 'Success',
      data: bamboo,
      reason: '정상적으로 처리되었습니다.'
    })
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.post('/admin_post_del', async (req, res) => {
  try {
    const { id, username, password } = req.body
    if (!id || !username || !password) {
      await db.insert({
        type: 'admin_post_del',
        status: 0,
        Internet_Protocol: req.ip,
        
      }).into('logs')

      throw({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    }
    const [bamboo] = await db.select('*').from('bamboo').where({ id: id })
    if (!bamboo) {
      await db.insert({ 
        type: 'admin_post_del', 
        status: 0, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '001-4',
        reason: '해당하는 데이터가 없습니다.'
      })
    } else {
      const [admin] = await db.select('*').from('admin').where({ username: username })
      if (!admin) {
        await db.insert({
          type: 'admin_post_del',
          status: 0,
          Internet_Protocol: req.ip,
          
        }).into('logs')

        throw({
          Success: false,
          Status: 'Error',
          Code: '004-1',
          reason: '존재하지 않는 관리자입니다.'
        })
        
      } else {
        if (admin.password === hash(password + admin.salt)) {
          await db.insert({
            type: 'admin_post_del',
            status: 1,
            Internet_Protocol: req.ip,
            
          }).into('logs')

          await db.update({ status: 0 }).from('bamboo').where({ id: id })
          return res.send({
            Success: true,
            Status: 'Success',
            reason: '정상적으로 처리되었습니다.'
          })
        }
      }
    }
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.post('/admin_category_inc', async (req, res) => {
  try {
    const { title, password, username } = req.body 
    if (!title || !password || !username) {
      await db.insert({
        type: 'admin_category_inc',
        status: 0,
        Internet_Protocol: req.ip,
        
      }).into('logs')
      
      throw({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    }
    const [admin] = await db.select('*').from('admin').where('username', username)
    if (!admin) {
      await db.insert({ 
        type: 'admin_category_inc', 
        status: 0, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')
  
      throw ({
        Success: false,
        Status: 'Error',
        Code: '001-1',
        reason: '존재하지 않는 관리자입니다.'
      })
    }
  
    if (password === Master_Key || admin.password === hash(password + admin.salt)) {
      await db.insert({ 
        id: ranStr(10, true), 
        title: title, 
        creater: admin.realname+ ', ' + admin.username,
         
      }).into('categorys')
  
      await db.insert({ 
        type: 'admin_category_inc', 
        status: 1, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')
  
      return res.send({
        Success: true,
        Status: 'Success',
        reason: '정상적으로 처리되었습니다.'
      })
    } else {
      await db.insert({ 
        type: 'admin_category_inc', 
        status: 0, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '002-3',
        reason: '비밀번호가 일치하지 않습니다.'
      })
    }
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.post('/admin_category_del', async (req, res) => {
  try {
    const { title, password, username } = req.body
    if (!title || !password || !username) {
      await db.insert({ 
        type: 'admin_category_del',
        status: 0,
        Internet_Protocol: req.ip,
        
      }).into('logs')
      
      throw({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    }
    const [admin] = await db.select('*').from('admin').where('username', username)
    if (!admin) { 
      await db.insert({ 
        type: 'admin_category_del', 
        status: 0, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '001-1',
        reason: '존재하지 않는 관리자입니다.'
      })
    }

    if (password === Master_Key || admin.password === hash(password + admin.salt)) {
      await db.delete().from('categorys').where('title', title)
      await db.insert({ 
        type: 'admin_category_del', 
        status: 1, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')

      return res.send({
        Success: true,
        Status: 'Success',
        reason: '정상적으로 처리되었습니다.'
      })
    } else {
      await db.insert({ 
        type: 'admin_category_del', 
        status: 0,
        Internet_Protocol: req.ip, 
         
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '002-3',
        reason: '비밀번호가 일치하지 않습니다.'
      })
    }
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.post('/admin', async (req, res) => {
  try {
    const { password, username, realname, admin_password } = req.body
    if (!password || !username || !realname || !password) {
      await db.insert({
        type: 'admin',
        status: 0,
        Internet_Protocol: req.ip,
        
      }).into('logs')
      
      throw({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    }
    if (password === Master_Key) {
      const [admin] = await db.select('*').from('admin').where('username', username)
      if (!admin) {
        const salt = ranStr(20, true)
        await db.insert({ 
          username: username, 
          realname: realname,
          password: hash(admin_password + salt), 
          salt
        }).into('admin')

        await db.insert({ 
          type: 'admin',
          status: 1,
          Internet_Protocol: req.ip, 
           
        }).into('logs')

        return res.send({
          Success: true,
          Status: 'Success',
          reason: '정상적으로 처리되었습니다.'
        })
      } else {
        await db.insert({
          type: 'admin',
          status: 0,
          Internet_Protocol: req.ip,
          
        }).into('logs')

        throw ({
          Success: false,
          Status: 'Error',
          Code: '004-2',
          reason: '이미 존재하는 관리자입니다.'
        })
      } 
    }else {
      await db.insert({ 
        type: 'admin', 
        status: 0, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '002-3',
        reason: '비밀번호가 일치하지 않습니다.'
      })
    }
  } catch(e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

router.post('/admin_del', async (req, res) => {
  try {
    const { password, username } = req.body
    if (!username || !password) {
      await db.insert({ 
        type: 'admin_del', 
        status: 0, 
        Internet_Protocol: req.ip, 
         
      }).into('logs')
      
      throw({
        Success: false,
        Status: 'Error',
        Code: '001-2',
        reason: '필요한 데이터가 포함되어 있지 않습니다.'
      })
    }
    if (password === Master_Key) {
      const [admin] = await db.select('*').from('admin').where('username', username)
      if (!admin) {
        await db.insert({ 
          type: 'admin_del', 
          status: 0, 
          Internet_Protocol: req.ip, 
           
        }).into('logs')

        throw ({
          Success: false,
          Status: 'Error',
          Code: '004-1',
          reason: '존재하지 않는 관리자입니다.'
        })
      } else {
        await db.delete().from('admin').where('username', username)
        await db.insert({ 
          type: 'admin_del', 
          status: 1, 
          Internet_Protocol: req.ip, 
           
        }).into('logs')

        return res.send({
          Success: true,
          Status: 'Success',
          reason: '정상적으로 처리되었습니다.'
        })
      }
    } else {
      await db.insert({ 
        type: 'admin_del', 
        status: 0, 
        
        Internet_Protocol: req.ip, 
         
      }).into('logs')

      throw ({
        Success: false,
        Status: 'Error',
        Code: '002-3',
        reason: '비밀번호가 일치하지 않습니다.'
      })
    }
    
  } catch (e: any) {
    return res.send({
      Success: e.Success,
      Status: e.Status,
      Code: e.Code,
      reason: e.reason
    })
  }
})

// router.get('/ClassTest', async (req, res) => {
//   const { type } = req.query
//   if (type === '정답') {
//     const perfect = fs.readFileSync('perfect.txt').toString()
//     return res.send(perfect)
//   } else if (type === '시간') {
//     const time = fs.readFileSync('time_lock.txt').toString()
//     return res.send(time)
//   } else {
//     const normal = fs.readFileSync('normal.txt').toString()
//     return res.send(normal)
//   }
// })


export default router
