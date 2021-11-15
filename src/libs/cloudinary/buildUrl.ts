import { buildUrl, setConfig } from "cloudinary-build-url"

setConfig({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
})

export default buildUrl
