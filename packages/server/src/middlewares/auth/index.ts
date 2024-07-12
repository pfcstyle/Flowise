import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

import logger from '../../utils/logger'

const ARCGIS_USER_INFO_URL = 'https://www.arcgis.com/sharing/rest/community/self'

const authenticateArcGISToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.sendStatus(401)
    }

    try {
        const userInfoResponse = await axios.get(ARCGIS_USER_INFO_URL, {
            params: {
                token: token,
                f: 'json'
            }
        })
        logger.debug(userInfoResponse)
        next()
    } catch (error) {
        console.error('Error validating ArcGIS token:', error)
        res.sendStatus(403)
    }
}
export default authenticateArcGISToken
