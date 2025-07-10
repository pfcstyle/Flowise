import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

import logger from '../../utils/logger'

const ARCGIS_USER_INFO_URL = 'https://www.arcgis.com/sharing/rest/community/self'

const authenticateArcGISToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const tokenType = authHeader && authHeader.split(' ')[0]
    const token = authHeader && authHeader.split(' ')[1]

    if (!token || tokenType != 'Bearer') {
        next()
        // res.sendStatus(401)
        return
    }

    try {
        const userInfoResponse = await axios.get(ARCGIS_USER_INFO_URL, {
            params: {
                token: token,
                f: 'json'
            }
        })
        if (userInfoResponse.data.error) {
            logger.error('Error validating ArcGIS token:', userInfoResponse.data.error)
            next()
            // res.sendStatus(403)
            return
        }
        // access, orgId, role, privileges, userType, userLiscenseTypeId
        const user = userInfoResponse.data
        req.arcgisUser = user
        req.token = token
        next()
    } catch (error) {
        logger.error('Error validating ArcGIS token:', error)
        next()
        // res.sendStatus(403)
    }
}
export default authenticateArcGISToken
