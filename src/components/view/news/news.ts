import { NewsArticle } from '../../../types/types';
import './news.css';

class News {
    public draw(data: ReadonlyArray<NewsArticle>): void {
        const news: ReadonlyArray<NewsArticle> =
            data.length >= 10 ? data.filter((_: NewsArticle, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item: NewsArticle, idx: number): void => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const itemElement = newsClone.querySelector<HTMLElement>('.news__item');
            const photoElement = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const authorElement = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const dateElement = newsClone.querySelector<HTMLElement>('.news__meta-date');
            const titleElement = newsClone.querySelector<HTMLElement>('.news__description-title');
            const sourceElement = newsClone.querySelector<HTMLElement>('.news__description-source');
            const contentElement = newsClone.querySelector<HTMLElement>('.news__description-content');
            const readMoreElement = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (idx % 2 && itemElement) {
                itemElement.classList.add('alt');
            }

            if (photoElement) {
                photoElement.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            if (authorElement) {
                authorElement.textContent = item.author || item.source.name;
            }

            if (dateElement) {
                dateElement.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            if (titleElement) {
                titleElement.textContent = item.title;
            }

            if (sourceElement) {
                sourceElement.textContent = item.source.name;
            }

            if (contentElement) {
                contentElement.textContent = item.description;
            }

            if (readMoreElement) {
                readMoreElement.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;