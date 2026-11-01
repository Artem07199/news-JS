import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '9e47457561fa4201b088ef0c42898b28',
        });
    }
}

export default AppLoader;