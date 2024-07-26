import esriId from '@arcgis/core/identity/IdentityManager'
import OAuthInfo from '@arcgis/core/identity/OAuthInfo'
import Portal from '@arcgis/core/portal/Portal'
import config from '../config'

//Create a new OAuthInfo object.
export const info = new OAuthInfo({
    // Swap this ID out with an app ID registered in your ArcGIS Organization.
    appId: config.clientId,
    // Add the portalUrl property if using your own portal.
    portalUrl: 'https://www.arcgis.com'
    // Set the authNamespace property to prevent the user's signed in state
    // from being shared with other apps on the same domain with the same authNamespace value.
    // authNamespace: "portal_oauth_inline",
    // Set popup to true to show the OAuth sign-in page in a separate popup window.
    //popup: true
})

// Add the OAuthInfo to the IdentityManager.
esriId.registerOAuthInfos([info])

export const findCredential = () => {
    return esriId.findCredential(info.portalUrl + '/sharing')
}

// Function to sign in or out of the portal
export const signIn = async () => {
    const credentical = esriId.getCredential(info.portalUrl + '/sharing', {
        // Set the following property to false to not show a dialog
        // before the OAuth popup window is open.
        oAuthPopupConfirmation: false
    })
    const portal = new Portal()
    await portal.load()
    localStorage.setItem('fullname', portal.user.fullName)
    return credentical
}

export const signOut = async () => {
    esriId.destroyCredentials()
    localStorage.removeItem('fullname')
}

// Function to check the current sign in status and display username if signed in.
export const checkSignIn = async () => {
    try {
        await esriId.checkSignInStatus(info.portalUrl + '/sharing/rest/community/self')
        return true
    } catch {
        return false
    }
}
