import swaggerJSDoc from 'swagger-jsdoc'
import fs from 'fs'
import path from 'path'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Flowise API',
        version: '1.0.0',
        description: 'API documentation for Flowise'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, './routes/**/*.js')] // 指定API定义的文件路径
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec

// Write the Swagger JSON to a file
const outputPath = path.join(__dirname, 'swagger.json')
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf-8')

console.log(`Swagger JSON written to ${outputPath}`)
