import { query, Request, Response } from 'express'
import { Product, User } from '../../../client/src/models/Product'
import { isProduct } from '../helpers/productsHelpers'
import { nanoid } from 'nanoid'
import { dbConnection as conn } from '../server'

const pushToCart = async (req: Request, res: Response) => {}

export default { pushToCart }
