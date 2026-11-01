import { NewsResponse, SourcesResponse } from '../../types/types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: NewsResponse): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: SourcesResponse): void {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
