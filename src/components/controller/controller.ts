import { ApiEndpoint, NewsResponse, ResponseCallback, SourcesResponse } from '../../types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: ResponseCallback<NewsResponse>): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId && newsContainer && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: ApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
