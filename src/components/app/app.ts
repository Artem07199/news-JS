import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsResponse, SourcesResponse } from '../../types/types';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');
        if (sourcesContainer) {
            sourcesContainer.addEventListener('click', (e: MouseEvent): void => {
                const target = e.target as HTMLElement;
                const sourceItem = target.closest<HTMLElement>('.source__item');

                if (sourceItem) {
                    const allSources = document.querySelectorAll<HTMLElement>('.source__item');
                    allSources.forEach((item: HTMLElement): void => {
                        item.classList.remove('source__item_active');
                    });
                    sourceItem.classList.add('source__item_active');
                }

                this.controller.getNews(e, (data?: NewsResponse): void => {
                    if (data) {
                        this.view.drawNews(data);
                    }
                });
            });
        }

        this.controller.getSources((data?: SourcesResponse): void => {
            if (data) {
                this.view.drawSources(data);
            }
        });

        this.initSourcesScroll();
        this.initScrollTop();
    }

    private initSourcesScroll(): void {
        const sources = document.querySelector<HTMLElement>('.sources');
        const prevBtn = document.querySelector<HTMLButtonElement>('#sourcesPrev');
        const nextBtn = document.querySelector<HTMLButtonElement>('#sourcesNext');

        if (!sources) {
            return;
        }

        const scrollStep = 300;

        prevBtn?.addEventListener('click', (): void => {
            sources.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });

        nextBtn?.addEventListener('click', (): void => {
            sources.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });

        sources.addEventListener(
            'wheel',
            (e: WheelEvent): void => {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    sources.scrollLeft += e.deltaY;
                }
            },
            { passive: false }
        );
    }

    private initScrollTop(): void {
        const scrollBtn = document.querySelector<HTMLButtonElement>('#scrollTopBtn');
        if (!scrollBtn) {
            return;
        }

        window.addEventListener('scroll', (): void => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('scroll-top-btn_visible');
            } else {
                scrollBtn.classList.remove('scroll-top-btn_visible');
            }
        });

        scrollBtn.addEventListener('click', (): void => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
}

export default App;
