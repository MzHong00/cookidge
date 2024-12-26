import { Cloudinary } from "@cloudinary/url-gen";

import config from "shared/config";

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: config.cloudinary_name
    }
})

export default cloudinary;