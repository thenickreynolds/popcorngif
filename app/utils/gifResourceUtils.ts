import { Result } from "../types/tenorTypes";

interface MediaType {
    dims: number[];
}

export default class GifResourceUtils {
    static getMedia(result: Result) {
        return result.media[0].tinygif;
    }

    static getWidth(media: MediaType) {
        return media.dims[0];
    }

    static getHeight(media: MediaType) {
        return media.dims[1];
    }
}