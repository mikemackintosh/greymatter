import { Configuration, FrontendApi, IdentityApi, OAuth2Api } from "@ory/client"

const baseUrlInternal =
  import.meta.env.ORY_SDK_URL || "https://playground.projects.oryapis.com"

const apiBaseFrontendUrlInternal =
  import.meta.env.KRATOS_PUBLIC_URL || baseUrlInternal

const apiBaseOauth2UrlInternal = import.meta.env.HYDRA_ADMIN_URL || baseUrlInternal

const apiBaseIdentityUrl = import.meta.env.KRATOS_ADMIN_URL || baseUrlInternal

export const apiBaseUrl =
  import.meta.env.KRATOS_BROWSER_URL || apiBaseFrontendUrlInternal

// Sets up the SDK
const sdk = {
  basePath: apiBaseFrontendUrlInternal,
  frontend: new FrontendApi(
    new Configuration({
      basePath: apiBaseFrontendUrlInternal,
    }),
  ),
  oauth2: new OAuth2Api(
    new Configuration({
      basePath: apiBaseOauth2UrlInternal,
      ...(import.meta.env.ORY_ADMIN_API_TOKEN && {
        accessToken: import.meta.env.ORY_ADMIN_API_TOKEN,
      }),
      ...(import.meta.env.MOCK_TLS_TERMINATION && {
        baseOptions: {
          "X-Forwarded-Proto": "https",
        },
      }),
    }),
  ),
  identity: new IdentityApi(
    new Configuration({
      basePath: apiBaseIdentityUrl,
      ...(import.meta.env.ORY_ADMIN_API_TOKEN && {
        accessToken: import.meta.env.ORY_ADMIN_API_TOKEN,
      }),
    }),
  ),
}

export default sdk