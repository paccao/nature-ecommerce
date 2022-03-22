import { JwtPayload } from 'jsonwebtoken'

interface ExtendedRequest extends Request {
	user?: any
}

export default ExtendedRequest
