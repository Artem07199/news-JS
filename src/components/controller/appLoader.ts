import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'твой-api-ключ',
        });
    }
}

export default AppLoader;
