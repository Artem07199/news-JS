import { NewsResponse, SourcesResponse } from '../../types/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.addEventListener('click', (e: Event): void =>
                this.controller.getNews(e as MouseEvent, (data: NewsResponse): void => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data: SourcesResponse): void => this.view.drawSources(data));
    }
}

export default App;