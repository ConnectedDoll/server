export default class Api {
    static API_HOST = 'http://35.202.184.164';
    static API_DOWNLOAD = '/api/dl';
    static API_STREAM = '/api/stream';

    static getVideoId(url: string): string | null {
        // v=pDgflOcHNnM
        if (url == null) {
            return null;
        }        
        const m = url.match('v=(.*)');       
        console.log(m);
        if (m == null) {
            return null;
        }
        return m[1];
    }

    static convert(videoId: string) {
        return new Promise((resolve,reject) => {
            fetch(this.API_HOST + this.API_DOWNLOAD + '/' +videoId)
                .then(response => {
                    return response.json();
                })
                .then(data => {  resolve(data) })
                .catch(e => reject(e));
        });
    }

    static stream(videoId: string): string {
        return this.API_HOST + this.API_STREAM + '/' +videoId
    }
}