// This import is required to support dynamic loading, i.e. the import() function
import { defineCustomElements } from '@arcgis/map-components/dist/loader'
// Register custom elements
defineCustomElements(window, { resourcesUrl: 'https://js.arcgis.com/map-components/4.30/assets' })

// import esriConfig from '@arcgis/core/config'
/**
 * TODO
 * set assets path cause erros, it'll load assets from this URL: https://jsdev.arcgis.com/4.30/@arcgis/core/assets/esri/widgets/support/components/assets/button/t9n/messages_en.json.
 * However, the correct URL is: https://jsdev.arcgis.com/4.30/esri/widgets/support/components/assets/button/t9n/messages_en.json
 */
// esriConfig.assetsPath = `${window.jimuConfig.arcgisJsApiUrl}@arcgis/core/assets`

export * from '@arcgis/map-components-react'
